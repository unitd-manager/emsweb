import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useNavigate
import AOS from "aos";
import "aos/dist/aos.css";
import api from "../constants/api";
import bannerImage from "../../src/assets/images/quran3.jpg";

const Religious = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);
  
  useEffect(() => {
    const getSubContent = () => {
        //var formated = sub_category_id.split("-").join(" ");

        api
            .post("/blog/getBlogsByblogId",{blog_id: id})
            .then((res) => {
              setBlogs(res.data.data);
              console.log('subcontent',res.data.data)
                AOS.init(); // Move AOS.init() inside the promise chain to ensure it's called after data is fetched
            })
            .catch(() => { });
    };

    getSubContent();   
}, [id]);

  return (
    <div>
       <div className="breadcrumb service-breadcrumb"
       style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
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
            {blogs.map((image, index) => (
              <div key={index} className="col-xl-12 col-lg-12 col-md-12">
                <div className="col-xl-12 col-lg-12 col-md-12">
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

export default Religious;
