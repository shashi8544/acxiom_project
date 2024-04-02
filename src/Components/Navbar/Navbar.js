import React, { useState, useEffect } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import firebase from "../../utils/configs/firebaseConfig";
import { useDispatch } from 'react-redux';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import Hamburger from 'hamburger-react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import SignIn from '../../utils/Authenticate/signIn';
import SignUp from '../../utils/Authenticate/signup';
import UserOptionsMenu from '../../Models/AuthMenuOption/UserOptionsOnSignIn';
import { setUser, setAdminStatus, setIsIITPatnaUser } from '../../action/authenticationAction';
const database = firebase.database();
const firestore = firebase.firestore();

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);
  // const [user, setUser] = useState(null);

  const [isOpen, setOpen] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [isMobileScreenShow, setIsMobileScreenShow] = useState(false);
  const [isLoginType,setIsLoginType] = useState(false);
  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);
  const [showUserOptions, setShowUserOptions] = useState(false);
  const user = useSelector((state) => state.auth.userData);
  // console.log(user);
  const dispatch = useDispatch();



  const handleSignIn = (signedInUser) => {

    setUser(signedInUser); // Set the user state when signing in
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
    // setShowSignIn(true); // Reset to the sign-in state when opening the modal
  };
  const handleToggleModalCrossClick = () => {
    setShowModal(!showModal);
    setShowSignIn(true);
    window.location.reload();
  }

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      dispatch(setUser(null));
      dispatch(setAdminStatus(false));
      dispatch(setIsIITPatnaUser(false));
      setShowUserOptions(!showUserOptions);
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const handleUserInitialClick = () => {
    setShowUserOptions(!showUserOptions);
  };
  const handleShowButtonOption = () => {
    setIsMobileScreen(!isMobileScreen);
  }
  return (
    <div className="navbar_whole">
      {/* {isMobileScreen && */}
        <div className='hamburger-icon' onClick={handleShowButtonOption}>
          <Hamburger toggled={isOpen} toggle={toggleMenu}  />
        </div>
      {isMobileScreen && isMobileScreenShow && (
        <div className="navbar_left">
          {/* {isMobileScreen && ( */}
          {/* )} */}
          <h1>Acxiom Store</h1>
        </div>
      )}
      
      
      {
        !isMobileScreen && (
          <div className="navbar_left">
            {/* {isMobileScreen && ( */}
            {/* )} */}
            <h1>Acxiom Store</h1>
          </div>
        )
      }
      <div className="navbar_right">
     <p ><Link to="/logintype" className='navbar-link-element'>Login</Link></p> 
        {/* <p><Link to="/Home" className='navbar-link-element'></Link>Home</p> */}
      </div>
      


    </div>
  );
};

export default Navbar;
