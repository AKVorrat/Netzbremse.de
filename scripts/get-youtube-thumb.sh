#!/bin/bash 

# Usage: ./get-youtube-thumb.sh "<Video ID>" 
#
# Optionally add parameter for the file you want to download. 
#
# Example: ./get-youtube-thumb.sh "<Video ID>" "maxresdefault"
#
# Available Files: 
#  "default", "hqdefault", "mqdefault", "sddefault", "maxresdefault", "0", "1", "2", "3"
#
# Note: Not all files might be available for all videos

FILE="${2:-hqdefault}"

echo "Downloading Thumbnail for Video with ID: $1 File: $FILE"

curl --output "./assets/img/yt-thumbnails/$1.jpg" "https://img.youtube.com/vi/$1/$FILE.jpg"