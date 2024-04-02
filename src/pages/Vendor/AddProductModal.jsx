import React, { useState } from 'react';
import firebase from "../../utils/configs/firebaseConfig";
import './AddProductModal.css'; // Import the CSS file

const AddProductModal = ({ onClose }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const uniqueCode = generateUniqueCode();
  const handleAddProduct = async () => {
    try {
      const vendorId = firebase.auth().currentUser.uid;
      await firebase.firestore().collection('vendors').doc(vendorId).collection('products').add({
        name: productName,
        description: productDescription,
        price: productPrice,
        code:  uniqueCode 

      });
      onClose(); // Close the modal after adding the product
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  const generateUniqueCode = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    return `${day}${month}${year}${hours}${minutes}${seconds}`;
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Product</h2>
        <label htmlFor="productName">Product Name:</label>
        <input type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} />
        <label htmlFor="productDescription">Product Description:</label>
        <input type="text" id="productDescription" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
        <label htmlFor="productPrice">Product Price:</label>
        <input type="number" id="productPrice" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
        <button className="button-add-item" onClick={handleAddProduct}>Add Item</button>
        <button className="button-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AddProductModal;
