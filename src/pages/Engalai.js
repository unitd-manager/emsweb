
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
//import NavMenu from '../components/NavMenu'
import api from "../constants/api";

const Engalai = () => {
  const { id } = useParams();

  const [religion, setReligion] = useState([]);

  useEffect(() => {
    const getReligion = () => {
      //var formated = title.split("-").join(" ");

      api
        .post("/content/getByVappa", { category_id:id })
        .then((res) => {
          setReligion(res.data.data);
          AOS.init(); // Move AOS.init() inside the promise chain to ensure it's called after data is fetched
        })
        .catch(() => {});
    };

    getReligion();
  }, [id]);

  return (
    <div>
      <div className="breadcrumb service-breadcrumb">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-3 col-lg-3">
              <div className="part-txt">
                <h1>Services</h1>
                <ul>
                  <li>Home</li>
                  <li>-</li>
                  <li>Service Detail</li>
                 
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="feature-2">
        <div className="container">
          <div className="row justify-content-center">
            {religion.map((image, index) => (
              <div key={index} className="col-xl-12 col-lg-12 col-md-12">
                <div className="part-img">
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12">
                    <p>{image.category_title}</p>
                    <h3 class="pt- pb-3 text-capitalize card-title">{image.title}</h3>
                  <div
                    className="part-txt"
                    dangerouslySetInnerHTML={{ __html: image.description }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Engalai;

// ServiceDetails.js
// import React, { useState, useEffect } from 'react';
// import ReactHtmlParser from "react-html-parser";

// //import { useParams } from 'react-router-dom';
// import api from '../constants/api';

// const stripHtmlTags = (htmlString) => {
//     const doc = new DOMParser().parseFromString(htmlString, 'text/html');
//     return doc.body.textContent || '';
//   };
// const Ahlubaith = () => {
//     const [content, setContent] = useState(null);
//     //const {id}=useParams(); 
//     useEffect(() => {
//         const fetchContent = () => {
//             api.get("/content/getByVappa")
//                 .then(response => {
//                     setContent(response.data.data);
//                     console.log("Content", response.data.data);
//                 })
//                 .catch(error => {
//                     console.error('Error fetching content:', error);
//                 });
//         };

//         fetchContent();
//     }, []);


//     return (
//         <div>
            
//             <div className="service-details">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-xl-12 col-lg-12 next">
//                             <div className="tab-content" id="v-pills-tabContent">
//                                 <div className="tab-pane fade show active" id="v-pills-one" role="tabpanel" aria-labelledby="v-pills-one-tab">
//                                     <div className="main-content">

//                                         <div>
//                                             {content &&
//                                                 content.map(item => (
//                                                     <div key={item.content_id}>
//                                                         <h2>{item.title}</h2>
                                                        
//                                                         <p>
//                                                         {ReactHtmlParser(item.description)}
//                                                             </p>
//                                                     </div>
//                                                 ))
//                                             }
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Ahlubaith;
