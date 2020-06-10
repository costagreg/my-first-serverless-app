#!/bin/sh

# dir=$(pwd)

# Build bundles for lambda functions
cd ${dir}/backend/ && npm run dev &
cd ${dir}/frontend/ && npm run dev