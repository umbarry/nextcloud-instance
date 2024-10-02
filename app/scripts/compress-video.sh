#/bin/bash

NEXTCLOUD_DIR="/var/www/nextcloud"
#remove extension from filename
INPUT_FILENAME=$(echo $1 | sed -E "s/\..+$//")
INPUT_FILEFORMAT=$(echo $1 | sed -E "s/^.+\.//")
#convert video
ffmpeg -i  $NEXTCLOUD_DIR/data/$1 -map_metadata 0 -vcodec libx265 -crf 24 $NEXTCLOUD_DIR/data/$INPUT_FILENAME-compressed.$INPUT_FILEFORMAT
#delete original file
rm $NEXTCLOUD_DIR/data/$1
#rename converted file into original name
mv $NEXTCLOUD_DIR/data/$INPUT_FILENAME-compressed.$INPUT_FILEFORMAT $NEXTCLOUD_DIR/data/$1
#update db
php $NEXTCLOUD_DIR/occ files:scan --path=$1
