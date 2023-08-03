import React, { useState,useEffect } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import firebase from "../../utils/configs/firebaseConfig";
import SignIn from '../../utils/Authenticate/signIn';
import SignUp from '../../utils/Authenticate/signup';
import UserOptionsMenu from '../../Models/AuthMenuOption/UserOptionsOnSignIn';
// const database = firebase.database();
// const firestore = firebase.firestore();

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);
  const [user, setUser] = useState(null);
  const [showUserOptions, setShowUserOptions] = useState(false);

  
  // Function to check the authentication state whenever the component mounts
  // and listen for changes in the authentication state
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
  
  const handleToggleModal = () => {
    setShowModal(!showModal);
    setShowSignIn(true); // Reset to the sign-in state when opening the modal
  };

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      setShowUserOptions(!showUserOptions);
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const handleUserInitialClick = () => {
    setShowUserOptions(!showUserOptions);
  };

  return (
    <div className="navbar_whole">
      <div className="navbar_left">
        <h1>Sports IIT PATNA</h1>
      </div>
      <div className="navbar_right">
        <p ><Link to="/" className='navbar-link-element'>Home</Link></p>
        <p ><Link to="/tour" className='navbar-link-element'>Tournament</Link></p>
        <p ><Link to="/achieve" className='navbar-link-element'>Achievements</Link></p>
        <p ><Link to="/interiit" className='navbar-link-element'>InterIIT</Link></p>

        {user ? (
          <span className="user-initial" onClick={handleUserInitialClick}>
            {user.email[0].toUpperCase()}
          </span>
        ) : (
          <button onClick={handleToggleModal}>
            {showSignIn ? "Sign In" : "Sign Up"}
          </button>
        )}

        {/* Modal for Sign-In/Sign-Up */}
        {showModal && (
          <div className="modal-auth">
            <div className="modal_content">
              <span className="close" onClick={handleToggleModal}>&times;</span>
              <button onClick={() => setShowSignIn(!showSignIn)}>
                {showSignIn ? "Switch to Sign Up" : "Switch to Sign In"}
              </button>
              {showSignIn ? <SignIn onClose={handleToggleModal} /> : <SignUp onClose={handleToggleModal} />}
              
            </div>
          </div>
        )}

        {/* User Options Menu */}
        {showUserOptions && (
          <UserOptionsMenu onSignOut={handleSignOut} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
