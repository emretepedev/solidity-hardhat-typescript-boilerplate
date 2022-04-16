#!/bin/bash

if [ ! "$1" ]; then
  echo "Contract name must be given." 1>&2

  exit 0
fi

yarn run compile --force --quiet

slither contracts/"$1".sol
