import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admins from "./models/admins";

export default async function (req:any, res:any) {

    const admin = await Admins.find({})

    let validPassword = await bcrypt.compare(req.body.password, (admin as any)[0].password);
    if(!validPassword){
        validPassword = await bcrypt.compare(req.body.password, (admin as any)[1].password);
        if(!validPassword){
            return res.status(400).send("Incorrect Password");
        }      
    }

    try{
        const token = jwt.sign({_id: admin._id}, `${process.env.TOKEN_SECRET}` ,{ expiresIn: '500s' });
        res.json({ token: token });
    } catch(error){
        res.status(500).send(error);
    }

    return;
}
