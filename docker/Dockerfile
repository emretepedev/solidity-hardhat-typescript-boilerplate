FROM --platform=linux/amd64 rust:1.83.0-bullseye

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /labs

RUN apt-get update && apt-get install -y \
  --no-install-recommends \
  libssl-dev \
  python3.9 \
  python3.9-dev \
  python3-pip \
  build-essential \
  pkg-config

RUN update-alternatives --install /usr/bin/python python /usr/bin/python3.9 1
RUN pip3 install --upgrade pip==24.3.1

RUN pip3 install --use-deprecated=legacy-resolver virtualenv pipenv solc-select==1.0.4 slither-analyzer==0.10.4

COPY docker/Pipfile docker/Pipfile.lock ./
RUN pipenv install --deploy --ignore-pipfile

COPY bin/svm bin/svm
COPY .svmrc .
RUN bin/svm
