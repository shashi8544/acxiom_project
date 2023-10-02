
import firebase from "../utils/configs/firebaseConfig";
const database = firebase.database();
const firestore = firebase.firestore();

export const getHomePageBasketballAttribute = (documentID) => {
     
    // Replace 'newCollection' with the actual name of your collection in Firebase
    const collectionRef = firestore.collection('sports');
    const documentRef = collectionRef.doc(documentID); // Replace with the document ID you want to fetch
  
    return documentRef.get()
      .then((doc) => {
        if (doc.exists) {
            console.log(doc);
          return doc.data();
        } else {
          console.log("No such document!");
          return null;
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
        return null;
      });
  };

  export const getDataIntoFirebase = (handleData) => {
    const { Coach, Coordinators, Achievements, Events } = handleData;
  
    // Your Firebase Firestore update code here
    firestore.collection('sports').doc("Football").set(handleData)
    .then(() => {
      console.log('Team data updated to Firebase');
      // You can perform any additional actions or display a success message here
    })
    .catch((error) => {
      console.error('Error updating team data to Firebase:', error);
      // You can handle the error and display an error message here
    });
  };
  