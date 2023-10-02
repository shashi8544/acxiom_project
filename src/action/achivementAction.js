import firebase from "../utils/configs/firebaseConfig";

const firestore = firebase.firestore();

export const getAchivementDataList = () => {
    return new Promise((resolve, reject) => {
      // Replace 'newCollection' with the actual name of your collection in Firebase
      const collectionRef = firestore.collection('Achivement');
  
      // Replace with the document ID you want to fetch
      collectionRef
        .get()
        .then((snapshot) => {
          const tournamentsData = [];
          snapshot.forEach((doc) => {
            if (doc.exists) {
              tournamentsData.push(doc.data());
            }
          });
          resolve(tournamentsData);
        })
        .catch((error) => {
          console.error("Error getting document:", error);
          reject(error);
        });
    });
  };


