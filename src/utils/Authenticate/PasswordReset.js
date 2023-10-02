import React, { useState } from 'react';
import firebase from '../configs/firebaseConfig';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { resetPassword } from '../../action/authenticationAction'; // Import the resetPassword action

const PasswordReset = ({ onClose }) => {
  const dispatch = useDispatch(); // Initialize useDispatch
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleResetPassword = async () => {
    try {
      // Dispatch the resetPassword action
      await dispatch(resetPassword(email));
      setSuccessMessage('Password reset email sent. Please check your inbox.');
    } catch (error) {
      setErrorMessage('Error sending password reset email. Please check your email address.');
      console.error('Error sending password reset email:', error);
    }
  };

  return (
    <div className="password-reset-container">
      <h2 className="password-reset-title">Reset Password</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="input-container">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="resetEmailInput"
        />
      </div>
      <button onClick={handleResetPassword} className="reset-password-button">Send Reset Email</button>
      <button onClick={onClose} className="close-button">Close</button>
    </div>
  );
};

export default PasswordReset;
