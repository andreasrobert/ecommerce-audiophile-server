import jwt from 'jsonwebtoken';
import cookie from "cookie";


export default function (req:any, res:any, next:any) {

    
    const cookies = cookie.parse(req.headers.cookie);
    const token = cookies.token;  //test

    if(!token){
        return res.status(401).send("Access Denied");
    }

    try{
        // console.log("hello -> " + `${process.env.TOKEN_SECRET}`)
        const verified = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
        req.user = verified;

        // console.log(verified)
        res.json({ result: true });
        // res.status(100).send(JSON.stringify({ result: true }))
        next();
    } catch(error){
        res.status(400).send("Invalid token");
    }
};