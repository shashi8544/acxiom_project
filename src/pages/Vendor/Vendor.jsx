import React, { useState, useEffect } from 'react';
import firebase from "../../utils/configs/firebaseConfig";
import './Vendor.css'; // Import the CSS file
import AddProductModal from './AddProductModal'; // Import the AddProductModal component

const VendorPage = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch products data from Firestore
    const fetchData = async () => {
      try {
        const vendorId = firebase.auth().currentUser.uid; // Get the current vendor's UID
        const productsRef = firebase.firestore().collection('vendors').doc(vendorId).collection('products');
        const snapshot = await productsRef.get();
        const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddProduct = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="vendor-page-container">
      <h1>Vendor Page</h1>
      <div className="header">
        <h2>Product List</h2>
        <button className="button-add-product" onClick={handleAddProduct}>Add Product</button>
      </div>
      {products.length > 0 ? (
        <div className="products-container">
          <ul>
            {products.map(product => (
              <li key={product.id} className="product-item">
                {/* Render each product */}
                <div>
                  <h3>{product.name}</h3>
                  <p>Description: {product.description}</p>
                  <p>Price: {product.price}</p>
                  {/* Add more product details as needed */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h1 className="no-products-message">No products for selling</h1>
      )}
      {showModal && <AddProductModal onClose={handleCloseModal} />}
    </div>
  );
}

export default VendorPage;
