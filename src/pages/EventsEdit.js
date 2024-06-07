import React, { useState, useEffect} from "react";
import {  useParams } from 'react-router-dom';

import api from "../constants/api";
//import NavMenu from '../components/NavMenu'
//import { Link } from "react-router-dom";
//import moment from 'moment';
// import imageBase from "../../constants/image.js"

export default function Events() {
  const [Events, setEvents] = useState([]);
  const { id } = useParams();

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

  
  
  
  //Api call for getting Vehicle Data By ID

  useEffect(() => {
    const getEventsById = () => {
      api
        .post('/section/getEventsById', { content_id: id })
        .then((res) => {
          setEvents(res.data.data[0]);
        })
        .catch(() => {
        });
    };
  
    getEventsById();
  }, [id]); // <-- Add id to the dependency array
  
console.log("idcer",Events)
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
      
      <div>
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

      <div class="blog-2 blog-inner">
      <div class="container">
            <div class="row justify-content-center">
            <div className="feature-2">
                <div className="container">
                    <div className="row justify-content-center">
                            <div className="col-xl-12 col-lg-12 col-md-12">
                                {/* <div className="part-img">
                                    <img src={`http://43.228.126.245/emsapi/storage/uploads/${Events&&Events.file_name}`} alt={Events&&Events.alt}  width="600px"
                      height="550px" />
                                </div><br/> */}
                                  <div className="col-xl-12 col-lg-12 col-md-12">
                                    <div className="part-txt" dangerouslySetInnerHTML={{ __html: Events&&Events.title }} />
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12">
                                    <div className="part-txt" dangerouslySetInnerHTML={{ __html: Events&&Events.description }} />
                                </div>
                            </div>
                     
                    </div>
                </div>
            </div>
        </div>
      </div>
      </div>
      </div>
    </>
  );
}
