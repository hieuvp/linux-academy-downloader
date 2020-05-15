#!/usr/bin/env bash

set -eoux pipefail

rm -f test-data/output.sh

gomplate \
  --datasource data=test-data/data.yml \
  --file in.tpl \
  --out test-data/output.sh
