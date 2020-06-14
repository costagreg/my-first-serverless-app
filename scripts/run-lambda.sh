#!/bin/sh
export $(egrep -v '^#' .env | xargs)

read -p "Local/Prod lambda env[local]:" lambdaenv
lambdaenv=${lambdaenv:-local}


dir=$(pwd)
# Build bundles for lambda functions
cd ${dir}/backend/ && npm run lambda:dev
cd ${dir}/frontend/ && npm run lambda:dev


# Upload assets to S3
aws s3 cp ${dir}/frontend/dist/assets s3://$S3_BUILD_URL/$lambdaenv/assets/ --recursive --acl public-read

cd ${dir}

sam build

if [ $lambdaenv = "prod" ]; then
  sam deploy
else
  sam local start-api
fi
