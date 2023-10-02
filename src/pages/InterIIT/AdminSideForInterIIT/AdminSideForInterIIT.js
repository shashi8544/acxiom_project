import React, { useEffect, useState } from 'react';
import {
    fetchRequestedStudentDataFromFirebase,
    fetchSelectedStudentDataFromFirebase,
    fetchRejectedStudentDataFromFirebase,
    moveDataForRejected,
    moveDataForSelected,
    updatePublishStudentDataInFirestore,
    removePublishStudentDataInFirestore,
    updateStartStatusInFirestore,
    exportFirestoreToExcel
} from "../../../action/InterIITAction";
import './AdminSideForInterIIT.css';

const SelectedStudentsForInterIIT = () => {
    const [studentsData, setStudentsData] = useState([]);
    const [studentsPublishData, setStudentPublishData] = useState([]);
    const [selectedSport, setSelectedSport] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isStart, setIsStart] = useState(false);
    const [isPublish, setIsPublish] = useState(false);
    const [showingData, setShowingData] = useState('requested');
    const [sortedBySportData, setSortedBySportData] = useState([]);

    useEffect(() => {
        const fetchStudentPublishData = async () => {
            const data = await fetchSelectedStudentDataFromFirebase();
            setStudentPublishData(data);
        }
        fetchStudentPublishData();
        // console.log('Hello, I am Publishing studentData',studentsPublishData);
    }, [studentsPublishData])
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
            setSortedBySportData(data);
        };

        fetchStudentsData();
    }, [showingData]);

    const handleUpdateDataToRejected = async (student) => {
        console.log(student.uid);
        await moveDataForRejected(student.uid);
        // window.location.reload();
    }
    const handleUpdateDataToSelected = async (student) => {
        console.log(student.uid);
        await moveDataForSelected(student.uid);
        // window.location.reload();
    }
    const handleSportChange = (e) => {
        const selectedSport = e.target.value;
    setSelectedSport(selectedSport);

    if (selectedSport) {
        const sortedData = studentsData.filter(student => student.sports === selectedSport);
        setSortedBySportData(sortedData);
    } else {
        setSortedBySportData(studentsData);
    }
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
    const handlePublishClick = () => {
        console.log("hello", studentsPublishData);
        setIsPublish(true);
        updatePublishStudentDataInFirestore(studentsPublishData);
    }
    const handleRemovePublishClick = () => {
        setIsPublish(false);
        removePublishStudentDataInFirestore();
    }
    const handleExportClick = async () => {
        try {
            await exportFirestoreToExcel('publishStudentList'); // Replace with your collection name
            console.log('Excel export completed successfully.');
        } catch (error) {
            console.error('Error exporting data:', error);
        }
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
                        <option value="athletics">Athletics</option>
                        <option value="badminton">Badminton</option>
                        <option value="basketball">Basketball</option>
                        <option value="carrom">Carrom</option>
                        <option value="chess">Chess</option>
                        <option value="cricket">Cricket</option>
                        <option value="football">Football</option>
                        <option value="hockey">Hockey</option>
                        <option value="javelin-throw">Javelin Throw</option>
                        <option value="kabaddi">kabaddi</option>
                        <option value="tennis">Tennis</option>
                        <option value="shotput-throw">Shotput Throw</option>
                        <option value="squash">Squash</option>
                        <option value="swimming">Swimming</option>
                        <option value="table-tennis">Table Tennis</option>
                        <option value="volleyball">Volleyball</option>
                        <option value="water-polo">Water Polo</option>
                        <option value="weightlifting">Weightlifting</option>
                    </select>
                </div>
                {/* <div className="sports_sportSelect_right">
                    <label htmlFor="year">Year: </label>
                    <select name="myyear" id="yr">
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>
                </div> */}
            </div>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Roll No"
            />
            <div className='SelectedStudentContainer'>
                <div className='ButtonsContainer'>
                    {!isStart && <button className='ActionButton' onClick={handleStartClick}>Start</button>}
                    {isStart && <button className='ActionButton' onClick={handleEndClick}>End</button>}
                    {!isPublish && <button className='ActionButton' onClick={handlePublishClick}>Publish</button>}
                    {isPublish && <button className='ActionButton' onClick={handleRemovePublishClick}>Remove From Publish</button>}
                    <button className='ActionButton' onClick={handleExportClick}>Export to Excel</button>
                </div>
                <div className="ActionButtons">

                    {showingData != 'requested' && <button className="ActionButton" onClick={handleRequestedClick}>Requested</button>}
                    {showingData == 'requested' && <button className="ActionButton1" onClick={handleRequestedClick}>Requested</button>}
                    {showingData != 'selected' && <button className="ActionButton" onClick={handleSelectedClick}>Selected</button>}
                    {showingData == 'selected' && <button className="ActionButton1" onClick={handleSelectedClick}>Selected</button>}
                    {showingData != 'rejected' && <button className="ActionButton" onClick={handleRejectedClick}>Rejected</button>}
                    {showingData == 'rejected' && <button className="ActionButton1" onClick={handleRejectedClick}>Rejected</button>}
                </div>
                <div className='SelectedStudentContent'>
                    {sortedBySportData.map((student, index) => (
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
                                    {showingData != 'rejected' && <button className='ActionButton' onClick={() => { handleUpdateDataToRejected(student) }}>
                                        Reject
                                    </button>}
                                    {showingData != 'selected' && <button className='ActionButton' onClick={() => { handleUpdateDataToSelected(student) }}>
                                        Select
                                    </button>}

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
