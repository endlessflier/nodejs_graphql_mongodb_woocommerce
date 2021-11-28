#! /bin/bash

cd /home/ubuntu/mica-backend

yarn install # installing deps

sudo pm2 restart 0 --update-env
