import dotenv from "dotenv";
dotenv.config(); // Load .env lebih awal sebelum variabel digunakan

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
const PORT = process.env.PORT || 8080; // Gunakan dari .env jika ada
const MONGO_URI = process.env.MONGO_URI; // Ambil dari .env

if (!MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI belum diatur di .env");
  process.exit(1); // Hentikan server jika tidak ada koneksi ke MongoDB
}

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,PUT,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());

// Session dengan MongoDB Store
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URI }),
    cookie: { secure: process.env.NODE_ENV === "production" }, // true jika pakai HTTPS
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
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // Tambahkan opsi agar lebih stabil
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Hentikan server jika gagal koneksi
  });

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
