import React, { useState } from 'react';

const Inspect = () => {
  // Dummy user data for demonstration
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', transactions: ['Added Plastic', 'Transferred Waste'] },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', transactions: ['Added Metal', 'Processed Waste'] },
  ];

  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Inspect Users</h1>
      
      <div style={{ marginTop: '20px' }}>
        {selectedUser ? (
          // Detail view for a selected user and updating it
          <div>
            <h2>User Details</h2>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <h3>Transactions:</h3>
            <ul>
              {selectedUser.transactions.map((txn, idx) => (
                <li key={idx} style={{ padding: '5px', backgroundColor: '#f2f2f2', margin: '5px 0', borderRadius: '4px' }}>
                  {txn}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => setSelectedUser(null)} 
              style={{ marginTop: '20px', padding: '10px', backgroundColor: '#ddd', cursor: 'pointer', border: 'none', borderRadius: '4px' }}
            >
              Back to Users
            </button>
          </div>
        ) : (
         
          <div>
            <h2>All Users</h2>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
              {users.map((user) => (
                <li key={user.id} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f4f4f4', borderRadius: '4px' }}>
                  <strong>{user.name}</strong> - {user.email}
                  <button 
                    onClick={() => setSelectedUser(user)} 
                    style={{ marginLeft: '15px', padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    View Details
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inspect;
