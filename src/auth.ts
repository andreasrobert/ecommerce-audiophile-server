import express from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "./models/user";
import Admins from "./models/admins";

const router = express.Router();

router.post('/checkout', async ( req, res) => {
    const user = new User({
        username: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
    });

    try{
        await user.save();
        res.redirect("http://localhost:3000/checkout?foo=success");
    } catch (error) {
        res.status(500).send(error);
    }
    console.log(req.body)
    
})

router.post('/admin/login', async ( req, res) => {
    const admin = await Admins.findOne({username: req.body.username})

    // const test = await Admins.find()
    console.log(req.body)
    if(!admin) {
        return res.status(400).send("Incorrect User"); 
    }

    const validPassword = await bcrypt.compare(req.body.password, (admin as any).password);
    if(!validPassword){
        return res.status(400).send("Incorrect Password");
    }

    try{
        const token = jwt.sign({_id: admin._id}, `${process.env.TOKEN_SECRET}` ,{ expiresIn: '400s' });
        // res.header("auth-token", token).send(token);
        const expiryTime = new Date((new Date()).getTime() + 400*1000);
        res.cookie('token', token, {httpOnly: true, expires: expiryTime });
        res.redirect("/http://localhost:3000/admin");
    } catch(error){
        res.status(500).send(error);
    }
    return
})


export default router;