const express = require('express');
const router = express.Router();
const path = require('path');
const adminController = require('../controllers/admin');




router.get('/add-product',adminController.getAddProducts);

router.post('/add-product',adminController.postAddProducts);


router.get('/products/:productid',adminController.getEditProducts);

router.post('/products',adminController.postEditProducts);

router.get('/products',adminController.getProducts);

router.post('/delete-product',adminController.postDeleteProduct);


exports.routes = router;
