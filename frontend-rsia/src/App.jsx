import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Homes";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/loginPage/Login";
import EditEmployee from "./component/PutEmployee";
import InputEmployee from "./component/InputEmployee";
import Navbar from "./component/Navbar";
import { useEffect, useState } from "react";
import RegisterPage from "./pages/Register/RegisterPage";
import AdminPanel from "./component/AdminPanel";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser.user || parsedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router basename="/home">
      {" "}
      {/* ✅ Mengubah basename menjadi "/home" */}
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/employees/edit/:id"
          element={user ? <EditEmployee /> : <Navigate to="/" />}
        />
        <Route
          path="/employees/new"
          element={user?.isAdmin ? <InputEmployee /> : <Navigate to="/" />}
        />

        <Route
          path="/dashboard"
          element={user?.isAdmin ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/admin-panel"
          element={user?.isAdmin ? <AdminPanel /> : <Navigate to="/" />}
        />

        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default App;
