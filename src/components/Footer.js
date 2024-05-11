import React, { useState, useEffect } from "react";
import api from "../constants/api";
import { Link } from "react-router-dom";

export default function Footer() {
  const [menus, setMenus] = useState([]);
  //   const [email, setEmail] = useState();
  const [companyname, setCompanyName] = useState();
  //   const [address, setAddress] = useState();
  //   const [contact, setContact] = useState();
  const [ContentTypeCount, setContentTypeCount] = useState([]);
  const [blogItems, setBlogItems] = useState([]);
  const [Events, setEvents] = useState([]);
  // Function to scroll the page to the top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // const formatDate = (dateString) => {
  //   const options = {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   };
  //   const date = new Date(dateString);
  //   return new Intl.DateTimeFormat("en-US", options).format(date);
  // };

  const getblogItems = () => {
    api
      .post("/media/getNewsFileName")
      .then((res) => {
        setBlogItems(res.data.data);
      })
      .catch(() => {
        // message('Product Data Not Found', 'info');
      });
  };

  const getEvents = () => {
    // var formated = title.split("-").join(" ");
    api
      .get("/section/getEvents")
      .then((res) => {
        setEvents(res.data.data);
        //setCurrentData(res.data.data);
      })
      .catch(() => {});
  };

  const getContentTypeCount = () => {
    // var formated = title.split("-").join(" ");
    api
      .get("/content/getContentTypeCount")
      .then((res) => {
        setContentTypeCount(res.data.data[0]);
        console.log("ContentTypeCount", res.data.data);
        //setCurrentData(res.data.data);
      })
      .catch(() => {});
  };
  useEffect(() => {
    getContentTypeCount();
    getblogItems();
    getEvents();
  }, []);

  const getFormatedText = (title) => {
    var formatted = title.toLowerCase();
    return formatted.split(" ").join("-");
  };

  useEffect(() => {
    api
      .get("contact/getCompanyName")
      .then((res) => {
        setCompanyName(res.data.data[0]);
      })
      .catch(() => {
        // Handle error
      });
  }, []);

  useEffect(() => {
    api
      .get("section/getFooterMenu")
      .then((res) => {
        setMenus(res.data.data);
      })
      .catch(() => {
        // Handle error
      });
  }, []);

  return (
    <>
      <div class="footer" style={{ overflow: "hidden" }}>
        <div class="container">
          <div class="main-footer">
            <div class="row justify-content-between">
              <div class="col-xl-3 col-lg-4 col-sm-6">
                <div class="about-txt">
                  <h3>EDITOR PICKS</h3>
                  {Array.isArray(blogItems) &&
                    blogItems.slice(0, 3).map((item, index) => (
                      <div key={index}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={`https://aimanweb.unitdtechnologies.com/storage/uploads/${item.news_image}`}
                            alt={`News ${item.content_id}`}
                            style={{
                              width: "100px",
                              height: "69px",
                              marginRight: "10px",
                            }} // Adjust the width and height values as needed
                          />

                          <div>
                            <a
                              href={`/${item.content_id}`}
                              style={{ textDecoration: "none" }}
                              title={` ${item.title}`}
                            >
                              <p style={{ margin: 0 }}>
                                <Link
                                  to={`/NewsEdit/${item.content_id}`}
                                  style={{
                                    color: "white",
                                    transition: "color 0.3s",
                                  }}
                                  onMouseEnter={(e) =>
                                    (e.target.style.color = "blue")
                                  }
                                  onMouseLeave={(e) =>
                                    (e.target.style.color = "white")
                                  }
                                >
                                  {item.title}
                                </Link>
                              </p>
                            </a>
                            <p style={{ margin: 0 }}>
                              {/* {formatDate(item.creation_date)} */}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div class="col-xl-3 col-lg-4 col-sm-6">
                <div class="about-txt">
                  <h3>POPULAR POSTS</h3>
                  {Array.isArray(Events) &&
                    Events.slice(0, 3).map((item, index) => (
                      <div key={index}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={`https://aimanweb.unitdtechnologies.com/storage/uploads/${item.file_name}`}
                            alt={`News ${item.content_id}`}
                            style={{
                              width: "100px",
                              height: "69px",
                              marginRight: "10px",
                            }} // Adjust the width and height values as needed
                          />

                          <div>
                            <a
                              href={`/${item.content_id}`}
                              style={{ textDecoration: "none" }}
                              title={` ${item.title}`}
                            >
                              <p style={{ margin: 0 }}>
                                <Link
                                  to={`/EventsEdit/${item.content_id}`}
                                  style={{
                                    color: "white",
                                    transition: "color 0.3s",
                                  }}
                                  onMouseEnter={(e) =>
                                    (e.target.style.color = "blue")
                                  }
                                  onMouseLeave={(e) =>
                                    (e.target.style.color = "white")
                                  }
                                >
                                  {item.title}
                                </Link>
                              </p>
                            </a>
                            <p style={{ margin: 0 }}>
                              {/* <span>{formatDate(item.creation_date)}</span> */}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div class="col-xl-3 col-lg-4 col-sm-6">
                <div class="link">
                  <h3>POPULAR CATEGORY</h3>
                  <Link
                    style={{
                      color: "white",
                      transition: "color 0.3s",
                      fontSize: "13px",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "blue")}
                    onMouseLeave={(e) => (e.target.style.color = "white")}
                    to={`/Events`}
                    onClick={scrollToTop}
                  >
                    நிகழ்வுகள் <span>({ContentTypeCount.events_count})</span>
                  </Link>
                  <br></br>
                  <br></br>
                  <Link
                    style={{
                      color: "white",
                      transition: "color 0.3s",
                      fontSize: "13px",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "blue")}
                    onMouseLeave={(e) => (e.target.style.color = "white")}
                    to={`/News`}
                    onClick={scrollToTop}
                  >
                    செய்திகள்{" "}
                    <span>
                      {/* style={{ marginLeft: '150px', color: 'white', 
                            fontSize:'13px' }}> */}
                      ({ContentTypeCount.news_count})
                    </span>
                  </Link>
                  <br></br>
                  <br></br>
                  <Link
                    style={{
                      color: "white",
                      transition: "color 0.3s",
                      fontSize: "13px",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "blue")}
                    onMouseLeave={(e) => (e.target.style.color = "white")}
                    to={`/Articles`}
                    onClick={scrollToTop}
                  >
                    கட்டுரைகள்
                    {/* <span style={{ marginLeft: '140px', color: 'white', fontSize:'13px' }}> */}
                    <span>({ContentTypeCount.article_count})</span>
                  </Link>
                  <br></br>
                  <br></br>
                  <Link
                    style={{
                      color: "white",
                      transition: "color 0.3s",
                      fontSize: "13px",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "blue")}
                    onMouseLeave={(e) => (e.target.style.color = "white")}
                    to={`/Resources`}
                    onClick={scrollToTop}
                  >
                    வளங்கள் <span>({ContentTypeCount.resource_count})</span>
                  </Link>
                  <br></br>
                  <br></br>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ... (existing code) */}
        <div class="copyright">
          <div class="container">
            <div class="row">
              <div class="col-xl-6 col-lg-6">
                <p>
                  &copy; Aiman Sangam. Designed by{" "}
                  <a
                    href="http://www.unitdtechnologies.com/"
                    style={{ color: "#3399FF", textDecoration: "none" }}
                    target="_blank" // Opens the link in a new tab
                    rel="noopener noreferrer" // Recommended for security reasons
                  >
                    {companyname && companyname.CompanyName}
                  </a>
                </p>
              </div>
              <div class="col-xl-6 col-lg-6">
                <div class="link">
                  {menus.map((data, index) => (
                    <Link
                      key={index}
                      to={`/${getFormatedText(
                        data.section_title
                      ).toLowerCase()}`}
                    >
                      {data.section_title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
