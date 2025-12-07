
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow">
    
      <Link className="navbar-brand d-flex align-items-center" to="/">
  <img
    src={logo}
    alt="Lee Lab Logo"
    style={{ height: "40px" }}
  />
</Link>
      

      
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#leeNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="leeNavbar">

      
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
          <li className="nav-item"><Link className="nav-link" to="/people">People</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/research">Research</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/publications">Publications</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/teaching">Teaching</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/news">News</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>

          
          {user?.role === "student" && (
            <li className="nav-item">
              <Link className="nav-link fw-bold text-warning" to="/materials">
                Material Request
              </Link>
            </li>
          )}
        </ul>

        
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
          
        
          {user?.role === "admin" && (
            <li className="nav-item dropdown me-3">
              <button
                className="btn btn-info dropdown-toggle fw-bold"
                onClick={() => setShowAdminMenu(!showAdminMenu)}
              >
                Admin
              </button>

              <ul className={`dropdown-menu dropdown-menu-end ${showAdminMenu ? "show" : ""}`}>

                <li>
                  <Link className="dropdown-item" to="/admin">
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/admin/users">
                    Manage Users
                  </Link>
                </li>
                <li>
  <Link className="dropdown-item" to="/admin/carousel">
    Manage Carousel Images
  </Link>
</li>

                <li>
                  <Link className="dropdown-item" to="/admin/people">
                    Manage People
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/admin/publications">
                    Manage Publications
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/admin/research">
                    Manage Research
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/admin/teaching">
                    Manage Teaching
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/admin/news">
                    Manage News
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/admin/forms">
                    View Contact Forms
                  </Link>
                </li>

              
                <li>
                  <Link className="dropdown-item" to="/admin/materials">
                    Material Requests
                  </Link>
                </li>

               
                <li>
                  <Link className="dropdown-item" to="/admin/equipment">
                    Manage Equipment
                  </Link>
                </li>

              </ul>
            </li>
          )}

         
          {!user && (
            <li className="nav-item">
              <Link className="btn btn-primary fw-bold" to="/login">
                Login
              </Link>
            </li>
          )}
          
         
{user && (
  <>
    <li className="nav-item me-2">
      <Link
        className="btn btn-outline-light fw-bold"
        to="/change-password"
      >
        Change Password
      </Link>
    </li>

    <li className="nav-item">
      <button
        className="btn btn-danger fw-bold"
        onClick={handleLogout}
      >
        Logout
      </button>
    </li>
  </>
)}
  </ul>
      </div>
    </nav>
  );
}
