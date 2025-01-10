#/bin/bash

NEXTCLOUD_DIR="/var/www/nextcloud"
mogrify -compress JPEG -quality 85 $NEXTCLOUD_DIR/data/$1
php $NEXTCLOUD_DIR/occ files:scan --path=$1
