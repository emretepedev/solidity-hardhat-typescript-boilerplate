#!/bin/bash

sudo apt update
sudo apt-get -y install libssl-dev python3-dev python3-pip

# Install Solc Select
pip3 install solc-select

# Install Slither
pip3 install slither-analyzer

# Detect Solc version
svm
