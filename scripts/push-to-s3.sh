#!/bin/sh

export $(egrep -v '^#' .env | xargs)

aws s3 cp dist/assets s3://$S3_BUILD_URL/$NODE_ENV/assets/ --recursive --acl public-read
