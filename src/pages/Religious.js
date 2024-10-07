import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import AOS from "aos";
import "aos/dist/aos.css";
import api from "../constants/api";

const Religious = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const [sectiones, setSectiones] = useState([]);
  const [religion, setReligion] = useState([]);
  const [blogs, setBlogs] = useState([]);

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
  }, []);

  // Fetch the religion service data when sectiones and id are available
  useEffect(() => {
    if (sectiones.length > 0) {
      const section = sectiones.find((sec) => sec.section_title === "வஹ்தத்துல் வுஜூத்");
      if (section) {
        api
          .post("/content/getDetailContent", { category_id: id, section_id: section.section_id })
          .then((res) => {
            setReligion(res.data.data);
            AOS.init();
          })
          .catch((error) => {
            console.error("Error fetching religion data:", error);
          });
      }
    }
  }, [id, sectiones]);

  // Fetch blog data when the id changes
  useEffect(() => {
    api
      .post("/blog/getBlogsByCategoryId", { category_id: id })
      .then((res) => {
        setBlogs(res.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching blog data:", error);
      });
  }, [id]);

  // Function to handle blog title click
  const handleBlogClick = (blog_id) => {
    navigate(`/ReligiousDetail/${blog_id}`); // Navigate to the blogDetail page with the blog_id
  };

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

          {/* Display blog titles below the detail content only if there are any blogs */}
          {blogs.length > 0 && (
            <div className="blog-titles">
              <ul>
                {blogs.map((blog, index) => (
                  <li
                    key={index}
                    onClick={() => handleBlogClick(blog.blog_id)} // Handle click to navigate to blogDetail page
                    style={{ cursor: "pointer", color: "blue" }} // Add pointer cursor and styling
                  >
                    {blog.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Religious;
