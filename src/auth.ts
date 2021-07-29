import express from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "./models/user";
import Admins from "./models/admins";
import UserAddress from "./models/userAddress"
import UserCart from "./models/userCart";

const router = express.Router();

router.post('/checkout', async ( req, res) => {
    // console.log(req.body.products)

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
        // res.redirect("http://localhost:3000/checkout?foo=success");

    } catch (error) {
        res.status(500).send(error);
    }
    
})

router.post('/checkout/product', async ( req, res) => {
    // console.log(req.body);

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

router.post('/admin/login', async ( req, res) => {

    // const admin = await Admins.findOne({username: req.body.username})

    // if(!admin) {
    //     return res.status(400).send("Incorrect User"); 
    // }

    const admin = await Admins.find({})

    // console.log(req.body)

    let validPassword = await bcrypt.compare(req.body.password, (admin as any)[0].password);
    if(!validPassword){
        validPassword = await bcrypt.compare(req.body.password, (admin as any)[1].password);
        if(!validPassword){
            return res.status(400).send("Incorrect Password");
        }      
    }

    try{

        const token = jwt.sign({_id: admin._id}, `${process.env.TOKEN_SECRET}` ,{ expiresIn: '400s' });
        // res.header("auth-token", token).send(token);
        const expiryTime = new Date((new Date()).getTime() + 400*1000);
        res.cookie('token', token, {httpOnly: true, expires: expiryTime, domain: 'ecommerce-audiophile.netlify.app' });
        res.redirect("https://ecommerce-audiophile.netlify.app/admin");
    } catch(error){
        res.status(500).send(error);
    }

    return;
})


export default router;