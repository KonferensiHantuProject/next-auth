import { prisma } from "@/config/db";

export default async function handler(req, res){

    switch(req.method){

        case "POST" :
            return await find(req, res);
    }
}

// Post
const find = async(req, res) => {
    try{
        const {email} = req.body;

        const result = await prisma.regist.findFirst({
            where: {
                email: {
                    equals: email
                }
            }
        })

        return res.status(200).json(result)
    } catch(error){
        console.log(error)
        return res.status(500).json({ message: 'Error' })
    }
}