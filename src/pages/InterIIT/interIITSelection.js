import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import StudentInterIITApplyModal from './StudentInterIITApplyModal/StudentInterIITApplyModal';
import AdminSideForInterIIT from './AdminSideForInterIIT/AdminSideForInterIIT';
import { Link } from 'react-router-dom';
import { fetchStartSelectionField } from '../../action/InterIITAction';
import { fetchAdminStatus } from "../../action/authenticationAction";
import firebase from '../../utils/configs/firebaseConfig';
import { setUser, setAdminStatus, setIsIITPatnaUser } from '../../action/authenticationAction';
import './interIITSelection.css'

const InterIIT = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    // const shouldShowModal = useSelector((state) => state.modal.shouldShowModal);
    // console.log(shouldShowModal, "sldfl");
    const isAdmin = useSelector((state) => state.auth.isAdmin);
    const user = useSelector((state) => state.auth.userData);
    let isIITPatnaUser = false;
    if (user) {

        isIITPatnaUser = user.email.endsWith('@iitp.ac.in');
    }
    // console.log(user.email.endsWith('@iitp.ac.in'));
    console.log(isIITPatnaUser)
    useEffect(() => {
        // dispatch(fetchAdminStatus(user));
        dispatch(fetchStartSelectionField());
    }, [dispatch]);

    const handleApplyClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Check if the user is authenticated and if their email ends with "@iitp.ac.in"
    if (isIITPatnaUser || isAdmin) {
        return (
            <div className='sports_whole gradient__bg'>
                <Navbar />

                {isAdmin && <AdminSideForInterIIT />}
                {!isAdmin && 
                        <h1 id="interIITHeadingPara">Your Journey to InterIIT</h1>
                   
                }
                {!isAdmin && (
                    <div className='sports_round_boxes'>
                        <div className='sports_apply_box' onClick={handleApplyClick}>
                            <h2 className='sports_box_heading'>Apply</h2>
                        </div>
                        <Link to='/interiit/Selected-Student' style={{ textDecoration: 'none' }}>
                            <div className='sports_selected_box'>
                                <h2 className='sports_box_heading'>Selected Students</h2>
                            </div>
                        </Link>
                        {true && <StudentInterIITApplyModal isOpen={isModalOpen} onClose={handleCloseModal} />}

                    </div>
                )}
            </div>
        );
    } else {
        return (
            <div>
                <Navbar />
                <div>You are not allowed to view this page</div>
            </div>
        );
    }
};

export default InterIIT;
