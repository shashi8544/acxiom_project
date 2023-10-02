// tournamentService.js

import firebase from "../utils/configs/firebaseConfig";
import { useState, useEffect } from "react";
import { createdTournamentCard } from "../pages/CreateTournament/createdTournamentCard";
import { message } from "antd";
const firestore = firebase.firestore();
const storage = firebase.storage();
const ExcelJS = require('exceljs');


export const removePublishStudentDataForAllInFirestore = async () => {
  try {
    const collectionRef = firestore.collection("updateNewFinalListOfAllEvents");
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
  } catch (error) {
    console.log(error);
  }
}
export const exportFirestoreAllEventStudentToExcel = async (collectionName) => {
  const firestore = firebase.firestore();
  try {
    const querySnapshot = await firestore.collection(collectionName).get();

    const workbook = new ExcelJS.Workbook();

    querySnapshot.forEach((doc) => {
      const worksheet = workbook.addWorksheet(doc.id);
      worksheet.addRow(['captainName', 'eventName', 'selectedSport', 'teamName', 'players']);
      const data = doc.data();
      const values = Object.values(data);
      console.log(values[0][0].players.length);
      for (let i = 0; i < values[0].length; i++) {
        const rowData = {
          captainName: values[0][i].captainName,
          eventName: values[0][i].eventName,
          selectedSport: values[0][i].selectedSport,
          teamName: values[0][i].teamName,
        }
        values[0][i].players.forEach((player, index) => {
          rowData[`player${index + 1}`] = player; // Add player data with a unique key
        });
        console.log(rowData);
        worksheet.addRow(Object.values(rowData));
      }
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_data_For_All.xlsx';
    a.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    throw error;
  }


};
export async function fetchAllStudentAppliedDataFromFirebase() {
  try {
    const collectionRef = firestore.collection("userJoinedTournaments"); // Replace "your-collection-name" with the actual collection name where your data is stored

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
export const updatePublishStudentDataForAllInFirestore = async (studentData) => {
  // Initialize an empty object to store the transformed data
  let updateNewData = {};

  // Iterate through each studentData item
  studentData.forEach((eachStudentData) => {
    // Extract the sport and timestamp from the object key
    let siz = Object.entries(eachStudentData);
    for (let i = 0; i < siz.length; i++) {
      const [sportTimestamp, sportData] = Object.entries(eachStudentData)[i];
      const [sport, timestamp] = sportTimestamp.split('##');

      // If the sport doesn't exist in updateNewData, initialize it as an empty array
      if (!updateNewData[sport]) {
        updateNewData[sport] = [];
      }

      // Iterate through the sportData and push it into the corresponding sport in updateNewData
      sportData.forEach((dataItem) => {
        updateNewData[sport].push(dataItem);
      });
    }
  });

  // Now, updateNewData will contain the desired structure

  // Iterate through updateNewData and set it in Firebase
  for (const sport in updateNewData) {
    // Replace 'your_collection_name' with the name of your new collection
    const collectionRef = firestore.collection('updateNewFinalListOfAllEvents').doc(sport);

    // Set the data for the document
    await collectionRef.set({ data: updateNewData[sport] });
    console.log(`Document '${sport}' successfully written to Firestore.`);
  }
};





export const updateTournamentInFirestore = async (tournamentId, data, file) => {
  console.log(data);
  // Update the tournament document with the provided data in Firestore
  try {
    const tournamentRef = firestore.collection("tournaments").doc(tournamentId);

    if (file) {
      // Upload the file to Firebase Storage if a new file is provided
      const storageRef = firebase.storage().ref(`pdfs/${file.name}`);
      await storageRef.put(file);
      const downloadURL = await storageRef.getDownloadURL();
      data.pdf = downloadURL;
    }

    await tournamentRef.update(data);
  } catch (error) {
    throw new Error("Error updating tournament data: " + error.message);
  }
};

export const getTournamentsFromFirestore = async () => {
  // Fetch the tournaments collection from Firestore
  try {
    const tournamentsRef = firestore.collection("tournaments");
    const snapshot = await tournamentsRef.get();
    const tournaments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return tournaments;
  } catch (error) {
    throw new Error("Error fetching tournaments data: " + error.message);
  }
};


export const CreateTournamentActionNewToFirebase = async (formData, selectedFile) => {
  console.log(formData);
  try {
    // Check for empty fields
    if (!formData.eventName ||
      !formData.selectedSport ||
      !formData.tournamentType ||
      !formData.venue ||
      !formData.date ||
      !formData.dateTime ||
      !formData.description ||
      !selectedFile) {
      throw new Error('Please fill all the required fields.');
    }

    // Save PDF file to Firebase storage
    const storageRef = storage.ref();
    const fileRef = storageRef.child(selectedFile.name);
    await fileRef.put(selectedFile);

    // Get the PDF file URL from Firebase storage
    const pdfUrl = await fileRef.getDownloadURL();

    // Create tournament data object
    const tournamentData = {
      ...formData,
      pdf: pdfUrl,
      id: `${formData.selectedSport}##${new Date().toISOString()}`,
    };

    // Save form data to Firebase firestore
    await firestore.collection('tournaments').doc(tournamentData.id).set(tournamentData);

    return "Tournament created successfully!";
  } catch (error) {
    console.error('Error creating tournament:', error);
    throw new Error('An error occurred while creating the tournament.');
  }
};


// TournamentDataFetcher.js

export const createdTournamentList = () => {
  return new Promise((resolve, reject) => {
    // Replace 'newCollection' with the actual name of your collection in Firebase
    const collectionRef = firestore.collection('tournaments');

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
export const updateEndTournamentInFirestore = async (tournamentId, updatedData) => {
  try {
    // Update the tournament data in Firestore
    await firestore.collection('Achivement').doc(tournamentId).set(updatedData);
  } catch (error) {
    throw new Error('Error updating tournament data: ' + error.message);
  }
};


