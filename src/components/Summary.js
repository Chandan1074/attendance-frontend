import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Summary() {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/attendance/summary')
      .then(res => setSummary(res.data))
      .catch(err => console.error('Error fetching summary:', err));
  }, []);

  const calculatePercentage = (present, total) => {
    if (total === 0) return '0%';
    return ((present / total) * 100).toFixed(2) + '%';
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>📊 Attendance Summary</h3>
      <table border="1" style={{ marginTop: '20px', width: '80%', margin: 'auto' }}>
        <thead>
          <tr>
            <th>Student</th>
            <th>Total Subjects</th>
            <th>Total Present</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {summary.map((record, idx) => {
            const [name, total, present] = record;
            return (
              <tr key={idx}>
                <td>{name}</td>
                <td>{total}</td>
                <td>{present}</td>
                <td>{calculatePercentage(present, total)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Summary;
