import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import './Home.css'
import Hamburger from 'hamburger-react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import AutomaticImageChanger from "../../Models/ImageChangerHomePage/automaticImageChangerHomePage";
import basketballImage from '../../assets/img/basketball-g146538a88_1280.jpg';
import badmintonImage from '../../assets/img/badminton-g859bb222c_1280.jpg';
import athleteImage from '../../assets/img/athlete-gb45b1e826_1280.jpg';
import footballImage from '../../assets/img/football-g3e1c63b19_1280.jpg';
import volleyballImage from '../../assets/img/volleyball-g5dae5d610_1280.jpg';
import cricketImage from '../../assets/img/cricketFrontPage.jpg'
import chessImage from '../../assets/img/black-gc2b09a313_1280.jpg';
import sunsetImage from '../../assets/img/sunset-g5631e5178_1280.jpg';
import BasketballPage from './Games/Basketball/Basketball';
import AchievementImg from '../../assets/img/achieve.jpeg'

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

            {/* {isMobileScreen && (
                <div className='hamburger-icon'>
                    <Hamburger toggled={isOpen} toggle={toggleMenu} />
                </div>
            )}

            {isMobileScreen && isOpen && (
                <div className='hamburget-menu'>

                    <Navbar />
                </div>

            )}
            {!isMobileScreen && (
                <div className='navbar-container'>
                    <Navbar />
                </div>
            )} */}
            {/* <div className='ran'>
                <AutomaticImageChanger id="AutomaticImageChangerContainer" />
            </div>
            <section id="home" style={{
                // backgroundImage: {sunsetImage}
            }}>
                <h1 className="h-primary">Welcome to IIT Patna Sports</h1>
                <p>
                    “The aspirations of sports enthusiasts of IIT Patna is given voice by the sports cell. </p>

            </section> */}
            <div className='iitp-image'>
            <div className="text">
                <h1 >Welcome to IIT Patna Sports</h1>
                <p>
                    “The aspirations of sports enthusiasts of IIT Patna is given voice by the sports cell. </p>
            </div>
            </div>
            <div className="h-primary center">Games</div>


            <section id="game-container">

                <div id="games">
                    <Link to="/basketball" style={{ textDecoration: 'none' }}>
                        <div className=" box1 box">
                            {/* <img src={basketballImage} alt=""></img> */}
                            <h2 className="h-secondary center">Basketball {/*link to basketball page*/}</h2>
                        </div>
                    </Link>

                    <Link to="/Badminton" style={{ textDecoration: 'none' }}>
                        <div className="box box2">
                            {/* <img src={badmintonImage} alt=""></img> */}
                            <h2 className="h-secondary center">Badminton</h2>

                        </div>
                    </Link>
                    <Link to="/athlete" style={{ textDecoration: 'none' }}>
                        <div className="box box3">
                            {/* <img src="https://firebasestorage.googleapis.com/v0/b/interiit-57302.appspot.com/o/Image%2Fathlete-gb45b1e826_1280.jpg?alt=media&token=4d3d2a42-2429-4651-b364-43539b7a20d2" alt="Image From Firebase"></img> */}
                            <h2 className="h-secondary center">Athlete</h2>

                        </div>
                    </Link>
                    <Link to="/football" style={{ textDecoration: 'none' }}>
                        <div className="box box4">
                            {/* <img src={footballImage} alt=""></img> */}
                            <h2 className="h-secondary center">Football</h2>

                        </div>
                    </Link>
                    <Link to="/volleyball"  style={{ textDecoration: 'none' }} >
                    <div className="box box5">
                        {/* <img src={volleyballImage} alt=""></img> */}
                        <h2 className="h-secondary center">Volleyball</h2>

                    </div>
                    </Link>
                    <Link to="/chess" style={{ textDecoration: 'none' }}>
                        <div className="box box6">
                            {/* <img src={chessImage} alt=""></img> */}
                            <h2 className="h-secondary center">Chess</h2>

                        </div>
                    </Link>
                    <Link to="/cricket" style={{ textDecoration: 'none' }}>
                        <div className="box box7">
                            {/* <img src={cricketImage} alt=""></img> */}
                            <h2 className="h-secondary center">Cricket</h2>
                        </div>
                    </Link>
                </div>
            </section>

            <section id="achievement-section">
                <h1 className="h-primary center">Our Achievement</h1>
                <div id="achievements">
                    <Carousel showArrows={true} showThumbs={false} infiniteLoop={true}>
                        <div className="achievements-item">
                            <img src={AchievementImg} alt="Achievement 1" />
                        </div>
                        <div className="achievements-item">
                            <img src={athleteImage} alt="Achievement 2" />
                        </div>
                        <div className="achievements-item">
                            <img src={badmintonImage} alt="Achievement 3" />
                        </div>

                    </Carousel>
                </div>
            </section>

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
                    <span>This website is developed by sweta,pritam and <a href='https://www.linkedin.com/in/shashi-ranjan-kumar-86405821b/' target='_blank'>shashi</a></span>
                </div>
            </footer>

        </div>
    )
}


export default Home
