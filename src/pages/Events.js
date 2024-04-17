import React, { useState, useEffect } from "react";
import api from "../constants/api";
import { Link } from "react-router-dom";
//import moment from 'moment';
// import imageBase from "../../constants/image.js"

export default function Events() {
  const [Events, setEvents] = useState([]);

  //    const [filterSortType, setFilterSortType] = useState('');
  //      const [filterSortValue, setFilterSortValue] = useState('');
  //   const [searchQuery, setSearchQuery] = useState("");
  //   const [sortType, setSortType] = useState("");
  //   const [sortValue, setSortValue] = useState("");
  //   const [categories, setCategories] = useState();

  //   const location = useLocation();
  //   const navigate = useNavigate();
  // const pageLimit = 15;

  // console.log("search", searchQuery);
  useEffect(() => {
    getEvents();
    //getCategory();
  }, []);

  const getEvents = () => {
    // var formated = title.split("-").join(" ");
    api
      .get("/section/getEvents")
      .then((res) => {
        setEvents(res.data.data);
        //setCurrentData(res.data.data);
      })
      .catch(() => {});
  };

//   const getFormatedText = (title) => {
//     var formatedd = title.toLowerCase();
//     return formatedd.split(" ").join("-");
//   };

//   const getFormattedDate = (dateString) => {
//     const options = {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     };
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat("en-US", options).format(date);
//   };

  return (
    <>
    

      <div class="breadcrumb blog-breadcrumb">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-xl-4 col-lg-4">
              <div class="part-txt">
                <h1>Events</h1>
                <ul>
                  <li>Home</li>
                  <li>-</li>
                  <li>Events</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
<div>
      <div class="blog-2 blog-inner">
      <div class="container">
            <div class="row justify-content-center">
        <div class="main-content">
          <div class="row">
            {Events.map((data, index) => (
              <div key={index} class="col-xl-4 col-lg-4 col-md-4">
                <div class="single-blog">
                  <div class="part-img">
                    <img
                      src={`http://43.228.126.245/emsapi/storage/uploads/${data.file_name}`}
                      alt={data.alt}
                      width="300px"
                      height="250px"
                    />
                    <div class="tags"> </div>
                  </div>

                  <div class="part-txt">
                    <div class="blog-info">
                      <ul>
                        <li>
                          <span>
                            <i class="flaticon-user"></i>
                          </span>
                          {data.modified_by}
                        </li>
                        <li>
                          <span>
                            <i class="flaticon-clock"></i>
                          </span>
                          {data.creation_date}
                        </li>
                        
                      </ul>
                    </div>
                    <h3>{data.title}</h3>
                    <Link to={`/EventsEdit/${data.content_id}`}>
                       Read More
                      </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
      </div>
      </div>
    </>
  );
}
