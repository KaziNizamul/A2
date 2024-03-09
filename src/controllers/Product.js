const mysql = require('mysql');
const dbConnection = require('../core/config')

exports.storeProducts = async (req, resp) => {
  console.log('store');
  let connection = dbConnection.config();
  
  console.log({ connection });
  const products = req.body.products;

  if (!products.length) {
    respHandler(resp, 400, { error: 'Invalid body' })
  }

  try {
    const insertQuery = 'INSERT INTO products (name, price, availability) VALUES (?, ?, ?)';
    for (const prod of products) {
      await new Promise((resolve, reject) => {
        connection.query(insertQuery, [prod.name, prod.price, prod.availability], (err) => {
          if (err) {
            console.error('Error executing insert query: ', err);
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }
    console.log('Products inserted successfully');
    respHandler(resp, 200, { message: 'Success.' });
  } catch(error) {
    respHandler(resp, 500, { error: 'Internal server error' });
  }
};

exports.listProducts = async (_, resp) => {
  console.log('list');

  let connection = dbConnection.config();
  console.log({ connection })


  const selectQuery = 'SELECT * FROM products';

  connection.query(selectQuery, (err, responses) => {
    if (err) {
      console.error('err: ', err);
      respHandler(resp, 500, { error: 'Internal server error' })
    }

    const modifiedResponse = responses.map(product => ({
      name: product.name,
      price: product.price,
      availability: !!product.availability 
    }));

    respHandler(resp, 200, { products: modifiedResponse })
  })
};

const respHandler = (
  resp,
  statusCode,
  message,
) => {
  return resp.status(statusCode).json(message);
}