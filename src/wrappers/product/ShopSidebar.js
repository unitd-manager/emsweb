import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Select from 'react-select';
import ShopSearch from "../../components/product/ShopSearch";
import api from "../../constants/api";
//import ShopCategories from "../../components/product/ShopCategories";

const ShopSidebar = ({ products, getSortParams, sideSpaceClass, handleSearchSubmit, handleSearchChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [year, setYear] = useState([]);

 

  useEffect(() => {
    api.get('/product/getProductBookCato')
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch(err => { console.log(err) });
  }, []);
  useEffect(() => {
    api.get('/product/getProductBookYear')
      .then((res) => {
        setYear(res.data.data);
      })
      .catch(err => { console.log(err) });
  }, []);


  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    getSortParams('category', selectedOption ? selectedOption.value : 'default');
  };

  const handleAreaChange = (selectedOption) => {
    setSelectedArea(selectedOption);
    getSortParams('area', selectedOption ? selectedOption.value : 'default');
  };

  const handleClearCategory = () => {
    setSelectedCategory(null);
    getSortParams('category', 'default');
  };
  const handleClearYear = () => {
    setSelectedCategory(null);
    getSortParams('area', 'default');
  };

  const categoryOptions = categories.map(category => ({
    value: category.category_title,
    label: category.category_title
  }));

  const areaOptions = year.map(category => ({
    value: category.year,
    label: category.year
  }));

  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
      {/* shop search */}
      <ShopSearch handleSearchSubmit={handleSearchSubmit} handleSearchChange={handleSearchChange} />

      <br/>
      {/* filter by categories */}
      <h4 className="pro-sidebar-title">Category</h4>
      <div className="shop-select">
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          options={categoryOptions}
          placeholder="Filter category"
        />
      </div>

      {selectedCategory &&(
      <button onClick={handleClearCategory} style={{ marginTop: '10px', cursor: 'pointer', color: 'blue', textDecoration: 'underline', background: 'none', border: 'none', padding: 0 }}>
        Clear
      </button>
           ) }

      <br/>
      {/* <ShopCategories
        categories={categories}
        getSortParams={getSortParams}
      /> */}
      <h4 className="pro-sidebar-title">Year</h4>
      <div className="shop-select">
        <Select
          value={selectedArea}
          onChange={handleAreaChange}
          options={areaOptions}
          placeholder="Year"
        />
      </div>
      {selectedArea &&(
      <button onClick={handleClearYear} style={{ marginTop: '10px', cursor: 'pointer', color: 'blue', textDecoration: 'underline', background: 'none', border: 'none', padding: 0 }}>
        Clear
      </button>
           ) }

      <br/>
      {/* filter by tag */}
      {/* <ShopTag tags={uniqueTags} getSortParams={getSortParams} /> */}
    </div>
  );
};

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string,
  handleSearchSubmit: PropTypes.func,
  handleSearchChange: PropTypes.func
};

export default ShopSidebar;
