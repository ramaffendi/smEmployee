import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./Login.css";

const API_URL = import.meta.env.VITE_API_URL; // Simpan dulu

const LoginPage = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/login`, // Pakai variabel
        { username, password },
        { withCredentials: true }
      );

      console.log("✅ Login berhasil, Data user:", response.data);
      const userData = response.data.user;

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      Swal.fire({
        icon: "success",
        title: "Login Berhasil!",
        text: `Selamat datang, ${userData.username}!`,
      }).then(() => {
        navigate(userData.isAdmin ? "/dashboard" : "/");
      });
    } catch (error) {
      console.error("❌ Error saat login:", error.response?.data || error);

      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text:
          error.response?.data?.message ||
          "Periksa kembali username & password.",
      });
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <p>
        Belum punya akun?{" "}
        <button
          onClick={() => navigate("/register")}
          className="register-button"
        >
          Daftar sebagai Admin
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
