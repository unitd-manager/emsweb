import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
//import NavMenu from '../components/NavMenu'
import api from "../constants/api";
import Shop from "./shop/Shop";
import bannerImage from "../../src/assets/images/quran3.jpg";


const FromBooks = () => {
  const { id } = useParams();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = () => {
      //var formated = title.split("-").join(" ");

      api
        .post("/content/getBooks", { category_id:id })
        .then((res) => {
          setBooks(res.data.data);
          AOS.init(); // Move AOS.init() inside the promise chain to ensure it's called after data is fetched
        })
        .catch(() => {});
    };

    getBooks();
  }, [id]);

  return (
    <div>
     {id!=49 && <div className="breadcrumb service-breadcrumb"
       style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-3 col-lg-3">
              <div className="part-txt">
                <h1>Books</h1>
                <ul>
                  <li>Home</li>
                  <li>-</li>
                  <li>Books Detail</li>
                 
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>}

      {id==49 &&<Shop/>}
      <div className="feature-2">
        <div className="container">
          <div className="row justify-content-center">
            {books.map((image, index) => (
              <div key={index} className="col-xl-12 col-lg-12 col-md-12">
                <div className="part-img">
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12">
                    <p>{image.category_title}</p>
                    <h3 class="pt- pb-3 text-capitalize card-title">{image.title}</h3>
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

export default FromBooks;
