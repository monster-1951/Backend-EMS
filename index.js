import express from "express";
import "dotenv/config";
import { connectDB } from "./Database/ConnectDB.js";
import cors from "cors";
import { AuthRouter } from "./Routes/AuthRoutes.js";
import cookieParser from "cookie-parser";
import { CRUDRouter } from "./Routes/CRUDRoutes.js";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173","https://ems9.netlify.app"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/auth", AuthRouter);
app.use("/CRUD", CRUDRouter);
const PORT = process.env.PORT || 3000;

connectDB(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
