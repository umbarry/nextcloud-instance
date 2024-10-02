<?php
$CONFIG = array (
  'instanceid' => getenv('NEXTCLOUD_INSTANCE_ID'),
  'passwordsalt' => getenv('NEXTCLOUD_PASSWORD_SALT'),
  'secret' => getenv('NEXTCLOUD_SECRET'),
  'trusted_domains' => 
    array (
      0 => getenv('NEXTCLOUD_TRUSTED_DOMAIN'),
    ),
  'datadirectory' => '/var/www/nextcloud/data',
  'dbtype' => 'mysql',
  'version' => '29.0.5.1',
  'overwrite.cli.url' => 'https://' . getenv('NEXTCLOUD_TRUSTED_DOMAIN'),
  'dbname' => getenv('MYSQL_DATABASE'),
  'dbhost' => getenv('MYSQL_HOST'),
  'dbport' => '',
  'dbtableprefix' => 'oc_',
  'mysql.utf8mb4' => true,
  'dbuser' => getenv('MYSQL_USER'),
  'dbpassword' => getenv('MYSQL_PASSWORD'),
  'installed' => true,
  'htaccess.RewriteBase' => '/',
  'memories.db.triggers.fcu' => true,
  'memories.exiftool' => '/var/www/nextcloud/apps/memories/bin-ext/exiftool-amd64-glibc',
  'memories.vod.path' => '/var/www/nextcloud/apps/memories/bin-ext/go-vod-amd64',
  'maintenance' => false,
  'enable_previews' => true,
  'enabledPreviewProviders' => 
    array (
      0 => 'OC\\Preview\\TXT',
      1 => 'OC\\Preview\\Image',
      2 => 'OC\\Preview\\Movie',
      3 => 'OC\\Preview\\MP4',
      4 => 'OC\\Preview\\GIF',
    ),
  'preview_max_x' => 300,
  'preview_max_y' => 300,
  'loglevel' => 2,
  'maintenance_window_start' => 1,
  'theme' => '',
);


