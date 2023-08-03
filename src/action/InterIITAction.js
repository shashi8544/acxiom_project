import firebase from "../utils/configs/firebaseConfig";

const database = firebase.database();
const firestore = firebase.firestore();
const storage = firebase.storage();
// Function to update the "start" variable in Firestore

export const updateStartStatusInFirestore = async (startStatus) => {
  try {
    // Assuming you have a collection named "StartSelectionForInterIIT"
    // and a document named "Start" that contains the "start" variable
    const docRef = firestore.collection('startSelectionForInterIIT').doc('Start');

    // Update the "start" variable in the document
    await docRef.update({
      start: startStatus,
    });

    console.log('Start status updated successfully!');
  } catch (error) {
    console.error('Error updating start status:', error);
  }
};

export async function fetchRequestedStudentDataFromFirebase() {
  try {
    const collectionRef = firestore.collection("reuestForInterIIT"); // Replace "your-collection-name" with the actual collection name where your data is stored

    // Perform a query to get the data from the collection
    const querySnapshot = await collectionRef.get();

    // Initialize an empty array to store the data
    const data = [];

    // Loop through the documents in the querySnapshot
    querySnapshot.forEach((doc) => {
      // Extract the data from each document
      const item = doc.data();
      data.push(item);
    });

    return data;
  } catch (error) {
    console.error("Error fetching data from Firebase:", error);
    throw error;
  }
}
export async function fetchSelectedStudentDataFromFirebase() {
  try {
    const collectionRef = firestore.collection("selectForInterIIT"); // Replace "your-collection-name" with the actual collection name where your data is stored

    // Perform a query to get the data from the collection
    const querySnapshot = await collectionRef.get();

    // Initialize an empty array to store the data
    const data = [];

    // Loop through the documents in the querySnapshot
    querySnapshot.forEach((doc) => {
      // Extract the data from each document
      const item = doc.data();
      data.push(item);
    });

    return data;
  } catch (error) {
    console.error("Error fetching data from Firebase:", error);
    throw error;
  }
}
export async function fetchRejectedStudentDataFromFirebase() {
  try {
    const collectionRef = firestore.collection("rejectForInterIIT"); // Replace "your-collection-name" with the actual collection name where your data is stored

    // Perform a query to get the data from the collection
    const querySnapshot = await collectionRef.get();

    // Initialize an empty array to store the data
    const data = [];

    // Loop through the documents in the querySnapshot
    querySnapshot.forEach((doc) => {
      // Extract the data from each document
      const item = doc.data();
      data.push(item);
    });

    return data;
  } catch (error) {
    console.error("Error fetching data from Firebase:", error);
    throw error;
  }
}
export const updateFormData = async (formData, photoFile) => {
  try {
    // Store the form data in Firestore with the selected sport as the document ID
    await firestore.collection('reuestForInterIIT').doc(formData.uid).set(formData);

    // Upload the photo to Firebase Storage
    // const photoRef = storage.child(`InterIIT/${formData.sports}/${photoFile.name}`);
    // await photoRef.put(photoFile);

    // // Get the download URL of the uploaded photo
    // const photoUrl = await photoRef.getDownloadURL();

    // Include the photo URL in the form data
    // const formDataWithPhotoUrl = {
    //   ...formData,
    //   photoUrl,
    // };

    // Update the form data in Firestore to include the photo URL
    // await firestore.collection('sportsData').doc(formData.sports).set(formDataWithPhotoUrl);

    console.log('Form data and photo updated to Firestore with photo URL successfully.');
  } catch (error) {
    console.error('Error updating form data and photo with photo URL:', error);
    // Handle error if needed
  }
};
