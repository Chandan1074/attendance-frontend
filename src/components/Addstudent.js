// src/components/AddStudent.js
import React, { useState } from 'react';
import axios from 'axios';

function AddStudent() {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Name cannot be empty");
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/students', { name });
      alert("✅ Student added successfully!");
      setName('');
    } catch (error) {
      console.error("Error adding student:", error);
      alert("❌ Failed to add student.");
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>➕ Add Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '10px', width: '250px', marginRight: '10px' }}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddStudent;
