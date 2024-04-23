// ServiceDetails.js
import React, { useState, useEffect } from 'react';
import ReactHtmlParser from "react-html-parser";
//import { useParams } from 'react-router-dom';
import api from '../constants/api';

// const stripHtmlTags = (htmlString) => {
//     const doc = new DOMParser().parseFromString(htmlString, 'text/html');
//     return doc.body.textContent || '';
//   };
const Thandhainayagam = () => {
    const [content, setContent] = useState(null);
   // const {id}=useParams();
    useEffect(() => {
        const fetchContent = () => {
            api.get("/content/getThandhai")
                .then(response => {
                    setContent(response.data.data);
                    console.log("Content", response.data.data);
                })
                .catch(error => {
                    console.error('Error fetching content:', error);
                });
        };

        fetchContent();
    }, []);


    // useEffect(()=>{
    //  fetchContent();
    //  });

    return (
        <div>
            {/* <div className="header">
                <div className="top-header">
                    <div className="container">
                        <div className="row no-gutters justify-content-between align-items-center">
                            <div className="col-xl-4 col-lg-5 col-sm-8">
                                <div className="top-left">
                                    <ul>
                                        <li><i className="flaticon-message"></i><span>youremailhere@gmail.com</span></li>
                                        <li><i className="flaticon-phone-call"></i><span>+008 1234 56789</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-sm-4 d-flex justify-content-sm-end justify-content-center">
                                <div className="top-right">
                                    <a href="#" className="fb"><i className="flaticon-facebook"></i></a>
                                    <a href="#" className="tw"><i className="flaticon-twitter"></i></a>
                                    <a href="#" className="ggl"><i className="flaticon-google-plus-logo"></i></a>
                                    <a href="#" className="ld"><i className="flaticon-linkedin"></i></a>
                                    <a href="#" className="yt"><i className="flaticon-youtube"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bottom-header">
                    <div className="bg">
                        <div className="container">
                            <div className="bg-2">
                                <div className="bg-3">
                                    <div className="row">
                                        <div className="d-xl-none d-lg-none col-4">
                                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                                <i className="flaticon-menu-button-of-three-horizontal-lines"></i>
                                            </button>
                                        </div>
                                        <div className="col-xl-2 col-lg-1 col-4 d-flex align-items-center">
                                            <div className="logo">
                                                <a href="#">
                                                    <img src="assets/images/logo.png" alt="LOGO" />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-xl-8 col-lg-9 next">
                                            <nav className="navbar navbar-expand-lg navbar-light">
                                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                                    <ul className="navbar-nav mr-auto">
                                                        <li className="nav-item dropdown">
                                                            <a className="nav-link" href="#" id="homeDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                HOME
                                                            </a>
                                                            <ul className="dropdown-menu" aria-labelledby="homeDropdown">
                                                                <li><a className="dropdown-item" href="index.html">Home One</a></li>
                                                                <li><a className="dropdown-item" href="index-2.html">Home Two</a></li>
                                                            </ul>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="/about">ABOUT US</a>
                                                        </li>
                                                        <li className="nav-item dropdown">
                                                            <a className="nav-link dropdown-toggle" href="#" id="serviceDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                EDUCATION
                                                            </a>
                                                            <ul className="dropdown-menu" aria-labelledby="serviceDropdown">
                                                                <li><a className="dropdown-item" href="/service-details">Jamiya Yaseen Arabic College</a></li>
                                                                <li><a className="dropdown-item" href="/service">Help Education</a></li>
                                                                <ul className="dropdown-item" aria-labelledby="helpEducationDropdown">
                                                                    
                                                                    <li><a className="dropdown-item" href="#">English and Arabic Brochure</a></li>
                                                                    <li><a className="dropdown-item" href="#">Submenu Item 2</a></li>
                                                                </ul>
                                                            </ul>
                                                        </li>
                                                        <li className="nav-item dropdown">
                                                            <a className="nav-link dropdown-toggle" href="#" id="pageDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                PAGES
                                                            </a>
                                                            <ul className="dropdown-menu" aria-labelledby="pageDropdown">
                                                                <li><a className="dropdown-item" href="/team">Team</a></li>
                                                                <li><a className="dropdown-item" href="/team-details">Team Details</a></li>
                                                                <li><a className="dropdown-item" href="/testimonial">Testimonial</a></li>
                                                                <li><a className="dropdown-item" href="/pricing">Pricing</a></li>
                                                                <li><a className="dropdown-item" href="/faq">FAQ</a></li>
                                                                <li><a className="dropdown-item" href="/error">Error 404</a></li>
                                                            </ul>
                                                        </li>
                                                        <li className="nav-item dropdown">
                                                            <a className="nav-link dropdown-toggle" href="#" id="projectDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                PORTFOLIO
                                                            </a>
                                                            <ul className="dropdown-menu" aria-labelledby="projectDropdown">
                                                                <li><a className="dropdown-item" href="/portfolio">Portfolio</a></li>
                                                                <li><a className="dropdown-item" href="/portfolio-details">Portfolio Details</a></li>
                                                            </ul>
                                                        </li>
                                                        <li className="nav-item dropdown">
                                                            <a className="nav-link dropdown-toggle" href="#" id="blogDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                NEWS
                                                            </a>
                                                            <ul className="dropdown-menu" aria-labelledby="blogDropdown">
                                                                <li><a className="dropdown-item" href="/blog-l-bar">Blog Left Bar</a></li>
                                                                <li><a className="dropdown-item" href="/blog-r-bar">Blog Right Bar</a></li>
                                                                <li><a className="dropdown-item" href="/blog-details">Blog Details</a></li>
                                                            </ul>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="/contact">CONTACTS</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </nav>
                                        </div>
                                        <div className="col-xl-2 col-lg-2 col-4">
                                            <div className="bottom-right">
                                                <a href="#" className="follow">Follow Us</a>
                                                <form className="nav-form">
                                                    <input type="search" placeholder="Search......" required />
                                                    <button><i className="flaticon-magnifying-glass-search"></i></button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="breadcrumb service-breadcrumb">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-3 col-lg-3">
                            <div className="part-txt">
                                <h1>Education</h1>
                                <ul>
                                    <li>Home</li>
                                    <li>-</li>
                                    <li>Jamia Yaseen</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="service-details">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 next">
                            <div className="tab-content" id="v-pills-tabContent">
                                <div className="tab-pane fade show active" id="v-pills-one" role="tabpanel" aria-labelledby="v-pills-one-tab">
                                    <div className="main-content">

                                        <div>
                                            {content &&
                                                content.map(item => (
                                                    <div key={item.content_id}>
                                                        <h2>{item.title}</h2>
                                                        {/* <img
                                                            src={`http://emsmedia.net/magazine/web_control/images/article/img/2117504070.jpg`}
                                                            alt={item.alt}
                                                            width="300px"
                                                            height="250px"
                                                        /> */}
                                                        <p>
                                                        {ReactHtmlParser(item.description)}
                                                        {/* {stripHtmlTags(item.description)} */}
                                                        </p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Thandhainayagam;
