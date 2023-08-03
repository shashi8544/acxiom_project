// tournamentService.js

import firebase from "../utils/configs/firebaseConfig";
import { useState,useEffect } from "react";
import {createdTournamentCard} from "../pages/CreateTournament/createdTournamentCard";
const firestore = firebase.firestore();
const storage = firebase.storage();

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
        //  !formData.time || 
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
    await firestore.collection('tournaments').add(tournamentData);

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
  
// export default CreateTournamentActionNewToFirebase;
// export default TournamentCreatedTournament;

