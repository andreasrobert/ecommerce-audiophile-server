import express from 'express';
// import mongoose from 'mongoose';
// import jwt from 'jsonwebtoken';
import auth from './auth';
import verify from './verifyToken';
import Product from "./models/product";


const router = express.Router();
router.get('/admin', verify)

router.get('/', (_,res) =>{
    res.send("hello there");
})


router.post('/checkout', auth)
router.post('/checkout/product', auth)

router.post('/admin/login', auth)


router.get('/admin/products', (_,res) =>{
    console.log("hello")
    Product.find({}, ( _err, products) => {
        res.send({ Products: products })
    });
})

export default router;
