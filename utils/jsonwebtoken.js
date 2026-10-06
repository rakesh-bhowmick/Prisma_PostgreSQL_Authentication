import jwt from "jsonwebtoken";

const generateToken = (user, res) => {
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JwT_EXPIRATION || "3h",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 2,
  });

  return token;
};

export default generateToken;
