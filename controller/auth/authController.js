import {prisma} from "../../db/db.config.js";
import bcrypt from "bcrypt"

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.User.findUnique({
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
  status: success,  
  data: user
})

  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



export { registerUser };