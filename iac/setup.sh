#!/bin/sh


# Create

# Orders
# aws dynamodb create-table \
#     --table-name Orders \
#     --attribute-definitions \
#         AttributeName=order_id,AttributeType=S \
#         AttributeName=status,AttributeType=S \
#     --key-schema AttributeName=order_id,KeyType=HASH \
#     --global-secondary-indexes \
#         "[{
#         \"IndexName\": \"StatusIndex\",
#         \"KeySchema\": [{\"AttributeName\": \"status\", \"KeyType\": \"HASH\"}],
#         \"Projection\": {\"ProjectionType\": \"ALL\"}
#         }]" \
#     --stream-specification StreamEnabled=true,StreamViewType=NEW_AND_OLD_IMAGES \
#     --billing-mode PAY_PER_REQUEST

# Inventory
# aws dynamodb create-table \
#   --table-name Inventory \
#   --attribute-definitions AttributeName=product_id,AttributeType=S \
#   --key-schema AttributeName=product_id,KeyType=HASH \
#   --billing-mode PAY_PER_REQUEST

# Connections
# aws dynamodb create-table \
#   --table-name Connections \
#   --attribute-definitions AttributeName=connectionId,AttributeType=S \
#   --key-schema AttributeName=connectionId,KeyType=HASH \
#   --billing-mode PAY_PER_REQUEST

# Seed tables

# Remove BOM from JSON file if it exists
# aws dynamodb batch-write-item --request-items file://data/orders.json
# aws dynamodb batch-write-item --request-items file://data/inventory.json

# Delete

# aws dynamodb delete-table --table-name Orders
# aws dynamodb delete-table --table-name Inventory

echo "Done"