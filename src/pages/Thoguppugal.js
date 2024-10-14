import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import AOS from "aos";
import "aos/dist/aos.css";
import api from "../constants/api";
import bannerImage from "../../src/assets/images/Thogupu.jpg";


const Religious = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const [sectiones, setSectiones] = useState([]);
  const [religion, setReligion] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state


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
      const section = sectiones.find((sec) => sec.section_title === "ஞான அகமியங்கள்");
      if (section) {
        api
          .post("/content/getDetailContent", { category_id: id, section_id: section.section_id })
          .then((res) => {
            const responseData = res.data.data;
            // Check if any of the items in responseData have a sub_category_id
            const hasSubCategory = responseData.some((item) => item.sub_category_id !== null);

            if (hasSubCategory) {
              navigate("/"); // Redirect to homepage if sub_category_id exists
            } else {
              setReligion(responseData); // Only set religion if no sub_category_id
              AOS.init(); // Initialize AOS after data is fetched
            }
          })
          .catch((error) => {
            console.error("Error fetching religion data:", error);
          })
          .finally(() => {
            setLoading(false); // Mark loading as false after API call is completed
          });
      }
    }
  }, [id, sectiones, navigate]); // Run when `id` or `sectiones` changes

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
    navigate(`/DetailBlog/${blog_id}`); // Navigate to the blogDetail page with the blog_id
  };
  // Prevent rendering until the API call is complete
  if (loading) {
    return null; // Return nothing while loading
  }

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
                <h1>Thoguppugal</h1>
                <ul>
                  <li>Home</li>
                  <li>-</li>
                  <li>Thoguppugal Detail</li>
                 
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
