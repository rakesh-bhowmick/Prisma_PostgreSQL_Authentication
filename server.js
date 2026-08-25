import "dotenv/config";
import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  console.log("Backend connacted successfully");
  return res.send("Backend connacted successfully");
});

app.listen(PORT, () => {
  console.log(`Server runing at ${PORT}`);
});
