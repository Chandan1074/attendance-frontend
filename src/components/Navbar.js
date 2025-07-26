// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <nav className="navbar" >
      <div className="nav-left">
        <h3>📝 Attendance System</h3>
      </div>
      <div className="nav-right" >
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/history">History</Link>
        <Link to="/timetable">Time Table</Link>
        <Link to="/add-student">Add Student</Link>
        <Link to="/summary">Summary</Link>


        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '🌞 Light' : '🌙 Dark'}
        </button>
        <button onClick={handleLogout}> Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
