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

{{ range $index, $resource := (ds "data").resources -}}
    # {{ add 1 $index }}: {{ $resource.course }}
{{ end }}
