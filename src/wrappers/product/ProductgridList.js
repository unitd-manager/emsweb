import PropTypes from "prop-types";
import React, { Fragment,useState,useEffect } from "react";
import {v4 as uuid} from 'uuid';
//import { useToasts } from "react-toast-notifications";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import ProductGridSingleTwo from "../../components/product/ProductGridSingleTwo";
import api from "../../constants/api";
import LoginModal from "../../components/LoginModal";
import { useParams } from "react-router-dom";
import { getUser } from "../../common/user";
import { insertCartData } from "../../redux/actions/cartItemActions";
import { insertWishlistData } from "../../redux/actions/wishlistItemActions";
import { insertCompareData } from "../../redux/actions/compareItemActions";

const ProductGrid = ({
  products,
  currency,
  addToCart,
  addToWishlist,
  addToCompare,
  insertWishlistData,
  cartItems,
  InsertToCart,
  wishlistItems,
  compareItems,
  sliderClassName,
  spaceBottomClass,
  insertCompareData
}) => {
  //const }=useToasts();
//const[user,setUser]=useState();
const[loginModal,setLoginModal]=useState(false);
const [sessionId, setSessionId] = useState('');
const { id } = useParams();
//console.log('user',user)

  //const onAddToCart = () => {
   
    // if(user){
    //   if(data.price){
    // data.contact_id=user.contact_id
  
    // InsertToCart(data);}
    // }
    // else{
    //   // addToast("Please Login", { appearance: "warning", autoDismiss: true })
    //   setLoginModal(true)
    // }
   
  //};
  
  // const onAddToWishlist = () => {
  //   if(user){

  //     data.contact_id=user.contact_id
  //     insertWishlistData(data);
    
  // }
  //   else{
  //    // addToast("Please Login", { appearance: "warning", autoDismiss: true })
  //     setLoginModal(true)
  //   }
  // };

  // const onAddToCompare = (data) => {
 
  //   if(user){

  //     data.contact_id = user.contact_id
  //  insertCompareData(data)  
  // }
  //   else{
  //   //  addToast("Please Login", { appearance: "warning", autoDismiss: true })
  //     setLoginModal(true)
  //   }
  // };
   
  useEffect(()=>{
   
    // const userInfo=getUser();
    // setUser(userInfo)

    const existingSessionId = localStorage.getItem('sessionId');
    if (existingSessionId) {
      setSessionId(existingSessionId);
    } else {
      const newSessionId = uuid();
      localStorage.setItem('sessionId', newSessionId);
      setSessionId(newSessionId);
    }
  },[])

  return (
    <Fragment>
      {products.map(product => {
        return (
          <ProductGridSingleTwo
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            product={product}
            currency={currency}
            addToCart={addToCart}
            InsertToCart={InsertToCart}
            addToWishlist={addToWishlist}
            addToCompare={addToCompare}
           
            key={product.product_id}
          />
        );
      })}
      {loginModal&&<LoginModal loginModal={loginModal} setLoginModal={setLoginModal}/>}
    </Fragment>
  );
};

ProductGrid.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  products: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItems: PropTypes.array,
  InsertToCart: PropTypes.func,
  insertWishlistData: PropTypes.func,
  insertCompareData:PropTypes.func
};

// const mapStateToProps = state => {
//   return {
//     currency: state.currencyData,
//     cartData: state.cartData,
//     cartItems:state.cartItems,
//     wishlistItems: state.wishlistData,
//     compareItems: state.compareItems.compareItems
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     addToCart: (
//       item,
//       //addToast,
//       quantityCount,
//       selectedProductColor,
//       selectedProductSize
//     ) => {
//       dispatch(
//         addToCart(
//           item,
         
//           quantityCount,
//           selectedProductColor,
//           selectedProductSize
//         )
//       );
//     },
//     addToWishlist: (item) => {
//       dispatch(addToWishlist(item));
//     },
//     addToCompare: (item) => {
//       dispatch(addToCompare(item));
//     },
//     InsertToCart: (item) => {
//       dispatch(insertCartData(item));
//     },
//     insertWishlistData:(item)=>{
//       dispatch(insertWishlistData(item));
//     },
//     insertCompareData: (item) => {
//       dispatch(insertCompareData(item));
//     }
//   };
// };

export default ProductGrid;
