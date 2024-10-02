<?php
use OCP\Util;

$appId = OCA\Phonetrack\AppInfo\Application::APP_ID;
Util::addscript($appId, $appId . '-admin');
Util::addstyle($appId, 'admin');
?>

<div class="section" id="phonetrack">
	<h2><?php p($l->t('PhoneTrack')); ?></h2>
	<h3><?php p($l->t('Point number quota')); ?> </h3>
	<label><?php p($l->t('Set the maximum number of points each user can store/log.')); ?></label><br/>
	<label><?php p($l->t('Each user can choose what happens when the quota is reached : block logging or delete oldest point.')); ?></label><br/>
	<label><?php p($l->t('An empty value means no limit.')); ?></label><br/>
	<br />
	<div id="extraSymbols">
		<input id="phonetrackPointQuota" type="number" value="<?php p($_['phonetrackPointQuota']); ?>" min="1" max="1000000000000" step="1"/>
	</div>
</div>
