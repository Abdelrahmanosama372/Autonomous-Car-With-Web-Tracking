#!/bin/bash

if [ -z "$1" ]; then
    exit 0
else
    port=$(arduino-cli board list | grep "/dev/tty*" | awk '{print $1}' | head -1)
    echo "${port}" > ../bash-scripts/port.txt
    cd "../arduino-codes/track${1}" || exit 0
    arduino-cli upload -b arduino:avr:uno -p ${port} --input-dir=${pwd}
    sleep 1
    stty -F /dev/ttyACM0 9600 
fi
