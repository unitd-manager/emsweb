import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
//import NavMenu from '../components/NavMenu'
import api from "../constants/api";
import bannerImage from "../../src/assets/images/Thogupu.jpg";


const Manitha = () => {
  const { id } = useParams();

  const [manitha, setManitha] = useState([]);

  useEffect(() => {
    const getManitha = () => {
      //var formated = title.split("-").join(" ");

      api
        .post("/content/getManitha", { category_id:id })
        .then((res) => {
          setManitha(res.data.data);
          AOS.init(); // Move AOS.init() inside the promise chain to ensure it's called after data is fetched
        })
        .catch(() => {});
    };

    getManitha();
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
                <h1>Manitha</h1>
                <ul>
                  <li>Home</li>
                  <li>-</li>
                  <li>Magangal</li>
                 
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="feature-2">
        <div className="container">
          <div className="row justify-content-center">
            {manitha.map((image, index) => (
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

export default Manitha;
