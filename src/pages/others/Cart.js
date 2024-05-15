// import PropTypes from "prop-types";
// import React, { Fragment, useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useToasts } from "react-toast-notifications";
// //import MetaTags from "react-meta-tags";
// //import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
// //import { connect } from "react-redux";
// import { getDiscountPrice } from "../../helpers/product";
// // import {
// //   addToCart,
// //   decreaseQuantity,
// //   deleteFromCart,
// //   cartItemStock,
// //   deleteAllFromCart,
// // } from "../../redux/actions/cartActions";
// import LayoutOne from "../../layouts/Layout";
// //import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
// import api from "../../constants/api";
// import { getSessionId, getUser } from "../../common/user";
// import imageBase from "../../constants/imageBase";
// //import LottieComponent from "../../components/LottieComponent";
// //import { fetchCartData,insertCartData,removeCartData,clearCartData,updateCartData } from "../../redux/actions/cartItemActions";

// const Cart = ({
//   location,
//   //cartItems,
//   currency,
//   decreaseQuantity,
//   addToCart,
//   fetchCartData,
//   removeCartData,
//   clearCartData,
//   updateCartData
//   // deleteFromCart,
//   // deleteAllFromCart
// }) => {
//   // const [quantityCount] = useState(1);
//   const { addToast } = useToasts();
//   //const { pathname } = location;
//   let cartTotalPrice = 0;
// //   const [cartProductItems, setCartProductItems] = useState([]);
//   const [cartItems, setCartProductItems] = useState([
//     { id: 1, title: 'Product 1', price: 10, quantity: 1 },
//     { id: 2, title: 'Product 2', price: 20, quantity: 2 },
//     { id: 3, title: 'Product 3', price: 30, quantity: 1 }
// ]);
//  // const [user, setUser] = useState();
//   const [loading, setLoading] = useState(false);

//   const [productStock, setProductStock] = useState(10);
//   const [quantityCount, setQuantityCount] = useState(1);

// //   const getCartItems=()=>{
// //     fetchCartData();

// //   }

//   const deleteItemFromCart = (Item) => {
   
//     removeCartData(Item,addToast)
   
//   };

 
//   const increaseQuantity=(item,quantity)=>{
// let data={};
//  quantity +=1;
//  data.qty=quantity
//  data.basket_id=item.basket_id
//  updateCartData(data,addToast);
  
//   }
// console.log('cartitems',cartItems)
//   const decreaseCartItemQuantity=(item,quantity)=>{
//     let data={};
//  quantity -=1;
//  data.qty=quantity
//  data.basket_id=item.basket_id
//  updateCartData(data,addToast);
   
//   }

//   const clearCartItems = () => {
//     clearCartData()
   
//   };

//   useEffect(() => {
   
//     // setLoading(true)
//     // const userInfo = getUser();
//     // const session = getSessionId();
//     // setUser(userInfo);
//     // if (userInfo) {
//       //fetchCartData()
     
//     // }
//     // else{
//     //   setLoading(false)
//     // }
//   }, []);
//   return (
//     <Fragment>
//       {/* <MetaTags>
//         <title>UnitdEcom | Cart</title>
//         <meta
//           name="description"
//           content="Cart page of UnitdEcom react minimalist eCommerce template."
//         />
//       </MetaTags> */}
// {/* 
//       <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem> */}
//       {/* <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
//         Cart
//       </BreadcrumbsItem> */}

//       <LayoutOne headerTop="visible">
//         {/* breadcrumb */}
//         {/* <Breadcrumb /> */}
       
//         {!loading &&
//         <div className="cart-main-area pt-90 pb-100">
//           <div className="container">
//             {cartItems && cartItems.length >= 1 ? (
//               <Fragment>
//                 <h3 className="cart-page-title">Your cart items</h3>
//                 <div className="row">
//                   <div className="col-12">
//                     <div className="table-content table-responsive cart-table-content">
//                       <table>
//                         <thead>
//                           <tr>
//                             <th>Image</th>
//                             <th>Product Name</th>
//                             <th>Unit Price</th>
//                             <th>Qty</th>
//                             <th>Subtotal</th>
//                             <th>action</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {cartItems.map((cartItem, key) => {
//                             // const discountedPrice = getDiscountPrice(
//                             //   cartItem.price,
//                             //   cartItem.discount_amount
//                             // );
//                             const discountedPrice = (
//                                 cartItem.price 
//                               ).toFixed(2);
//                             const finalProductPrice = (
//                               cartItem.price 
//                             ).toFixed(2);
//                             const finalDiscountedPrice = (
//                                 cartItem.price
//                             ).toFixed(2);

//                             // discountedPrice != null
//                             //   ? (cartTotalPrice +=
//                             //       finalDiscountedPrice * cartItem.qty)
//                             //   : (cartTotalPrice +=
//                             //       finalProductPrice * cartItem.qty);
//                                  const formattedTitle = cartItem.title.replace(/\s+/g, '-');
//                             return (
//                               <tr key={key}>
//                                 <td className="product-thumbnail">
//                                   <Link
//                                     to={
//                                       process.env.PUBLIC_URL +
//                                       "/product/" +
//                                       cartItem.product_id+"/"+formattedTitle
//                                     }
//                                   >
//                                     {/* <img
//                                       className="img-fluid"
//                                       src={`${imageBase}${cartItem.images[0]}`}
//                                       alt=""
//                                     /> */}
//                                   </Link>
//                                 </td>

//                                 <td className="product-name" style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
//                                   <Link
//                                     to={
//                                       process.env.PUBLIC_URL +
//                                       "/product/" +
//                                       cartItem.product_id+"/"+formattedTitle
//                                     }
//                                   >
//                                     {cartItem.title}
//                                   </Link>
//                                   {cartItem.selectedProductColor &&
//                                   cartItem.selectedProductSize ? (
//                                     <div className="cart-item-variation">
//                                       <span>
//                                         Color: {cartItem.selectedProductColor}
//                                       </span>
//                                       <span>
//                                         Size: {cartItem.selectedProductSize}
//                                       </span>
//                                     </div>
//                                   ) : (
//                                     ""
//                                   )}
//                                 </td>

//                                 <td className="product-price-cart">
//                                   {discountedPrice !== null ? (
//                                     <Fragment>
//                                       <span className="amount old">
//                                         {
//                                           finalProductPrice}
//                                       </span>
//                                       <span className="amount">
//                                         {
//                                           finalDiscountedPrice}
//                                       </span>
//                                     </Fragment>
//                                   ) : (
//                                     <span className="amount">
//                                       {
//                                         finalProductPrice}
//                                     </span>
//                                   )}
//                                 </td>

//                                 <td className="product-quantity">
//                                   <div className="cart-plus-minus">
//                                     <button
//                                       className="dec qtybutton"
//                                       onClick={() =>{
//                                         decreaseCartItemQuantity(cartItem,cartItem.qty);
//                                         setQuantityCount(
//                                           cartItem.qty < productStock - cartItem.qty
//                                             ? cartItem.qty + 1
//                                             : cartItem.qty
//                                         )}
//                                       }
//                                     >
//                                       -
//                                     </button>
//                                     <input
//                                       className="cart-plus-minus-box"
//                                       type="text"
//                                       value={cartItem.qty}
//                                       readOnly
//                                     />
//                                     <button
//                                       className="inc qtybutton"
//                                       onClick={() =>{
//                                         increaseQuantity(cartItem,cartItem.qty);
//                                         setQuantityCount(
//                                           cartItem.qty < productStock - cartItem.qty
//                                             ? cartItem.qty + 1
//                                             : cartItem.qty
//                                         )}
//                                       }
//                                     //   disabled={
//                                     //     cartItem !== undefined &&
//                                     //     cartItem.quantity &&
//                                     //     cartItem.quantity >=
//                                     //       cartItemStock(
//                                     //         cartItem,
//                                     //         cartItem.selectedProductColor,
//                                     //         cartItem.selectedProductSize
//                                     //       )
//                                     //   }
//                                     >
//                                       +
//                                     </button>
//                                   </div>
//                                 </td>
//                                 <td className="product-subtotal">
//                                   {discountedPrice !== null
//                                     ? 
//                                       (
//                                         finalDiscountedPrice * cartItem.qty
//                                       ).toFixed(2)
//                                     : 
//                                       (
//                                         finalProductPrice * cartItem.qty
//                                       ).toFixed(2)}
//                                 </td>

//                                 <td className="product-remove">
//                                   <button
//                                     onClick={() =>{
//                                       deleteItemFromCart(cartItem, addToast);
                                     
//                                     }
//                                     }
//                                   >
//                                     <i className="fa fa-times"></i>
//                                   </button>
//                                 </td>
//                               </tr>
//                             );
//                           })}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-lg-12">
//                     <div className="cart-shiping-update-wrapper">
//                       <div className="cart-shiping-update">
//                         <Link
//                           to={process.env.PUBLIC_URL + "/shop"}
//                         >
//                           Continue Shopping
//                         </Link>
//                       </div>
//                       <div className="cart-clear">
//                         <button onClick={() => clearCartItems(addToast)}>
//                           Clear Shopping Cart
//                         </button>
//                       </div>
             
   
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="col-lg-4 col-md-6">
//                     <div className="cart-tax">
//                       <div className="title-wrap">
//                         <h4 className="cart-bottom-title section-bg-gray">
//                           Estimate Shipping And Tax
//                         </h4>
//                       </div>
//                       <div className="tax-wrapper">
//                         <p>
//                           Enter your destination to get a shipping estimate.
//                         </p>
//                         <div className="tax-select-wrapper">
//                           <div className="tax-select">
//                             <label>* Country</label>
//                             <select className="email s-email s-wid">
//                               <option>Bangladesh</option>
//                               <option>Albania</option>
//                               <option>Åland Islands</option>
//                               <option>Afghanistan</option>
//                               <option>Belgium</option>
//                             </select>
//                           </div>
//                           <div className="tax-select">
//                             <label>* Region / State</label>
//                             <select className="email s-email s-wid">
//                               <option>Bangladesh</option>
//                               <option>Albania</option>
//                               <option>Åland Islands</option>
//                               <option>Afghanistan</option>
//                               <option>Belgium</option>
//                             </select>
//                           </div>
//                           <div className="tax-select">
//                             <label>* Zip/Postal Code</label>
//                             <input type="text" />
//                           </div>
//                           <button className="cart-btn-2" type="submit">
//                             Get A Quote
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="col-lg-4 col-md-6">
//                     <div className="discount-code-wrapper">
//                       <div className="title-wrap">
//                         <h4 className="cart-bottom-title section-bg-gray">
//                           Use Coupon Code
//                         </h4>
//                       </div>
//                       <div className="discount-code">
//                         <p>Enter your coupon code if you have one.</p>
//                         <form>
//                           <input type="text" required name="name" />
//                           <button className="cart-btn-2" type="submit">
//                             Apply Coupon
//                           </button>
//                         </form>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="col-lg-4 col-md-12">
//                     <div className="grand-totall">
//                       <div className="title-wrap">
//                         <h4 className="cart-bottom-title section-bg-gary-cart">
//                           Cart Total
//                         </h4>
//                       </div>
//                       <h5>
//                         Total products{" "}
//                         <span>
//                           {cartTotalPrice.toFixed(2)}
//                         </span>
//                       </h5>

//                       <h4 className="grand-totall-title">
//                         Grand Total{" "}
//                         <span>
//                           { cartTotalPrice.toFixed(2)}
//                         </span>
//                       </h4>
//                       <Link to={process.env.PUBLIC_URL + "/checkout"}>
//                         Proceed to Checkout
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </Fragment>
//             ) : (
//               <div className="row">
//                 <div className="col-lg-12">
//                   <div className="item-empty-area text-center">
//                     <div className="item-empty-area__icon mb-30">
//                       <i className="pe-7s-cart"></i>
//                     </div>
//                     <div className="item-empty-area__text">
//                       No items found in cart <br />{" "}
//                       <Link to={process.env.PUBLIC_URL + "/shop"}>
//                         Shop Now
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>}
//       </LayoutOne>
//     </Fragment>
//   );
// };

// Cart.propTypes = {
//   addToCart: PropTypes.func,
//   cartItems: PropTypes.array,
//   currency: PropTypes.object,
//   decreaseQuantity: PropTypes.func,
//   location: PropTypes.object,
//   deleteAllFromCart: PropTypes.func,
//   deleteFromCart: PropTypes.func,
//   fetchCartData:PropTypes.func,
//   updateCartData:PropTypes.func
// };

// // const mapStateToProps = (state) => {
// //   return {
// //     cartData: state.cartData,
// //     cartItems: state.cartItems.cartItems,
// //     currency: state.currencyData,
// //   };
// // };

// // const mapDispatchToProps = (dispatch) => {
// //   return {
// //     addToCart: (item, addToast, quantityCount) => {
// //       dispatch(addToCart(item, addToast, quantityCount));
// //     },
// //     decreaseQuantity: (item, addToast) => {
// //       dispatch(decreaseQuantity(item, addToast));
// //     },
// //     deleteFromCart: (item, addToast) => {
// //       dispatch(deleteFromCart(item, addToast));
// //     },
// //     deleteAllFromCart: (addToast) => {
// //       dispatch(deleteAllFromCart(addToast));
// //     },
// //     fetchCartData: (user) => {
// //       dispatch(fetchCartData(user));
// //     },
// //     insertCartData: (user) => {
// //       dispatch(insertCartData(user));
// //     },
// //     updateCartData: (user) => {
// //       dispatch(updateCartData(user));
// //     },
// //     removeCartData: (item) => {
// //       dispatch(removeCartData(item));
// //     },
// //     clearCartData: (user) => {
// //       dispatch(clearCartData(user));
// //     },
// //   };
// // };

// export default Cart;

// import React from 'react';

// const CartPage = () => {
//     return (
//         <div className="container mt-5">
//             <h2>Cart</h2>
//             <div className="row">
//                 <div className="col-md-8">
//                     {/* Your cart items list */}
//                     <div className="card">
//                         <div className="card-body">
//                             <h5 className="card-title">Product Name</h5>
//                             <p className="card-text">Product description</p>
//                             <p className="card-text">Price: $10.00</p>
//                             <button className="btn btn-danger">Remove</button>
//                         </div>
//                         <div className="card-body">
//                             <h5 className="card-title">Product Name</h5>
//                             <p className="card-text">Product description</p>
//                             <p className="card-text">Price: $10.00</p>
//                             <button className="btn btn-danger">Remove</button>
//                         </div>
//                         <div className="card-body">
//                             <h5 className="card-title">Product Name</h5>
//                             <p className="card-text">Product description</p>
//                             <p className="card-text">Price: $10.00</p>
//                             <button className="btn btn-danger">Remove</button>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-md-4">
//                     {/* Cart summary */}
//                     <div className="card">
//                         <div className="card-body">
//                             <h5 className="card-title">Cart Summary</h5>
//                             <p className="card-text">Total Items: 1</p>
//                             <p className="card-text">Total Price: $10.00</p>
//                             <button className="btn btn-primary">Checkout</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CartPage;

import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'reactstrap';
import api from '../../constants/api';
import { getUser } from '../../common/user';
import { Link ,useNavigate} from 'react-router-dom';

const CartPage = () => {
  const [user, setUser] = useState();
  const [cartItems, setCartItems] = useState([
    // { id: 1, name: 'Product 1', price: 10, quantity: 1 },
    // { id: 2, name: 'Product 2', price: 20, quantity: 2 },
    // { id: 3, name: 'Product 3', price: 30, quantity: 1 },
  ]);
const navigate=useNavigate();
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeCartData = (Item) => {
 
    
      // Make the API call
      api
      .post("/contact/deleteCartItem", { basket_id: Item.basket_id })
        .then(() => {
          
         })
        .catch((error) => {console.log('err',error)});
    
  };

  const fetchCartItems=(userInfo)=>{
     
      // Make the API call
      api.post('/contact/getCartProductsByContactId',{contact_id:userInfo.contact_id})
        .then((res) => {
          res.data.data.forEach(element => {
            element.images=String(element.images).split(',')
          });
          console.log('res',res)
          setCartItems(res.data.data)
         })
        .catch((error) => {console.log('error',error)});
    
  }
useEffect(()=>{
  
},[])
useEffect(() => {
   
  // setLoading(true)
  const userInfo = getUser();
  //const session = getSessionId();
  console.log('userInfo',userInfo)
  setUser(userInfo);
  if (userInfo) {
    fetchCartItems(userInfo);
  }
  
}, []);
  return (
    <Container>
      <h2>Cart</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td className="product-thumbnail">
              <Link to={process.env.PUBLIC_URL + "/Book/" + item.product_id}>
                
               
                                    <img
                                      className="img-fluid"
                                      src={`https://emsweb.unitdtechnologies.com/storage/uploads/${item?.images}`}
                                      alt=""
                                      style={{height:'200px',width:'200px'}}
                                    />
                                    {item.title}
                                  </Link></td>
              
              <td>{item.price}</td>
              <td>
                <input
                  type="number"
                  value={item.qty}
                  onChange={(e) =>
                    handleUpdateQuantity(item.id, parseInt(e.target.value))
                  }
                />
              </td>
              <td>{item.price * item.qty}</td>
              <td>
                <Button variant="danger" onClick={() => removeCartData(item)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h4>Total Price: {getTotalPrice()}</h4>
      <Button variant="primary" onClick={()=>navigate("/checkout")}>Checkout</Button>
    </Container>
  );
};

export default CartPage;

