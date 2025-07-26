// src/components/TimeTableAttendance.js
import React, { useState } from 'react';

function TimeTableAttendance() {
  const subjects = ["Math", "Physics", "Chemistry", "English", "Biology", "Computer"];
  const students = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];

  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);

  // Generate random 6 subjects for 7 periods
  const generateDayPlan = () => {
    const periods = [];
    for (let i = 1; i <= 7; i++) {
      periods.push({
        period: i,
        subject: subjects[Math.floor(Math.random() * subjects.length)],
        attendance: students.map((s) => ({ ...s, status: '' })),
      });
    }
    return periods;
  };

  const [dayPlan, setDayPlan] = useState(generateDayPlan());

  const toggleStatus = (periodIndex, studentId, status) => {
    const updated = [...dayPlan];
    updated[periodIndex].attendance = updated[periodIndex].attendance.map((s) =>
      s.id === studentId ? { ...s, status } : s
    );
    setDayPlan(updated);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📅 Attendance for {selectedDate}</h2>
      <label>Select Date: </label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => {
          setSelectedDate(e.target.value);
          setDayPlan(generateDayPlan()); // Reset periods
        }}
        style={{ marginBottom: '20px' }}
      />

      {dayPlan.map((period, index) => (
        <div key={index} style={{ marginBottom: '30px' }}>
          {index === 4 && <h3>🍱 Lunch Break</h3>}
          <h3>🕘 Period {period.period} — {period.subject}</h3>
          <table border="1" style={{ width: '80%', margin: 'auto' }}>
            <thead>
              <tr>
                <th>Student</th>
                <th>Present</th>
                <th>Absent</th>
              </tr>
            </thead>
            <tbody>
              {period.attendance.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>
                    <input
                      type="radio"
                      name={`p${index}-s${student.id}`}
                      checked={student.status === 'Present'}
                      onChange={() => toggleStatus(index, student.id, 'Present')}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name={`p${index}-s${student.id}`}
                      checked={student.status === 'Absent'}
                      onChange={() => toggleStatus(index, student.id, 'Absent')}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default TimeTableAttendance;
