#!/bin/bash

NAMESPACE=$1
if [ -z "$1" ]; then
    NAMESPACE="hotelup"
fi
SCRIPT_DIR="$(dirname "$(realpath "$0")")"

cat << EOF | kubectl apply -f -
    apiVersion: v1
    kind: Secret
    metadata:
        name: frontend-secret
        namespace: ${NAMESPACE}
    type: Opaque
    data:
        COGNITO_AUTHORITY: $(echo -n "`aws ssm get-parameter --name /HotelUp.Frontend/Production/Oidc/CognitoAuthority --with-decrypt --output text --profile wiaz --region us-east-1 --query Parameter.Value`" | base64 -w0)
        COGNITO_CLIENT: $(echo -n "`aws ssm get-parameter --name /HotelUp.Frontend/Production/Oidc/ClientId --with-decrypt --output text --profile wiaz --region us-east-1 --query Parameter.Value`" | base64 -w0)
        COGNITO_DOMAIN: $(echo -n "`aws ssm get-parameter --name /HotelUp.Frontend/Production/Oidc/CognitoDomain --with-decrypt --output text --profile wiaz --region us-east-1 --query Parameter.Value`" | base64 -w0)
        BACKEND_URL: $(echo -n "`aws ssm get-parameter --name /HotelUp.Frontend/Production/BackendUrl --with-decrypt --output text --profile wiaz --region us-east-1 --query Parameter.Value`" | base64 -w0)
        LOGOUT_URI: $(echo -n "`aws ssm get-parameter --name /HotelUp.Frontend/Production/LogoutUrl --with-decrypt --output text --profile wiaz --region us-east-1 --query Parameter.Value`" | base64 -w0)
        REDIRECT_URI: $(echo -n "`aws ssm get-parameter --name /HotelUp.Frontend/Production/RedirectUrl --with-decrypt --output text --profile wiaz --region us-east-1 --query Parameter.Value`" | base64 -w0)
EOF