import PropTypes from "prop-types";
import React from "react";

const HeroSliderTwoSingle = ({ data, sliderClassName, banners }) => {
  const stripHtmlTags = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    return doc.body.textContent || '';
  };

  return (
    <div
      className={`single-slider single-slider-10 slider-height-8 ${
        sliderClassName ? sliderClassName : ""
      }`}
      style={{ display: 'flex', position: 'relative', zIndex: 2, height: '300px' }}
    >
      <div
        className="background-image"
        style={{
          backgroundImage: `url(http://43.228.126.245/EMS-API/storage/uploads/${banners.file_name})`,
          backgroundSize: 'cover',
          backgroundPosition: 'left', // Adjust as needed
          flex: '1',
          height: '100%',
        }}
      ></div>

      <div
        className="container"
        style={{
          flex: '1', // Adjust the flex value as needed
          backgroundColor: '#001F3F', // Navy Blue background for content
          padding: '20px', // Adjust as needed
        }}
      >
        <div className="row justify-content-between">
          <div className="col-xl-7 col-lg-7 col-md-6">
            <div className="banner-txt">
              <h3 style={{ fontFamily: "cormorantgaramond", color: "#fcfeff" }}>
                {stripHtmlTags(data.description)}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HeroSliderTwoSingle.propTypes = {
  data: PropTypes.object,
  sliderClassName: PropTypes.string,
};

export default HeroSliderTwoSingle;