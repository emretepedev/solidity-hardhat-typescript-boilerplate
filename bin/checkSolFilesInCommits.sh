#!/bin/bash

git format-patch --stdout origin/"$(git branch --show-current)" | grep "\.sol$"
