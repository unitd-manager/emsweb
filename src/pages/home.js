import React, { useEffect,useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ReactPlayer from 'react-player';
import api from '../constants/api';
import EventSlider from '../components/EventSlider';

const Home = () => {
    // const [banners, setBanners] = useState([]);
      const [videoUrls, setVideoUrls] = useState([]);
      const [banners, setBanner] = useState([]);
    // Function to fetch video URLs from the API
    const getVideoUrls = () => {
      api
        .post('/media/getVideoUrls')
        .then((res) => {
          setVideoUrls(res.data.data);
          console.log('edit Line Item',res.data.data)
        })
        .catch(() => {
          // Handle error
        });
    };
    const getBanners = () => {
        // First API call to get banners
        api.get("/content/getBanners")
          .then((res) => {
            setBanner(res.data.data);
      
            // Extract content_id from the response
            const contentIds = res.data.data.map(item => item.content_id);
      
            // Second API call to get images based on content_id
            contentIds.forEach(contentId => {
              // Making a POST request with content_id in the request body
              api.post("/file/getListOfFiles", { record_id: contentId })
                .then((imageRes) => {
                  // Handle image response
                  console.log(`Images for content_id ${contentId}:`, imageRes.data);
                })
                .catch((imageError) => {
                  console.error(`Error fetching images for content_id ${contentId}:`, imageError);
                });
            });
          })
          .catch((error) => {
            console.error("Error fetching banners:", error);
          });
      };
      const bannersettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1, // Display three slides at a time
        slidesToScroll: 1, // Scroll one slide at a time
        autoplay: true,
        responsive: [
          {
            breakpoint: 1140,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      };
    
// const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000, // Adjust the speed as needed
//   };
 // const { id } = useParams();
   // Get Product data By product id
// const getBannerImages = () => {
// api
//   .post('/media/getMediaFileName')
//   .then((res) => {
//     setBanners(res.data.data);
//   })
//   .catch(() => {
//     // message('Product Data Not Found', 'info');
//   });
// };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Adjust the speed as needed
  };

useEffect(() => {
// getBannerImages();
getVideoUrls(); 
getBanners();
}, []);
  return (
    
    <div>
    
    <div class="preloader">
        <div class="loader"><img src="assets/images/spinner.gif" alt="imagess" /></div>
    </div>
    
    <div class="header-2">
        <div class="top-header">
            <div class="container">
                <div class="bg">
                    <div class="row justify-content-between align-items-center">
                        <div class="col-xl-6 col-lg-6 col-md-7">
                            <div class="top-left">
                                <ul>
                                    <li><i class="flaticon-message"></i><span>youremailhere@gmail.com</span></li>
                                    <li><i class="flaticon-phone-call"></i><span>+008 1234 56789</span></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-5">
                            <div class="top-right">
                                <div class="language">
                                    <div class="select-lang">
                                        <div id="demo"
                                            data-input-name="country"
                                            data-selected-country="US"
                                            data-scrollable-height="250px">
                                        </div>
                                    </div>
                                </div>
                                <div class="try-btn">
                                    <a href="/">FREE TRY</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom-header">
            <div class="container">
                <div class="bg">
                    <div class="row align-items-center">
                        <div class="d-xl-none d-lg-none d-flex col-4">
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <i class="flaticon-menu-button-of-three-horizontal-lines"></i>
                            </button>
                        </div>
                        <div class="col-xl-1 col-lg-1 col-4">
                            <div class="logo">
                                <a href="/">
                                    <img src="assets/images/United Logo.png" alt="LOGO" />
                                </a>
                            </div>
                        </div>
                        <div class="col-xl-8 col-lg-8 next">
                            <nav class="navbar navbar-expand-lg navbar-light">
                                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul class="navbar-nav m-rauto">
                                        <li class="nav-item dropdown">
                                            <a class="nav-link" href="/" id="homeDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                HOME
                                            </a>
                                            <ul class="dropdown-menu" aria-labelledby="homeDropdown">
                                                <li><a class="dropdown-item" href="index.html">Home One</a></li>
                                                <li><a class="dropdown-item" href="index-2.html">Home Two</a></li>
                                            </ul>
                                        </li>
                                        <li class="nav-item">
                                            <a href="about.html" class="nav-link">ABOUT US</a>
                                        </li>
                                        <li class="nav-item dropdown">
                                            <a class="nav-link" href="/" id="serviceDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                SERVICES
                                            </a>
                                            <ul class="dropdown-menu" aria-labelledby="serviceDropdown">
                                                <li><a class="dropdown-item" href="service.html">Service</a></li>
                                                <li><a class="dropdown-item" href="service-details.html">Service Details</a></li>
                                            </ul>
                                        </li>
                                        <li class="nav-item dropdown">
                                            <a class="nav-link" href="/" id="pageDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                PAGES
                                            </a>
                                            <ul class="dropdown-menu" aria-labelledby="pageDropdown">
                                                <li><a class="dropdown-item" href="team.html">Team</a></li>
                                                <li><a class="dropdown-item" href="team-details.html">Team Details</a></li>
                                                <li><a class="dropdown-item" href="testimonial.html">Testimonial</a></li>
                                                <li><a class="dropdown-item" href="pricing.html">Pricing</a></li>
                                                <li><a class="dropdown-item" href="faq.html">FAQ</a></li>
                                                <li><a class="dropdown-item" href="error.html">Error 404</a></li>
                                            </ul>
                                        </li>
                                        <li class="nav-item dropdown">
                                            <a class="nav-link" href="/" id="projectDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                PORTFOLIO
                                            </a>
                                            <ul class="dropdown-menu" aria-labelledby="projectDropdown">
                                                <li><a class="dropdown-item" href="portfolio.html">Portfolio</a></li>
                                                <li><a class="dropdown-item" href="portfolio-details.html">Portfolio Details</a></li>
                                            </ul>
                                        </li>
                                        <li class="nav-item dropdown">
                                            <a class="nav-link" href="/" id="blogDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                NEWS
                                            </a>
                                            <ul class="dropdown-menu" aria-labelledby="blogDropdown">
                                                <li><a class="dropdown-item" href="blog-l-bar.html">Blog Left Bar</a></li>
                                                <li><a class="dropdown-item" href="blog-r-bar.html">Blog Right Bar</a></li>
                                                <li><a class="dropdown-item" href="blog-details.html">Blog Details</a></li>
                                            </ul>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="contact.html">CONTACTS</a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                        <div class="col-xl-3 col-lg-3 col-4">
                            <div class="bottom-right">
                                <form class="nav-form">
                                    <input type="search" placeholder="Search......" required />
                                    <button><i class="flaticon-magnifying-glass-search"></i></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
   <div>
   <Slider {...bannersettings}>
        {Array.isArray(banners) &&
          banners.map((item, index) => (
            <div key={item.content_id} className="single-blog">
              <div className="part-img">
                <img
                  src={`https://emsweb.unitdtechnologies.com/storage/uploads/${item.file_name}`}
                  alt={`News ${item.content_id}`}
                  style={{ width: "100%", height: "400px", objectFit: "cover" }}
                />
              </div>
              <div className="part-txt">
                {/* Check if item.description is not null before accessing its properties */}
              </div>
            </div>
          ))}
      </Slider>

    <EventSlider></EventSlider>
       

 {/* Video Gallery Panel */}
 <div className="video-gallery">
        <h2>Video Gallery</h2>
        <div className="container">
          <Slider {...settings}>
            {Array.isArray(videoUrls) &&
              videoUrls.map((videoUrl, index) => (
                <div key={index} className="video-item">
                  <ReactPlayer
                    url={videoUrl.description}
                    controls
                    width="96%"
                    height="370px"
                  />
                  
                </div>
              ))}
          </Slider>
        </div>
      </div>

      <div class="col-xl-12 col-lg-12 col-md-9">
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-month" role="tabpanel" aria-labelledby="nav-month-tab">
                            <div class="row">
                                <div class="col-xl-6 col-lg-6">
                                    <div class="single-box">
                                        <div class="part-img">
                                            <img src="assets/images/pricing-img-1.jpg" alt="image"/>
                                           
                                        </div>
                                        
                                        <div class="part-btn" style={{marginTop:"25px"}}>
                                            <a href="#" class="def-btn">Buy Now</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6">
                                    <div class="single-box">
                                        <div class="part-img">
                                            <img src="assets/images/pricing-img-2.jpg" alt="image"/>
                                           
                                        </div>
                                      
                                        <div class="part-btn"style={{marginTop:"25px"}}>
                                            <a href="#" class="def-btn">Buy Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="nav-year" role="tabpanel" aria-labelledby="nav-year-tab">
                            <div class="row">
                                <div class="col-xl-6 col-lg-6">
                                    <div class="single-box">
                                        <div class="part-img">
                                            <img src="assets/images/pricing-img-1.jpg" alt="image"/>
                                        </div>
                                      
                                        <div class="part-btn">
                                            <a href="#" class="def-btn">Buy Now</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6">
                                    <div class="single-box">
                                        <div class="part-img">
                                            <img src="assets/images/pricing-img-2.jpg" alt="image"/>
                                           
                                        </div>
                                      
                                        <div class="part-btn">
                                            <a href="#" class="def-btn">Buy Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    <div class="feature">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xl-4 col-lg-4 col-md-6">
                    <div class="single-box">
                        <div class="part-icon">
                            <span>
                                <i class="flaticon-technology"></i>
                            </span>
                        </div>
                        <div class="part-txt">
                            <h3>Simplicity And Choice</h3>
                            <p>There are many varations of passages of as Lorem Ipsum available but the majorit have suffered alteration in some form</p>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 col-lg-4 col-md-6">
                    <div class="single-box">
                        <div class="part-icon">
                            <span>
                                <i class="flaticon-gear"></i>
                            </span>
                        </div>
                        <div class="part-txt">
                            <h3>Worry Free Experience</h3>
                            <p>There are many varations of passages of as Lorem Ipsum available but the majorit have suffered alteration in some form</p>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 col-lg-4 col-md-6">
                    <div class="single-box">
                        <div class="part-icon">
                            <span>
                                <i class="flaticon-bar-chart"></i>
                            </span>
                        </div>
                        <div class="part-txt">
                            <h3>Performance Scale</h3>
                            <p>There are many varations of passages of as Lorem Ipsum available but the majorit have suffered alteration in some form</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    
  
    <div class="about about-2">
        <div class="container">
            <div class="row align-items-center justify-content-center">
                <div class="col-xl-6 col-lg-6 col-md-8">
                    <div class="part-img">
                        <img src="assets/images/about-img.png" alt="imagess" />
                    </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-8">
                    <div class="part-txt">
                        <div class="heading">
                            <h5>About Us</h5>
                            <h2>We Believe That Quality Of Services Matters</h2>
                        </div>
                        <p>There are many variations of passages of Lorem Ipsum available, but the majorit have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of as lorem Ipsum, you need to be sure there</p>
                        <a href="about.html" class="def-btn">Read More</a>
                        <div class="boxes-2">
                            <div class="single-box">
                                <div class="img">
                                    <img src="assets/images/signature.png" alt="signature" />
                                </div>
                                <div class="txt">
                                    <h3>Jhon Martin</h3>
                                    <span>Chairnan & founder</span>
                                </div>
                            </div>
                            <div class="devider"></div>
                            <div class="single-box">
                                <div class="txt">
                                    <h3>123-456-7890</h3>
                                    <span>Call to ask any question</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
   
    <div class="partner partner-2">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xl-9 col-lg-9">
                    <div class="heading heading-2">
                        <h5>Our Partner</h5>
                        <h2>Processed Payments 252,854 Customers<br/> 1.5M Users and Growing</h2>
                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text</p>
                    </div>
                </div>
            </div>
            <div class="bg">
                <div class="brand-slider owl-carousel">
                    <div class="single-img">
                        <img src="assets/images/brand-1.png" alt="logo" />
                    </div>
                    <div class="single-img">
                        <img src="assets/images/brand-2.png" alt="logo" />
                    </div>
                    <div class="single-img">
                        <img src="assets/images/brand-3.png" alt="logo" />
                    </div>
                    <div class="single-img">
                        <img src="assets/images/brand-4.png" alt="logo" />
                    </div>
                    <div class="single-img">
                        <img src="assets/images/brand-5.png" alt="logo" />
                    </div>
                    <div class="single-img">
                        <img src="assets/images/brand-6.png" alt="logo" />
                    </div>
                    <div class="single-img">
                        <img src="assets/images/brand-3.png" alt="logo" />
                    </div>
                    <div class="single-img">
                        <img src="assets/images/brand-4.png" alt="logo" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="faq">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xl-4 col-lg-5">
                    <div class="heading">
                        <h5>REPEATED QUESTIONS</h5>
                        <h2>Frequently Questions</h2>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-xl-12 col-lg-12 col-md-9">
                    <div class="part-txt">
                        <div id="accordion">
                            <div class="row">
                                <div class="col-xl-6 col-lg-6">
                                    <div class="card">
                                        <div class="card-header" id="headingOne">
                                            <h5 class="mb-0">
                                                <button data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    What are the business advisory company?
                                                    <span><i class="flaticon-arrow-down-sign-to-navigate"></i></span>
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                            <div class="card-body">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Dolore omnis quaerat nostrum, pariatur ipsam sunt accusamus enim necessitatibus est fugiat, assumenda dolorem, deleniti corrupti.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header" id="headingTwo">
                                            <h5 class="mb-0">
                                                <button class="collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                    Research is What Makes Business Plan?
                                                    <span><i class="flaticon-arrow-down-sign-to-navigate"></i></span>
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                            <div class="card-body">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Dolore omnis quaerat nostrum, pariatur ipsam sunt accusamus enim necessitatibus est fugiat, assumenda dolorem, deleniti corrupti.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header" id="headingThree">
                                            <h5 class="mb-0">
                                                <button class="collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    How to achieving Small Business Success?
                                                    <span><i class="flaticon-arrow-down-sign-to-navigate"></i></span>
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                            <div class="card-body">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Dolore omnis quaerat nostrum, pariatur ipsam sunt accusamus enim necessitatibus est fugiat, assumenda dolorem, deleniti corrupti.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header" id="headingFour">
                                            <h5 class="mb-0">
                                                <button class="collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                    Why Business Planning is Important?
                                                    <span><i class="flaticon-arrow-down-sign-to-navigate"></i></span>
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordion">
                                            <div class="card-body">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Dolore omnis quaerat nostrum, pariatur ipsam sunt accusamus enim necessitatibus est fugiat, assumenda dolorem, deleniti corrupti.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6">
                                    <div class="card">
                                        <div class="card-header" id="headingFive">
                                            <h5 class="mb-0">
                                                <button class="collapsed" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                                    Can I reprint or distribute Our publications?
                                                    <span><i class="flaticon-arrow-down-sign-to-navigate"></i></span>
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapseFive" class="collapse" aria-labelledby="headingFive" data-parent="#accordion">
                                            <div class="card-body">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Dolore omnis quaerat nostrum, pariatur ipsam sunt accusamus enim necessitatibus est fugiat, assumenda dolorem, deleniti corrupti.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header" id="headingSix">
                                            <h5 class="mb-0">
                                                <button class="collapsed" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                                    What are Prysm’s main publications?
                                                    <span><i class="flaticon-arrow-down-sign-to-navigate"></i></span>
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapseSix" class="collapse" aria-labelledby="headingSix" data-parent="#accordion">
                                            <div class="card-body">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Dolore omnis quaerat nostrum, pariatur ipsam sunt accusamus enim necessitatibus est fugiat, assumenda dolorem, deleniti corrupti.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header" id="headingSeven">
                                            <h5 class="mb-0">
                                                <button class="collapsed" data-toggle="collapse" data-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                                                    How to do  permission republish an article?
                                                    <span><i class="flaticon-arrow-down-sign-to-navigate"></i></span>
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapseSeven" class="collapse" aria-labelledby="headingSeven" data-parent="#accordion">
                                            <div class="card-body">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Dolore omnis quaerat nostrum, pariatur ipsam sunt accusamus enim necessitatibus est fugiat, assumenda dolorem, deleniti corrupti.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header" id="headingEight">
                                            <h5 class="mb-0">
                                                <button class="collapsed" data-toggle="collapse" data-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                                                    What goes into a business plan?
                                                    <span><i class="flaticon-arrow-down-sign-to-navigate"></i></span>
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapseEight" class="collapse" aria-labelledby="headingEight" data-parent="#accordion">
                                            <div class="card-body">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Dolore omnis quaerat nostrum, pariatur ipsam sunt accusamus enim necessitatibus est fugiat, assumenda dolorem, deleniti corrupti.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
   
    <div class="project">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xl-5 col-lg-6">
                    <div class="heading heading-2">
                        <h5>RECENT PROJECTS</h5>
                        <h2>Our Best Recent Projects</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-12 col-lg-12">
                    <div class="all-projects">
                        <div class="project-slider owl-carousel">
                            <div class="single-box">
                                <div class="part-img">
                                    <img src="assets/images/project-1.jpg" alt="imagess" />
                                </div>
                                <div class="part-txt">
                                    <a href="portfolio-details.html"><i class="flaticon-link"></i></a>
                                    <div class="title">
                                        <h3>Business Agreement</h3>
                                        <p>Considering of the agreement</p>
                                    </div>
                                </div>
                            </div>
                            <div class="single-box">
                                <div class="part-img">
                                    <img src="assets/images/project-2.jpg" alt="imagess" />
                                </div>
                                <div class="part-txt">
                                    <a href="portfolio-details.html"><i class="flaticon-link"></i></a>
                                    <div class="title">
                                        <h3>Business Agreement</h3>
                                        <p>Considering of the agreement</p>
                                    </div>
                                </div>
                            </div>
                            <div class="single-box">
                                <div class="part-img">
                                    <img src="assets/images/project-3.jpg" alt="imagess" />
                                </div>
                                <div class="part-txt">
                                    <a href="portfolio-details.html"><i class="flaticon-link"></i></a>
                                    <div class="title">
                                        <h3>Business Agreement</h3>
                                        <p>Considering of the agreement</p>
                                    </div>
                                </div>
                            </div>
                            <div class="single-box">
                                <div class="part-img">
                                    <img src="assets/images/project-4.jpg" alt="imagess" />
                                </div>
                                <div class="part-txt">
                                    <a href="portfolio-details.html"><i class="flaticon-link"></i></a>
                                    <div class="title">
                                        <h3>Business Agreement</h3>
                                        <p>Considering of the agreement</p>
                                    </div>
                                </div>
                            </div>
                            <div class="single-box">
                                <div class="part-img">
                                    <img src="assets/images/project-5.jpg" alt="imagess" />
                                </div>
                                <div class="part-txt">
                                    <a href="portfolio-details.html"><i class="flaticon-link"></i></a>
                                    <div class="title">
                                        <h3>Business Agreement</h3>
                                        <p>Considering of the agreement</p>
                                    </div>
                                </div>
                            </div>
                            <div class="single-box">
                                <div class="part-img">
                                    <img src="assets/images/project-6.jpg" alt="imagess" />
                                </div>
                                <div class="part-txt">
                                    <a href="portfolio-details.html"><i class="flaticon-link"></i></a>
                                    <div class="title">
                                        <h3>Business Agreement</h3>
                                        <p>Considering of the agreement</p>
                                    </div>
                                </div>
                            </div>
                            <div class="single-box">
                                <div class="part-img">
                                    <img src="assets/images/project-7.jpg" alt="imagess" />
                                </div>
                                <div class="part-txt">
                                    <a href="portfolio-details.html"><i class="flaticon-link"></i></a>
                                    <div class="title">
                                        <h3>Business Agreement</h3>
                                        <p>Considering of the agreement</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  
    <div class="team">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xl-5 col-lg-5">
                    <div class="heading">
                        <h5>OUR Team</h5>
                        <h2>Our Creative Team Member</h2>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-xl-3 col-lg-3 col-md-5 col-sm-6">
                    <div class="single-box">
                        <div class="part-img">
                            <img src="assets/images/team-1.jpg" alt="imagess" />
                        </div>
                        <div class="part-txt">
                            <div class="txt">
                                <div class="title">
                                    <a href="team-details.html">Sandra Willson</a>
                                    <span>Chief Operating Officer</span>
                                </div>
                                <p>There are many variations of passages of Lorem Ipsum as ailable, but the majority</p>
                                <div class="social">
                                    <a href="/" class="fb"><i class="flaticon-facebook"></i></a>
                                    <a href="/" class="tw"><i class="flaticon-twitter"></i></a>
                                    <a href="/" class="ld"><i class="flaticon-linkedin"></i></a>
                                    <a href="/" class="ggl"><i class="flaticon-google-plus-logo"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-3 col-md-5 col-sm-6">
                    <div class="single-box">
                        <div class="part-img">
                            <img src="assets/images/team-2.jpg" alt="imagess" />
                        </div>
                        <div class="part-txt">
                            <div class="txt">
                                <div class="title">
                                    <a href="team-details.html">Steve Parkar</a>
                                    <span>Graphic Designer</span>
                                </div>
                                <p>There are many variations of passages of Lorem Ipsum as ailable, but the majority</p>
                                <div class="social">
                                    <a href="/" class="fb"><i class="flaticon-facebook"></i></a>
                                    <a href="/" class="tw"><i class="flaticon-twitter"></i></a>
                                    <a href="/" class="ld"><i class="flaticon-linkedin"></i></a>
                                    <a href="/" class="ggl"><i class="flaticon-google-plus-logo"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-3 col-md-5 col-sm-6">
                    <div class="single-box">
                        <div class="part-img">
                            <img src="assets/images/team-3.jpg" alt="imagess" />
                        </div>
                        <div class="part-txt">
                            <div class="txt">
                                <div class="title">
                                    <a href="team-details.html">Vanessa Lucky</a>
                                    <span>HTML Developer</span>
                                </div>
                                <p>There are many variations of passages of Lorem Ipsum as ailable, but the majority</p>
                                <div class="social">
                                    <a href="/" class="fb"><i class="flaticon-facebook"></i></a>
                                    <a href="/" class="tw"><i class="flaticon-twitter"></i></a>
                                    <a href="/" class="ld"><i class="flaticon-linkedin"></i></a>
                                    <a href="/" class="ggl"><i class="flaticon-google-plus-logo"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-3 col-md-5 col-sm-6">
                    <div class="single-box">
                        <div class="part-img">
                            <img src="assets/images/team-4.jpg" alt="imagess" />
                        </div>
                        <div class="part-txt">
                            <div class="txt">
                                <div class="title">
                                    <a href="team-details.html">Miller Wilson</a>
                                    <span>Chief brand officer</span>
                                </div>
                                <p>There are many variations of passages of Lorem Ipsum as ailable, but the majority</p>
                                <div class="social">
                                    <a href="/" class="fb"><i class="flaticon-facebook"></i></a>
                                    <a href="/" class="tw"><i class="flaticon-twitter"></i></a>
                                    <a href="/" class="ld"><i class="flaticon-linkedin"></i></a>
                                    <a href="/" class="ggl"><i class="flaticon-google-plus-logo"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
   
    <div class="fun-fact">
        <div class="container">
            <div class="bg">
                <div class="row no-gutters justify-content-lg-between justify-content-center">
                    <div class="col-xl-2 col-lg-2 col-sm-4">
                        <div class="single-box">
                            <div class="part-icon">
                                <span><i class="flaticon-multiple-users-silhouette"></i></span>
                            </div>
                            <div class="part-txt">
                                <h2><span class="odometer" data-count="3800">0</span>+</h2>
                                <p>Happy Customer</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-2 col-lg-2 col-sm-4">
                        <div class="single-box">
                            <div class="part-icon">
                                <span><i class="flaticon-project"></i></span>
                            </div>
                            <div class="part-txt">
                                <h2><span class="odometer" data-count="1832">0</span>+</h2>
                                <p>Project Completed</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-2 col-lg-2 col-sm-4">
                        <div class="single-box">
                            <div class="part-icon">
                                <span><i class="flaticon-multiple-users-silhouette"></i></span>
                            </div>
                            <div class="part-txt">
                                <h2><span class="odometer" data-count="864">0</span>+</h2>
                                <p>Team Members</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-2 col-lg-2 col-sm-4">
                        <div class="single-box">
                            <div class="part-icon">
                                <span><i class="flaticon-hot-coffee-rounded-cup-on-a-plate-from-side-view"></i></span>
                            </div>
                            <div class="part-txt">
                                <h2><span class="odometer" data-count="9812">0</span>+</h2>
                                <p>Cup Of Coffee</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-2 col-lg-2 col-sm-4">
                        <div class="single-box">
                            <div class="part-icon">
                                <span><i class="flaticon-trophy"></i></span>
                            </div>
                            <div class="part-txt">
                                <h2><span class="odometer" data-count="758">0</span>+</h2>
                                <p>Winning Awards</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
   
    <div class="cta-2">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xl-8 col-lg-8">
                    <div class="part-txt">
                        <h2>Let’s Start Working Together</h2>
                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in by injected humour, or randomised words which don't look even slightly believable. If you are going</p>
                        <a href="contact.html" class="def-btn def-btn-2">Get Started for Free</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  
   
  
    <div class="call-back">
        <div class="container">
            <div class="bg">
                <div class="row align-items-center">
                    <div class="col-xl-6 col-lg-6 col-md-6">
                        <div class="part-txt">
                            <h5>Get Started Instantly!</h5>
                            <h2>Request a Call Back Now</h2>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6">
                        <div class="form">
                            <form>
                                <input type="email" placeholder="Your email address here" required />
                                <button>Request Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
    <div class="footer">
        <div class="container">
            <div class="main-footer">
                <div class="row justify-content-between">
                    <div class="col-xl-3 col-lg-4 col-sm-6">
                        <div class="about-txt">
                            <h3>About Us Company</h3>
                            <p>There are many variations of passage of Lorem Ipsum available, but the maj ority have suffered alteration</p>
                            <ul>
                                <li><span><i class="flaticon-pin"></i></span>Demo Address #8901 Marmora Road Chi Minh City, Vietnam</li>
                                <li><span><i class="flaticon-phone-call"></i></span>0800-123456 (24/7 Support Line)</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-xl-2 col-lg-2 col-sm-6">
                        <div class="link">
                            <h3>Our Services</h3>
                            <ul>
                                <li><a href="service-details.html">Business</a></li>
                                <li><a href="service-details.html">Marketing</a></li>
                                <li><a href="service-details.html">Management</a></li>
                                <li><a href="service-details.html">Accounting</a></li>
                                <li><a href="service-details.html">Training</a></li>
                                <li><a href="service-details.html">Consultation</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-xl-2 col-lg-2 col-sm-6">
                        <div class="link">
                            <h3>Useful Links</h3>
                            <ul>
                                <li><a href="blog-l-bar.html">Blog</a></li>
                                <li><a href="/">Client Area</a></li>
                                <li><a href="/">Support</a></li>
                                <li><a href="faq.html">FAQ's</a></li>
                                <li><a href="/">Newsletter</a></li>
                                <li><a href="/">Events</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4 col-sm-6">
                        <div class="newsletter">
                            <h3>Newsletter</h3>
                            <p>Subscribe our newsletter to get our latest update all blog & news</p>
                            <form>
                                <input type="email" placeholder="Your Email Address" required />
                                <button><i class="flaticon-send"></i></button>
                            </form>
                            <div class="social">
                                <a href="/" class="fb"><i class="flaticon-facebook"></i></a>
                                <a href="/" class="tw"><i class="flaticon-twitter"></i></a>
                                <a href="/" class="ggl"><i class="flaticon-google-plus-logo"></i></a>
                                <a href="/" class="ld"><i class="flaticon-linkedin"></i></a>
                                <a href="/" class="yt"><i class="flaticon-youtube"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="copyright">
            <div class="container">
                <div class="row">
                    <div class="col-xl-6 col-lg-6">
                        <p>Copyright &copy; 2021 Theme All Rights Reserved</p>
                    </div>
                    <div class="col-xl-6 col-lg-6">
                        <div class="link">
                            <a href="about.html">About</a>
                            <a href="/">Privacy Policy</a>
                            <a href="faq.html">FAQs</a>
                            <a href="/">Support</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
   
    <script src="assets/js/jquery-3.6.0.min.js"></script>

    <script src="assets/js/jquery.flagstrap.min.js"></script>
    
    <script src="assets/js/jquery.appear.min.js"></script>
  
    <script src="assets/js/odometer.min.js"></script>
    
    <script src="assets/js/owl.carousel.min.js"></script>
    
    <script src="assets/js/slick.min.js"></script>
    
    <script src="assets/js/video.popup.js"></script>
   
    <script src="assets/js/popper.min.js"></script>
    
    <script src="assets/js/bootstrap.min.js"></script>
   
    <script src="assets/js/main.js"></script>
    </div>
  );
}

export default Home;
