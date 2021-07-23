import express from 'express';
// import mongoose from 'mongoose';
// import jwt from 'jsonwebtoken';
// import auth from './auth';
// import verify from './verifyToken';


const router = express.Router();

router.get('/', (_,res) =>{
    res.send("hello there");
})



export default router;
