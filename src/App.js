//import logo from './logo.svg';
import "./App.css";
import { Route, HashRouter, Routes,Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from 'antd';
import api from "./constants/api";
import React from "react";
import NavMenu from "../src/components/NavMenu";
import logo from "../src/assets/images/media.jpg";
import Home from "./pages/home";
import BlogDetails from "./pages/BlogDetails";
import ServiceDetails from "./pages/ServiceDetails";
import TeamPage from "./pages/TeamPage";
import Events from "./pages/Events";
import EventsEdit from "./pages/EventsEdit";
import Kolgaigal from "./pages/Kolgaigal";
import Engalai from "./pages/Engalai";
import Religious from "./pages/Religious";
import Vahdhathulujjuth from "./pages/Vahdhathulujjuth";
import FromBooks from "./pages/FromBooks";
import Thoguppugal from "./pages/Thoguppugal";
import ThoguppugalSubCategory from "./pages/ThoguppugalSubcategory";
import Manitha from "./pages/Manitha";
import RegisterForm from "./pages/RegisterForm";
import Login from "./constants/LoginForm";
//import Niruvanarsub from './pages/Niruvanarsub';
//import Thunaisub from './pages/Thunaisub';
import PiraEnaipugal from "./pages/PiraEnaipugal";
import Kalvi from "./pages/kalvi";
import Kalvisub from "./pages/kalvisub";
//import Niruvanarsub from './pages/Niruvanarsub';
import Engalaisub from "./pages/Engalaisub";
//import PiraEnaipugal from './pages/PiraEnaipugal';
//import Kalvi from './pages/kalvi';
//import Kalvisub from './pages/kalvisub';
import CheckoutPage from "./pages/others/Checkout";
import Gyanagamiyangal from "./pages/Gyanagamiyangal";
import GyanagamiyangalSub from "./pages/GyanagamiyangalSub";
import Contact from "./pages/Contact";
import YaseenBro from "./pages/YaseenBro";
import Cart from "./pages/others/Cart";
import PhotoGallery from './pages/PhotoGallery';
import MagazineRegisterForm from './pages/MagazineRegisterForm';
import MagazineLogin from './pages/MagazineLogin';
import MagazineSubscripe from './pages/MagazineSubscripe';
import NoolVivaram from "./pages/NoolVivaram";
import BookDetailPage from "./pages/BookDetails";
// import { ToastProvider } from "react-toast-notifications";

function App() {
  const stripHtmlTags = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };
  const [email, setEmail] = useState([]);

  useEffect(() => {
    // Fetch sections
    api
      .get("/content/getEmail")
      .then((res) => {
        setEmail(res.data.data[0]);
      })
      .catch(() => {
        // Handle error
      });
  }, []);
  return (
    <HashRouter>
      <div class="preloader">
        <div class="loader">
          <img src="assets/images/spinner.gif" alt="imagess" />
        </div>
      </div>

      <div className="header-2">
        <div className="top-header">
          <div className="container">
            <div className="bg">
              <div className="row justify-content-between align-items-center">
                <div className="col-xl-6 col-lg-6 col-md-7">
                  <div className="top-left">
                    <ul>
                      <li>
                        <i className="flaticon-message"></i>
                        <span>{stripHtmlTags(email.description)}</span>
                      </li>
                      <li><span><Link to="/contact" className="top-left">
                          Contact Us
                        </Link></span>
                        </li>
                    </ul>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-sm-4 d-flex justify-content-sm-end justify-content-center">
                <div>
        <Link to="/MagazineLogin" target="_blank">
  <Button>EMS Magazine</Button>
  </Link>
      </div>
                  <div className="top-right">
                  <Link to="/login" className="top-right">
                          Login
                        </Link><Link to="/RegisterForm" className="top-right">
                          Register
                        </Link>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-header">
          <div className="container">
            <div className="bg">
              <div className="row align-items-center">
                <div className="d-xl-none d-lg-none d-flex col-4">
                  {/* <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <i class="flaticon-menu-button-of-three-horizontal-lines"></i>
                  </button> */}
                </div>
                <div className="col-xl-12 col-lg-12 col-12 d-flex align-items-center">
                  <div className="logo">
                    <a href="/">
                      <img
                        src={logo}
                        alt="signature"
                        width="750px"
                        height="65px"
                        style={{ paddingLeft: "300px" }}
                      />
                    </a>
                  </div>
                </div>

                <NavMenu></NavMenu>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add other routes as needed */}
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/book/:id" element={<BookDetailPage />} />
        <Route path="/service-details" element={<ServiceDetails />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/EventsEdit/:id" element={<EventsEdit />} />
        <Route path="/எங்களைப் பற்றி/:id" element={<Engalai />} />
        <Route
          path="/எங்களைப் பற்றி/:id/:subCategoryId"
          element={<Engalaisub />}
        />
            <Route
                  path= "/cart"
                  element={<Cart/>}
                />
                 <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/எங்களைப் பற்றி/:id/:id" element={<PiraEnaipugal />} />
        <Route path="/நூற்கள்/:id" element={<FromBooks />} />
        <Route path="/நூற்கள்/:id/:categoryid" element={<NoolVivaram />} />
        {/* {/* <Route path="/Ahlubaith" element={<Ahlubaith />} /> */}
        <Route path="/Kolgaigal" element={<Kolgaigal />} />
        <Route path="/தொகுப்புகள்/:id" element={<Thoguppugal />} />
        <Route
          path="/தொகுப்புகள்/:id/:subCategoryId"
          element={<ThoguppugalSubCategory />}
        />
                <Route path="/நிகழ்ச்சிகள்/:id" element={<PhotoGallery />} />

        <Route path="/மனிதா/:id" element={<Manitha />} />
        <Route path="/RegisterForm" element={<RegisterForm />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/வஹ்தத்துல் வுஜூத்/:id" element={<Religious />} />
        <Route
          path="/வஹ்தத்துல் வுஜூத்/:id/:id"
          element={<Vahdhathulujjuth />}
        />
        <Route path="/கல்வி/:id" element={<Kalvi />} />
        <Route path="/கல்வி/:id/:subCategoryId" element={<Kalvisub />} />
        <Route path="/ஞான அகமியங்கள்/:id" element={<Gyanagamiyangal />} />
        <Route
          path="/ஞான அகமியங்கள்/:id/:id"
          element={<GyanagamiyangalSub />}
        />
        <Route path="/YaseenBro" element={<YaseenBro />} />
        <Route path="/MagazineRegisterForm" element={<MagazineRegisterForm />} />
        <Route path="/MagazineLogin" element={<MagazineLogin />} />
        <Route path="/MagazineSubscripe" element={<MagazineSubscripe />} />

      </Routes>
    </HashRouter>
  );
}

export default App;
