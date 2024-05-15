import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import ReactHtmlParser from "react-html-parser";
import bannerImage from "../../src/assets/images/Thogupu.jpg";
import api from '../constants/api';

const ThoguppugalSubCategory = () => {   
    const { subCategoryId } = useParams([]);
    const [subContent, setSubContent] = useState([]);
    const [selectedAudioUrl, setSelectedAudioUrl] = useState(null);

    useEffect(() => {
        const getSubContent = () => {
            api
                .post("/content/getThoguppugalSubContent",{sub_category_id: subCategoryId})
                .then((res) => {
                    setSubContent(res.data.data);
                    AOS.init();
                })
                .catch(() => { });
        };

        getSubContent();   
    }, [subCategoryId]);

    const playAudio = (audioUrl) => {
        setSelectedAudioUrl(audioUrl);
    };

    const closeAudioPopup = () => {
        setSelectedAudioUrl(null);
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
                        {subContent.map((data, index) => (
                            <div key={index} className="col-xl-12 col-lg-12 col-md-12">
                                <div className="part-img">
                                    <h5 onClick={() => playAudio(`https://emsweb.unitdtechnologies.com/storage/uploads/${data.file_name}`)}>{data.title}</h5>
                                </div>
                                <div className="text-left">
                                    <p className="description" style={{ fontSize:"14px"}}>
                                        {ReactHtmlParser(data.description)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedAudioUrl && (
                <div className="audio-popup">
                    <div className="popup-content">
                        <button className="close-btn" onClick={closeAudioPopup}>
                            Close
                        </button>
                        <audio src={selectedAudioUrl} controls />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ThoguppugalSubCategory;