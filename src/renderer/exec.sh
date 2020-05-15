#!/usr/bin/env bash

set -eou pipefail

readonly TEMPLATE_PATH="download.tpl"
readonly OUTPUT_TEMPLATE_PATH="test-data/output-download.sh"
readonly DATA_PATH="test-data/data.yml"

set -x

rm -f "$OUTPUT_TEMPLATE_PATH"

gomplate \
  --datasource data="$DATA_PATH" \
  --file "$TEMPLATE_PATH" \
  --out "$OUTPUT_TEMPLATE_PATH"
