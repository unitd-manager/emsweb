import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import ReactHtmlParser from "react-html-parser";
import ReactPlayer from "react-player";
import bannerImage from "../../src/assets/images/Aboutussub.jpg";
import api from '../constants/api';

const Engalaisub = () => {   
    const navigate = useNavigate(); // Initialize useNavigate for navigation
    const { subCategoryId } = useParams([]);
    const [subContent, setSubContent] = useState([]);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const getSubContent = async () => {
            try {
                const res = await api.post("/content/getNiruvanarSubContent", { sub_category_id: subCategoryId });
                setSubContent(res.data.data);
                AOS.init();
            } catch (error) {
                console.error("Error fetching subcontent:", error);
            }
        };

        getSubContent();   
    }, [subCategoryId]);
    useEffect(() => {
        api
          .post("/blog/getBlogsBySubCategoryId", { sub_category_id: subCategoryId })
          .then((res) => {
            setBlogs(res.data.data || []);
          })
          .catch((error) => {
            console.error("Error fetching blog data:", error);
          });
      }, [subCategoryId]);
    const handleBlogClick = (blog_id) => {
        navigate(`/DetailBlog/${blog_id}`); // Navigate to the blogDetail page with the blog_id
      };
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
                                <h1>Engalai Patri</h1>
                                <ul>
                                    <li>Home</li>
                                    <li>-</li>
                                    <li>Thunai Amaipugal</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="feature-2">
                <div className="container">
                    <div className="row justify-content-center">
                        {subContent.map((data, index) => (
                            <div key={index} className="col-xl-12 col-lg-12 col-md-12">
                                <div className="part-img">
                                    <h2>{data.title}</h2>
                                </div>
                                <div className="text-left">
                                    {data.description && data.description.match(/\b(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})\b/g) ? (
                                        <ReactPlayer
                                            url={data.description}
                                            controls
                                            width="100%"
                                            height="600px"
                                        />
                                    ) : (
                                        <p className="description" style={{ fontSize: "14px" }}>
                                            {ReactHtmlParser(data.description)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
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
}

export default Engalaisub;