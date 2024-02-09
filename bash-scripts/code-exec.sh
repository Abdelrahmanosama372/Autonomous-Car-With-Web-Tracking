#!/bin/bash

if [ -z "$1" ]; then
    exit 0
else 
    port=$(head -1 ../bash-scripts/port.txt)

    if [[ $1 -eq 0 ]]; then
        # 1 -> stop
        echo "1" > ${port}
    elif [[ $1 -eq 1 ]]; then
        # 2 -> start
        echo "2" > ${port}
    fi
fi
    

