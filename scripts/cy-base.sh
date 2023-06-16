#!/bin/sh
./node_modules/.bin/cypress run \
  --env type=base \
  --config screenshotsFolder=cypress/snapshots/base,specPattern=\"**/e2e/*.js\"