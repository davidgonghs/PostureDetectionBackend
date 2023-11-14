export const createResponse = (status: number, message: string, data?: any, headers?: Record<string, string>) => ({
  statusCode: status,
  body: JSON.stringify({
    status,
    message,
    data: data || "",
  }),
  headers: {
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    "Access-Control-Allow-Credentials": true,
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "https://admin.posturedetection.com, http://admin.posturedetection.com",
    ...headers,
  },
});
