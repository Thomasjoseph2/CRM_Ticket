import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import connectDB from "./config/db.js";
// import apiRateLimiter from "./config/api-rate-limiter.js";
// import apiSpeedLimiter from "./config/api-speed-limiter.js";
import v1apis from "./routes/v1apis.js";
import path from "path";

dotenv.config();
connectDB();

const app = express();
// app.set("trust proxy", true); // Set trust proxy here

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "https://crm-ticket-fzfl.onrender.com" }));
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));


// app.use(apiRateLimiter);
// app.use(apiSpeedLimiter);

app.use("/api/v1", v1apis);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Server is ready"));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
