#!/bin/bash

if [ ! -d "solbin/" ]; then
  mkdir solbin/
fi

if [ ! -d "solbin/flatten/" ]; then
  mkdir solbin/flatten/
fi

yarn run hardhat flatten contracts/"$1".sol >>solbin/flatten/"$1Flatten".sol

echo "export solbin/flatten/$1Flatten.sol"
