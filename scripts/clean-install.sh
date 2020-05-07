#!/usr/bin/env bash

set -eoux pipefail

rm -rf node_modules
rm -f package-lock.json

npm install

npm unlink
npm link
