FROM --platform=linux/amd64 ubuntu:focal

WORKDIR /labs

COPY . /labs/

RUN apt-get update
RUN apt-get install -y libssl-dev python3-dev python3-pip
RUN pip3 install solc-select slither-analyzer mythril
RUN bin/svm
