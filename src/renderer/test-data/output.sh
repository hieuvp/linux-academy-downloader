#!/usr/bin/env bash

set -eou pipefail

readonly DOWNLOAD_PATH="${HOME}/Downloads/Linux Academy"

download() {
  local -r course="AWS Essentials"
  local -r section_title="Course Introduction"
  local -r section_order="1"
  local -r subsection_title="Getting Started"
  local -r subsection_order="1"
  local -r lesson_title="Course Introduction"
  local -r lesson_order="1"

  local -r lesson_dir="${DOWNLOAD_PATH}/${course}/${section_order}. ${section_title}/${subsection_order}. ${subsection_title}"
  local -r lesson_filename="${lesson_order}. ${lesson_title}.mp4"
  local -r download_link="https://video-cdn.linuxacademy.com/vods3/_definst_/smil:box/cdnstore/modules/aws-essentials-new-1530821786284/01_intro_take2_final_updated_1541707798.smil/playlist.m3u8?1556293582"

  if [[ -f "${lesson_dir}/${lesson_filename}" ]]; then
    echo "Skipping: \"${lesson_filename}\" exists"
    return
  fi

  set -x

  mkdir -p "$lesson_dir"

  (
    cd "$lesson_dir"
    youtube-dl --quiet \
      --no-overwrites --output "$lesson_filename" \
      "$download_link"
  )

  set +x
}

download

# 1: AWS Essentials
# 2: AWS Essentials
# 3: AWS Essentials
# 4: AWS Essentials
# 5: AWS Essentials
# 6: AWS Essentials
# 7: AWS Essentials
# 8: AWS Essentials
# 9: AWS Essentials
# 10: AWS Essentials
# 11: AWS Essentials
# 12: AWS Essentials
# 13: AWS Essentials
# 14: AWS Essentials
# 15: AWS Essentials
# 16: AWS Essentials
# 17: AWS Essentials
# 18: AWS Essentials
# 19: AWS Essentials
# 20: AWS Essentials
# 21: AWS Essentials
# 22: AWS Essentials
# 23: AWS Essentials
# 24: AWS Essentials
# 25: AWS Essentials
# 26: AWS Essentials
# 27: AWS Essentials
# 28: AWS Essentials
# 29: AWS Essentials
# 30: AWS Essentials
# 31: AWS Essentials
# 32: AWS Essentials
# 33: AWS Essentials
# 34: AWS Essentials
# 35: AWS Essentials
# 36: AWS Essentials
# 37: AWS Essentials
# 38: AWS Essentials
# 39: AWS Essentials
# 40: AWS Essentials
# 41: AWS Essentials
# 42: AWS Essentials
# 43: AWS Essentials
# 44: AWS Essentials
# 45: AWS Essentials
# 46: AWS Essentials
# 47: AWS Essentials
# 48: AWS Essentials
# 49: AWS Essentials
# 50: AWS Essentials
# 51: AWS Essentials
# 52: AWS Essentials
# 53: AWS Essentials
# 54: AWS Essentials
# 55: AWS Essentials
# 56: AWS Essentials
# 57: AWS Essentials
# 58: AWS Essentials
# 59: AWS Essentials
# 60: AWS Essentials
# 61: AWS Essentials
# 62: AWS Essentials
# 63: AWS Essentials
# 64: AWS Essentials
# 65: AWS Essentials
# 66: AWS Essentials
# 67: AWS Essentials
# 68: AWS Essentials
# 69: AWS Essentials
# 70: AWS Essentials
# 71: AWS Essentials
# 72: AWS Essentials
# 73: AWS Essentials
# 74: AWS Essentials
# 75: AWS Essentials
# 76: AWS Essentials
# 77: AWS Essentials
# 78: AWS Essentials
# 79: AWS Essentials
# 80: AWS Essentials
# 81: AWS Essentials
# 82: AWS Essentials
# 83: AWS Essentials
# 84: AWS Essentials
# 85: AWS Essentials
# 86: AWS Essentials
# 87: AWS Essentials
# 88: AWS Essentials
# 89: AWS Essentials
# 90: AWS Essentials
# 91: AWS Essentials
# 92: AWS Essentials
# 93: AWS Essentials
# 94: AWS Essentials
# 95: AWS Essentials
# 96: AWS Essentials
# 97: AWS Essentials
# 98: AWS Essentials
# 99: AWS Essentials
# 100: AWS Essentials
# 101: AWS Essentials