#!/bin/bash

# shellcheck disable=SC1072

if [ ! "$1" ]; then
  echo "Network name must be given." 1>&2

  exit 0
fi

if [ ! "$2" ]; then
  echo "Deployed Contract Address must be given." 1>&2

  exit 0
fi

# shellcheck disable=SC2086
yarn run hardhat verify --network "$1" "$2" $3
# shellcheck enable=SC2086
