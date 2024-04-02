import React, { useState, useEffect } from 'react';
import firebase from "../../utils/configs/firebaseConfig";
import './Axiomuser.css';

const AdminUser = () => {
  const [activeButton, setActiveButton] = useState('vendor');
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    // Fetch vendor usernames from Firestore collection
    const fetchVendors = async () => {
      try {
        const vendorsRef = firebase.firestore().collection('vendors');
        const snapshot = await vendorsRef.get();
        const vendorNames = snapshot.docs.map(doc => doc.id);
        setVendors(vendorNames);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };

    fetchVendors();
  }, []);

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const handleVendorButtonClick = async (vendorName) => {
    try {
      const vendorProductsRef = firebase.firestore().collection('vendors').doc(vendorName).collection('products');
      const snapshot = await vendorProductsRef.get();
      const products = snapshot.docs.map(doc => doc.data());
      console.log(`Products for ${vendorName}:`, products);
      // Do something with products, such as displaying them
    } catch (error) {
      console.error(`Error fetching products for ${vendorName}:`, error);
    }
  };

  return (
    <div className="admin-user-container">
      <h1>Welcome Username</h1>

      <div className="button-container">
        <button className={`button ${activeButton === 'vendor' ? 'active' : ''}`} onClick={() => handleButtonClick('vendor')}>
          Vendors
        </button>
        <button className={`button ${activeButton === 'cart' ? 'active' : ''}`} onClick={() => handleButtonClick('cart')}>
          Cart
        </button>
        <button className={`button ${activeButton === 'guestList' ? 'active' : ''}`} onClick={() => handleButtonClick('guestList')}>
          Guest List
        </button>
        <button className={`button ${activeButton === 'orderStatus' ? 'active' : ''}`} onClick={() => handleButtonClick('orderStatus')}>
          Order Status
        </button>
        <button className={`button ${activeButton === 'payment' ? 'active' : ''}`} onClick={() => handleButtonClick('payment')}>
          Payment
        </button>
      </div>

      {activeButton === 'payment' && <PaymentContent />}
      {activeButton === 'vendor' && (
        <div className="vendor-list">
          {vendors.map(vendorName => (
            <button key={vendorName} onClick={() => handleVendorButtonClick(vendorName)}>
              {vendorName}
            </button>
          ))}
        </div>
      )}
      {/* Render other content components for other buttons */}
    </div>
  );
}

const PaymentContent = () => {
  return (
    <div>
      <p>This is payment content</p>
    </div>
  );
}

const VendorContent = () => {
  return (
    <div>
      <p>This is vendor content</p>
    </div>
  );
}

const CartContent = () => {
  return (
    <div>
      {/* Content for Cart button */}
    </div>
  );
}

const GuestListContent = () => {
  return (
    <div>
      {/* Content for Guest List button */}
    </div>
  );
}

const OrderStatusContent = () => {
  return (
    <div>
      {/* Content for Order Status button */}
    </div>
  );
}

export default AdminUser;
