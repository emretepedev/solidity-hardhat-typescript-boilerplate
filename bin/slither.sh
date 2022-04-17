#!/bin/bash

if [ ! "$1" ]; then
  echo "Contract name must be given." 1>&2

  exit 0
fi

slither contracts/"$1".sol
