import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ReactHtmlParser from 'react-html-parser';
import api from '../constants/api'; // Import necessary components only

const Kalvisub = () => {
  const { subCategoryId } = useParams([]);
  const [subContent, setSubContent] = useState([]);

  useEffect(() => {
    const getSubContent = () => {
      api
        .post('/content/getNiruvanarSubContent', { sub_category_id: subCategoryId })
        .then((res) => {
          setSubContent(res.data.data);
          AOS.init();
        })
        .catch(() => {});
    };

    getSubContent();
  }, [subCategoryId]);

  return (
    <div>
      <div className="feature-2">
        <div className="container">
          <div className="row justify-content-center">
            {subContent.map((data, index) => (
              <div key={index} className="col-xl-12 col-lg-12 col-md-12">
                <div className="part-img">
                  <h2>{data.title}</h2>
                </div>
                <div className="text-left">
                  <p className="description" style={{ fontSize: '14px' }}>
                    {ReactHtmlParser(data.description)}
                  </p>
                  {/* Link to navigate to YaseenBro component */}
                  <Link to="/YaseenBro">YaseenBro.pdf</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kalvisub;
