#!/usr/bin/env bash

set -eou pipefail

readonly OUTPUT_FILE="test-data/out-download.sh"

set -x

rm -f "$OUTPUT_FILE"

gomplate \
  --datasource data=test-data/data.yml \
  --file download.tpl \
  --out "$OUTPUT_FILE"
