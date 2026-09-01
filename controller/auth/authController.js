import prisma from "../../db/db.config.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.User.findInique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already Exist." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
