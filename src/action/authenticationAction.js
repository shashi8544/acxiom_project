import firebase from "../utils/configs/firebaseConfig";
import { RESET_PASSWORD_ERROR,RESET_PASSWORD_SUCCESS,SIGN_UP_FAILURE,SIGN_UP_SUCCESS,SET_IS_ADMIN,SIGN_IN_SUCCESS ,SIGN_OUT_SUCCESS} from './types';


// Action Creators
export const setUser = (userData) => ({
  type: 'SET_USER',
  payload: userData,
});
export const setAdminStatus = (mark)=>({
  type: 'SET_ADMIN_STATUS',
  payload: mark,
});
export const setIsIITPatnaUser = (mark)=>({
  type: 'SET_IIT_PATNA_USER',
  payload: mark,
});
export const resetPassword = (email) => {
  return async (dispatch) => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      dispatch(resetPasswordSuccess());
    } catch (error) {
      dispatch(resetPasswordError(error));
      throw error;
    }
  };
};

export const resetPasswordSuccess = () => {
  return {
    type: RESET_PASSWORD_SUCCESS,
  };
};

export const resetPasswordError = (error) => {
  return {
    type: RESET_PASSWORD_ERROR,
    error,
  };
};

export const setUserInFirestore = async (user) => {
  const userRef = firebase.firestore().collection('users').doc(user.uid);

  // Set user data in the backend Firestore collection
  await userRef.set({
    email: user.email,
    verified: true,
  });
};
export const signUpWithEmail = (email, password) => async (dispatch) => {
  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);

    dispatch({
      type: SIGN_UP_SUCCESS,
      user: userCredential.user,
    });

    return userCredential; // Return userCredential for email verification
  } catch (error) {
    dispatch({
      type: SIGN_UP_FAILURE,
      error: error.message,
    });
    throw error;
  }
};
export const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS,
});

export const signOut = () => {
  return async (dispatch) => {
    try {
      firebase.auth().signOut();

      dispatch(signOutSuccess());
      
      dispatch({ type: SET_IS_ADMIN, payload: false });
      
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
};
export const signInSuccess = (user) => ({
    type: SIGN_IN_SUCCESS,
    payload: user,
  });

export const fetchAdminStatus = (user) => {
    return (dispatch) => {
        const currentUser = user;
        if (currentUser) {
            const firestore = firebase.firestore();
            firestore.collection('admin').where(firebase.firestore.FieldPath.documentId(), '==', currentUser.uid).get()
                .then((querySnapshot) => {
                    console.log(querySnapshot);
                    if (querySnapshot.empty) {
                      dispatch({ type: SET_IS_ADMIN, payload: false });
                    } else {
                      console.log("hii")
                        dispatch({ type: SET_IS_ADMIN, payload: true });
                    }
                })
                .catch((error) => console.error('Error checking admin status:', error));
        }
        else{
          dispatch({ type: SET_IS_ADMIN, payload: true });
        }
    };
};