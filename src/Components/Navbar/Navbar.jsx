import React from 'react'
import './navbar.css'

const Navbar = () => {
  return (
    <div className="navbar_whole">
      <div className="navbar_left">
        <h1>Sports IIT PATNA</h1>
      </div>
      <div className="navbar_right">
      <p><a href="home">Home</a></p>
      <p><a href="tour">Tournament</a></p>
      <p><a href="achieve">Achievements</a></p>
      <p><a href="sports">Sports</a></p>
      </div>
          
         
        </div>
  )
}

export default Navbar
