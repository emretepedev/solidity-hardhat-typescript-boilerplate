#!/bin/bash

if [ ! -d solbin/flatten/ ]; then
  mkdir solbin/flatten/ -pv
fi

yarn run hardhat flatten contracts/"$1".sol >>solbin/flatten/"$1Flatten".sol

echo "export solbin/flatten/$1Flatten.sol"
