docker run -p 8000:8000 amazon/dynamodb-local & 
aws dynamodb create-table --cli-input-json file://scripts/dynamodb-tables.json --endpoint-url http://localhost:8000