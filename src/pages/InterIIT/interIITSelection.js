import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './interIITSelection.css';
import StudentInterIITApplyModal from "./StudentInterIITApplyModal/StudentInterIITApplyModal"
import AdminSideForInterIIT from "./AdminSideForInterIIT/AdminSideForInterIIT"
import { Link } from 'react-router-dom';
import firebase from '../../utils/configs/firebaseConfig';
const firestore = firebase.firestore();
// const firebase = firebase.firebase();
const InterIIT = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
            // Use 'where' function to query the 'admins' collection based on the current user's UID
            firestore.collection('admins').where(firebase.firestore.FieldPath.documentId(), '==', currentUser.uid).get()
                .then((querySnapshot) => {
                    if (querySnapshot.empty) {
                        console.log("hiii")
                        setIsAdmin(true);
                    }
                })
                .catch((error) => console.error('Error checking admin status:', error));
        }
    }, []);

    const handleApplyClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div className='sports_whole gradient__bg'>
            <Navbar />
            
            {isAdmin && <AdminSideForInterIIT />}
            {!isAdmin &&
                <div className="sports_round_boxes">
                    <div className="sports_apply_box" onClick={handleApplyClick}>
                        <h2 className="sports_box_heading" >Apply</h2>
                        {/* <button className="sports_apply_button">Apply Now</button> */}
                    </div>
                    <Link to='/interiit/Selected-Student' style={{ textDecoration: 'none' }}><div className="sports_selected_box">
                        <h2 className="sports_box_heading">Selected Students</h2>
                        {/* <button className="sports_selected_button">View List</button> */}
                    </div></Link>
                    <StudentInterIITApplyModal isOpen={isModalOpen} onClose={handleCloseModal} />
                    <Footer />
                </div>


            }



        </div>
    );
}

export default InterIIT;
