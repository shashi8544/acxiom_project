import React, { useState } from 'react';
import firebase from "../../utils/configs/firebaseConfig";
import './LoginModal.css';

const LoginModal = ({ onClose }) => {
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignInMode, setIsSignInMode] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggleMode = () => {
    setIsSignInMode(!isSignInMode);
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignInMode) {
      handleSignIn();
    } else {
      handleSignUp();
    }
  };

  const handleSignIn = async () => {
    try {
      const { email, password } = formData;
      await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = firebase.auth().currentUser;
      const userSnapshot = await firebase.firestore().collection('vendors').doc(user.uid).get();
      if (!userSnapshot.exists) {
        alert('You are not a vendor.');
        return;
      }
      window.location.href = '/vendor';
    } catch (error) {
      console.error('Error signing in:', error);
      setErrorMessage('Invalid email or password.');
    }
  };

  const handleSignUp = async () => {
    try {
      const { email, password, username } = formData;
      const usernameExists = await checkUsernameExists(username);
      if (usernameExists) {
        setErrorMessage('Username already exists.');
        return;
      }
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = firebase.auth().currentUser;
      await firebase.firestore().collection('vendors').doc(user.uid).set({
        username: username,
        email: email
      });
      // Add the username to the 'usernames' collection
      await firebase.firestore().collection('usernames').doc(username).set({
        email: email,
        uid: user.uid
      });
      alert('Please check your email for verification.');
    } catch (error) {
      console.error('Error signing up:', error);
      setErrorMessage('Error signing up. Please try again.');
    }
  };

  const checkUsernameExists = async (username) => {
    const usernameSnapshot = await firebase.firestore().collection('usernames').doc(username).get();
    return usernameSnapshot.exists;
  };

  const handleCloseModal = () => {
    setFormData({ email: '', password: '', username: '' });
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="modal-background" onClick={handleCloseModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={handleCloseModal}>X</button>
        {isSignInMode ? <h2>Sign In</h2> : <h2>Sign Up</h2>}
        <form onSubmit={handleSubmit}>
          {isSignInMode && (
            <>
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            </>
          )}
          {!isSignInMode && (
            <>
              <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            </>
          )}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">{isSignInMode ? 'Sign In' : 'Sign Up'}</button>
        </form>
        <button className="toggle-button" onClick={handleToggleMode}>
          {isSignInMode ? 'Create an account' : 'Sign in'}
        </button>
      </div>
    </div>
  );
}

export default LoginModal;
