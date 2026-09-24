import jwt  from 'jsonwebtoken';


const generateToken = (user)=>{
const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JwT_EXPIRATION || "3h"
})


return token
}

export default generateToken
