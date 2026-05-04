import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/student.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// routes
app.use("/students", studentRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});