import React, { useState, useEffect } from 'react';
import axios from 'axios';

const subjects = ["Math", "Physics", "Chemistry", "English", "Biology", "Computer"];
const today = new Date().toISOString().split('T')[0];

function TimeTableSelector() {
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [dayPlan, setDayPlan] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/students')
      .then(response => {
        setStudents(response.data);

        // ✅ Move this function inside useEffect (not needed as dependency)
        const generateDayPlan = (studentList) => {
          return Array.from({ length: 7 }, (_, i) => ({
            period: i + 1,
            subject: subjects[Math.floor(Math.random() * subjects.length)],
            attendance: studentList.map(s => ({ ...s, status: '' })),
          }));
        };

        setDayPlan(generateDayPlan(response.data));
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }, []); // ✅ Removed generateDayPlan from dependencies

  const handleStatusChange = (studentId, status) => {
    const updatedPlan = [...dayPlan];
    updatedPlan[selectedPeriod].attendance = updatedPlan[selectedPeriod].attendance.map(s =>
      s.id === studentId ? { ...s, status } : s
    );
    setDayPlan(updatedPlan);
  };

  const handleMarkAllPresent = (isChecked) => {
    const updatedPlan = [...dayPlan];
    updatedPlan[selectedPeriod].attendance = updatedPlan[selectedPeriod].attendance.map(s => ({
      ...s,
      status: isChecked ? 'Present' : '',
    }));
    setDayPlan(updatedPlan);
  };

  const submitAttendance = async () => {
    const periodData = dayPlan[selectedPeriod];
    const payload = periodData.attendance.map((record) => ({
      student: { id: record.id },
      date: selectedDate,
      period: periodData.period,
      subject: periodData.subject,
      status: record.status,
    }));

    try {
      await Promise.all(
        payload.map((entry) =>
          axios.post('http://localhost:8080/api/attendance', entry)
        )
      );
      alert('✅ Attendance submitted successfully!');
    } catch (error) {
      console.error('Error submitting attendance:', error);
      alert('❌ Failed to submit attendance.');
    }
  };

  const goBack = () => {
    setSelectedPeriod(null);
  };

  const getStats = () => {
    const periodData = dayPlan[selectedPeriod];
    const total = periodData.attendance.length;
    const present = periodData.attendance.filter(s => s.status === 'Present').length;
    const absent = periodData.attendance.filter(s => s.status === 'Absent').length;
    return { total, present, absent };
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🗓️ Attendance for {selectedDate}</h2>
      <label>Select Date: </label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => {
          setSelectedDate(e.target.value);

          // ✅ Define generateDayPlan here too
          const generateDayPlan = (studentList) => {
            return Array.from({ length: 7 }, (_, i) => ({
              period: i + 1,
              subject: subjects[Math.floor(Math.random() * subjects.length)],
              attendance: studentList.map(s => ({ ...s, status: '' })),
            }));
          };

          setDayPlan(generateDayPlan(students));
          setSelectedPeriod(null);
        }}
        style={{ marginBottom: '20px' }}
      />

      {selectedPeriod === null ? (
        <div className="period-grid">
          {dayPlan.map((period, index) => (
            <button
              key={index}
              className="period-card"
              onClick={() => setSelectedPeriod(index)}
            >
              🕘 Period {period.period}<br />📚 {period.subject}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <h3>
            🕘 Period {dayPlan[selectedPeriod].period} — {dayPlan[selectedPeriod].subject}
          </h3>

          <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
            {(() => {
              const { total, present, absent } = getStats();
              return (
                <div>
                  👨‍🎓 Total Students: {total} &nbsp;&nbsp;
                  ✅ Present: {present} &nbsp;&nbsp;
                  ❌ Absent: {absent}
                </div>
              );
            })()}
          </div>

          <div style={{ textAlign: 'right', marginBottom: '10px' }}>
            <label>
              <input
                type="checkbox"
                onChange={(e) => handleMarkAllPresent(e.target.checked)}
              />{' '}
              ✅ Mark All Present
            </label>
          </div>

          <table border="1" style={{ width: '80%', margin: '20px auto' }}>
            <thead>
              <tr>
                <th>Student</th>
                <th>Present</th>
                <th>Absent</th>
              </tr>
            </thead>
            <tbody>
              {dayPlan[selectedPeriod].attendance.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>
                    <input
                      type="radio"
                      name={`status-${student.id}`}
                      checked={student.status === 'Present'}
                      onChange={() => handleStatusChange(student.id, 'Present')}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name={`status-${student.id}`}
                      checked={student.status === 'Absent'}
                      onChange={() => handleStatusChange(student.id, 'Absent')}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button onClick={submitAttendance}>✅ Submit Attendance</button>
            <br /><br />
            <button onClick={goBack}>🔙 Back to Periods</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TimeTableSelector;
