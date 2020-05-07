#!/usr/bin/env bash

set -eoux pipefail

cd "${HOME}/Downloads/Linux Academy"

youtube-dl https://video-cdn.linuxacademy.com/vods3/_definst_/smil:box/cdnstore/modules/mastering-systemd/6345_course-intro_1519177871.smil/playlist.m3u8?1556293582
# youtube-dl -o "04 - Conclusion and Next Steps.mp4" https://video-cdn.linuxacademy.com/vods3/_definst_/smil:box/cdnstore/modules/lots-of-stuff-here
