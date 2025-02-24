import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";

import employeeRoutes from "./routes/employeeRoute.js";
import unitRoutes from "./routes/unitRoute.js";
import positionRoutes from "./routes/position.js";
import authRoutes from "./routes/authRoute.js";
import dashboardRoutes from "./routes/dashboard.js";

const app = express();
const PORT = 8080;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Sesuaikan dengan frontend
    methods: "GET,PUT,POST,DELETE",
    credentials: true, // Izinkan pengiriman cookie atau header authorization
  })
); // ⬅️ Pastikan `withCredentials` bisa dipakai
app.use(express.json());

// Tambahkan session middleware dengan MongoDB Store
app.use(
  session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://ramadhan:12345@cluster0.pbcfv.mongodb.net/rsiadb?retryWrites=true&w=majority", // Ganti dengan URL MongoDB Atlas kamu
    }),
    cookie: { secure: true }, // Ubah jadi `true` jika pakai HTTPS
  })
);

// Routes
app.use("/api/employees", employeeRoutes);
app.use("/api/units", unitRoutes);
app.use("/api/positions", positionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://ramadhan:12345@cluster0.pbcfv.mongodb.net/rsiadb?retryWrites=true&w=majority"
  ) // URL MongoDB Atlas kamu
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
