import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import './Authform.css'; // Import the CSS file

function AuthForm({ onAuthenticate }) {
  const [uniqueId, setUniqueId] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Example logic for authentication
    if (uniqueId === '1234' && password === 'sandhya') {
      swal('Authenticated!', 'You have been successfully authenticated.', 'success');
      setIsAuthenticated(true);
      onAuthenticate(true);
    } else {
      swal('Error', 'Invalid ID or password', 'error');
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      // Reset authentication state when navigating back or forward
      setIsAuthenticated(false);
    };

    window.addEventListener('popstate', handlePopState);
    
    // Cleanup event listener when the component unmounts
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <div className="auth-form-container">
      {!isAuthenticated ? (
        <div className="auth-card">
          <h2 className="auth-heading">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="uniqueId">Unique ID:</label>
              <input
                type="text"
                id="uniqueId"
                value={uniqueId}
                onChange={(e) => setUniqueId(e.target.value)}
                required
                placeholder="example: 1234"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </div>
            <button type="submit" className="auth-button">Authenticate</button>
          </form>
        </div>
      ) : (
        <div className="auth-card">
          <h2 className="auth-heading">Welcome!</h2>
          <p>You are authenticated. Refresh or navigate back to re-authenticate.</p>
        </div>
      )}
    </div>
  );
}

export default AuthForm;
