import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './LoginType.css'; // Import the CSS file for styling
import LoginModal from './LoginModal'; // Import the LoginModal component
import { Link } from 'react-router-dom';

const LoginType = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="login-type-container">
        <div className="login-container vendor">
          <h2 onClick={openModal}>Vendor Login</h2>
          {/* Vendor login form */}
        </div>

        <div className="login-container user">
          <h2 onClick={openModal}>User Login</h2>
          {/* User login form */}
        </div>

        <div className="login-container admin">
          <h2 onClick={openModal}>Admin Login</h2>
          {/* Admin login form */}
        </div>
      </div>

      {isModalOpen && <LoginModal onClose={closeModal} />} {/* Render LoginModal if modal is open */}
    </div>
  );
}

export default LoginType;
