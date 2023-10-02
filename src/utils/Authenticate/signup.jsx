import React, { useState } from 'react';
import firebase from "../configs/firebaseConfig";
import Loader from '../../Models/Loader/loader';
const database = firebase.database();
const firestore = firebase.firestore();

const SignUp = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showLoader,setShowLoader] = useState(false);
  const handleSignUp = async () => {
    setShowLoader(true);
    if (password !== confirmPassword) {
      alert("Your password didn't match!");
      setShowLoader(false);
      return;
    }
    try {
      
      const existingUser = await firebase.auth().fetchSignInMethodsForEmail(email);
      console.log(existingUser);

      if (existingUser && existingUser[0]) {
        // const userRecord = await firebase.auth().getUserByEmail(email);
        const usersCollection = firestore.collection('users');
        const userSnapshot = await usersCollection.where('email', '==', email).get();
        if (!userSnapshot.empty) {
          alert('email Is already existing!!!');
          setShowLoader(false);
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        }
        else {
          // await firebase.auth().createUserWithEmailAndPassword(email, password);
          await firebase.auth().signInWithEmailAndPassword(email, password);
          const user = firebase.auth().currentUser;
          // console.log(user)
          // Step 2: Send the email verification link to the user
          await user.sendEmailVerification();
  
          // Step 3: Wait for the user to verify their email
          await new Promise((resolve, reject) => {
            const interval = setInterval(() => {
              user.reload().then(() => {
                if (user.emailVerified) {
                  clearInterval(interval);
                  resolve();
                }
                // alert('You are Successfully Registered!!!!!!!')
                // onClose();
              }).catch((error) => reject(error));
            }, 2000); // Check every 2 seconds if the email is verified
          });
          
          // Step 4: Store user data in Firebase backend (Firestore or Realtime Database)
          firestore.collection('users').doc(user.uid).set({
            email: user.email,
          });
          // onClose();
          setShowLoader(false);
          console.log('User data stored in the Firebase backend.');
  
        }
      }
      else {
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
              // alert('You are Successfully Registered!!!!!!!')
              // onClose();
            }).catch((error) => {
              console.log("heeeee",error);
              alert("Please Provide Correct Email to sign UP");
              window.location.reload();
            });
          }, 2000); // Check every 2 seconds if the email is verified
        });
        
        // Step 4: Store user data in Firebase backend (Firestore or Realtime Database)
        firestore.collection('users').doc(user.uid).set({
          email: user.email,
        });
        // onClose();
        alert("Sign In with Your email and Password!!!")
        setShowLoader(false);
        window.location.reload();
        console.log('User data stored in the Firebase backend.');

      }
      // Step 1: Create the user with email and password
    } catch (error) {
      window.location.reload();
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <div>
      {showLoader && <Loader/>}
      
      <h2>Sign Up</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />

      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUp;

