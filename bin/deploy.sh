#!/bin/bash

if [ ! "$1" ]; then
  echo "Network name must be given." 1>&2

  exit 0
fi

if [ ! "$2" ]; then
  echo "Deploy script must be given." 1>&2

  exit 0
fi

yarn run hardhat run --network "$1" "$2"
