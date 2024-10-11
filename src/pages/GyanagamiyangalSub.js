import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../constants/api";
import bannerImage from "../../src/assets/images/quran-2.jpg";


const Religious = () => {
  const { id } = useParams();
  const [sectiones, setSectiones] = useState([]);

  // Fetch the sections when the component mounts
  useEffect(() => {
    api
      .post("/content/getSubContent", { sub_category_id: id })
      .then((res) => {
        setSectiones(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching sections:", error);
      });
  }, [id]); // No dependencies since we only fetch once on mount

 
  return (
    <div>
   <div className="breadcrumb service-breadcrumb"
       style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>        <div className="container">
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
            {sectiones.map((image, index) => (
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
