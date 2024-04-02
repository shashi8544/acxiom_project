import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './LoginType.css'; // Import the CSS file for styling
import LoginModal from './LoginModal'; // Import the LoginModal component
import ModalAdmin from './ModalAdmin';
import ModalUser from './ModalUser';
import { Link } from 'react-router-dom';

const LoginType = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [isModalOpenUser, setIsModalOpenUser] = useState(false); // State to manage modal visibility
  const [isModalOpenAdmin, setIsModalOpenAdmin] = useState(false); // State to manage modal visibility

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModalUser = () => {
    setIsModalOpenUser(true);
  };

  const closeModalUser = () => {
    setIsModalOpenUser(false);
  };
  const openModalAdmin = () => {
    setIsModalOpenAdmin(true);
  };

  const closeModalAdmin = () => {
    setIsModalOpenAdmin(false);
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="login-type-container">
        <div className="login-container vendor">
          <h2 onClick={openModal}>Vendor Login</h2>
          
        </div>

        <div className="login-container user">
          <h2 onClick={openModalUser}>User Login</h2>
          
        </div>

        <div className="login-container admin">
          <h2 onClick={openModalAdmin}>Admin Login</h2>
        
        </div>
      </div>

      {isModalOpen && <LoginModal onClose={closeModal} />} 
      {isModalOpenUser && <ModalUser onClose={closeModalUser} />} 
      {isModalOpenAdmin && <ModalAdmin onClose={closeModalAdmin} />} 
    </div>
  );
}

export default LoginType;
