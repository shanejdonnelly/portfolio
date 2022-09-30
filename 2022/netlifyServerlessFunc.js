const axios = require('axios')

exports.handler = async (event, context) => {
  let response
  try {
    const productId = event.queryStringParameters.productId
    response = await axios.get(`https://api.bigcommerce.com/stores/t1qdrdq/v3/catalog/products/${productId}/variants?limit=250&include_fields=inventory_level`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Auth-Token': process.env.BC_API_KEY,
      }
    })
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response.data),
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}
