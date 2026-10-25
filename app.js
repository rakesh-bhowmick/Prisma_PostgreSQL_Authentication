import "dotenv/config";
import express from "express";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());

// connect routes
app.use(routes);

app.get("/", (req, res) => {
  console.log("Prisma Auth Backend connacted successfully");
  return res.send("Prisma Auth Backend connacted successfully");
});

export default app;
