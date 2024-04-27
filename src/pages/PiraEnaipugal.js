// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import "aos/dist/aos.css";
// import ReactPlayer from 'react-player';

// import api from "../constants/api";

// const PiraEnaipugal = () => {
//   const { id } = useParams();
//   const [videoUrls, setVideoUrls] = useState([]);

//   // Fetch the sections when the component mounts
//   const getVideoUrls = () => {
//     api
//       .post('/content/getVideoUrl', { sub_category_id: id })
//       .then((res) => {
//         setVideoUrls(res.data.data[0]);
//       })
//       .catch(() => {
//         // Handle error
//       });
//   };

//   useEffect(() => {
//     getVideoUrls();
//   }, [id]); 

//   // Custom onClick handler for அவ்னிய்யா புக் ஸ்டோர்
//   const handleAvuniyaClick = () => {
//     // Redirect to Avuniya Book Store website
//     window.open("https://www.awniyyabookstore.com/", "_blank");
//   };

//   return (
//     <div>
//       <div className="breadcrumb service-breadcrumb">
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="">
//               <div className="part-txt">
//                 <h1>Services</h1>
//                 {/* Link to அவ்னிய்யா புக் ஸ்டோர் with custom onClick handler */}
//                 <Link to="/avuniya-book-store" onClick={handleAvuniyaClick}>அவ்னிய்யா புக் ஸ்டோர்</Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container">
//         <div className="video-gallery">
//           <h2></h2>
//           <div className="container">
//             <div className="video-item">
//               <ReactPlayer
//                 url={videoUrls && videoUrls.external_link}
//                 controls
//                 width="100%"
//                 height="auto"
//                 style={{ aspectRatio: '16/9' }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PiraEnaipugal;








import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import "aos/dist/aos.css";
import ReactPlayer from 'react-player';

import api from "../constants/api";

const PiraEnaipugal = () => {
  const { id } = useParams();
console.log("awsde",id)
  const [videoUrls, setVideoUrls] = useState([]);

  // Fetch the sections when the component mounts
    const getVideoUrls = () => {
      api
        .post('/content/getVideoUrl',{sub_category_id: id})
        .then((res) => {
          setVideoUrls(res.data.data[0]);
          console.log('edit Line Item',res.data.data)
        })
        .catch(() => {
          // Handle error
        });
    };
    console.log("1111",videoUrls&&videoUrls.external_link)
    useEffect(() => {
      getVideoUrls();
    }, [getVideoUrls]); 
  return (
    <div>
      <div className="breadcrumb service-breadcrumb">
        <div className="container">
          <div className="row justify-content-center">
            <div className="">
              <div className="part-txt">
                <h1>Services</h1>
            
              </div>
            </div>
          </div>
        </div>
      </div>

        <div className="container">
        <div className="video-gallery">
        <h2></h2>
        <div className="container">
          
                <div  className="video-item">
                  <ReactPlayer
                    url={videoUrls&&videoUrls.external_link}
                    controls
                    width="100%"
                    height="auto"
                    margin="30px"
                    style={{ aspectRatio: '16/9' }}
                  />
                  
                </div>
       
        </div>
      </div>
        </div>
      </div>
  );
};

export default PiraEnaipugal;
