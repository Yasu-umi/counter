#!/bin/sh

PORT='3000'
APP_DIR='/var/www'

NODE_ENV='development'
NODE_CONFIG_DIR='$APP_DIR/config'

NPM_EXEC=$(which npm)
NODE_EXEC=$(which node)
NODE_APP_ARG='$APP_DIR/bin/www'

LOG_DIR='$APP_DIR/logs'
LOG_FILE='$LOG_DIR/app.log'

PID_DIR='$APP_DIR/tmp/pids'
PID_FILE='$PID_DIR/node.pid'

mkdir -p '$PID_DIR'
mkdir -p '$LOG_DIR'
cd $APP_DIR
echo 'Installing node app ...'
${NPM_EXEC} install
echo 'Starting node app ...'
PORT='$PORT' NODE_ENV='$NODE_ENV' NODE_CONFIG_DIR='$CONFIG_DIR' $NODE_EXEC $NODE_APP_ARG 1>'$LOG_FILE' 2>&1 &
