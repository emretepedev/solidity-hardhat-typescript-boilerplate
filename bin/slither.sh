#!/bin/bash

slither contracts/"$1".sol --solc-remaps @openzeppelin=node_modules/@openzeppelin --filter-paths node_modules
