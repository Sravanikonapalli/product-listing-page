import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Products from './Products';
import '../styles/productspage.css';
const ProductsPage = () => {
    return (
        <>
        <Header/>
        <hr/>
        <div>
            <h1 className='heading'>Discover our products</h1>
            <p className='text'>Welcome to the products page. Browse our collection below.</p>
            <hr/>
            <div className="products-container">
                <Products/>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default ProductsPage;