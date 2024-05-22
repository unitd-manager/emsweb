import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { getIndividualTags } from "../../helpers/product";
import ShopSearch from "../../components/product/ShopSearch";
// import ShopCategories from "../../components/product/ShopCategories";
import ShopTag from "../../components/product/ShopTag";
import api from "../../constants/api";

const ShopSidebar = ({ products, getSortParams, sideSpaceClass, handleSearchSubmit, handleSearchChange }) => {
  const uniqueTags = getIndividualTags(products);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);

  useEffect(() => {
    api.get('/product/getProductBookCato')
      .then((res) => {
        setCategories(res.data.data);
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

  const categoryOptions = categories.map(category => ({
    value: category.category_title,
    label: category.category_title
  }));

  const areaOptions = categories.map(category => ({
    value: category.category_title,
    label: category.category_title
  }));

  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
      {/* shop search */}
      <ShopSearch handleSearchSubmit={handleSearchSubmit} handleSearchChange={handleSearchChange} />

      <br/>

      {/* filter by categories */}
      {/* <ShopCategories categories={categories} getSortParams={getSortParams} /> */}
      <h4 className="pro-sidebar-title">Category</h4>
      <div className="shop-select">
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          options={categoryOptions}
          placeholder="Filter category"
        />
      </div>

      <br/>
      <h4 className="pro-sidebar-title">Year</h4>
      <div className="shop-select">
        <Select
          value={selectedArea}
          onChange={handleAreaChange}
          options={areaOptions}
          placeholder="Year"
        />
      </div>

      {/* filter by tag
      <ShopTag tags={uniqueTags} getSortParams={getSortParams} /> */}
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
