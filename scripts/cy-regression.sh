#!/bin/sh
./node_modules/.bin/wait-on http://localhost:8080
./node_modules/.bin/cypress run --env type=actual
