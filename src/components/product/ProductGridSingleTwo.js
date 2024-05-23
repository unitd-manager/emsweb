import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Badge, Button } from "reactstrap";
import { Link } from "react-router-dom";
import imageBase from "../../constants/imageBase";


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
    <>
    <br/>
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
          <div className="product-img-container shadow" style={{marginBottom:'10px'}}>
            <Link to={process.env.PUBLIC_URL + "/Book/" + product.product_id}>
              <img
                className="default-img"
                src={`https://emsweb.unitdtechnologies.com/storage/uploads/${product.images[0]}`}
                alt=""
                style={{height:'300px',width:'250px',borderRadius:15}}
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
          </div>
          <div className="product-content-2">
            <div
              className={`title-price-wrap-2 ${
                titlePriceClass ? titlePriceClass : ""
              }`}
            >
              <span style={{marginBottom:'10px',fontSize:12}} >
                <Link to={process.env.PUBLIC_URL + "/Book/" + product.product_id}>
                  <span style={{color:'black',fontWeight:'bold'}} >{product.title}</span>
                </Link>
              </span>
            </div>
           
          </div>
        
                
                  <Fragment style={{marginBottom:'10px'}}>
                    <span style={{color:'orange'}}>
                      Rs: {product.price}
                    </span>{" "}
                   
                  </Fragment>
                
              </div>
          
              <span style={{marginBottom:'10px'}}>
              <Link to={process.env.PUBLIC_URL + "/Book/" + product.product_id}>
               <Button style={{width:'100%',backgroundColor:'green'}} type="submit">
                 Buy/View
               </Button>
               </Link>
              </span>
      </div>

<style jsx>{`
        .shadow {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          padding: 10px;
          border-radius: 8px;
          background-color: #D0DFD6;
        }

        .product-img-container {
          text-align: center;
        }

        .product-title-container {
          text-align: center;
          font-size: 1.0em;
          font-weight: bold;
        }

        .product-price-container {
          text-align: center;
          font-size: 1.1em;
          color: orange;
        }

        .product-button-container {
          text-align: center;
        }
      `}</style>
    </Fragment>
    </>
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
