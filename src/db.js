import mongoose from "mongoose";

mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

db.on("error", (error) => console.log("❌ DB Error"));
db.once("open", (open) => console.log("✅ Connected to DB"));
