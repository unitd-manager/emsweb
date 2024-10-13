import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import bannerImage from "../../src/assets/images/about.jpg";
import api from "../constants/api";

const Engalai = () => {
  const { id } = useParams();
  const [religion, setReligion] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const navigate = useNavigate();

  useEffect(() => {
    const getReligion = async () => {
      try {
        const res = await api.post("/content/getByVappa", { category_id: id });
        const responseData = res.data.data;

        // Check if any of the items have sub_category_id, if so navigate to homepage
        const hasSubCategory = responseData.some((item) => item.sub_category_id !== null);
        
        if (hasSubCategory) {
          navigate("/"); // Redirect to homepage
        } else {
          setReligion(responseData); // Set religion data if no subcategory
          AOS.init(); // Initialize AOS after data is fetched
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false); // Stop loading once API is complete
      }
    };

    getReligion();
  }, [id, navigate]);

  // Prevent rendering while loading or if redirect is happening
  if (loading) {
    return null; // Render nothing while loading or redirecting
  }

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
                <h1>About Us</h1>
                <ul>
                  <li>Home</li>
                  <li>-</li>
                  <li>About us</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="feature-2">
        <div className="container">
          <div className="row justify-content-center">
            {religion.map((item, index) => (
              <div key={index} className="col-xl-12 col-lg-12 col-md-12">
                <div className="part-img"></div>
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <p>{item.category_title}</p>
                  <h3 className="pt- pb-3 text-capitalize card-title">
                    {item.title}
                  </h3>
                  <div
                    className="part-txt"
                    dangerouslySetInnerHTML={{
                      __html: item.description,
                    }}
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
