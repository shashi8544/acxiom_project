import React, { useState } from 'react';
import firebase from "../configs/firebaseConfig";
// import './signIn.css'; // Import the CSS file for styling

const SignIn = ({onClose}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSignIn = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      onClose();
    } catch (error) {
      setErrorMessage(error.message);
      console.error('Error signing in:', error.message);
    }
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
    </div>
  );
};

export default SignIn;
