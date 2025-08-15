const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { QueryCommand, ScanCommand, DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  try {
    const searchTerm = event.queryStringParameters?.search || "";
    let response;

    if (searchTerm.startsWith("ord")) {
      // Search by order_id (primary key)
      const command = new GetItemCommand({
        TableName: "Orders",
        Key: { order_id: { S: searchTerm } },
      });
      response = await client.send(command);
      return {
        statusCode: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify(response.Item ? [unmarshall(response.Item)] : []),
      };
    } else if (searchTerm) {
      // Search by status (GSI)
      const command = new QueryCommand({
        TableName: "Orders",
        IndexName: "StatusIndex",
        KeyConditionExpression: "#pk = :pkVal",
        ExpressionAttributeNames: { "#pk": "status" },
        ExpressionAttributeValues: { ":pkVal": searchTerm },
      });
      response = await ddbDocClient.send(command);
      return {
        statusCode: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify(response.Items),
      };
    } else {
      // No search term, return all orders
      const command = new ScanCommand({ TableName: "Orders" });
      response = await client.send(command);
      return {
        statusCode: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify(response.Items),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Failed to fetch orders" }),
    };
  }
};
