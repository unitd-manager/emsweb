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
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await api.post('/api/subscribe', { email });
      setMessage(res.data.msg);
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

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

  const [sectionesaudio, setSectionesaudio] = useState([]);

  useEffect(() => {
   
    api
      .get("/section/getCategoryAudioType")
      .then((res) => {
        setSectionesaudio(res.data.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching sections:", error);
      });


   
  }, []);

  
  const [sectionesphoto, setSectionesphoto] = useState([]);

  useEffect(() => {
   
    api
      .get("/section/getCategoryPhotoType")
      .then((res) => {
        setSectionesphoto(res.data.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching sections:", error);
      });


   
  }, []);


  const [sectionesEvent, setSectionesEvent] = useState([]);

  useEffect(() => {
   
    api
      .get("/section/getCategoryEventType")
      .then((res) => {
        setSectionesEvent(res.data.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching sections:", error);
      });


   
  }, []);



  const [sectiones, setSectiones] = useState([]);

  useEffect(() => {
   

    api
      .get("/section/getCategoryType")
      .then((res) => {
        setSectiones(res.data.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching sections:", error);
      });


   
  }, []);

  const [sectionbook, setSectionbook] = useState([]);

  useEffect(() => {
   

    api
      .get("/section/getSectionCategory")
      .then((res) => {
        setSectionbook(res.data.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching sections:", error);
      });


   
  }, []);



  return (
    <>
 <div className="call-back" style={{ backgroundColor: "white" }}>
      <div className="container">
        <div className="bg" style={{ backgroundColor: "#CF9FFF" }}>
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="part-txt">
                <h5>Subscribe!</h5>
                <h2 style={{paddingBottom:"15px"}}>to our Newsletter</h2>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="form">
                <form onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    placeholder="Enter Email address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="input-field"
                  />
                  <button type="submit" disabled={loading} className="submit-button">
                    {loading ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
                {message && <p>{message}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div class="footer" style={{ overflow: "hidden" }}>
        <div class="container">
          <div class="main-footer">
            <div class="row justify-content-between">
            <div class="col-xl-3 col-lg-4 col-sm-6">
                <div class="link">
                  <h3>OUR WEBSITE LINKS LINKS</h3>
                  <Link
                    style={{
                      color: "white",
                      transition: "color 0.3s",
                      fontSize: "13px",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "white")}
                    onMouseLeave={(e) => (e.target.style.color = "white")}
                    to={`/MagazineLogin`}
                    onClick={scrollToTop}
                  >
                     EMS Magazine 
                  </Link>
                  <br></br>
                  <br></br>
                  <Link
                    style={{
                      color: "white",
                      transition: "color 0.3s",
                      fontSize: "13px",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "white")}
                    onMouseLeave={(e) => (e.target.style.color = "white")}
                    to={`/`}
                    onClick={scrollToTop}
                  >
                    Awniyya Books Store{" "}
                   
                  </Link>
                  <br></br>
                  <br></br>
                  <Link
                    style={{
                      color: "white",
                      transition: "color 0.3s",
                      fontSize: "13px",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "white")}
                    onMouseLeave={(e) => (e.target.style.color = "white")}
                    to={`/`}
                    onClick={scrollToTop}
                  >
                    Yaseenrali
                   
                  </Link>
                  <br></br>
                  <br></br>
                  <Link
                    style={{
                      color: "white",
                      transition: "color 0.3s",
                      fontSize: "13px",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "white")}
                    onMouseLeave={(e) => (e.target.style.color = "white")}
                    to={`/நிகழ்ச்சிகள்/${sectiones && sectiones.category_id}`}
                    onClick={scrollToTop}
                  >
                    EMS Web TV channel
                  </Link>
                  <br></br>
                  <br></br>
                  <Link
                    style={{
                      color: "white",
                      transition: "color 0.3s",
                      fontSize: "13px",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "white")}
                    onMouseLeave={(e) => (e.target.style.color = "white")}
                    to={`/`}
                    onClick={scrollToTop}
                  >
                    EMS Media
                  </Link>
                  <br></br>
                  <br></br>
                </div>
              </div>
              <div class="col-xl-3 col-lg-4 col-sm-6">
                <div class="link">
                  <h3>USEFUL LINKS</h3>
                  <Link
                    style={{
                      color: "white",
                      transition: "color 0.3s",
                      fontSize: "13px",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "white")}
                    onMouseLeave={(e) => (e.target.style.color = "white")}
                    to={`/நூற்கள்/${sectionbook && sectionbook.category_id}`}
                    onClick={scrollToTop}
                  >
                     நூற்கள் 
                  </Link>
                  <br></br>
                  <br></br>
                  <Link
                    style={{
                      color: "white",
                      transition: "color 0.3s",
                      fontSize: "13px",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "white")}
                    onMouseLeave={(e) => (e.target.style.color = "white")}
                    to={`/நிகழ்ச்சிகள்/${sectionesphoto && sectionesphoto.category_id}`}
                    onClick={scrollToTop}
                  >
                    புகைப்படங்கள்{" "}
                   
                  </Link>
                  <br></br>
                  <br></br>
                  <Link
                    style={{
                      color: "white",
                      transition: "color 0.3s",
                      fontSize: "13px",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "white")}
                    onMouseLeave={(e) => (e.target.style.color = "white")}
                    to={`/நிகழ்ச்சிகள்/${sectiones && sectiones.category_id}`}
                    onClick={scrollToTop}
                  >
                    காணொளி
                   
                  </Link>
                  <br></br>
                  <br></br>
                  <Link
                    style={{
                      color: "white",
                      transition: "color 0.3s",
                      fontSize: "13px",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "white")}
                    onMouseLeave={(e) => (e.target.style.color = "white")}
                    to={`/நிகழ்ச்சிகள்/${sectionesaudio && sectionesaudio.category_id}`}
                    onClick={scrollToTop}
                  >
                    ஆடியோ 
                  </Link>
                  <br></br>
                  <br></br>
                  <Link
                    style={{
                      color: "white",
                      transition: "color 0.3s",
                      fontSize: "13px",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "white")}
                    onMouseLeave={(e) => (e.target.style.color = "white")}
                    to={`/நிகழ்ச்சிகள்/${sectionesEvent && sectionesEvent.category_id}`}
                    onClick={scrollToTop}
                  >
                    நிகழ்வுகள்
                  </Link>
                  <br></br>
                  <br></br>
                </div>
              </div>

              <div class="col-xl-3 col-lg-4 col-sm-6">
                <div class="link">
                  <h3>INFORMATION</h3>
                  <Link
                    style={{
                      color: "white",
                      transition: "color 0.3s",
                      fontSize: "13px",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "white")}
                    onMouseLeave={(e) => (e.target.style.color = "white")}
                    to={`/contact`}
                    onClick={scrollToTop}
                  >
                     Contact Us 
                  </Link>
                  <br></br>
                  <br></br>
                  <Link
                    style={{
                      color: "white",
                      transition: "color 0.3s",
                      fontSize: "13px",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "white")}
                    onMouseLeave={(e) => (e.target.style.color = "white")}
                    to={`/login`}
                    onClick={scrollToTop}
                  >
                    Login{" "}
                   
                  </Link>
                  <br></br>
                  <br></br>
                  <Link
                    style={{
                      color: "white",
                      transition: "color 0.3s",
                      fontSize: "13px",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "white")}
                    onMouseLeave={(e) => (e.target.style.color = "white")}
                    to={`/RegisterForm`}
                    onClick={scrollToTop}
                  >
                    Register
                   
                  </Link>
                  <br></br>
                  <br></br>
                  <Link
                    style={{
                      color: "white",
                      transition: "color 0.3s",
                      fontSize: "13px",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "white")}
                    onMouseLeave={(e) => (e.target.style.color = "white")}
                    to={`/`}
                    onClick={scrollToTop}
                  >
                    Privacy Policy 
                  </Link>
                  <br></br>
                  <br></br>
                  <Link
                    style={{
                      color: "white",
                      transition: "color 0.3s",
                      fontSize: "13px",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "white")}
                    onMouseLeave={(e) => (e.target.style.color = "white")}
                    to={`/`}
                    onClick={scrollToTop}
                  >
                    Terms & Conditions
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
                  Copyright &copy; 2020 EMS Media All Rights Reserved{" "}
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
