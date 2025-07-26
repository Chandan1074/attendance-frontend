import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AttendanceHistory() {
  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editStatus, setEditStatus] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/attendance');
      setRecords(res.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const deleteRecord = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://localhost:8080/api/attendance/${id}`);
        setRecords(prev => prev.filter(r => r.id !== id));
      } catch (err) {
        console.error('Failed to delete:', err);
      }
    }
  };

  const clearAllRecords = async () => {
    if (window.confirm("⚠️ Are you sure you want to clear all attendance history?")) {
      try {
        await axios.delete('http://localhost:8080/api/attendance/clear');
        setRecords([]);
      } catch (err) {
        console.error('Failed to clear history:', err);
      }
    }
  };

  const startEdit = (record) => {
    setEditingId(record.id);
    setEditStatus(record.status);
  };

  const saveEdit = async (id) => {
    const updated = records.find(r => r.id === id);
    try {
      await axios.put(`http://localhost:8080/api/attendance/${id}`, {
        ...updated,
        status: editStatus,
        student: { id: updated.student.id }
      });
      setRecords(prev =>
        prev.map(r => (r.id === id ? { ...r, status: editStatus } : r))
      );
      setEditingId(null);
    } catch (err) {
      console.error('Failed to update:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>📖 Attendance History</h3>

      <button style={{ marginBottom: '10px' }} onClick={clearAllRecords}>
        🧹 Clear History
      </button>

      <table border="1" style={{ margin: 'auto', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Student</th>
            <th>Date</th>
            <th>Period</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={record.id}>
              <td>{record.student?.name || 'Unknown'}</td>
              <td>{record.date}</td>
              <td>{record.period}</td>
              <td>{record.subject}</td>
              <td>
                {editingId === record.id ? (
                  <select value={editStatus} onChange={e => setEditStatus(e.target.value)}>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                ) : (
                  record.status
                )}
              </td>
              <td>
                {editingId === record.id ? (
                  <button onClick={() => saveEdit(record.id)}>💾 Save</button>
                ) : (
                  <button onClick={() => startEdit(record)}>✏️ Edit</button>
                )}
                &nbsp;
                <button onClick={() => deleteRecord(record.id)}>🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceHistory;
