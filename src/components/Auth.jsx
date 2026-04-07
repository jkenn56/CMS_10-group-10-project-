import React, { useState } from 'react';

function Auth({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    religion: '',
    churchname: ''
  });
  const [message, setMessage] = useState('');
  const [logoFile, setLogoFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isSignUp ? 'http://localhost:3000/users' : 'http://localhost:3000/users';
      const method = isSignUp ? 'POST' : 'GET';
      
      if (isSignUp) {
        await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
            congregation_id: 1,
            religion: formData.religion,
            churchname: formData.churchname
          })
        });
        setMessage('Account created successfully! Logging in...');
        setTimeout(() => {
          onLogin(formData.username, logoFile);
        }, 1000);
      } else {
        const response = await fetch(url);
        const users = await response.json();
        const user = users.find(u => u.username === formData.username && u.password === formData.password);
        if (user) {
          onLogin(formData.username);
        } else {
          setMessage('Invalid username or password');
        }
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Church Management System</h1>
        <h2>{isSignUp ? 'Create Account' : 'Login'}</h2>
        
        {message && (
          <div className={`alert alert-${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          {isSignUp && (
            <>
              <div className="form-group">
                <label>Religion</label>
                <input
                  type="text"
                  value={formData.religion}
                  onChange={(e) => setFormData({ ...formData, religion: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Church Name</label>
                <input
                  type="text"
                  value={formData.churchname}
                  onChange={(e) => setFormData({ ...formData, churchname: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Upload Church Logo (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setLogoFile(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
            </>
          )}

          <button type="submit" className="btn-primary">
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <p className="toggle-auth">
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setMessage('');
            }}
            className="link-btn"
          >
            {isSignUp ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Auth;