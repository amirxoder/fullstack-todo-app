import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todo.routes";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);
// Global Error Handler
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
