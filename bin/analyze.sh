#!/bin/bash

if [ ! "$1" ]; then
  echo "Contract must be given." 1>&2

  exit 0
fi

yarn run analyze:static "$1"
yarn run analyze:security "$1"
