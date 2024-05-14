import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../constants/api";

function Navbar() {
  const [sections, setSections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null); // Add state for selected section
  const [sectiones, setSectiones] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Fetch sections, categories, and subcategories
    api
      .get("/section/getSectionMenu")
      .then((res) => {
        setSections(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching sections:", error);
      });

    api
      .get("/section/getSectionMenu")
      .then((res) => {
        setSectiones(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching sections:", error);
      });

    api
      .get("/category/getCategories", {
        section_id: sectiones && sectiones.section_id,
      })
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    api
      .get("/subcategory/getSubCategory", {
        section_id: categories && categories.section_id,
      })
      .then((res) => {
        setSubCategories(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching subcategories:", error);
      });
  }, []);

  // Function to filter categories for a specific section
  const getCategoriesForSection = (sectionId) => {
    return categories.filter((category) => category.section_id === sectionId);
  };

  // Function to filter subcategories for a specific category
  const getSubCategoriesForCategory = (categoryId) => {
    return subCategories.filter(
      (subcategory) => subcategory.category_id === categoryId
    );
  };

  // Handle section click event
  const handleSectionClick = (sectionId) => {
    console.log("Selected Section:", sectionId); // Log the selected section
    setSelectedSection(sectionId);
    setSelectedCategoryId(null); // Reset selected category
  };

  // Handle category click event
  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="col-xl-11 col-lg-11 next">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          <i className="flaticon-menu-button-of-three-horizontal-lines"></i>
        </button>
        <div
          className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav m-rauto">
            {/* Map over sections array to generate navbar items */}
            {sections.map((section) => (
              <li className="nav-item dropdown" key={section.section_id}>
                {/* Replace anchor tag with Link */}
                <Link
                  to={`/`}
                  className={`nav-link ${
                    selectedSection === section.section_id ? "active" : ""
                  }`}
                  onClick={() => handleSectionClick(section.section_id)}
                >
                  {section.section_title}
                </Link>
                {/* Filter categories for current section */}
                {getCategoriesForSection(section.section_id).length > 0 && (
                  <ul
                    className="dropdown-menu"
                    aria-labelledby={`${section.section_id}Dropdown`}
                  >
                    {getCategoriesForSection(section.section_id).map(
                      (category) => (
                        <li key={category.category_id}>
                          {/* Handle category click */}
                          <Link
                            to={`/${section.section_title}/${category.category_id}`}
                            className={`dropdown-item ${
                              selectedCategoryId === category.category_id
                                ? "active"
                                : ""
                            }`}
                            onClick={() =>
                              handleCategoryClick(category.category_id)
                            }
                          >
                            {category.category_title}
                          </Link>
                          {/* Render subcategories if category is selected */}
                          {selectedCategoryId === category.category_id && (
                            <ul className="dropdown-submenu">
                             {/* Modify the rendering of subcategory links */}
{getSubCategoriesForCategory(category.category_id).map((subcategory) => (
    <li key={subcategory.sub_category_id}>
        {/* Check if the subcategory has a YouTube link */}
        {subcategory.external_link ? (
            // If a YouTube link exists, render a YouTube link
            <a
                href={subcategory.external_link}
                className="dropdown-item"
                target="_blank"
                rel="noopener noreferrer"
            >
                {subcategory.sub_category_title}
            </a>
        ) : (
            // If no YouTube link exists, render a normal link
            <Link
                to={`/${section.section_title}/${category.category_id}/${subcategory.sub_category_id}`}
                className="dropdown-item"
            >
                {subcategory.sub_category_title}
            </Link>
        )}
    </li>
))}

                            </ul>
                          )}
                        </li>
                      )
                    )}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
