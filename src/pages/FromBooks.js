import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
//import ReactHtmlParser from "react-html-parser";
//import NavMenu from '../components/NavMenu'
import api from "../constants/api";

const FromBooks = () => {
  const { categoryId } = useParams();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = () => {
      //var formated = title.split("-").join(" ");

      api
                .post("/content/getBooks",{category_id:categoryId })
                .then((res) => {
                  setBooks(res.data.data);
                  console.log('books',res.data.data)
                    AOS.init(); // Move AOS.init() inside the promise chain to ensure it's called after data is fetched
                })
                .catch(() => { });
    };

    getBooks();
  }, [categoryId]);

  return (
    <div>
 
            <div className="breadcrumb service-breadcrumb">
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
            </div>

            <div className="feature-2">
                <div className="container">
                    <div className="row justify-content-center">
                        {books.map((data, index) => (
                            <div key={index} className="col-xl-12 col-lg-12 col-md-12">
                                
                                <div className="text-left">
                  <p className="description" style={{ fontSize:"14px"}} >
                  <div className="part-txt" dangerouslySetInnerHTML={{ __html: data.description }} />
                  </p>
                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
);
}

export default FromBooks;
