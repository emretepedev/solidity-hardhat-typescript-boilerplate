#!/bin/bash

if [ ! "$1" ]; then
    echo "Contract name must be given." 1>&2

    exit 0
fi

slither.sh "$1"
myth.sh "$1"
