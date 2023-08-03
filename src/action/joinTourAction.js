import uuid from "uuid";
import store from "../store";
import { message } from "antd";
import * as actionTypes from "./types";
import firebase from "../utils/configs/firebaseConfig";

const database = firebase.database();
const firestore = firebase.firestore();


export const updateJoinTeamData = (teamData) => {
  const [teamName, captainName, players] = teamData;

  // Your Firebase Firestore update code here
  firestore.collection('newCollection').doc("getset").set({
    teamName: teamName,
    captainName: captainName,
    players: players
  })
  .then(() => {
    console.log('Team data updated to Firebase');
    // You can perform any additional actions or display a success message here
  })
  .catch((error) => {
    console.error('Error updating team data to Firebase:', error);
    // You can handle the error and display an error message here
  });
};
export const updateUserJoinedTournamentInBackend = async (userId, tournamentId, joinData) => {
  try {
    // Assuming you have a collection called "userJoinedTournaments" in Firestore
    const userJoinedTournamentsRef = firestore.collection("userJoinedTournaments").doc(userId);

    await userJoinedTournamentsRef.set(
      {
        [tournamentId]: firebase.firestore.FieldValue.arrayUnion(joinData),
        // You can add any other relevant data you want to store about the user's join here
      },
      { merge: true }
    );

    // Optionally, you can also update the tournaments collection to mark that the user has joined the tournament.
    // For example, if you have a collection called "tournaments", you can update the document with the given "tournamentId"
    // to add the user's information to the "participants" field or any other relevant field in that document.

    return true; // Return true to indicate that the update was successful
  } catch (error) {
    console.error("Error updating user joined tournament:", error);
    return false; // Return false to indicate that the update failed
  }
};
export const fetchUserJoinedTournamentsFromBackend = async (userId) => {
  try {
    const userTournamentsRef = firestore.collection("userJoinedTournaments").doc(userId);
    const userTournamentsSnapshot = await userTournamentsRef.get();

    if (userTournamentsSnapshot.exists) {
      const userTournamentsData = userTournamentsSnapshot.data();
      console.log(userTournamentsData);
      // Convert the object of tournaments data into an array with IDs included
      const joinedTournaments = Object.entries(userTournamentsData).map(([tournamentId, tournamentData]) => ({
        id: tournamentId, // Include the ID in the object
        ...tournamentData, // Spread the rest of the tournament data
      }));
      console.log("jdfkkd",joinedTournaments);

      return joinedTournaments;
    } else {
      return [];
    }
  } catch (error) {
    throw new Error("Error fetching user joined tournaments: " + error.message);
  }
};



// // export const getJoinTourMatchesProject = (candidateId) =>  async (dispatch) => {
// //     dispatch({ type: actionTypes.INTERIIT_JOIN_TOUR_PROJECTS_LOADING});
// // 	let joinTourMatchesProjectList = [];
// //     await database
// //         .collection("StudentProfile")
// // 		.doc("8lpnV6kQEfd3oLiNKgSe")
// //         .get()
// //         .then(async (sportDoc) => {
// // 			let confidentProjectsId = []
// // 			 confidentProjectsId.push(sportDoc.data().confidentProjects || []);
// // 			for (var i = 0; i < confidentProjectsId.length; i++){
// // 				await database
// // 				.collection("InternshipJobs")
// // 				.doc(confidentProjectsId[i])
// // 				.get()
// // 				.then((confidentJobs) => {
// // 					confidentProjectsList.push(confidentJobs.data());
// // 				})
// // 			}
// // 			dispatch({
// // 				type: actionTypes.GET_GALKLAB_CONFIDENT_PROJECTS,
// // 				payload: confidentProjectsList,
// // 			});
	
// // 			dispatch({
// // 				type: actionTypes.GALKLAB_CONFIDENT_PROJECTS_LOADING,
// // 				payload: false,
// // 			});
// //     	})
// //     .catch((err) => {
// //         console.log("Confident Projects data load error: ", err);
// //         dispatch({ type: actionTypes.GALKLAB_CONFIDENT_PROJECTS_ERROR});
// // 		dispatch({
// //             type: actionTypes.GALKLAB_CONFIDENT_PROJECTS_LOADING,
// //             payload: false,
// //         });
// //     });

// // };

// export const addJoinTourProject = (JoinTourInfo) => (dispatch) =>{

//   // firestore.collection('newCollection').doc("dshfkjskdhfksdf").set({teamName: teamName , captainName: captainName, players:players})
//   // .then(() => {
//   //   console.log('Form data updated to Firebase');
//   //   // You can perform any additional actions or display a success message here
//   // })
//   // .catch((error) => {
//   //   console.error('Error updating form data to Firebase:', error);
//   //   // You can handle the error and display an error message here
//   // });
//     // console.log("hello I am Here");
//     // if(JoinTourInfo.length==0){
//     //     console.log("Yes it is zero");
//     // }
//     // console.log(JoinTourInfo);
//     // dispatch({
//     //     type: actionTypes.SET_JOIN_TOUR_DATA_LOADING,
//     //     payload: true,
//     // });
//     // var dataToUpdate = {...JoinTourInfo};
//     // const playerId = store.getState().firebase.auth.uid;
//     // database
//     //         .collection("sports")
//     //         .doc("32cswIxJBoY3uelyOw4N")
//     //         .set({
//     //             teamName: dataToUpdate.teamName,
//     //             captionName: dataToUpdate.teamName,
//     //             playerName: dataToUpdate.playerName || [],
//     //         })
//     //         .then(()=>{
//     //             dispatch({
//     //                 type: actionTypes.SET_JOIN_TOUR_DATA_LOADING,
//     //                 payload: true,
//     //             });
//     //             message.success("Data updated successfully!");
//     //         })
//     //         .catch((error)=>{
//     //             dispatch({
//     //                 type: actionTypes.SET_JOIN_TOUR_DATA_LOADING,
//     //                 payload: true,
//     //             });
//     //             message.error("Error in updating data !");
// 	// 		    console.log(error);
//     //         });
// };