#!/bin/sh
PATH=$PATH:/home/olore/.nvm/versions/node/v8.11.2/bin
cd /home/olore/apps/movies-with-friends
git pull
npm i
npm run build