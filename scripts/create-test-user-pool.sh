
# aws cognito-idp list-user-pools --max-results 10

# TO-DO: Add varification email
# TO-DO: Attach presigned trigger lambda function
# aws cognito-idp create-user-pool --pool-name LocalDevTest --schema Name=email,Required=true 

# To get dynamically user-pool-id

# aws cognito-idp create-user-pool-client --user-pool-id us-east-1_dHAggSGT3 --client-name LocalDevTest

# aws cognito-identity create-identity-pool --identity-pool-name IdentityPoolLocalTest --cognito-identity-providers ProviderName="cognito-idp.us-east-1.amazonaws.com/us-east-1_dHAggSGT3",ClientId="5km6hpf7rbipk7aobf0srp38v8",ServerSideTokenCheck=false --no-allow-unauthenticated-identities