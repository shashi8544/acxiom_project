// AdminPage.js

import React from 'react';
import './Admin.css';

const AdminPage = () => {
  return (
    <>
        <h1>Welcome admin</h1>
    <div className="admin-page-container">
      <div className="admin-card">
        <h2>Add Membership</h2>
        <button>Add Membership</button>
      </div>
      <div className="admin-card">
        <h2>Update Membership</h2>
        <button>Update Membership</button>
      </div>
      <div className="admin-card">
        <h2>Add User</h2>
        <button>Add User</button>
      </div>
      <div className="admin-card">
        <h2>Update User</h2>
        <button>Update User</button>
      </div>
      <div className="admin-card">
        <h2>Vendor Management</h2>
        <button>Vendor Management</button>
      </div>
      <div className="admin-card">
        <h2>User Management</h2>
        <button>User Management</button>
      </div>
    </div>
    </>
  );
};

export default AdminPage;
