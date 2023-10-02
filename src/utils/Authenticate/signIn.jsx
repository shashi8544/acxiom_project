import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '../../action/authenticationAction';
import { useNavigate } from 'react-router-dom';
import PasswordReset from './PasswordReset'; // Import the PasswordReset component
import firebase from '../configs/firebaseConfig';
import { setUser,setAdminStatus,setIsIITPatnaUser } from '../../action/authenticationAction';
const SignIn = ({ onClose, onSignIn }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPasswordReset, setShowPasswordReset] = useState(false); // State to show/hide PasswordReset

  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = firebase.auth().currentUser;
        console.log(user);

        const userData = {
          // Store only the necessary user data, not the entire Firebase User object
          uid: user.uid,
          email: user.email,
          // ... other relevant user data ...
      };
      if(user.emailVerified){

        dispatch(setUser(userData));
      }

        if (user) {
            const adminDoc = await firebase.firestore().collection('admin').doc(user.uid).get();
            console.log("YES",adminDoc.exists); // This will show if the admin document exists
            if (adminDoc.exists) {
                dispatch(setAdminStatus(true));
            }
            if (user.email.endsWith('@iitp.ac.in')) {
                console.log("jdsfj",user.email.endsWith('@iitp.ac.in'))
                dispatch(setIsIITPatnaUser(true));
            }
        }
        
        onSignIn(user);
        onClose();
    } catch (error) {
        setErrorMessage(error.message);
        console.error('Error signing in:', error.message);
    }
};

  const handleShowPasswordReset = () => {
    setShowPasswordReset(true);
  };

  const handlePasswordResetClose = () => {
    setShowPasswordReset(false);
  };

  return (
    <div className="sign-in-container">
      <h2 className="sign-in-title">Sign In</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="input-container">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="emailInput"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="passwordInput"
        />
      </div>
      <button onClick={handleSignIn} className="sign-in-button">Sign In</button>
      <button onClick={handleShowPasswordReset} className="reset-password-button">Reset Password</button>

      {/* Render PasswordReset component conditionally */}
      {showPasswordReset && (
        <PasswordReset onClose={handlePasswordResetClose} />
      )}
    </div>
  );
};

export default SignIn;
