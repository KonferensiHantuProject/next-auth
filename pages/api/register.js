import { prisma } from "@/config/db";
import bcrypt, { hash } from 'bcryptjs';

export default async function handler(req, res){

    switch(req.method){

        case "POST" :
            return await regis(req, res);
    }
}

// Post
const regis = async(req, res) => {
    try{
        const {name, email, password} = req.body;

        // Hashed Pass
        const hashed = await bcrypt.hash(password, 10);

        // Prepare Data
        const data = {
            name: name,
            email: email,
            password: hashed,
        }

        // Create
        const result = await prisma.regist.create({
            data: data,
            select: {
                id: true
            }
        })
        
        return res.status(200).json({...result, name, email})
    } catch(error){
        console.log(error)
        return res.status(500).json({ message: 'Error' })
    }
}