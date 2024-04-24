import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import api from "../constants/api";

const Religious = () => {
  const { id } = useParams();
  const [sectiones, setSectiones] = useState([]);
  const [religion, setReligion] = useState([]);

  // Fetch the sections when the component mounts
  useEffect(() => {
    api
      .get("/section/getSectionMenu")
      .then((res) => {
        setSectiones(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching sections:", error);
      });
  }, []); // No dependencies since we only fetch once on mount

  // Fetch the religion service data when sectiones and id are available
  useEffect(() => {
    if (sectiones.length > 0 ) {
      const section = sectiones.find((sec) => sec.section_title === "ஞான அகமியங்கள்");
      if (section) {
        api
          .post("/content/getDetailContent", { category_id: id, section_id: section.section_id })
          .then((res) => {
            setReligion(res.data.data);
            AOS.init(); // Move AOS.init() inside the promise chain
          })
          .catch((error) => {
            console.error("Error fetching religion data:", error);
          });
      }
    }
  }, [id, sectiones]); // Run when `id` or `sectiones` changes

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
