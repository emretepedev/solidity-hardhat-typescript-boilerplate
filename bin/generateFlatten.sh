#!/bin/bash

if [ ! "$1" ]; then
  echo "Contract name must be given." 1>&2

  exit 0
fi

if [ ! -d "soldata/flatten/" ]; then
  mkdir soldata/flatten/ -pv
fi

slither-flat --contract "$1" contracts/"$1".sol --strategy OneFile --solc-remaps '@openzeppelin/=node_modules/@openzeppelin/ hardhat/=node_modules/hardhat/' --dir soldata/flatten/
