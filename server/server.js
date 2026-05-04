import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/student.routes.js";

const app = express();

app.use(
  cors({
    origin: "*", 
  })
);
app.use(express.json());

connectDB();

// routes
app.use("/students", studentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});