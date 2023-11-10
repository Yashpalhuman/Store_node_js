const path=require('path');

const express=require('express');


// const mainDir=require('../util/path');
const shopController=require('../controller/shop');


const shop=express.Router();

// shop.use(adminData.products);


shop.get('/',shopController.getIndex);

shop.get('/products',shopController.getProducts);
// // use dynamic route first
shop.get('/products/:productId',shopController.getProduct);// this is a dynamic route
shop.get('/cart',shopController.getCart);
shop.post('/cart',shopController.postCart);
shop.post('/cart-delete-item',shopController.postCartDeleteProduct);

shop.post('/create-order',shopController.postOrder);
shop.get('/orders',shopController.getOrders);

module.exports=shop;