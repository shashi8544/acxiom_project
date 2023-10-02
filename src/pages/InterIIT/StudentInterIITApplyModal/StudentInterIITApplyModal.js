import React, { useState } from 'react';
import './StudentInterIITApplyModal.css';
import { updateFormData } from '../../../action/InterIITAction';
import firebase from '../../../utils/configs/firebaseConfig'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
const StudentInterIITApplyModal = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [batch, setBatch] = useState('btech');
  const [sports, setSports] = useState('');
  const [photo, setPhoto] = useState(null);

  const user = useSelector((state)=>state.auth.userData)
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (user) {
        const uid = user.uid;
        if(user.email!=email){
            alert('please enter IITPEmail ONLY');
            return;
        }
        if(phone.length!=10){
            alert("enter your phone number correctly")
            return;
        }
        if(rollNo.length!=8){
            alert("enter your rollNo number correctly")
            return;
        }

        const storageRef = firebase.storage().ref();

        // Upload the photo to Firebase Storage
        if (photo) {
          const photoRef = storageRef.child(`student_photos/${photo.name}`);
          await photoRef.put(photo);
          const photoURL = await photoRef.getDownloadURL();

          // Call the function to update the form data to Firestore and store the photo URL and UID
          await updateFormData({
            name,
            rollNo,
            email,
            phone,
            batch,
            sports,
            photoURL,
            uid, // Add the UID of the current user to the form data
          });

          // Close the modal after successful form submission
          onClose();
          setName('');
          setRollNo('');
          setEmail('');
          setPhone('');
          setBatch('');
          setSports('');
          setPhoto(null);
        } else {
          // Handle case when no photo is selected
          console.error('Please select a photo before submitting the form.');
        }
      } else {
        // Handle case when no user is logged in
        console.error('No user is logged in. Please log in before submitting the form.');
      }
    } catch (error) {
      // Handle error if needed
      console.error('Error updating form data:', error);
    }
  };

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    setPhoto(selectedPhoto);
  };

    return (
        <div className="modal__overlay">
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                <h1>Apply For InterIIT Sports Meet</h1>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="form__group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form__group">
                        <label htmlFor="rollNo">Roll No:</label>
                        <input
                            type="text"
                            id="rollNo"
                            name="rollNo"
                            value={rollNo}
                            onChange={(e) => setRollNo(e.target.value)}
                        />
                    </div>
                    <div className="form__group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Only IIT Patna Email Id"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form__group">
                        <label htmlFor="phone">Phone No:</label>
                        <input
                            type="tel"
                            id="phone"
                            placeholder="Without +91, only 10 digit"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="form__group">
                        <label htmlFor="batch">Batch:</label>
                        <select id="batch" name="batch" value={batch} onChange={(e) => setBatch(e.target.value)}>
                            <option value="btech">B.Tech/B.S</option>
                            <option value="mtech">M.Tech</option>
                            <option value="phd">PhD</option>
                        </select>
                    </div>
                    <div className="form__group">
                        <label htmlFor="sports">Sports:</label>
                        <select id="sports" name="sports" value={sports} onChange={(e) => setSports(e.target.value)}>
                            <option value="">Select a sport</option>
                            <option value="football">Football</option>
                            <option value="basketball">Basketball</option>
                            <option value="tennis">Tennis</option>
                            <option value="badminton">Badminton</option>
                            <option value="athletics">Athletics</option>
                            <option value="volleyball">Volleyball</option>
                            <option value="chess">Chess</option>
                            <option value="cricket">Cricket</option>
                            <option value="table-tennis">Table Tennis</option>
                            <option value="carrom">Carrom</option>
                            <option value="javelin-throw">Javelin Throw</option>
                            <option value="shotput-throw">Shotput Throw</option>
                            <option value="kabaddi">kabaddi</option>
                            <option value="hockey">Hockey</option>
                            <option value="squash">Squash</option>
                            <option value="swimming">Swimming</option>
                            <option value="water-polo">Water Polo</option>
                            <option value="weightlifting">Weightlifting</option>
                        </select>
                    </div>
                    <div className="form__group">
                        <label htmlFor="photo" className="upload-btn">Upload Photo:</label>
                        <div className="upload-btn-wrapper">
                            {/* <button className="upload-btn">Choose File</button> */}
                            <input
                                type="file"
                                id="photo"
                                name="photo"
                                accept="image/*"
                                onChange={handlePhotoChange} // Call the handlePhotoChange function to capture the selected photo
                            />
                            <span className="file-name">{photo ? photo.name : 'No file chosen'}</span>
                        </div>
                        {/* Optionally, you can add a preview of the selected photo */}
                        {photo && <img src={URL.createObjectURL(photo)} alt="Preview" />}
                    </div>
                    <div className="form__buttons">
                        <button type="submit" className="modal__submit-btn" onClick={handleSubmit}>
                            Submit
                        </button>
                        <button type="button" className="modal__cancel-btn" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
            <div className="modal__cross-btn" onClick={onClose}>
                &#10005;
            </div>
        </div>
    );
};

export default StudentInterIITApplyModal;
