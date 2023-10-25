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

        console.log(name)
        console.log(email)
        console.log(password)
        
        return res.status(200).json({ message: 'Berhasil' })
    } catch(error){
        return res.status(500).json({ message: 'Error' })
    }
}