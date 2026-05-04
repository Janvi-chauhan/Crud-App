import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://janvichauhan1223_db_user:Z7apGlSm4ZFXtlzF@cluster0.fnuvjf1.mongodb.net/?appName=Cluster0");
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;