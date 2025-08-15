const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');
// const { PutItemCommand } = require('@aws-sdk/lib-dynamodb');
const client = new DynamoDBClient({ region: process.env.AWS_REGION });

exports.handler = async (event) => {
  try {
    console.log(`${JSON.stringify(event)}`)
    const connectionId = event.requestContext.connectionId;
    const command = new PutItemCommand({
      TableName: 'Connections',
      Item: { connectionId: { S: connectionId } },
    });
    await client.send(command);
    return { statusCode: 200, body: 'Connected' };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: 'Failed to connect' };
  }
};