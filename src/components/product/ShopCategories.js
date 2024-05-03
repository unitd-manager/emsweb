import PropTypes from "prop-types";
import React,{useState} from "react";
import { setActiveSort } from "../../helpers/product";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from 'reactstrap';

const ShopCategories = ({ categories, getSortParams }) => {
  const [open, setOpen] = useState('1');
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <div className="accordion">
  <div className="accordion-item">
    <div
      className="accordion-title"
      onClick={() => setIsActive(!isActive)}
    >
      <div>Categories {isActive ? '-' : '+'}</div>
      {/* <div>{isActive ? '-' : '+'}</div> */}
    </div>
    {isActive && <div className="accordion-content">
    <div className="sidebar-widget-list mt-30">
        {categories ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={e => {
                    getSortParams("category", "");
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> All Categories
                </button>
              </div>
            </li>
            {categories.map((category, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={e => {
                        getSortParams("category", category.category_id);
                        setActiveSort(e);
                      }}
                    >
                      {" "}
                      <span className="checkmark" /> {category.category_title}{" "}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No categories found"
        )}
      </div>
        </div>}
  </div>
</div>

    <Accordion open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader targetId="1" style={{backgroundColor:'#oo66a4'}}>Categories</AccordionHeader>
        <AccordionBody accordionId="1">
        <div className="sidebar-widget-list mt-30">
        {categories ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={e => {
                    getSortParams("category", "");
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> All Categories
                </button>
              </div>
            </li>
            {categories.map((category, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={e => {
                        getSortParams("category", category.category_id);
                        setActiveSort(e);
                      }}
                    >
                      {" "}
                      <span className="checkmark" /> {category.category_title}{" "}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No categories found"
        )}
      </div>
        </AccordionBody>
      </AccordionItem>
      </Accordion>
    {/* <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Categories </h4>
      */}
    </div>
  );
};

ShopCategories.propTypes = {
  categories: PropTypes.array,
  getSortParams: PropTypes.func
};

export default ShopCategories;
