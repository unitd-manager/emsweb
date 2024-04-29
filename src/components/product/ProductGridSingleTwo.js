import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Badge, Button } from "reactstrap";
import { Link } from "react-router-dom";
//import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../helpers/product";
//import ProductModal from "./ProductModal";
import imageBase from "../../constants/imageBase";
import { useReducer } from "react";

const ProductGridSingleTwo = ({
  product,
  currency,
  addToCart,
  addToWishlist,
  addToCompare,
  onAddToCart,
  onAddToWishlist,
  onAddToCompare,
  cartItem,
  wishlistItem,
  compareItem,
  sliderClassName,
  spaceBottomClass,
  colorClass,
  titlePriceClass,
  InsertToCart,
  user
}) => {
  const [modalShow, setModalShow] = useState(false);
  //const { addToast } = useToasts();
const[loginModal , setLoginModal]=useState(false);

  //const discountedPrice = getDiscountPrice(product.price, product.discount_amount);
  const finalProductPrice = +(product.price).toFixed(2);
  const finalDiscountedPrice = +(
    product.price
  ).toFixed(2);
  
  product.images= String(product.images).split(',')
console.log('file',product)
console.log('images',product.images)
const formattedTitle = product.title.replace(/\s+/g, '-');

  return (
    <Fragment>
      <div
        className={`col-xl-4 col-sm-4 ${
          sliderClassName ? sliderClassName : ""
        }`}
      >
        <div
          className={`product-wrap-2 ${
            spaceBottomClass ? spaceBottomClass : ""
          } ${colorClass ? colorClass : ""} `}
        >
          <div className="product-img">
            <Link to={process.env.PUBLIC_URL + "/நூற்கள்/" + product.product_id+"/"+ product.product_id}>
              <img
                className="default-img"
                src={`https://emsweb.unitdtechnologies.com:4014/${product.images[0]}`}
                alt=""
                style={{height:'250px',width:'250px'}}
              />
               {product.images.length > 1 ? (
                <img
                  className="hover-img"
                  src={`${imageBase}${product.images[0]}`}
                  alt=""
                  style={{height:'250px',width:'250px'}}
                />
              ) : (
                ""
              )}
              
            </Link>
            {/* {product.discount_amount || product.latest ? (
                <div className="product-img-bad">
              <div className="product-img-badges">
                {product.discount_percentage ? (
                  <span className="pink">{product.discount_percentage}%</span>
                ) : (
                  ""
                )}
               </div>
              </div>
             
            ) : (
              ""
            )} */}
{/* 
            <div className="product-action-2">
              {product.affiliateLink ? (
                <a
                  href={product.affiliateLink}
                  rel="noopener noreferrer"
                  target="_blank"
                  title="Buy now"
                >
                  {" "}
                  <i className="fa fa-shopping-cart"></i>{" "}
                </a>
              ) : product.variation && product.variation.length >= 1 ? (
                <Link
                  to={`${process.env.PUBLIC_URL}/product/${product.product_id}/${formattedTitle}`}
                  title="Select options"
                >
                  <i className="fa fa-cog"></i>
                </Link>
              ) : product.qty_in_stock && product.qty_in_stock > 0 ? (
                <button
                  onClick={() => { onAddToCart(product)}}
                  // className={
                  //   cartItem !== undefined && cartItem.quantity > 0
                  //     ? "active"
                  //     : ""
                  // }
                  className={
                    product !== undefined && product.qt_in_stock > 0
                      ? "active"
                      : ""
                  }
                  disabled={cartItem !== undefined && cartItem.quantity > 0}
                  title={
                    cartItem !== undefined ? "Added to cart" : "Add to cart"
                  }
                >
                  {" "}
                  <i className="fa fa-shopping-cart"></i>{" "}
                </button>
              ) : (
                <button disabled className="active" title="Out of stock">
                  <i className="fa fa-shopping-cart"></i>
                </button>
              )}

              <button onClick={() => setModalShow(true)} title="Quick View">
                <i className="fa fa-eye"></i>
              </button>
     
           
            
          </div> */}
          </div>
          <div className="product-content-2">
            <div
              className={`title-price-wrap-2 ${
                titlePriceClass ? titlePriceClass : ""
              }`}
            >
              <span>
                <Link to={process.env.PUBLIC_URL + "/நூற்கள்/" + product.product_id+"/"+ product.product_id}>
                  <span >{product.title}</span>
                </Link>
              </span>
{/*            
              <div className="price-2">
                {discountedPrice !== null&&discountedPrice !== '' ? (
                  <Fragment>
                    <span>
                      {currency.currencySymbol + finalDiscountedPrice}
                    </span>{" "}
                    <span className="old">
                     ({currency.currencySymbol + finalProductPrice})
                    </span>
                  </Fragment>
                ) : (
                  <span>{currency.currencySymbol + finalProductPrice} </span>
                )}
              </div> */}
            </div>
           
          </div>
          <div className="price-2">
                
                  <Fragment>
                    <span>
                      500
                    </span>{" "}
                   
                  </Fragment>
                
              </div>
          
              <span>
               <Button style={{width:'100%'}} type="submit">
Buy/View
               </Button>
              </span>
{/*            
              <div className="price-2">
                {discountedPrice !== null&&discountedPrice !== '' ? (
                  <Fragment>
                    <span>
                      {currency.currencySymbol + finalDiscountedPrice}
                    </span>{" "}
                    <span className="old">
                     ({currency.currencySymbol + finalProductPrice})
                    </span>
                  </Fragment>
                ) : (
                  <span>{currency.currencySymbol + finalProductPrice} </span>
                )}
              </div> */}
            
           
          
        </div>
      </div>
      {/* product modal */}
      {/* <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
       // discountedprice={discountedPrice}
        finalproductprice={finalProductPrice}
        finaldiscountedprice={finalDiscountedPrice}
        cartitem={cartItem}
        wishlistitem={wishlistItem}
        compareitem={compareItem}
        addtocart={onAddToCart}
        addtowishlist={onAddToWishlist}
        addtocompare={onAddToCompare}
        //addToast={addToast}
      /> */}
    </Fragment>
  );
};

ProductGridSingleTwo.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  onAddToCart: PropTypes.func,
  onAddToWishlist: PropTypes.func,
  onAddToCompare: PropTypes.func,
  cartItem: PropTypes.object,
  compareItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
  titlePriceClass: PropTypes.string,
  wishlistItem: PropTypes.object,
  InsertToCart: PropTypes.func,
  user: PropTypes.object
};

export default ProductGridSingleTwo;
