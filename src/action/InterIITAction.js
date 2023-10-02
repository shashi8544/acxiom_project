import firebase from "../utils/configs/firebaseConfig";
import { SET_START_SELECTION_FIELD } from "./types";
import { message } from "antd";
const ExcelJS = require('exceljs');
// const fs = require('fs');
const database = firebase.database();
const firestore = firebase.firestore();
const storage = firebase.storage();


export const exportFirestoreToExcel = async (collectionName) => {
    const firestore = firebase.firestore();

    try {
        const querySnapshot = await firestore.collection(collectionName).get();

        const workbook = new ExcelJS.Workbook();

        querySnapshot.forEach((doc) => {
            const worksheet = workbook.addWorksheet(doc.id);
            worksheet.addRow(['UID', 'Name', 'Batch', 'Email', 'Phone', 'Roll No', 'Sports']);

            const data = doc.data();
            const values = Object.values(data);

            values.forEach((mapItem) => {
                if (mapItem) {
                    const rowData = {
                        UID: mapItem.uid,
                        Name: mapItem.name,
                        Batch: mapItem.batch,
                        Email: mapItem.email,
                        Phone: mapItem.phone,
                        RollNo: mapItem.rollNo,
                        Sports: mapItem.sports,
                    };
                    worksheet.addRow(Object.values(rowData));
                }
            });
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'student_data.xlsx';
        a.click();
        URL.revokeObjectURL(url);
    } catch (error) {
        throw error;
    }
};



// Function to update the "start" variable in Firestore
export const fetchStartSelectionField = () => {
  return (dispatch) => {
      const firestore = firebase.firestore();
      firestore
          .collection('startSelectionForInterIIT')
          .doc('Start')
          .get()
          .then((doc) => {
            // console.log(doc)
            if (doc.exists) {
              
              const fieldToCheck = doc.data().start;
              // console.log("Retrieved field value:", fieldToCheck);
              dispatch({ type: SET_START_SELECTION_FIELD, payload: fieldToCheck });
          }
          else{
            console.log("lsldflksdlflksdflsdlflsdllklsdf")
          }
          })
          .catch((error) => console.error('Error fetching field value:', error));
  };
};
export const removePublishStudentDataInFirestore = async () =>{
  try{
    const collectionRef = firestore.collection('publishStudentList');
    collectionRef.get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      doc.ref.delete();
    });
    message.success('Collection data deleted.');
  })
  .catch(error => {
    console.error('Error deleting collection data:', error);
  });
  }catch(error){
    console.log(error);
  }
}
export const updatePublishStudentDataInFirestore = async (studentData) => {
  try {
    studentData.forEach((eachStudentData) => {
      console.log('hello',eachStudentData);
      const docRef = firestore.collection('publishStudentList').doc(eachStudentData.sports); // Replace 'yourDocumentId' with the desired document ID
      docRef
  .get()
  .then((docSnapshot) => {
    if (docSnapshot.exists) {
      const existingData = docSnapshot.data();

      // Merge the new data into existing data
      const updatedData = {
        ...existingData,
        [eachStudentData.uid]: eachStudentData
      };

      // Update the document with the merged data
      docRef
        .update(updatedData)
        .then(() => {
          console.log('Document updated successfully!');
        })
        .catch((error) => {
          console.error('Error updating document:', error);
        });
    } else {
      console.log("ID does not exits")
    }
  })
  .catch((error) => {
    console.error('Error fetching document:', error);
  });
    });

  } catch (error) {
    console.log(error);
  }
}


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
    const docRef = firestore.collection('reuestForInterIIT').doc(formData.uid);

    // Fetch the existing data from Firestore
    const docSnapshot = await docRef.get();
    const existingData = docSnapshot.data() || {}; // Use empty object if no existing data

    // Merge the new formData with the existing data
    const mergedData = {
      ...existingData,
      ...formData,
      // You can add specific fields from formData if needed, e.g., formData.selectedSport
    };

    // Update the document with the merged data
    await docRef.set(mergedData);

    console.log('Form data and existing data merged and updated to Firestore successfully.');
  } catch (error) {
    console.error('Error updating form data and merging with existing data:', error);
    // Handle error if needed
  }
};

export const moveDataForRejected = async (uid) =>{
  try{
    const requestForInterIITDataCollection = firestore.collection('reuestForInterIIT');
    const selectForInterIITDataCollection = firestore.collection('selectForInterIIT');
    const rejectForInterIITDataCollection = firestore.collection('rejectForInterIIT');
    let sourceDoc = await requestForInterIITDataCollection.doc(uid).get();
    console.log("hello there i want to dispaly",sourceDoc.data())
    if(!sourceDoc.exists){
      sourceDoc = await selectForInterIITDataCollection.doc(uid).get();
      await selectForInterIITDataCollection.doc(uid).delete();
    }
    else{
      await requestForInterIITDataCollection.doc(uid).delete();

    }
    console.log(sourceDoc)
    if (sourceDoc.exists) {
      const sourceData = sourceDoc.data();

      await rejectForInterIITDataCollection.doc(uid).set(sourceData, { merge: true });
      message.success('Data moved successfully.');
    } else {
      console.log('Data not found for the given UID.');
    }
  }catch (error) {
    console.error('Error moving data:', error);
  }
}
export const moveDataForSelected = async (uid) =>{
  try{
    const requestForInterIITDataCollection = firestore.collection('reuestForInterIIT');
    const selectForInterIITDataCollection = firestore.collection('selectForInterIIT');
    const rejectForInterIITDataCollection = firestore.collection('rejectForInterIIT');
    let sourceDoc = await requestForInterIITDataCollection.doc(uid).get();
    console.log("hello there i want to dispaly",sourceDoc.data())
    if(!sourceDoc.exists){
      sourceDoc = await rejectForInterIITDataCollection.doc(uid).get();
      await rejectForInterIITDataCollection.doc(uid).delete();
    }
    else{
      await requestForInterIITDataCollection.doc(uid).delete();

    }
    console.log(sourceDoc)
    if (sourceDoc.exists) {
      const sourceData = sourceDoc.data();

      await selectForInterIITDataCollection.doc(uid).set(sourceData, { merge: true });
      message.success('Data moved successfully.');
    } else {
      console.log('Data not found for the given UID.');
    }
  }catch (error) {
    console.error('Error moving data:', error);
  }
}
