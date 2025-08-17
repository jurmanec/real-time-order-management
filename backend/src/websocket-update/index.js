const { ApiGatewayManagementApiClient, PostToConnectionCommand } = require('@aws-sdk/client-apigatewaymanagementapi');

exports.handler = async (event) => {
  try {
    const connectionId = event.requestContext.connectionId;
    const domainName = event.requestContext.domainName;
    const stage = event.requestContext.stage;
    const client = new ApiGatewayManagementApiClient({
      endpoint: `https://${domainName}/${stage}`,
    });
    const data = JSON.parse(event.body || '{}'); // Example: { order_id: 'ord123', status: 'Processed' }
    const command = new PostToConnectionCommand({
      ConnectionId: connectionId,
      Data: JSON.stringify(data),
    });
    await client.send(command);
    return { statusCode: 200, body: 'Update sent' };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: 'Failed to send update' };
  }
};