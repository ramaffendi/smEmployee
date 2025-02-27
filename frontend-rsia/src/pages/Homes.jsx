import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import "./AllCss/Home.css";
import IconEmployee from "../assets/icons8-conference-100.png"; // ✅ Import gambar

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <span className="highlight">#Transformasi Digital RSIA</span>
        <h1 className="welcome-text">
          Kelola Data Karyawan dengan <br />
          <span className="brand-name">Mudah & Efisien</span>
        </h1>
        <p className="description">
          Optimalkan pengelolaan sumber daya manusia di RSIA Anda dengan sistem
          manajemen yang modern dan terintegrasi. Hemat waktu, tingkatkan
          akurasi, dan buat keputusan lebih cerdas.
        </p>
        <button className="start-btn" onClick={() => navigate("/dashboard")}>
          Mulai Sekarang <FaArrowRight className="icon" />
        </button>
      </div>
      <div className="home-image">
        {/* Gunakan gambar dari import */}
        <img src={IconEmployee} alt="Employee Icon" className="fade-in" />
      </div>
    </div>
  );
};

export default Home;
