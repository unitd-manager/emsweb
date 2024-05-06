import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MetaTags from "react-meta-tags";
import Paginator from "react-hooks-paginator";
//import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
//import { connect } from "react-redux";
import { getSortedProducts } from "../../helpers/product";
//import LayoutOne from "../../layouts/Layout";
//import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopSidebar from "../../wrappers/product/ShopSidebar";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopProducts from "../../wrappers/product/ShopProducts";
import api from "../../constants/api";

const Shop = ({}) => {
  const [layout, setLayout] = useState('grid three-column');
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  console.log("search", searchQuery);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const query = urlSearchParams.get("search");
    const cate = urlSearchParams.get("category");

    if (query) {
      setSearchQuery(query);
      api
        .post(`product/getProductsbySearch`, { keyword: query })
        .then((res) => {
          setProducts(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (cate) {
      getSortParams("category", cate);
    } else {
      api
        .get("/product/getAllProducts")
        .then((res) => {
          res.data.data.forEach((element) => {
            element.tag = String(element.tag).split(",");
          });
          setProducts(res.data.data);
          setAllProducts(res.data.data);
        })
        .catch(() => {
          console.log("error");
        });
    }
    console.log("searchquery", query);
  }, [location]);

  const pageLimit = 15;
  const { pathname } = location;

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
    console.log("sortType", sortType);
    console.log("sortvalue", sortValue);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  useEffect(() => {
    const filter = async () => {
      let sortedProducts = getSortedProducts(products, sortType, sortValue);
      const filterSortedProducts = await getSortedProducts(
        sortedProducts,
        filterSortType,
        filterSortValue
      );
      sortedProducts = filterSortedProducts;
      console.log("sorted", sortedProducts);
      setSortedProducts(sortedProducts);
      setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
    };
    filter();
  }, [offset, products, sortType, sortValue, filterSortType, filterSortValue]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`?search=${searchQuery}`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Fragment>
      <MetaTags>
       
        <meta
          name="description"
          content="Shop page of UnitdEcom react minimalist eCommerce template."
        />
      </MetaTags>

      {/* <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Shop
      </BreadcrumbsItem> */}

      {/* <LayoutOne headerTop="visible"> */}
        {/* breadcrumb */}
        {/* <Breadcrumb /> */}

        <div className="shop-area pt-95 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 order-2 order-lg-1">
                {/* shop sidebar */}
                <ShopSidebar
                  products={allProducts}
                  getSortParams={getSortParams}
                  handleSearchSubmit={handleSearchSubmit}
                  handleSearchChange={handleSearchChange}
                  sideSpaceClass="mr-30"
                />
              </div>
              <div className="col-lg-9 order-1 order-lg-2">
                {/* shop topbar default */}
                <ShopTopbar
                  getLayout={getLayout}
                  getFilterSortParams={getFilterSortParams}
                  productCount={products.length}
                  sortedProductCount={currentData.length}
                />
                {/* shop page content default */}
                <ShopProducts 
                layout={layout} 
                products={currentData} />

                {/* shop product pagination */}
                <div className="pro-pagination-style text-center mt-30">
                  <Paginator
                    totalRecords={sortedProducts.length}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* </LayoutOne> */}
    </Fragment>
  );
};

Shop.propTypes = {
  location: PropTypes.object,
  products: PropTypes.array,
};

// const mapStateToProps = (state) => {
//   return {
//     products: state.productData.products,
//   };
// };

//export default connect(mapStateToProps)(Shop);

export default Shop;