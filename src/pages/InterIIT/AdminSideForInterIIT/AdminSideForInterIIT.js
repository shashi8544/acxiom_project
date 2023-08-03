import React, { useEffect, useState } from 'react';
import {
    fetchRequestedStudentDataFromFirebase,
    fetchSelectedStudentDataFromFirebase,
    fetchRejectedStudentDataFromFirebase,
    updateStartStatusInFirestore
} from "../../../action/InterIITAction";
import './AdminSideForInterIIT.css';

const SelectedStudentsForInterIIT = () => {
    const [studentsData, setStudentsData] = useState([]);
    const [selectedSport, setSelectedSport] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isStart, setIsStart] = useState(false);
    const [showingData, setShowingData] = useState('requested'); // 'requested', 'selected', or 'rejected'

    useEffect(() => {
        // Fetch data based on the selected showingData
        const fetchStudentsData = async () => {
            let data;
            if (showingData === 'requested') {
                data = await fetchRequestedStudentDataFromFirebase();
            } else if (showingData === 'selected') {
                data = await fetchSelectedStudentDataFromFirebase();
            } else if (showingData === 'rejected') {
                data = await fetchRejectedStudentDataFromFirebase();
            }
            setStudentsData(data);
        };

        fetchStudentsData();
    }, [showingData]);

    const handleSportChange = (e) => {
        setSelectedSport(e.target.value);
    };

    const handleRequestedClick = () => {
        setShowingData('requested');
    };

    const handleSelectedClick = () => {
        setShowingData('selected');
    };

    const handleRejectedClick = () => {
        setShowingData('rejected');
    };

    const handleStartClick = () => {
        setIsStart(true);
        updateStartStatusInFirestore(true);
    };

    const handleEndClick = () => {
        setIsStart(false);
        updateStartStatusInFirestore(false);
    };



    return (
        <div>
            <div className="sports_sportSelect">
                <div className="sports_sportSelect_left">
                    <label htmlFor="sports">Sports: </label>
                    <select
                        name="mysport"
                        id="spt"
                        value={selectedSport}
                        onChange={handleSportChange}
                    >
                        <option value="">All</option>
                        <option value="cricket">Cricket</option>
                        <option value="volley">Volleyball</option>
                        <option value="football">Football</option>
                    </select>
                </div>
                <div className="sports_sportSelect_right">
                    <label htmlFor="year">Year: </label>
                    <select name="myyear" id="yr">
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>
                </div>
            </div>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Roll No"
            />
            <div className='SelectedStudentContainer'>
                <div className='ButtonsContainer'>
                    <button className='ActionButton' onClick={handleStartClick}>Start</button>
                    <button className='ActionButton' onClick={handleEndClick}>End</button>
                    <button className='ActionButton'>Publish</button>
                </div>
                <div className="ActionButtons">
                    <button className="ActionButton" onClick={handleRequestedClick}>Requested</button>
                    <button className="ActionButton" onClick={handleSelectedClick}>Selected</button>
                    <button className="ActionButton" onClick={handleRejectedClick}>Rejected</button>
                </div>
                <div className='SelectedStudentContent'>
                    {studentsData.map((student, index) => (
                        <div key={index} className='StudentCard'>
                            <div className='StudentImage'>
                                <img src={student.photoURL} alt={student.name} />
                            </div>
                            <div className='StudentInfo'>
                                <h2 id="StudentInfoName">{student.name}</h2>
                                <p id="studentInfoPara"><b>Roll No:</b> {student.rollNo}</p>
                                <p id="studentInfoPara"><b>Email:</b> {student.email}</p>
                                <p id="studentInfoPara"><b>Phone:</b> {student.phone}</p>
                                <p id="studentInfoPara"><b>Batch:</b> {student.batch}</p>
                                <p id="studentInfoPara"><b>Sports:</b> {student.sports}</p>
                                <div className='ActionButtons'>
                                    <button className='ActionButton'>
                                        Reject
                                    </button>
                                    <button className='ActionButton' >
                                        Select
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SelectedStudentsForInterIIT;
