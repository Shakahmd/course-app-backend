import jwt from 'jsonwebtoken'

export const jwtAuthentication = async (req,res,next) =>{
        try {
           const authHeader = req.headers.authorization
           if(!authHeader || !authHeader.startsWith("Bearer ")){
              res.status(403).json({message:"Authentication header missing or invalid"})
              throw new Error("No authentication header found")
           }
           const token = authHeader.split(' ')[1]
           const verify = jwt.verify(token,process.env.SECRET)
           req.user = verify.id
           next()
            
        } catch (error) {
             console.log(error)
             res.status(500).json({message:error.message})
        }
}