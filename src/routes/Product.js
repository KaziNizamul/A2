const express = require('express');
const {
  storeProducts,
  listProducts,
} = require('../controllers/Product');

/* init router */
const router = express.Router();

router
  .post('/store-products', storeProducts)
  .get('/list-products', listProducts);

exports.router = router;