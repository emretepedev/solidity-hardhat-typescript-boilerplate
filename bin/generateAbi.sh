#!/bin/bash

yarn run solcjs contracts/"$1".sol --abi --base-path node_modules --include-path node_modules --output-dir solbin/abi
