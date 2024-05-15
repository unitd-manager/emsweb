import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Marquee from "react-fast-marquee";
import ReactPlayer from "react-player";
import api from "../constants/api";
import EventSlider from "../components/EventSlider";

const Home = () => {
  const { id } = useParams();
console.log("111111",id)
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

  const homeProductSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Show four images at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true,
    responsive: [
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: 3, // Show three images on medium screens
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // Show two images on smaller screens
        },
      },
    ],
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
  
  const [sectiones, setSectiones] = useState([]);
  const [marquee, setMarquee] = useState([]);
  const getMarquee = () => {
    api
      .get('/setting/getSettingsForQuizInfoText')
      .then(res => {
        setMarquee(res.data.data);
      })
      .catch(error => {
        console.log("error",error)
      });

  };
  const marqueeValue =marquee && marquee[0]?.value
  useEffect(() => {
   

    api
      .get("/section/getSectionCategory")
      .then((res) => {
        setSectiones(res.data.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching sections:", error);
      });


   
  }, []);

  useEffect(() => {
    // getBannerImages();
    getVideoUrls();
    getBanners();
    getMarquee();
    getHomeLink();
    getHomeProducts();
  }, []);
  return (
    <div>
      <Marquee style={{ backgroundColor: 'red', color: 'white', fontSize: '15px' }}>
        {marqueeValue}
      </Marquee>
      <div className="bannerImage">
        <Slider {...bannersettings}>
          {Array.isArray(banners) &&
            banners.map((item, index) => (
              <div key={item.content_id} className="single-blog">
                <div className="part-img" >
                  <img
                    src={`https://emsweb.unitdtechnologies.com/storage/uploads/${item.file_name}`}
                    alt={`News ${item.content_id}`}
                    style={{
                      width: '100%',
                      height: '400px',
                      objectit: 'cover', // Ensures image doesn't distort
                    }}

                  />
                </div>
              
              </div>
            ))}
        </Slider>
        </div>
        <EventSlider></EventSlider>

        {/* Video Gallery Panel */}
        <div>
          <div className="video-gallery">
        <div className="row justify-content-center">
          <div className="col-xl-4 col-lg-3">
            <div className="heading">
              <h2>Video Gallery</h2>
            </div>
          </div>
        </div>
        <div className="container" style={{ maxWidth: '600px' }}>
          <Slider {...settings}>
            {Array.isArray(videoUrls) &&
              videoUrls.map((videoUrl, index) => (
                <div
                  key={index}
                  className="video-item"
                  onClick={() => openVideoPopup(videoUrl.description)}
                  style={{ height: '200px' }} // Adjust height as needed
                >
                  <img
                    src={`https://emsweb.unitdtechnologies.com/storage/uploads/${videoUrl.file_name}`}
                    alt="Video Thumbnail"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
                  <text style={{color: 'white'}}>Close</text>
                </button>
                <ReactPlayer
                  url={selectedVideoUrl}
                  controls
                  width="560px"
                  height="450px"
                />
              </div>
            </div>
          )}
        </div>
            <div></div>
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
                            height: "250px",
                          }}
                        />
                      </div>
                      <div class="part-btn" style={{ margin: "35px" }}>
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
                <div className="home-products">
                <div className="row justify-content-center">
                  <div className="col-xl-4 col-lg-3">
                    <div className="heading">
                      <h2>Books</h2>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-3 text-right1">
                  <Link  to={`/நூற்கள்/${sectiones && sectiones.category_id}`}>
                    <button className="view-all-btn">View All</button>
                  </Link>
                  </div>
                </div>
          <div className="product-carousel">
            <Slider {...homeProductSettings}>
              {Array.isArray(homeProducts) &&
                homeProducts.map((product) => (
                  <div key={product.product_id} className="product-slide">
                    <img
                      src={`https://emsweb.unitdtechnologies.com/storage/uploads/${product.images}`}
                      alt={product.title}
                      style={{ width: "100%", height: "420px", objectFit: "cover" }}
                    />
                    <h6 style={{color:'white'}}>{product.title}</h6>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
        </div>
        </div>
        </div>
    </div>
  );
};

export default Home;
