import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000';

function Committees() {
  const [committees, setCommittees] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    congregation_id: '',
    role: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCommittees();
  }, []);

  const fetchCommittees = async () => {
    try {
      const response = await fetch(`${API_URL}/committees`);
      const data = await response.json();
      setCommittees(data);
    } catch (error) {
      setMessage('Error fetching committees: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const response = await fetch(`${API_URL}/committees/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        setCommittees(committees.map(c => c.id === editingId ? { ...formData, id: editingId } : c));
        setMessage('Committee updated successfully');
      } else {
        const response = await fetch(`${API_URL}/committees`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const result = await response.json();
        setCommittees([...committees, { ...formData, id: result.id }]);
        setMessage('Committee created successfully');
      }
      setFormData({
        name: '',
        phone: '',
        congregation_id: '',
        role: ''
      });
      setEditingId(null);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const handleEdit = (committee) => {
    setFormData(committee);
    setEditingId(committee.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await fetch(`${API_URL}/committees/${id}`, { method: 'DELETE' });
        setCommittees(committees.filter(c => c.id !== id));
        setMessage('Committee deleted successfully');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Error: ' + error.message);
      }
    }
  };

  return (
    <div className="section">
      <h2>Committees</h2>
      {message && (
        <div className={`alert alert-${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Committee Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
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
          <label>Congregation ID</label>
          <input
            type="number"
            value={formData.congregation_id}
            onChange={(e) => setFormData({ ...formData, congregation_id: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Role</label>
          <input
            type="text"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            placeholder="e.g., Pastor, Treasurer, Secretary"
          />
        </div>
        <div className="button-group">
          <button type="submit" className="btn-primary">
            {editingId ? 'Update Committee' : 'Add Committee'}
          </button>
          {editingId && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setEditingId(null);
                setFormData({
                  name: '',
                  phone: '',
                  congregation_id: '',
                  role: ''
                });
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="table-container">
        {committees.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Congregation ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {committees.map((committee) => (
                <tr key={committee.id} className={editingId === committee.id ? 'editing' : ''}>
                  <td>{committee.id}</td>
                  <td>{committee.name}</td>
                  <td>{committee.phone}</td>
                  <td>{committee.role}</td>
                  <td>{committee.congregation_id}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(committee)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => handleDelete(committee.id)}
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
          <div className="no-data">No committees found</div>
        )}
      </div>
    </div>
  );
}

export default Committees;