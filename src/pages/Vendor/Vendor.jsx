import React, { useState, useEffect } from 'react';
import firebase from "../../utils/configs/firebaseConfig";
import './Vendor.css'; // Import the CSS file
import AddProductModal from './AddProductModal'; // Import the AddProductModal component

const VendorPage = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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
    // Fetch products data from Firestore if currentUser exists
    if (currentUser) {
      const fetchData = async () => {
        try {
          const vendorId = currentUser.uid; // Get the current vendor's UID
          const productsRef = firebase.firestore().collection('vendors').doc(vendorId).collection('products');
          const snapshot = await productsRef.get();
          const productsData = snapshot.docs.map(doc => {
            const productData = doc.data();
            const productId = doc.id;
            const productType = productData.type || 'General'; // Default to 'General' if type is not specified
             // Generate unique code based on current date and time
            return { id: productId, type: productType,...productData };
          });
          setProducts(productsData);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

      fetchData();
    }
  }, [currentUser]);

  const handleAddProduct = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to generate unique code based on current time and date
  

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
                  <p>Type: {product.type}</p>
                  <p>Code: {product.code}</p>
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
