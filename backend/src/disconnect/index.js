const { DynamoDBClient, DeleteItemCommand} = require('@aws-sdk/client-dynamodb');
const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const stage = process.env.STAGE;

exports.handler = async (event) => {
  try {
    const connectionId = event.requestContext.connectionId;
    const command = new DeleteItemCommand({
      TableName: `Connections-${stage}`,
      Key: { connectionId: { S: connectionId } },
    });
    await client.send(command);
    return { statusCode: 200, body: 'Disconnected' };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: 'Failed to disconnect' };
  }
};