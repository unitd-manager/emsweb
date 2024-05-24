import React, { useEffect, useState } from "react";
import AOS from "aos";
import { useParams } from "react-router-dom";
import { Label, Col, Input, FormGroup } from 'react-bootstrap';
import "aos/dist/aos.css";
import bannerImage from "../../src/assets/images/Evens.jpg";
import Select from 'react-select';
import ReactPlayer from "react-player";
import ReactAudioPlayer from "react-audio-player";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import api from "../constants/api";

const Thoguppugal = () => {
  const { id } = useParams();
  const [gallery, setGallery] = useState([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  const [selectedAudioUrl, setSelectedAudioUrl] = useState(null);
  const [valuelistCountry, setValuelistCountry] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState({ value: 'All', label: 'All' });
  const [areaFilter, setAreaFilter] = useState({ value: 'All', label: 'All' });
  const [searchQuery, setSearchQuery] = useState('');
  const [valuelistCity, setValuelistCity] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  console.log("sectionid", id);

  const openMediaPopup = (mediaUrl, fileName) => {
    if (mediaUrl && fileName && mediaUrl.match(/\bhttps?:\/\/\S+\.(png|jpe?g|gif)\b/g)) {
      setSelectedAudioUrl(`https://emsweb.unitdtechnologies.com/storage/uploads/${fileName}`);
    } else {
      setSelectedAudioUrl(mediaUrl);
    }
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
  
  const handleCategoryChange = (selectedOption) => {
    setCategoryFilter(selectedOption || { value: 'All', label: 'All' });
  };
  const handleCategoryChanges = (selectedOption) => {
    setAreaFilter(selectedOption || { value: 'All', label: 'All' });
  };

  const getValuelistCountry = () => {
    api
      .get('/valuelist/getValueListCountry')
      .then((res) => {
        const options = res.data.data.map(item => ({
          value: item.valuelist_id,
          label: item.value
        }));
        setValuelistCountry([{ value: 'All', label: 'All' }, ...options]);
      })
      .catch((error) => {
        console.log('valuelist not found:', error);
      });
  };
  useEffect(() => {
    const countryValue = categoryFilter.label
    console.log('countryValue',countryValue)
            api
            .post('/valuelist/getValueListCity',{value:countryValue})
            .then((res1) => {
              const options = res1.data.data.map(item => ({
                value: item.valuelist_id,
                label: item.citi_value
              }));
              setValuelistCity([{ value: 'All', label: 'All' }, ...options]);
             
              console.log('cityrr',res1.data.data)
              console.log('city',options)
             })
  }, [categoryFilter]);

  useEffect(() => {
    getValuelistCountry();
  }, []);

  const openVideoPopup = (description, fileName) => {
    if (description && description.match(/\bhttps?:\/\/\S+\.(png|jpe?g|gif)\b/g)) {
      openMediaPopup(
        `https://emsweb.unitdtechnologies.com/storage/uploads/${fileName}`,
        fileName
      );
      setSelectedVideoUrl(null);
    } else if (description) {
      setSelectedVideoUrl(description);
      setSelectedAudioUrl(null);
    } else if (fileName && fileName.endsWith(".mp3")) {
      openMediaPopup(
        `https://emsweb.unitdtechnologies.com/storage/uploads/${fileName}`,
        fileName
      );
    } else {
      setSelectedVideoUrl(null);
      setSelectedAudioUrl(null);
    }
  };

  const closeVideoPopup = () => {
    setSelectedVideoUrl(null);
  };

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    if (name === 'fromDate') {
      setFromDate(value ? new Date(value) : null);
    } else if (name === 'toDate') {
      setToDate(value ? new Date(value) : null);
    }
  };

  const applyFilters = () => {
    let filteredData = [...gallery];

    if (categoryFilter.value !== 'All') {
      filteredData = filteredData.filter(item => item.upload_country === categoryFilter.label);
    }

    if (areaFilter.value !== 'All') {
      filteredData = filteredData.filter(item => item.upload_city === areaFilter.label);
    }

    if (fromDate && toDate) {
      filteredData = filteredData.filter(item => {
        const contentDate = new Date(item.content_date);
        return contentDate >= fromDate && contentDate <= toDate;
      });
    }

    if (searchQuery !== '') {
      filteredData = filteredData.filter(item =>
        (item.search_keyword && item.search_keyword.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return filteredData;
  };

  const filteredGallery = applyFilters();
  console.log('filteredGallery',filteredGallery)
  console.log('areaFilter',areaFilter)
  console.log('valuelistCity',valuelistCity)
  console.log('categoryFilter.label',categoryFilter.label)

  const customStyles = {
    control: (base) => ({
      ...base,
      minWidth: '200px',
      cursor: 'pointer',
      color: 'blue',
      background: 'none',
      border: '1px solid #ccc',
      padding: 0
    }),
    menu: (base) => ({
      ...base,
      minWidth: '200px'
    })
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    applyFilters();
  };
  const handleClearCategory = () => {
    setCategoryFilter({ value: 'All', label: 'All' });
    setAreaFilter({ value: 'All', label: 'All' });
    setFromDate(null)
    setToDate(null)
    // getSortParams('category', 'default');
  };
  const handleClearCategorydate = () => {
    setCategoryFilter({ value: 'All', label: 'All' });
    setAreaFilter({ value: 'All', label: 'All' });
    setFromDate(null)
    setToDate(null)
    // getSortParams('category', 'default');
  };
  

  return (
    <div>
      <div
        className="breadcrumb service-breadcrumb"
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-3 col-lg-3">
              <div className="part-txt">
                <h1>Gallery</h1>
                <ul>
                  <li>Home</li>
                  <li>-</li>
                  <li>Gallery</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="team-inner-2">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0',marginTop:-70 }}>
          <div className="shop-select" style={{ marginRight: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '4px'  }}>
              <h4 className="pro-sidebar-title">Country</h4>
              <Select
                styles={customStyles}
                value={categoryFilter}
                onChange={handleCategoryChange}
                options={valuelistCountry}
                placeholder="Filter category"
              />
            </div>
            <div className="shop-select" style={{ marginRight: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
              <h4 className="pro-sidebar-title">City</h4>
              <Select
                styles={customStyles}
                value={areaFilter}
                onChange={handleCategoryChanges}
                options={valuelistCity}
                placeholder="Filter category"
              />
            </div>
          <div className="shop-select" style={{ marginRight:'10px', border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
              {/* <label style={{ fontSize:15,fontWeight:'bold' }} >From Date</label> */}
              <h5 className="pro-sidebar-title">From Date</h5>
              <input
              style={{  border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}
                type="date"
                onChange={handleDateChange}
                value={fromDate ? fromDate.toISOString().split('T')[0] : ''}
                name="fromDate"
              />
            </div>
            <div className="shop-select" style={{ marginRight:'1000px', border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
              {/* <label style={{ fontSize:15,fontWeight:'bold' }}>To Date</label> */}
              <h5 className="pro-sidebar-title">To Date</h5>
              <input
              style={{  border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}
                type="date"
                onChange={handleDateChange}
                value={toDate ? toDate.toISOString().split('T')[0] : ''}
                name="toDate"
              />
            </div>
            
          
          </div>
          { toDate !== null &&(
            <button onClick={handleClearCategory} style={{ marginTop: '10px', cursor: 'pointer', color: 'blue', textDecoration: 'underline', background: 'none', border: 'none', padding: 0 }}>
              Clear
            </button>
          )}
           
          <div className="sidebar-widget" style={{ padding: '10px', borderRadius: '4px', marginRight: "450px",marginLeft:-10 }}>
            <h4 className="pro-sidebar-title">Search</h4>
            <div className="pro-sidebar-search mb-50 mt-25">
              <form className="pro-sidebar-search-form" onSubmit={handleSearchSubmit}>
                <TextField
                  variant="outlined"
                  placeholder="Search here..."
                  fullWidth
                  onChange={handleSearchChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton type="submit">
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </form>
            </div>
          </div>
          <br/>
          <br/>
          <div className="row">
            {filteredGallery.map((item, index) => (
              <div className="col-xl-4 col-lg-4 col-sm-6" key={index}>
                <div className="single-box">
                  <div
                    className="video-item"
                    onClick={() =>
                      openVideoPopup(item.description, item.file_name)
                    }
                  >
                    <div className="part-img">
                      <img
                        src={
                          item.description &&
                          item.description.match(
                            /\bhttps?:\/\/\S+\.(png|jpe?g|gif)\b/g
                          )
                            ? item.description.match(
                                /\bhttps?:\/\/\S+\.(png|jpe?g|gif)\b/g
                              )[0]
                            : `https://emsweb.unitdtechnologies.com/storage/uploads/${item.file_name}`
                        }
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
            <ReactAudioPlayer
              src={selectedAudioUrl}
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
              width="500px"
              height="450px"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Thoguppugal;
