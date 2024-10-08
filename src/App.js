import "./App.css";
import { Route, HashRouter, Routes, Link } from "react-router-dom";
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
import PiraEnaipugal from "./pages/PiraEnaipugal";
import Kalvi from "./pages/kalvi";
import Kalvisub from "./pages/kalvisub";
import Footer from "./components/Footer";
import Engalaisub from "./pages/Engalaisub";
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
import Kavithai1 from "./pages/Kavithai1";
import Kavithai2 from "./pages/Kavithai2";
import Kavithai3 from "./pages/Kavithai3";
import Kavithai4 from "./pages/Kavithai4";
import Kavithai5 from "./pages/Kavithai5";
import Kavithai6 from "./pages/Kavithai6";
import BookDetailPage from "./pages/BookDetails";
import Essay1 from "./pages/Essay1";
import Essay2 from "./pages/Essay2";
import Essay3 from "./pages/Essay3";
import Essay4 from "./pages/Essay4";
import Essay5 from "./pages/Essay5";
import Essay6 from "./pages/Essay6";
import Essay7 from "./pages/Essay7";
import Essay8 from "./pages/Essay8";
import Essay9 from "./pages/Essay9";
import Vaarithathu1 from "./pages/Vaarithathu1";
import Vaarithathu2 from "./pages/Vaarithathu2";
import Vaarithathu3 from "./pages/Vaarithathu3";
import Vaarithathu4 from "./pages/Vaarithathu4";
import Vaarithathu5 from "./pages/Vaarithathu5";
import Vaarithathu6 from "./pages/Vaarithathu6";
import Vaarithathu7 from "./pages/Vaarithathu7";
import Vaarithathu8 from "./pages/Vaarithathu8";
import Vaarithathu9 from "./pages/Vaarithathu9";
import Vaarithathu10 from "./pages/Vaarithathu10";
import Vaarithathu11 from "./pages/Vaarithathu11";
import Vaarithathu12 from "./pages/Vaarithathu12";
import Vaarithathu13 from "./pages/Vaarithathu13";
import Vaarithathu14 from "./pages/Vaarithathu14";
import DetailBlog from "./pages/DetailBlog";
import Akkangal from "./pages/Akkangal";
import Magazine from "./pages/Magazine";
import MagazineArtical from './pages/MagazineArtical'
import Thoguppugal1 from "./pages/Thoguppugal1";
import Thoguppugal2 from "./pages/Thoguppugal2";
import Thoguppugal3 from "./pages/Thoguppugal3";
import Thoguppugal4 from "./pages/Thoguppugal4";
import Thoguppugal5 from "./pages/Thoguppugal5";
import Thoguppugal6 from "./pages/Thoguppugal6";
import Thoguppugal7 from "./pages/Thoguppugal7";
import Thoguppugal8 from "./pages/Thoguppugal8";
import Thoguppugal9 from "./pages/Thoguppugal9";
import Thoguppugal10 from "./pages/Thoguppugal10";
import Thoguppugal11 from "./pages/Thoguppugal11";
import Thoguppugal12 from "./pages/Thoguppugal12";
import Thoguppugal13 from "./pages/Thoguppugal13";
import Thoguppugal14 from "./pages/Thoguppugal14";

function App() {
  const stripHtmlTags = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  const [email, setEmail] = useState([]);
  const [sectiones, setSectiones] = useState([]);
  const [contactId, setContactId] = useState();

  useEffect(() => {
    api
      .get("/section/getCategoryType")
      .then((res) => {
        setSectiones(res.data.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching sections:", error);
      });
  }, []);

  useEffect(() => {
    const getSelectedLanguageFromLocalStorage = () => {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : {};
    };

    const selectedLanguage = getSelectedLanguageFromLocalStorage();
    setContactId(selectedLanguage.contact_id);
  }, []);

  const logout = () => {
    localStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  useEffect(() => {
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
      <div className="preloader">
        <div className="loader">
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
                      <li>
                        <span>
                          <Link to="/contact" className="top-left1">Contact Us</Link>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-5 d-flex justify-content-end">
                  <div className="top-left">
                    <Link to="/Magazine" target="_blank">
                      <Button>EMS Magazine</Button>
                    </Link>
                  </div>
                  <div className="top-right">
                    <Link to="/Magazine" className="top-right">Login</Link>
                    <Link to="/RegisterForm" className="top-right">Register</Link>
                  </div>
                  <div className="top-left">
                    <Link to={`/நிகழ்ச்சிகள்/${sectiones && sectiones.category_id}`} className="top-right" target="_blank">
                      <Button>EMS Web Tv Channel</Button>
                    </Link>
                  </div>
                  {contactId &&
                    <div className="top-right">
                      <Button onClick={logout} color="danger" size="sm">Logout</Button>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-header">
          <div className="container">
            <div className="bg">
              <div className="row align-items-center">
                <div className="col-12 d-flex justify-content-center">
                  <div className="logo">
                    <a href="/">
                      <img src={logo} alt="signature" className="img-fluid" />
                    </a>
                  </div>
                </div>
                <NavMenu />
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
        <Route path="/EventsEdit/:id" element={<EventsEdit />} />
        <Route path="/எங்களைப் பற்றி/:id" element={<Engalai />} />
        <Route path="/எங்களைப் பற்றி/:id/:subCategoryId" element={<Engalaisub />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/எங்களைப் பற்றி/:id/:id" element={<PiraEnaipugal />} />
        <Route path="/நூற்கள்/:id" element={<FromBooks />} />
        <Route path="/நூற்கள்/:id/:categoryid" element={<NoolVivaram />} />
        <Route path="/Kolgaigal" element={<Kolgaigal />} />
        <Route path="/தொகுப்புகள்/:id" element={<Thoguppugal />} />
        <Route path="/தொகுப்புகள்/:id/:subCategoryId" element={<ThoguppugalSubCategory />} />
        <Route path="/நிகழ்ச்சிகள்/:id" element={<PhotoGallery />} />
        <Route path="/மனிதா/:id" element={<Manitha />} />
        <Route path="/RegisterForm" element={<RegisterForm />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Kavithai1" element={<Kavithai1 />} />
        <Route path="/Kavithai2" element={<Kavithai2 />} />
        <Route path="/Kavithai3" element={<Kavithai3 />} />
        <Route path="/Kavithai4" element={<Kavithai4 />} />
        <Route path="/Kavithai5" element={<Kavithai5 />} />
        <Route path="/Kavithai6" element={<Kavithai6 />} />
        <Route path="/Akkangal" element={<Akkangal />} />
        <Route path="/Essay1" element={<Essay1 />} />
        <Route path="/Essay2" element={<Essay2 />} />
        <Route path="/Essay3" element={<Essay3 />} />
        <Route path="/Essay4" element={<Essay4 />} />
        <Route path="/Essay5" element={<Essay5 />} />
        <Route path="/Essay6" element={<Essay6 />} />
        <Route path="/Essay7" element={<Essay7 />} />
        <Route path="/Essay8" element={<Essay8 />} />
        <Route path="/Essay9" element={<Essay9 />} />
        <Route path="/Vaarithathu1" element={<Vaarithathu1 />} />
        <Route path="/Vaarithathu2" element={<Vaarithathu2 />} />
        <Route path="/Vaarithathu3" element={<Vaarithathu3 />} />
        <Route path="/Vaarithathu4" element={<Vaarithathu4 />} />
        <Route path="/Vaarithathu5" element={<Vaarithathu5 />} />
        <Route path="/Vaarithathu6" element={<Vaarithathu6 />} />
        <Route path="/Vaarithathu7" element={<Vaarithathu7 />} />
        <Route path="/Vaarithathu8" element={<Vaarithathu8 />} />
        <Route path="/Vaarithathu9" element={<Vaarithathu9 />} />
        <Route path="/Vaarithathu10" element={<Vaarithathu10 />} />
        <Route path="/Vaarithathu11" element={<Vaarithathu11 />} />
        <Route path="/Vaarithathu12" element={<Vaarithathu12 />} />
        <Route path="/Vaarithathu13" element={<Vaarithathu13 />} />
        <Route path="/Vaarithathu14" element={<Vaarithathu14 />} />
        <Route path="/வஹ்தத்துல் வுஜூத்/:id" element={<Religious />} />
        <Route path="/வஹ்தத்துல் வுஜூத்/:id/:id" element={<Vahdhathulujjuth />} />
        <Route path="/கல்வி/:id" element={<Kalvi />} />
        <Route path="/கல்வி/:id/:subCategoryId" element={<Kalvisub />} />
        <Route path="/ஞான அகமியங்கள்/:id" element={<Gyanagamiyangal />} />
        <Route path="/ஞான அகமியங்கள்/:id/:id" element={<GyanagamiyangalSub />} />
        <Route path="/YaseenBro" element={<YaseenBro />} />
        <Route path="/MagazineRegisterForm" element={<MagazineRegisterForm />} />
        <Route path="/MagazineLogin" element={<MagazineLogin />} />
        <Route path="/MagazineSubscripe" element={<MagazineSubscripe />} />
        <Route path="/Magazine" element={<Magazine />} />
        <Route path="/MagazineArtical/:id" element={<MagazineArtical />} />
        <Route path="/Thoguppugal1" element={<Thoguppugal1 />} />
        <Route path="/Thoguppugal2" element={<Thoguppugal2 />} />
        <Route path="/Thoguppugal3" element={<Thoguppugal3 />} />
        <Route path="/Thoguppugal4" element={<Thoguppugal4 />} />
        <Route path="/Thoguppugal5" element={<Thoguppugal5 />} />
        <Route path="/Thoguppugal6" element={<Thoguppugal6 />} />
        <Route path="/Thoguppugal7" element={<Thoguppugal7 />} />
        <Route path="/Thoguppugal8" element={<Thoguppugal8 />} />
        <Route path="/Thoguppugal9" element={<Thoguppugal9 />} />
        <Route path="/Thoguppugal10" element={<Thoguppugal10 />} />
        <Route path="/Thoguppugal11" element={<Thoguppugal11 />} />
        <Route path="/Thoguppugal12" element={<Thoguppugal12 />} />
        <Route path="/Thoguppugal13" element={<Thoguppugal13 />} />
        <Route path="/Thoguppugal14" element={<Thoguppugal14 />} />
        <Route path="/DetailBlog/:id" element={<DetailBlog />} />

      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
