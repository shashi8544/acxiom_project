import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import { fetchSelectedStudentDataFromFirebase } from "../../../action/InterIITAction";
import './StudentSelectedForInterIIT.css';

const SelectedStudentsForInterIIT = () => {
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    fetchSelectedStudentDataFromFirebase().then((data) => {
      setStudentsData(data);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div className='SelectedStudentContainer'>
        <h1 className='SelectedStudentsHeading'>Selected Students for InterIIT</h1>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectedStudentsForInterIIT;
