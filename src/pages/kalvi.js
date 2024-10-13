import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import AOS from "aos";
import "aos/dist/aos.css";
import api from "../constants/api";
import bannerImage from "../../src/assets/images/quran-2.jpg";

const Kalvi = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const [religion, setReligion] = useState([]);

  useEffect(() => {
    const getReligion = () => {
      api
        .post("/content/getByVappa", { category_id: id })
        .then((res) => {
          const data = res.data.data;
          setReligion(data);

          // Check if any sub_category_id exists in the response data
          const hasSubCategory = data.some(item => item.sub_category_id);

          // If sub_category_id exists, navigate to the homepage
          if (hasSubCategory) {
            navigate("/"); // Navigate to the homepage or any other route
          }

          AOS.init(); // Initialize AOS for animations
        })
        .catch((error) => {
          console.error("Error fetching religion data:", error);
        });
    };

    getReligion();
  }, [id, navigate]); // Added navigate to the dependency array

  return (
    <div>
      <div
        className="breadcrumb service-breadcrumb"
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
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
                <div className="part-img"></div>
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <p>{image.category_title}</p>
                  <h3 className="pt- pb-3 text-capitalize card-title">{image.title}</h3>
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

export default Kalvi;
