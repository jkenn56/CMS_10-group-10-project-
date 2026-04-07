import React, { useState } from 'react';
import Congregations from './Congregations';
import Committees from './Committees';
import Funds from './Funds';

function Dashboard({ username, onLogout }) {
  const [activeTab, setActiveTab] = useState('congregations');

  return (
    <div className="App">
      <header className="navbar">
        <div className="navbar-left">
          <h1>Church Management System</h1>
        </div>
        <div className="navbar-right">
          <span className="user-info">{username}</span>
          <button onClick={onLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </header>

      <nav className="tabs">
        <button
          className={`tab-btn ${activeTab === 'congregations' ? 'active' : ''}`}
          onClick={() => setActiveTab('congregations')}
        >
          Congregations
        </button>
        <button
          className={`tab-btn ${activeTab === 'committees' ? 'active' : ''}`}
          onClick={() => setActiveTab('committees')}
        >
          Committees
        </button>
        <button
          className={`tab-btn ${activeTab === 'funds' ? 'active' : ''}`}
          onClick={() => setActiveTab('funds')}
        >
          Funds
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'congregations' && <Congregations />}
        {activeTab === 'committees' && <Committees />}
        {activeTab === 'funds' && <Funds />}
      </main>
    </div>
  );
}

export default Dashboard;