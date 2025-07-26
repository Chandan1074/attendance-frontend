// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AttendanceHistory from './components/AttendanceHistory';
import TimeTableSelector from './components/TimeTableSelector';
import AddStudent from './components/Addstudent';
import Summary from './components/Summary';
import Register from './components/Register';
import Navbar from './components/Navbar';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Add class to <body> based on theme
  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  return (
    <Router>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<AttendanceHistory />} />
        <Route path="/timetable" element={<TimeTableSelector />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/register" element={<Register />} />


      </Routes>
    </Router>
  );
}

export default App;



