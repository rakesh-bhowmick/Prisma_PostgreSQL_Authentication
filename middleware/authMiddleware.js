import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // Read authorization header from request
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ status: "error", message: "Unauthorized" });
    }

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
      return res.status(401).json({
        status: "error",
        message: "Invalid authorization format",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decode;

    if (!decode) {
      return res.status(401).json({
        status: "error",
        message: "Invalid User",
      });
    }

    next();
  } catch (error) {
    res.status(401).json({
      status: error,
      message: "Invalid or Expired token",
    });
  }
};

export { authMiddleware };
