import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000';

function Funds() {
  const [funds, setFunds] = useState([]);
  const [formData, setFormData] = useState({
    congregation_id: '',
    amount: '',
    payment_date: '',
    committee_id: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchFunds();
  }, []);

  const fetchFunds = async () => {
    try {
      const response = await fetch(`${API_URL}/funds`);
      const data = await response.json();
      setFunds(data);
    } catch (error) {
      setMessage('Error fetching funds: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const response = await fetch(`${API_URL}/funds/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        setFunds(funds.map(f => f.id === editingId ? { ...formData, id: editingId } : f));
        setMessage('Fund updated successfully');
      } else {
        const response = await fetch(`${API_URL}/funds`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const result = await response.json();
        setFunds([...funds, { ...formData, id: result.id }]);
        setMessage('Fund created successfully');
      }
      setFormData({
        congregation_id: '',
        amount: '',
        payment_date: '',
        committee_id: ''
      });
      setEditingId(null);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const handleEdit = (fund) => {
    setFormData(fund);
    setEditingId(fund.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await fetch(`${API_URL}/funds/${id}`, { method: 'DELETE' });
        setFunds(funds.filter(f => f.id !== id));
        setMessage('Fund deleted successfully');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Error: ' + error.message);
      }
    }
  };

  return (
    <div className="section">
      <h2>Funds</h2>
      {message && (
        <div className={`alert alert-${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
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
            <label>Amount</label>
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Payment Date</label>
            <input
              type="date"
              value={formData.payment_date}
              onChange={(e) => setFormData({ ...formData, payment_date: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Committee ID</label>
            <input
              type="number"
              value={formData.committee_id}
              onChange={(e) => setFormData({ ...formData, committee_id: e.target.value })}
            />
          </div>
        </div>
        <div className="button-group">
          <button type="submit" className="btn-primary">
            {editingId ? 'Update Fund' : 'Add Fund'}
          </button>
          {editingId && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setEditingId(null);
                setFormData({
                  congregation_id: '',
                  amount: '',
                  payment_date: '',
                  committee_id: ''
                });
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="table-container">
        {funds.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Congregation ID</th>
                <th>Amount</th>
                <th>Payment Date</th>
                <th>Committee ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {funds.map((fund) => (
                <tr key={fund.id} className={editingId === fund.id ? 'editing' : ''}>
                  <td>{fund.id}</td>
                  <td>{fund.congregation_id}</td>
                  <td>${parseFloat(fund.amount).toFixed(2)}</td>
                  <td>{fund.payment_date}</td>
                  <td>{fund.committee_id}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(fund)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => handleDelete(fund.id)}
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
          <div className="no-data">No funds found</div>
        )}
      </div>
    </div>
  );
}

export default Funds;