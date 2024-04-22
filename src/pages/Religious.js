import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
//import NavMenu from '../components/NavMenu'
import api from "../constants/api";

const Religious = () => {
  const { title } = useParams();
  const [sectiones, setSectiones] = useState([]);

  const [religion, setReligion] = useState([]);
  useEffect(() => {
    
    api
      .get("/section/getSectionMenu")
      .then((res) => {
        setSectiones(res.data.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching sections:", error);
      });

      console.log("1w2e3",sectiones.section_id)


    const getReligion = () => {
      var formated = title.split("-").join(" ");

      api
        .post("/content/getReligionService", { title: formated,section_id:sectiones.section_id, })
        .then((res) => {
          setReligion(res.data.data);
          AOS.init(); // Move AOS.init() inside the promise chain to ensure it's called after data is fetched
        })
        .catch(() => {});
    };

    getReligion();
  }, [title]);

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
                {/* <div className="part-img">
                  <img
                    src={`https://emsweb.unitdtechnologies.com/storage/uploads/${image.file_name}`}
                    alt={image.alt}
                  />
                </div> */}
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
