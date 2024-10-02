<?php
/*
 * @copyright 2023 Passwords App
 *
 * @author Marius David Wieschollek
 * @license AGPL-3.0
 *
 * This file is part of the Passwords App
 * created by Marius David Wieschollek.
 */

namespace OCA\Passwords\Provider\Words;

use Exception;
use GuzzleHttp\RequestOptions;
use OCA\Passwords\Helper\Words\SpecialCharacterHelper;
use OCP\Http\Client\IClientService;
use OCA\Passwords\Helper\Random\Randomizer;

/**
 * Class LeipzigCorporaProvider
 *
 * @package OCA\Passwords\Helper\Words
 */
class LeipzigCorporaProvider extends AbstractWordsProvider {

    const SERVICE_URL = 'http://api.wortschatz-leipzig.de/ws/';

    /**
     * @var bool
     */
    protected bool $isAvailable = false;

    /**
     * LocalWordsProvider constructor.
     *
     * @param SpecialCharacterHelper $specialCharacters
     * @param IClientService         $httpClientService
     * @param Randomizer             $randomizer
     * @param string                 $langCode
     */
    public function __construct(protected SpecialCharacterHelper $specialCharacters, protected IClientService $httpClientService, protected Randomizer $randomizer, protected string $langCode) {
    }

    /**
     * @inheritDoc
     *
     * @throws Exception
     */
    public function getWords(int $strength, bool $addNumbers, bool $addSpecial): ?array {
        $corpora = $this->selectCorpora();
        $data    = $this->fetchJsonFromApi('words/'.$corpora.'/randomword/?limit=40');
        $words = $this->processWords($strength, $data);

        return [
            'words'    => $words,
            'password' => $this->wordsArrayToPassword($words, $strength, $addNumbers, $addSpecial)
        ];
    }

    /**
     * @return mixed
     * @throws Exception
     */
    protected function selectCorpora(): string {
        $data     = $this->fetchJsonFromApi('corpora');
        $prefixes = $this->mapLanguageCode();

        return $this->processCorpora($prefixes, $data);
    }

    /**
     * @param string $path
     *
     * @return array
     * @throws Exception
     */
    protected function fetchJsonFromApi(string $path): array {
        $httpClient = $this->httpClientService->newClient();
        $response   = $httpClient->get(static::SERVICE_URL.$path);

        return json_decode($response->getBody());
    }

    /**
     * @param int   $strength
     * @param array $data
     *
     * @return array
     * @throws Exception
     */
    protected function processWords(int $strength, array $data): array {
        $minLength = 16 + $strength * 4;
        $curLength = 0;
        $words     = [];
        foreach($data as $word) {
            $actualWord = preg_replace('/\W+/u', '', ucwords($word->word));
            if(is_numeric($actualWord)) continue;

            $words[]   = $actualWord;
            $curLength += strlen($actualWord);

            if($curLength >= $minLength && count($words) > $strength) {
                break;
            }
        }

        if($curLength < $minLength || count($words) <= $strength) {
            throw new Exception('Unable to find enough words matching the requirements');
        }

        return $words;
    }

    /**
     * @return array
     */
    protected function mapLanguageCode(): array {
        $lang = substr($this->langCode, 0, 2);

        $prefixes = [];
        if($lang === 'de') {
            $prefixes[] = 'deu';
        } else if($lang === 'fr') {
            $prefixes[] = 'fra';
        } else if($lang === 'it') {
            $prefixes[] = 'ita';
        } else if($lang === 'es') {
            $prefixes[] = 'spa';
        } else if($lang === 'pt') {
            $prefixes[] = 'por';
        } else if($lang === 'nl') {
            $prefixes[] = 'nld';
        } else if($lang === 'da') {
            $prefixes[] = 'dan';
        } else if($lang === 'cs') {
            $prefixes[] = 'ces';
        } else if($lang === 'pl') {
            $prefixes[] = 'pol';
        }
        $prefixes[] = 'eng';

        return $prefixes;
    }

    /**
     * @param array $prefixes
     * @param array $data
     *
     * @return string
     * @throws Exception
     */
    protected function processCorpora(array $prefixes, array $data): string {
        foreach($prefixes as $prefix) {
            $corpora = [];
            foreach($data as $corpus) {
                if(substr($corpus->corpusName, 0, 3) === $prefix) {
                    $corpora[] = $corpus->corpusName;
                }
            }

            $matches = count($corpora);
            if($matches > 0) {
                $selectedCorpora = $this->randomizer->getInt(0, $matches - 1);

                return $corpora[ $selectedCorpora ];
            }
        }

        throw new Exception('Unable to find corpora');
    }

    /**
     * @param array $words
     * @param int   $strength
     * @param bool  $addNumbers
     * @param bool  $addSpecial
     *
     * @return string|void
     */
    protected function wordsArrayToPassword(array $words, int $strength = 4, bool $addNumbers = true, bool $addSpecial = true): string {
        $password = parent::wordsArrayToPassword($words);

        return $this->specialCharacters->addSpecialCharacters($password, $strength + 2, $addNumbers, $addSpecial);
    }

    /**
     * @inheritDoc
     */
    public function isAvailable(): bool {
        if($this->isAvailable) return $this->isAvailable;

        try {
            $client   = $this->httpClientService->newClient();
            $response = $client->head(LeipzigCorporaProvider::SERVICE_URL, [RequestOptions::TIMEOUT => 5]);

            $this->isAvailable = $response->getStatusCode() === 200;

            return $this->isAvailable;
        } catch(Exception $e) {
            return false;
        }
    }
}