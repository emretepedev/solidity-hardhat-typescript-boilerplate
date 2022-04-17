#!/bin/bash

if [ ! "$1" ]; then
  echo "Contract name must be given." 1>&2

  exit 0
fi

yarn run solcjs contracts/"$1".sol --bin --base-path node_modules -o soldata/bin
