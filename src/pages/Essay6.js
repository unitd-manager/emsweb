import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "aos/dist/aos.css";
//import NavMenu from '../components/NavMenu'
import api from "../constants/api";

const Thoguppugal = () => {
  const { id } = useParams();
console.log('sect',id);
  const [Essay1, setEssay1] = useState([]);

  useEffect(() => {
    const getEssay = () => {
      //var formated = title.split("-").join(" ");

      api
        .get("/content/getEssay6")
        .then((res) => {
          setEssay1(res.data.data);
      
        })
        .catch(() => {});
    };

    getEssay();
  }, [id]);

  return (
    <div>
      <div className="breadcrumb service-breadcrumb">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-3 col-lg-3">
              <div className="part-txt">
                <h1>Thoguppugal</h1>
                <ul>
                  <li>Home</li>
                  <li>-</li>
                  <li>Essay</li>
                 
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="feature-2">
        <div className="container">
          <div className="row justify-content-center">
            {Essay1.map((image, index) => (
              <div key={index} className="col-xl-12 col-lg-12 col-md-12">
                <div className="part-img">
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12">
                    {/* <p>{image.category_title}</p> */}
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

export default Thoguppugal;
