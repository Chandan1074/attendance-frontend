import React, { useState } from 'react';

function AttendanceTable() {
  const initialData = [
    { id: 1, name: 'Alice', status: '', date: '2025-06-25' },
    { id: 2, name: 'Bob', status: '', date: '2025-06-25' },
    { id: 3, name: 'Charlie', status: '', date: '2025-06-25' },
  ];

  const [students, setStudents] = useState(initialData);
  const [selectedDate, setSelectedDate] = useState('');

  const toggleStatus = (id, status) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id ? { ...student, status } : student
      )
    );
  };

  // Filter based on selected date
  const filteredStudents = selectedDate
    ? students.filter(s => s.date === selectedDate)
    : [];

  return (
    <div style={{ textAlign: 'center' }}>
      <label>Select Date: </label>
      <input
        type="date"
        value={selectedDate}
        onChange={e => setSelectedDate(e.target.value)}
        style={{ margin: '10px' }}
      />

      {filteredStudents.length > 0 ? (
        <table border="1">
                  {filteredStudents.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h4>Summary</h4>
          <p>
            ✅ Present: {
              filteredStudents.filter(s => s.status === 'Present').length
            }  
            &nbsp;| ❌ Absent: {
              filteredStudents.filter(s => s.status === 'Absent').length
            }
          </p>
        </div>
      )}

          <thead>
            <tr>
              <th>Student</th>
              <th>Present</th>
              <th>Absent</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(s => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>
                  <input
                    type="radio"
                    name={`status-${s.id}`}
                    checked={s.status === 'Present'}
                    onChange={() => toggleStatus(s.id, 'Present')}
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    name={`status-${s.id}`}
                    checked={s.status === 'Absent'}
                    onChange={() => toggleStatus(s.id, 'Absent')}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        selectedDate && <p>No records found for {selectedDate}</p>
      )}
    </div>
  );
}

export default AttendanceTable;

