import React, { useEffect, useState } from "react";
import AOS from "aos";
import { useParams } from "react-router-dom";
import "aos/dist/aos.css";
import ReactPlayer from "react-player";

import api from "../constants/api";

const Thoguppugal = () => {
  const { id } = useParams();
  const [gallery, setGallery] = useState([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  const [selectedAudioUrl, setSelectedAudioUrl] = useState(null);

  console.log('sectionid',id);

  const openMediaPopup = (mediaUrl) => {
    setSelectedAudioUrl(mediaUrl);
  };

  const closeMediaPopup = () => {
    setSelectedAudioUrl(null);
  };

  useEffect(() => {
    const getGallery = () => {
      api
        .post("/content/getwebPhotoGallery", { category_id: id })
        .then((res) => {
          setGallery(res.data.data);
          AOS.init();
        })
        .catch(() => {});
    };

    getGallery();
  }, [id]);

  const openVideoPopup = (description, fileName) => {
    if (description) {
      setSelectedVideoUrl(description);
    } else if (fileName && fileName.endsWith(".mp3")) {
      openMediaPopup(
        `https://emsweb.unitdtechnologies.com/storage/uploads/${fileName}`
      );
    } else {
      setSelectedVideoUrl(null);
    }
  };

  const closeVideoPopup = () => {
    setSelectedVideoUrl(null);
  };

  return (
    <div>
      <div className="breadcrumb service-breadcrumb">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-3 col-lg-3">
              <div className="part-txt">
                <h1>Gallery</h1>
                <ul>
                  <li>Home</li>
                  <li>-</li>
                  <li>Products</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="team-inner-2">
        <div className="container">
          <div className="row">
            {gallery.map((item, index) => (
              <div className="col-xl-4 col-lg-4 col-sm-6" key={index}>
                <div className="single-box">
                  <div
                    className="video-item"
                    onClick={() => openVideoPopup(item.description, item.file_name)}
                  >
                    <div className="part-img">
                      <img
                        src={`https://emsweb.unitdtechnologies.com/storage/uploads/${item.file_name}`}
                        alt={`${item.content_id}`}
                      
                      />
                    </div>
                  </div>
                  <div className="part-txt">
                    <div className="title">
                      <p>{item.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedAudioUrl && (
        <div className="audio-popup">
          <div className="popup-content">
            <button className="close-btn" onClick={closeMediaPopup}>
              Close
            </button>
            <ReactPlayer
              url={selectedAudioUrl}
              controls
              width="40%"
              height="35%"
            />
          </div>
        </div>
      )}

      {selectedVideoUrl && (
        <div className="video-popup">
          <div className="popup-content">
            <button className="close-btn" onClick={closeVideoPopup}>
              Close
            </button>
            <ReactPlayer
              url={selectedVideoUrl}
              controls
              width="50%"
              height="100%"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Thoguppugal;
