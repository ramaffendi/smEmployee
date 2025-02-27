import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./Register.css"; // Import CSS

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin] = useState(false); // Default Employee (false)
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          name,
          username,
          password,
          isAdmin, // Kirim isAdmin ke backend
        }
      );

      console.log("Response dari server:", response.data); // Debugging
      Swal.fire("Success", "Registrasi berhasil!", "success").then(() => {
        navigate("/login"); // Redirect ke halaman login setelah sukses
      });
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Registrasi gagal!",
        "error"
      );
    }
  };

  return (
    <div className="register-container">
      <h2>Register User</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <input
          type="text"
          className="register-input"
          placeholder="Nama Lengkap"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          className="register-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          className="register-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="register-button">
          Register
        </button>
      </form>

      <p>
        Sudah punya akun?{" "}
        <span className="register-link" onClick={() => navigate("/login")}>
          Login di sini
        </span>
      </p>
    </div>
  );
};

export default RegisterPage;
