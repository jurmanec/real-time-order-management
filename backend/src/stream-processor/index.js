// p0-backend/stream-processor/index.js
const { ApiGatewayManagementApiClient, PostToConnectionCommand } = require('@aws-sdk/client-apigatewaymanagementapi');
const { DynamoDBClient, DeleteItemCommand} = require('@aws-sdk/client-dynamodb');
const { ScanCommand } = require('@aws-sdk/lib-dynamodb');
const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const stage = process.env.STAGE;

exports.handler = async (event) => {
  try {
    const apiClient = new ApiGatewayManagementApiClient({
      endpoint: `https://rgq4ifvq92.execute-api.us-east-1.amazonaws.com/dev`,
    });
    // Fetch all connection IDs
    const scanCommand = new ScanCommand({ TableName: `Connections-${stage}` });
    const scanResponse = await client.send(scanCommand);
    const connectionIds = scanResponse.Items.map(item => item.connectionId);

    for (const record of event.Records) {
      if (record.eventName === 'MODIFY') {
        const newImage = record.dynamodb.NewImage;
        const data = {
          order_id: newImage.order_id.S,
          status: newImage.status.S,
        };
        for (const connectionId of connectionIds) {
          try {
            const command = new PostToConnectionCommand({
              ConnectionId: connectionId,
              Data: JSON.stringify(data),
            });
            await apiClient.send(command);
          } catch (error) {
            console.error('Error sending to connection:', connectionId, error);
            // Optional: Remove stale connection
            const deleteCommand = new DeleteItemCommand({
              TableName: 'Connections',
              Key: { connectionId: { S: connectionId } },
            });
            await client.send(deleteCommand);
          }
        }
      }
    }
    return { statusCode: 200 };
  } catch (error) {
    console.error(error);
    return { statusCode: 500 };
  }
};