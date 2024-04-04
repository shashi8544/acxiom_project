// AdminUser.js

import React, { useState, useEffect } from 'react';
import firebase from "../../utils/configs/firebaseConfig";
import './Axiomuser.css';

const AdminUser = () => {
  const [activeButton, setActiveButton] = useState('vendor');
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState('');
  const [selectedVendorProducts, setSelectedVendorProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [guestListProducts, setGuestListProducts] = useState([]);
  const [orderStatusProducts, setOrderStatusProducts] = useState([]);

  useEffect(() => {
    // Fetch current user
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
    // Fetch data for cart, guest list, and order status when the respective button is clicked
    if (button === 'cart') {
      fetchCartData();
    } else if (button === 'guestList') {
      fetchGuestListData();
    } else if (button === 'orderStatus') {
      fetchOrderStatusData();
    }
  };

  const handleVendorChange = (event) => {
    setSelectedVendor(event.target.value);
  };

  const handleVendorButtonClick = async () => {
    try {
      const vendorProductsRef = firebase.firestore().collection('vendors').doc(selectedVendor).collection('products');
      const snapshot = await vendorProductsRef.get();
      const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(`Products for ${selectedVendor}:`, products);
      setSelectedVendorProducts(products);
    } catch (error) {
      console.error(`Error fetching products for ${selectedVendor}:`, error);
    }
  };

  const addToCart = async (product) => {
    try {
      const axiomuserId = currentUser.uid;
      await firebase.firestore().collection('Axiomuser').doc(axiomuserId).collection('cart').doc(product.id).set(product);
      console.log('Product added to cart successfully:', product);
      // Optionally, you can also remove the product from the selectedVendorProducts list
      fetchCartData(); // Fetch updated cart data after adding the product
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const axiomuserId = currentUser.uid;
      await firebase.firestore().collection('Axiomuser').doc(axiomuserId).collection('cart').doc(productId).delete();
      console.log('Product removed from cart successfully');
      fetchCartData(); // Fetch updated cart data after removing the product
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  const addToGuestList = async (product) => {
    try {
      const axiomuserId = currentUser.uid;
      await firebase.firestore().collection('Axiomuser').doc(axiomuserId).collection('guestList').doc(product.id).set(product);
      console.log('Product added to guest list successfully:', product);
      // Optionally, you can also remove the product from the selectedVendorProducts list
      fetchGuestListData(); // Fetch updated guest list data after adding the product
    } catch (error) {
      console.error('Error adding product to guest list:', error);
    }
  };

  const removeFromGuestList = async (productId) => {
    try {
      const axiomuserId = currentUser.uid;
      await firebase.firestore().collection('Axiomuser').doc(axiomuserId).collection('guestList').doc(productId).delete();
      console.log('Product removed from guest list successfully');
      fetchGuestListData(); // Fetch updated guest list data after removing the product
    } catch (error) {
      console.error('Error removing product from guest list:', error);
    }
  };

  const fetchCartData = async () => {
    try {
      const axiomuserId = currentUser.uid;
      const cartRef = firebase.firestore().collection('Axiomuser').doc(axiomuserId).collection('cart');
      const snapshot = await cartRef.get();
      const cartProductsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCartProducts(cartProductsData);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const fetchGuestListData = async () => {
    try {
      const axiomuserId = currentUser.uid;
      const guestListRef = firebase.firestore().collection('Axiomuser').doc(axiomuserId).collection('guestList');
      const snapshot = await guestListRef.get();
      const guestListProductsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGuestListProducts(guestListProductsData);
    } catch (error) {
      console.error('Error fetching guest list data:', error);
    }
  };

  const fetchOrderStatusData = async () => {
    try {
      const axiomuserId = currentUser.uid;
      const orderStatusRef = firebase.firestore().collection('Axiomuser').doc(axiomuserId).collection('orderStatus');
      const snapshot = await orderStatusRef.get();
      const orderStatusProductsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrderStatusProducts(orderStatusProductsData);
    } catch (error) {
      console.error('Error fetching order status data:', error);
    }
  };

  const buyProducts = () => {
    // Calculate total price of products in the cart
    const totalPrice = cartProducts.reduce((acc, curr) => acc + curr.price, 0);
    
    // Construct the SBI payment URL with the total price
    const sbiPaymentUrl = `https://www.onlinesbi.sbi/sbicollect/payment/listinstitution.htm`;
  
    // Redirect to the SBI payment portal
    window.location.href = sbiPaymentUrl;
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
        <div>
          <label htmlFor="vendor-dropdown">Select a Vendor:</label>
          <select id="vendor-dropdown" value={selectedVendor} onChange={handleVendorChange}>
            <option value="">-- Select a vendor --</option>
            {vendors.map((vendorName, index) => (
              <option key={index} value={vendorName}>{vendorName}</option>
            ))}
          </select>
          <button onClick={handleVendorButtonClick}>Get Products</button>
        </div>
      )}
      {activeButton === 'vendor' && selectedVendorProducts.length > 0 && (
        <div className="selected-vendor-products">
          <h2>Selected Vendor Products</h2>
          {selectedVendorProducts.map(product => (
            <div key={product.id} className="product-container">
              <h3>{product.name}</h3>
              <p>Description: {product.description}</p>
              <p>Price: {product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
              <button onClick={() => addToGuestList(product)}>Add to Guest List</button>
            </div>
          ))}
        </div>
      )}
      {activeButton === 'cart' && (
        <div className="cart-container">
          <h2>Cart</h2>
          {cartProducts.map(product => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>Description: {product.description}</p>
              <p>Price: {product.price}</p>
              <button onClick={() => removeFromCart(product.id)}>Remove from Cart</button>
              <button onClick={buyProducts}>Buy</button>
            </div>
          ))}
        </div>
      )}
      {activeButton === 'guestList' && (
        <div className="guest-list-container">
          <h2>Guest List</h2>
          {guestListProducts.map(product => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>Description: {product.description}</p>
              <p>Price: {product.price}</p>
              <button onClick={() => removeFromGuestList(product.id)}>Remove from Guest List</button>
            </div>
          ))}
        </div>
      )}
      
      {activeButton === 'orderStatus' && (
        <div className="order-status-container">
          <h2>Order Status</h2>
          {orderStatusProducts.map(product => (
            <div key={product.id} className="order-status-card">
              <h3>{product.name}</h3>
              <p>Description: {product.description}</p>
              <p>Price: {product.price}</p>
              <button>Failed</button>
            </div>
          ))}
        </div>
      )}
      {/* Render other content components for other buttons */}
    </div>
  );
};

const PaymentContent = () => {
  return (
    <div>
      <p>This is payment content</p>
    </div>
  );
};

export default AdminUser;
