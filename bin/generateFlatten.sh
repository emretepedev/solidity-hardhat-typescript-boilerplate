#!/bin/bash

if [ ! "$1" ]; then
  echo "Contract name must be given." 1>&2

  exit 0
fi

if [ ! -d "solbin/flatten/" ]; then
  mkdir solbin/flatten/ -pv
fi

yarn run hardhat flatten contracts/"$1".sol >>solbin/flatten/"$1Flatten".sol

echo "export solbin/flatten/$1Flatten.sol"
