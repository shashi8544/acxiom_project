import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import './Achieve.css';
const Achieve = () => {
  return (
    <div>
      <Navbar />
      <div className='achieve-card'>
        <div className='inner-achieve-card'>
          <div className='tournament-Name'>
            <h1>Global Domination</h1>
          </div>
          <div className='event-image'>
            <img src="" alt="The image will be here" />
          </div>
          <div className='event-Description'>
            1st Prize : Me Pritam Raj
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga ex blanditiis harum qui! Quas dolorum dolore laboriosam impedit, delectus obcaecati nesciunt laborum. Eaque quos pariatur tempora, quaerat dolorum consectetur, velit facere dolor optio eum alias voluptates provident doloremque possimus ratione.
          </div>
        </div>

      </div>
    </div>
  )
}

export default Achieve
