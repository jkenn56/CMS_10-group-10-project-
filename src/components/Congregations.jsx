import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000';

function Congregations() {
  const [congregations, setCongregations] = useState([]);
  const [formData, setFormData] = useState({
    full_name: '',
    date_of_birth: '',
    gender: '',
    phone: '',
    join_date: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCongregations();
  }, []);

  const fetchCongregations = async () => {
    try {
      const response = await fetch(`${API_URL}/congregations`);
      const data = await response.json();
      setCongregations(data);
    } catch (error) {
      setMessage('Error fetching congregations: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const response = await fetch(`${API_URL}/congregations/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const result = await response.json();
        setCongregations(congregations.map(c => c.id === editingId ? { ...formData, id: editingId } : c));
        setMessage('Congregation updated successfully');
      } else {
        const response = await fetch(`${API_URL}/congregations`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const result = await response.json();
        setCongregations([...congregations, { ...formData, id: result.id }]);
        setMessage('Congregation created successfully');
      }
      setFormData({
        full_name: '',
        date_of_birth: '',
        gender: '',
        phone: '',
        join_date: ''
      });
      setEditingId(null);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const handleEdit = (congregation) => {
    setFormData(congregation);
    setEditingId(congregation.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await fetch(`${API_URL}/congregations/${id}`, { method: 'DELETE' });
        setCongregations(congregations.filter(c => c.id !== id));
        setMessage('Congregation deleted successfully');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Error: ' + error.message);
      }
    }
  };

  return (
    <div className="section">
      <h2>Congregations</h2>
      {message && (
        <div className={`alert alert-${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              value={formData.date_of_birth}
              onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Join Date</label>
          <input
            type="date"
            value={formData.join_date}
            onChange={(e) => setFormData({ ...formData, join_date: e.target.value })}
          />
        </div>
        <div className="button-group">
          <button type="submit" className="btn-primary">
            {editingId ? 'Update Congregation' : 'Add Congregation'}
          </button>
          {editingId && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setEditingId(null);
                setFormData({
                  full_name: '',
                  date_of_birth: '',
                  gender: '',
                  phone: '',
                  join_date: ''
                });
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="table-container">
        {congregations.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Date of Birth</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {congregations.map((cong) => (
                <tr key={cong.id} className={editingId === cong.id ? 'editing' : ''}>
                  <td>{cong.id}</td>
                  <td>{cong.full_name}</td>
                  <td>{cong.date_of_birth}</td>
                  <td>{cong.gender}</td>
                  <td>{cong.phone}</td>
                  <td>{cong.join_date}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(cong)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => handleDelete(cong.id)}
                      style={{ marginLeft: '5px' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-data">No congregations found</div>
        )}
      </div>
    </div>
  );
}

export default Congregations;