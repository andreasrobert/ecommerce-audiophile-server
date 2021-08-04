import express from 'express';
import auth from './auth';
import verify from './verifyToken';
import Product from "./models/product";
import User from "./models/user";
import UserAddress from "./models/userAddress"
import UserCart from "./models/userCart";

const router = express.Router();

router.get('/', (_,res) =>{
    res.send("hello there");
})

router.get('/admin', verify)
router.post('/admin/login', auth)

router.post('/checkout', async ( req, res) => {
    const user = new User({
        username: req.body.data.name,
        email: req.body.data.email,
        phone: req.body.data.phone
    });

    try{
        await user.save();
        const userAddress = new UserAddress({
            userId: user._id,
            address: req.body.data.address,
            zipCode: req.body.data.zipCode,
            city: req.body.data.city,
            country: req.body.data.country
        });
        await userAddress.save()

        const userCart = new UserCart({
            userId: user._id,
            order: req.body.products
        });

        await userCart.save()
        res.json({ 'redirectUrl': 'http://localhost:3000/checkout?foo=success' })
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post('/checkout/product', async ( req, res) => {
    const userCart = new UserCart({
        userId: req.body,
        order: req.body
    });

    try{
        await userCart.save()
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/admin/products', (_,res) =>{
    console.log("hello")
    Product.find({}, ( _err, products) => {
        res.send({ Products: products })
    });
})

export default router;
