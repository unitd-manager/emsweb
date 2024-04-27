import React, { useEffect, useState } from "react";
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactPlayer from "react-player";
import api from "../constants/api";
import EventSlider from "../components/EventSlider";

const Home = () => {
  // const [banners, setBanners] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);
  const [banners, setBanner] = useState([]);
  const [homeLink, setHomeLink] = useState([]);
  const [homeProducts, setHomeProducts] = useState([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

  const stripHtmlTags = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  const openVideoPopup = (videoUrl) => {
    setSelectedVideoUrl(videoUrl);
  };

  const closeVideoPopup = () => {
    setSelectedVideoUrl(null);
  };
  // Function to fetch video URLs from the API
  const getVideoUrls = () => {
    api
      .post("/content/getVideoUrls")
      .then((res) => {
        setVideoUrls(res.data.data);
        console.log("edit Line Item", res.data.data);
      })
      .catch(() => {
        // Handle error
      });
  };
  const getHomeLink = () => {
    api
      .get("/content/getHomeLink")
      .then((res) => {
        setHomeLink(res.data.data);
        console.log("edit Line Item", res.data.data);
      })
      .catch(() => {
        // Handle error
      });
  };

  const getHomeProducts = () => {
    api
      .get("/product/getProducts")
      .then((res) => {
        setHomeProducts(res.data.data);
        console.log("edit Line Item", res.data.data);
      })
      .catch(() => {
        // Handle error
      });
  };

  const getBanners = () => {
    // First API call to get banners
    api
      .get("/content/getBanners")
      .then((res) => {
        setBanner(res.data.data);

        // Extract content_id from the response
        const contentIds = res.data.data.map((item) => item.content_id);

        // Second API call to get images based on content_id
        contentIds.forEach((contentId) => {
          // Making a POST request with content_id in the request body
          api
            .post("/file/getListOfFiles", { record_id: contentId })
            .then((imageRes) => {
              // Handle image response
              console.log(`Images for content_id ${contentId}:`, imageRes.data);
            })
            .catch((imageError) => {
              console.error(
                `Error fetching images for content_id ${contentId}:`,
                imageError
              );
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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Display three slides at a time
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

  useEffect(() => {
    // getBannerImages();
    getVideoUrls();
    getBanners();
    getHomeLink();
    getHomeProducts();
  }, []);
  return (
    <div>
      <div>
        <div>
        <Link to="/MagazineLogin" target="_blank">
  <Button>EMS Magazine</Button>
  </Link>
      </div>
        <Slider {...bannersettings}>
          {Array.isArray(banners) &&
            banners.map((item, index) => (
              <div key={item.content_id} className="single-blog">
                <div className="part-img">
                  <img
                    src={`https://emsweb.unitdtechnologies.com/storage/uploads/${item.file_name}`}
                    alt={`News ${item.content_id}`}
                    style={{
                      width: "100%",
                      height: "400px",
                      objectFit: "cover",
                    }}
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
        <div>
          <div className="video-gallery">
            <h2>Video Gallery</h2>
            <div className="container">
              <Slider {...settings}>
                {Array.isArray(videoUrls) &&
                  videoUrls.map((videoUrl, index) => (
                    <div
                      key={index}
                      className="video-item"
                      onClick={() => openVideoPopup(videoUrl.description)}
                    >
                      <img
                        src={`https://emsweb.unitdtechnologies.com/storage/uploads/${videoUrl.file_name}`}
                        alt="Video Thumbnail"
                      />
                    </div>
                  ))}
              </Slider>
            </div>
          </div>

          {/* Video Popup */}
          {selectedVideoUrl && (
            <div className="video-popup">
              <div className="popup-content">
                <button className="close-btn" onClick={closeVideoPopup}>
                  Close
                </button>
                <ReactPlayer
                  url={selectedVideoUrl}
                  controls
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          )}
        </div>

        <div class="col-xl-12 col-lg-12 col-md-9">
          <div class="tab-content" id="nav-tabContent">
            <div
              class="tab-pane fade show active"
              id="nav-month"
              role="tabpanel"
              aria-labelledby="nav-month-tab"
            >
              <div class="row">
                {homeLink.map((item, index) => (
                  <div class="col-xl-3 col-lg-3">
                    <div class="single-box">
                      <div class="part-img">
                        <img
                          src={`https://emsweb.unitdtechnologies.com/storage/uploads/${item.file_name}`}
                          alt={`News ${item.content_id}`}
                          style={{
                            width: "70%",
                            height: "150px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div class="part-btn" style={{ marginTop: "25px" }}>
                        <a
                          href={stripHtmlTags(item.description)}
                          class="def-btn"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Click Here
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div class="partner">
          <div class="container">
            <div class="bg">
              <div class="brand-slider owl-carousel">
                <div class="single-img" style={{ marginBottom: "70px" }}>
                  {homeProducts.map((item) => (
                    <div
                      key={item.content_id}
                      style={{ marginRight: "15px", marginBottom: "50px" }}
                    >
                      <img
                        src={`https://emsweb.unitdtechnologies.com/storage/uploads/${item.images}`}
                        alt={`News ${item.content_id}`}
                        style={{ width: "250px", height: "100px" }}
                      />
                      <h6>{item.title}</h6>
                    </div>
                  ))}
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
                    <p>
                      There are many varations of passages of as Lorem Ipsum
                      available but the majorit have suffered alteration in some
                      form
                    </p>
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
                    <p>
                      There are many varations of passages of as Lorem Ipsum
                      available but the majorit have suffered alteration in some
                      form
                    </p>
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
                    <p>
                      There are many varations of passages of as Lorem Ipsum
                      available but the majorit have suffered alteration in some
                      form
                    </p>
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
                  <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majorit have suffered alteration in some
                    form, by injected humour, or randomised words which don't
                    look even slightly believable. If you are going to use a
                    passage of as lorem Ipsum, you need to be sure there
                  </p>
                  <a href="about.html" class="def-btn">
                    Read More
                  </a>
                  <div class="boxes-2">
                    <div class="single-box">
                      <div class="img">
                        <img
                          src="assets/images/signature.png"
                          alt="signature"
                        />
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
                  <h2>
                    Processed Payments 252,854 Customers
                    <br /> 1.5M Users and Growing
                  </h2>
                  <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form by injected humour, or randomised words which don't
                    look even slightly believable. If you are going to use a
                    passage of Lorem Ipsum, you need to be sure there isn't
                    anything embarrassing hidden in the middle of text
                  </p>
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
      </div>
    </div>
  );
};

export default Home;
