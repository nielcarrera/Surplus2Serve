import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VerificationRequests() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/verification-requests')
      .then(response => {
        setUsers(response.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleApprove = async (userId) => {
    try {
      await axios.put(`/api/approve-user/${userId}`);
      setUsers(users.map(user => user.id === userId ? { ...user, status: 'Approved' } : user));
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const handleDeny = async (userId) => {
    try {
      await axios.put(`/api/deny-user/${userId}`);
      setUsers(users.map(user => user.id === userId ? { ...user, status: 'Denied' } : user));
    } catch (error) {
      console.error('Error denying user:', error);
    }
  };

  return (
    <div>
      <h3>Verification Requests</h3>

      <table className="min-w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>
                {user.status === 'Pending' ? (
                  <>
                    <button onClick={() => handleApprove(user.id)} className="bg-green-500 text-white p-2">Approve</button>
                    <button onClick={() => handleDeny(user.id)} className="bg-red-500 text-white p-2">Deny</button>
                  </>
                ) : (
                  <span>{user.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VerificationRequests;
