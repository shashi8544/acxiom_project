import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import Stats from '../../components/Stats/Stats';
import Footer from '../../components/Footer/Footer';
import './sports.css'

const Sports = () => {
  return (
    <div className='sports_whole gradient__bg'>
      <Navbar />
      <div className="sports_sportSelect">
        <div className="sports_sportSelect_left">
          <label htmlFor="sports">Sports: </label>
          <select name="mysport" id="spt">
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
      <div className="sports_box">
        <div className="sports_box_npbr">
          <h3>Name</h3>
          <h3>Position</h3>
          <h3>Batch</h3>
          <h3>Rollno</h3>
        </div>
        <div className="sports_box_stats">
          <p><Stats /></p>
          <p><Stats /></p>
          <p><Stats /></p>
          <p><Stats /></p>
          <p><Stats /></p>
          <p><Stats /></p>
          <p><Stats /></p>
          <p><Stats /></p>
          <p><Stats /></p>
          <p><Stats /></p>
          <p><Stats /></p>
          <p><Stats /></p>
        </div>
      </div>

     <Footer/>
    </div>
  )
}

export default Sports
