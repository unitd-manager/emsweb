import React, { useState, useEffect } from "react";
import api from "../constants/api";
import { Link } from "react-router-dom";
//import moment from 'moment';
// import imageBase from "../../constants/image.js"
import MagazineLogin from './MagazineLogin'
import MagazineSubscribe from "./MagazineSubscripe";

export default function Magazine() {
  const [Magazine, setMagazine] = useState([]);
  const [subs, setSubs] = useState("");

  const getSelectedLanguageFromLocalStorage = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : {};
  };

  const selectedLanguage = getSelectedLanguageFromLocalStorage();
  console.log('selectedLanguage', selectedLanguage);
  const contactId = selectedLanguage.contact_id;
  console.log('contactId', contactId);

  useEffect(() => {
    const getContactById = () => {
      api
        .post('/contact/getContactsById', { contact_id: contactId })
        .then((res) => {
          setSubs(res.data.data[0].subs_payment_status);
        })
        .catch(() => {
        });
    };
  
    getContactById();
  }, []);

  useEffect(() => {
    getMagazine();
  }, []);

  const getMagazine = () => {
    api
      .get("/content/getMagazine")
      .then((res) => {
        setMagazine(res.data.data);
      })
      .catch(() => {});
  };

  return (
    <>
     {contactId ? (
      <>
      {subs ==='subscribe' ? (
        <>
          <div className="breadcrumb blog-breadcrumb">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-4 col-lg-4">
                  <div className="part-txt">
                    <h1>Magazine</h1>
                    <ul>
                      <li>Home</li>
                      <li>-</li>
                      <li>Magazine</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="blog-2 blog-inner">
            <div className="container">
              <div className="row justify-content-center">
                <div className="main-content">
                  <div className="row">
                    {Magazine.map((data, index) => (
                      <div key={index} className="col-xl-4 col-lg-4 col-md-4">
                        <div className="single-blog">
                          <div className="part-img">
                            <img
                              src={`http://43.228.126.245/emsapi/storage/uploads/${data.file_name}`}
                              alt={data.alt}
                              width="300px"
                              height="250px"
                            />
                            <div className="tags"> </div>
                          </div>
                          <div className="part-txt">
                            <div className="blog-info">
                              <ul>
                                <li>
                                  <span>
                                    <i className="flaticon-user"></i>
                                  </span>
                                  {data.modified_by}
                                </li>
                                <li>
                                  <span>
                                    <i className="flaticon-clock"></i>
                                  </span>
                                  {data.creation_date}
                                </li>
                              </ul>
                            </div>
                            <h3>{data.title}</h3>
                            <Link to={`/MagazineArtical/${data.magazine_id}`}>
                              Show Article
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        // <div className="part-txt">
        //   <h1>No Access to Magazine</h1>
        //   <p>Please log in to view the magazine content.</p>
        // </div>
        <MagazineSubscribe></MagazineSubscribe>
      )}
      </>
      ) : (
        // <div className="part-txt">
        //   <h1>No Access to Magazine</h1>
        //   <p>Please log in to view the magazine content.</p>
        // </div>
        <MagazineLogin></MagazineLogin>
      )}

    </>
  );
}
