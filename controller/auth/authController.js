import {prisma} from "../../db/db.config.js";
import bcrypt from "bcrypt"

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already Exist." });
    }



// hash password 
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds)
const hashPassword = bcrypt.hashSync(password, salt);



const user = await prisma.user.create({
  
  data : {
     name, email, password: hashPassword
  }
})


res.status(201).json({
  status: "success",  
  data: user
})

  } catch (error) {
    return res.status(500).json({ status : "error", message: "Internal Server Error" });
  }
};




const loginUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {



    const existingUser = await prisma.user.findUnique({
      where:{
        email: email
      }
    })


if(!existingUser){
  return res.status(404).json({ error : "error", message: "User not found" });
}


const verifyPassword = await bcrypt.compare(password, existingUser.password )

if (!verifyPassword) {
  return res.status(401).json({ error: "error", message: "Invalid password" });
}


return res.status(200).json({ 
  status: "success",
  data : existingUser,
  message: "Login successful"
 });


  
  } catch (error) {
    
return res.status(500).json({ status: "error", message : "Internal server error"})
  }
}


export { registerUser, loginUser };