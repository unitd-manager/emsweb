import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { useLocation, useNavigate,Link } from "react-router-dom";
import { Row, Col, Button } from 'react-bootstrap';
import MetaTags from "react-meta-tags";
import Paginator from "react-hooks-paginator";
import { getSortedProducts } from "../../helpers/product";
import ShopSidebar from "../../wrappers/product/ShopSidebar";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopProducts from "../../wrappers/product/ShopProducts";
import { getUser } from '../../common/user'
import api from "../../constants/api";

const Shop = () => {
  const [layout, setLayout] = useState('grid three-column');
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [user, setUser] = useState();
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [areaFilter, setAreaFilter] = useState('All');

  const location = useLocation();
  const navigate = useNavigate();

  const applyFilters = () => {
    let filteredData = [...products];

    // Apply category filter
    if (categoryFilter !== 'All' && categoryFilter !== 'default') {
      filteredData = filteredData.filter(item => item.category_title === categoryFilter);
    }

    // Apply area filter
    if (areaFilter !== 'All' && areaFilter !== 'default') {
      filteredData = filteredData.filter(item => item.category_title === areaFilter);
    }

    // Apply search filter
    if (searchQuery !== '') {
      filteredData = filteredData.filter(item =>
        (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.author_name && item.author_name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return filteredData;
  };

  const filteredGallery = applyFilters();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const query = urlSearchParams.get("search");
    const cate = urlSearchParams.get("category");

    if (query) {
      setSearchQuery(query);
      api.post(`product/getProductsbySearch`, { keyword: query })
        .then((res) => {
          setProducts(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (cate) {
      setCategoryFilter(cate);
    } else {
      api.get("/product/getProductBookList")
        .then((res) => {
          res.data.data.forEach((element) => {
            element.tag = String(element.tag).split(",");
          });
          setProducts(res.data.data);
        })
        .catch(() => {
          console.log("error");
        });
    }
  }, [location]);

  const pageLimit = 15;

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getSortParams = (sortType, sortValue) => {
    if (sortType === 'category') {
      setCategoryFilter(sortValue);
    } else if (sortType === 'area') {
      setAreaFilter(sortValue);
    } else {
      setSortType(sortType);
      setSortValue(sortValue);
    }
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
      setSortedProducts(sortedProducts);
      setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
    };
    filter();
  }, [offset, products, sortType, sortValue, filterSortType, filterSortValue, categoryFilter, areaFilter]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`?search=${searchQuery}`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  useEffect(() => {
   
    // setLoading(true)
    const userInfo = getUser();
    //const session = getSessionId();
    console.log('userInfo',userInfo)
    setUser(userInfo);
    
    
  }, []);

  return (
    <Fragment>
      <MetaTags>
        <meta
          name="description"
          content="Shop page of UnitdEcom react minimalist eCommerce template."
        />
      </MetaTags>

      <div className="shop-area pt-95 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 order-2 order-lg-1">
              {/* shop sidebar */}
              <br/>
              <br/>
              <br/>
              <br/>
              <Row><Col md='6'>
              { user !== null ?(
     <Link to={process.env.PUBLIC_URL + "/cart"}>
     <Button  type='submit'>View Cart</Button>
                </Link>
              ):(
                <Link to={process.env.PUBLIC_URL + "/MagazineLogin"}>
                <Button  type='submit'>View Cart</Button>
                           </Link> 
              )
               }
     </Col></Row>
                
     <br/>
              
            
              <ShopSidebar
                products={filteredGallery}
                getSortParams={getSortParams}
                handleSearchSubmit={handleSearchSubmit}
                handleSearchChange={handleSearchChange}
                sideSpaceClass="mr-30"
              />
            </div>
            <div className="col-lg-9 order-1 order-lg-2">

              <br/>
              {/* shop topbar default */}
              <ShopTopbar
                getLayout={getLayout}
                getFilterSortParams={getFilterSortParams}
                productCount={products.length}
                sortedProductCount={filteredGallery.length}
              />
              <br/>
             
              {/* shop page content default */}
              <ShopProducts 
                layout={layout} 
                products={filteredGallery} 
              />

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
    </Fragment>
  );
};

Shop.propTypes = {
  location: PropTypes.object,
  products: PropTypes.array,
};

export default Shop;
