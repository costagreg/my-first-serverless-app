#!/bin/sh
export $(egrep -v '^#' .env | xargs)

dir=$(pwd)
# Build bundles for lambda functions
cd ${dir}/backend/ && npm run lambda:dev
cd ${dir}/frontend/ && npm run lambda:dev

# Upload assets to S3
aws s3 cp ${dir}/frontend/dist/assets s3://$S3_BUILD_URL/development/assets/ --recursive --acl public-read

cd ${dir}

sam build
sam local start-api