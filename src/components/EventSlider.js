import React, { useEffect, useState } from "react";
import Slider from 'react-slick';
import api from "../constants/api";

const EventSlider = () => {
  const [events, setEvents] = useState([]);

  const getEvent = () => {
    api
      .get('/content/getEvents')
      .then((res) => {
        setEvents(res.data.data);
      })
      .catch(() => {
        // Handle error
      });
  };

  const stripHtmlTags = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    return doc.body.textContent || '';
  };

  useEffect(() => {
    getEvent();
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 4000, // Adjust the speed as needed
  };

  return (
    <div className="blog">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-5 col-lg-6">
            <div className="heading">
              <h5>Event Activities</h5>
            </div>
          </div>
        </div>
      
        <div className="blog-slider owl-carousel">
          <div className="container">
            <Slider {...settings}>
              {Array.isArray(events) &&
                events.map((event, index) => (
                  <div
                    key={event.content_id}
                    className="single-box"
                    style={{ padding: '50px' }} // Adjust the padding value as needed
                  >
                    <div className="part-img" style={{ width: '30%', float: 'left' }}>
                      <img
                        src={`http://43.228.126.245/EMS-API/storage/uploads/${event.file_name}`}
                        alt={`Event`}
                        width="300px"          
                        height="280px"     
                      />
                    </div>
                    <div className="part-txt" style={{ width: '50%', float: 'left', paddingLeft: '20px' }}>
                      <a href="blog-details.html" className="title">
                        {event.title}
                      </a>
                      <p>{stripHtmlTags(event.description)}</p>

                      <div className="part-btn" style={{ textAlign:"center" }}>
                        <a href="blog-details.html" className="def-btn">
                          Read More
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSlider;