//import logo from './logo.svg';
import './App.css';
import {  Route,HashRouter ,Routes} from 'react-router-dom';
import NavMenu from "../src/components/NavMenu";
import logo from "../src/assets/images/United Logo.png";
import Home from './pages/home';
import BlogDetails from './pages/BlogDetails';
import ServiceDetails from './pages/ServiceDetails';
import TeamPage from './pages/TeamPage';
import Events from './pages/Events';
import EventsEdit from './pages/EventsEdit';
import Ahlubaith from './pages/Ahlubaith';
import Kolgaigal from './pages/Kolgaigal';
import Thandhainayagam from './pages/Thandhainayagam';
//import Vappanayagam from './pages/Vappanayagam';
import { useEffect, useState } from "react";
import api from "./constants/api";

import React from "react";
import FromBooks from './pages/FromBooks';


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
        <div class="loader"><img src="assets/images/spinner.gif" alt="imagess" /></div>
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
                    </ul>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-sm-4 d-flex justify-content-sm-end justify-content-center">
                  <div className="top-right">
                    <a
                      href="https://www.facebook.com/profile.php?id=100085667005902"
                      className="fb"
                      style={{ marginRight: "10px" }}
                    >
                      <i className="flaticon-facebook"></i>
                    </a>
                    <a
                      href="https://twitter.com/PenaKural"
                      className="tw"
                      style={{ marginRight: "10px" }}
                    >
                      <i className="flaticon-twitter"></i>
                    </a>
                    <a href="#" className="ld" style={{ marginRight: "10px" }}>
                      <i className="flaticon-linkedin"></i>
                    </a>
                    <a
                      href="https://www.youtube.com/channel/UCl-FlAugZVHLXwJLWZ4C0TA"
                      className="yt"
                      style={{ marginRight: "10px" }}
                    >
                      <i className="flaticon-youtube"></i>
                    </a>
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
                <div className="col-xl-1 col-lg-1 ">
                  <div className="logo">
                    <a href="/">
                      <img
                        src={logo}
                        alt="signature"
                      
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
          <Route path="/service-details" element={<ServiceDetails />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/EventsEdit/:id" element={<EventsEdit />} />
          <Route path="/Ahlubaith" element={<Ahlubaith />} />
          <Route path="/Kolgaigal" element={<Kolgaigal/>} />
          <Route path="/Thandhainayagam" element={<Thandhainayagam/>} />

        </Routes>
    
    </HashRouter>
  );
}

export default App;
