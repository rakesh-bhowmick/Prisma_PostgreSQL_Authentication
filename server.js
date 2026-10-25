import "dotenv/config";
import express from "express";
import routes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// connect routes
app.use(routes);

app.get("/", (req, res) => {
  console.log("Prisma Auth Backend connacted successfully");
  return res.send("Prisma Auth Backend connacted successfully");
});

app.listen(PORT, () => {
  console.log(`Server runing at ${PORT}`);
});
