exports.lambdaHandler = async (event) => {
  // TODO implement
  const response = {
      statusCode: 200,
      body: JSON.stringify('Hello from Books lambda!'),
      headers: {
          'Content-Type': 'application/json'    
      }
  };
  return response;
};
