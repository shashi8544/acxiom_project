import React, { useState } from 'react';
import firebase from "../configs/firebaseConfig";
const database = firebase.database();
const firestore = firebase.firestore();

const SignUp = ({onClose}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      // Step 1: Create the user with email and password
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      // Step 2: Send the email verification link to the user
      await firebase.auth().currentUser.sendEmailVerification();

      // Step 3: Wait for the user to verify their email
      const user = firebase.auth().currentUser;
      await new Promise((resolve, reject) => {
        const interval = setInterval(() => {
          user.reload().then(() => {
            if (user.emailVerified) {
              clearInterval(interval);
              resolve();
            }
            onClose();
          }).catch((error) => reject(error));
        }, 2000); // Check every 2 seconds if the email is verified
      });

      // Step 4: Store user data in Firebase backend (Firestore or Realtime Database)
      firestore.collection('users').doc(user.uid).set({
        email: user.email,
        // Add other user data here if needed
      });

      console.log('User data stored in the Firebase backend.');
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUp;

