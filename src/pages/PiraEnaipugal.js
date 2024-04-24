import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import ReactHtmlParser from "react-html-parser";

//import NavMenu from '../components/NavMenu'
import api from '../constants/api';

const PiraEnaipugal = () => {   
    const { subCategoryId } = useParams([]);
    // console.log("Category ID:", categoryId);
    // console.log("Subcategory ID:", subCategoryId);

    const [subContent, setSubContent] = useState([]);

    useEffect(() => {
        const getSubContent = () => {
            //var formated = sub_category_id.split("-").join(" ");

            api
                .post("/content/getNiruvanarSubContent",{sub_category_id: subCategoryId})
                .then((res) => {
                  setSubContent(res.data.data);
                  console.log('subcontent',res.data.data)
                    AOS.init(); // Move AOS.init() inside the promise chain to ensure it's called after data is fetched
                })
                .catch(() => { });
        };

        getSubContent();   
    }, [subCategoryId]);

    return (
        <div>
 
            <div className="breadcrumb service-breadcrumb">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-3 col-lg-3">
                            <div className="part-txt">
                                <h1>Engalai Patri</h1>
                                <ul>
                                    <li>Home</li>
                                    <li>-</li>
                                    <li>Pira Enaipugal</li>
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
                  <p className="description" style={{ fontSize:"14px"}} >
                    {ReactHtmlParser(data.description)}
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

export default PiraEnaipugal;
