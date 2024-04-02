import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import './Home.css'
import Hamburger from 'hamburger-react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Home = () => {
    const [isOpen, setOpen] = useState(false);
    const [isMobileScreen, setIsMobileScreen] = useState(false);

    const toggleMenu = () => {
        setOpen(!isOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobileScreen(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);
    return (
        <div>
            <Navbar />

            <div className='iitp-image'>
            <div className="text">
                <h1 >Welcome to Acxiom Store</h1>
                <p>
                    “The aspirations of sports enthusiasts of books is given voice by the acxiom store. </p>
            </div>
            </div>

            <section id="contact">
                <h1 className="h-primary center">Contact Us</h1>
                <div id="contact-box">
                    <form action="">
                        <div className="form-group">
                            <label for="name">Name: </label>
                            <input type="text" name="name" id="name" placeholder="Enter your name"></input>
                        </div>
                        <div className="form-group">
                            <label for="email">Email: </label>
                            <input type="email" name="name" id="email" placeholder="Enter your email"></input>
                        </div>
                        <div className="form-group">
                            <label for="phone">Phone Number: </label>
                            <input type="phone" name="name" id="phone" placeholder="Enter your phone"></input>
                        </div>
                        <div className="form-group">
                            <label for="message">Message: </label>
                            <textarea name="message" id="message" cols="30" rows="10"></textarea>
                        </div>
                    </form>
                </div>
            </section>

            <footer>
                <div classNameName="center">
                    Copyright &copy; www.sportiitp.com.
                    <span>This website is developed by  <a href='https://www.linkedin.com/in/shashi-ranjan-kumar-86405821b/' target='_blank'>shashi</a></span>
                </div>
            </footer>

        </div>
    )
}


export default Home
