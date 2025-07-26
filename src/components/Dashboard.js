// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // ✅ Import Axios

function Dashboard() {
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  const [students, setStudents] = useState([]);

  // ✅ Fetch students on load
  useEffect(() => {
    axios.get('http://localhost:8080/api/students')
      .then(res => {
        setStudents(res.data);
        console.log('Fetched students:', res.data);
      })
      .catch(err => {
        console.error('Error fetching students:', err);
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2 className="hero-heading">Dashboard - {today}</h2>

      <div className="dashboard-cards">
        <div className="dash-card" onClick={() => navigate('/timetable')}>
          📚 Mark Attendance
          <p>Period-wise attendance for today</p>
        </div>

        <div className="dash-card" onClick={() => navigate('/history')}>
          🕓 View History
          <p>See attendance for past dates</p>
        </div>

        <div className="dash-card" onClick={() => navigate('/summary')}>
          📊 Summary
          <p>Attendance reports</p>
        </div>
      </div>

      {/* 🔽 Example: Show student names */}
      <div style={{ marginTop: '30px' }}>
        <h3>🧑‍🎓 Students:</h3>
        <ul>
          {students.map((s) => (
            <li key={s.id}>{s.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;

