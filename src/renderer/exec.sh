#!/usr/bin/env bash

set -eoux pipefail

gomplate \
  --datasource data=./data.yml \
  --file in.tpl \
  --out out.txt
