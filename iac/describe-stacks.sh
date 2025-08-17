#!/bin/sh
env=dev
backend=order-management-dashboard-backend
# API URL
# aws cloudformation describe-stacks --stack-name $backend-$env --query 'Stacks[0].Outputs[?OutputKey==`ServiceEndpoint`].OutputValue' --output text
# # WebSocket URL
# aws cloudformation describe-stacks --stack-name $backend-$env --query 'Stacks[0].Outputs[?OutputKey==`ServiceEndpointWebsocket`].OutputValue' --output text

export API_URL=$(aws cloudformation describe-stacks --stack-name $backend-$env --query 'Stacks[0].Outputs[?OutputKey==`ServiceEndpoint`].OutputValue' --output text)
export WEBSOCKET_URL=$(aws cloudformation describe-stacks --stack-name $backend-$env --query 'Stacks[0].Outputs[?OutputKey==`ServiceEndpointWebsocket`].OutputValue' --output text)
echo "NEXT_PUBLIC_API_URL=$API_URL/orders" >> .env.production
echo "NEXT_PUBLIC_WEBSOCKET_URL=$API_URL" >> .env.production

