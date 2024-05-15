import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
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

  const [sectiones, setSectiones] = useState([]);

  useEffect(() => {
   

    api
      .get("/section/getCategoryEventType")
      .then((res) => {
        setSectiones(res.data.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching sections:", error);
      });


   
  }, []);

  useEffect(() => {
    getEvent();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    spacing: 10, // Adjust the spacing value as needed
  };

  return (
    <div className="blog">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-4 col-lg-3">
            <div className="headingEvent">
              <h2>Event Activities</h2>
            </div>
          </div>
          <div className="col-xl-2 col-lg-3 text-right1">
                  <Link  to={`/நிகழ்ச்சிகள்/${sectiones && sectiones.category_id}`}>
                    <button className="view-all-btn">View All</button>
                  </Link>
                  </div>
        </div>

        <div class="row justify-content-center">
                <div class="col-xl-12 col-lg-12 col-md-12">
                    <div class="blog-slider owl-carousel">
          <div className="container">
            <Slider {...settings}>
              {Array.isArray(events) &&
                events.map((event, index) => (
                  <div
                    key={event.content_id}
                    className="single-box"
                    style={{ margin: '100px' }} // Adjust the margin value as needed
                  >
                    <div className="part-img" style={{ width: '30%', float: 'left' }}>
                      <img
                        src={`http://43.228.126.245/EMS-API/storage/uploads/${event.file_name}`}
                        alt={`Event`}
                        width="280px"          
                        height="270px"     
                      />
                    </div>
                    <div className="part-txt" style={{ width: '50%', float: 'left', paddingLeft: '20px' }}>
                      <a href="blog-details.html" className="title">
                        {event.title}
                      </a>
                      <p>{stripHtmlTags(event.description)}</p>

                                <div class="part-btn">
                                    <a href="blog-details.html" class="def-btn">Read More</a>
                                </div>
                    </div>
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

export default EventSlider;