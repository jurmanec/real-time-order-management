const { DynamoDBClient, UpdateItemCommand } = require('@aws-sdk/client-dynamodb');
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const ordersTable= process.env.ORDERS_TABLE;

exports.handler = async (event) => {
  try {
    const order_id = event.pathParameters.order_id;
    const status = JSON.parse(event.body).status;
    const command = new UpdateItemCommand({
      TableName: ordersTable,
      Key: { order_id: { S: order_id } },
      UpdateExpression: 'SET #status = :status',
      ExpressionAttributeNames: { '#status': 'status' },
      ExpressionAttributeValues: { ':status': { S: status } },
      ReturnValues: 'UPDATED_NEW',
    });
    const response = await client.send(command);
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(unmarshall(response.Attributes)),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Failed to update order' }),
    };
  }
};