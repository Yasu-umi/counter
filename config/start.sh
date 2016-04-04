#!/bin/bash

MONIT_CHK="service monit status"
MONIT_UP="service monit start"


echo "Run monit daemon"

while true; do
    if [ ! "`${MONIT_CHK} | grep 'monit is running'`" ]; then
        echo monit seem to be death
        ${MONIT_UP}
    fi
    sleep 3
done