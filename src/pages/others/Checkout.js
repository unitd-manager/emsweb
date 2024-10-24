
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../constants/api";
import { getUser } from "../../common/user";
import { Input,Button,Row,Col} from "reactstrap";
//import RazorpayCheckout from 'razorpay-checkout';



const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = (error) => reject(error);
    document.body.appendChild(script);
  });
};

const Checkout = ({
  
  // cartItems,
  currency,
}) => {
  
  let cartTotalPrice = 0;
  const history = useNavigate();
const [stripeToken, setStripeToken]=useState();

  const pay = async (token) => {
    api
      .post("/orders/api/payment", { token, cartTotalPrice })
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => console.log(err));
  };

  const handleSuccess = () => {
   history('/order-success')
  };
  const handleFailure = () => {
    history('/orderfail')
  };

  const onToken = async (token) => {
    setStripeToken(token);
   console.log('token',token)
   try {
    const response = await api.post('orders/api/payment',{
        amount: cartTotalPrice * 100,
        token,
      }
    );
    if (response.status === 200) {
      handleSuccess();
    }
  } catch (error) {
    handleFailure();
    console.log(error);
  }
  };


  
  useEffect(()=>{
const makeRequest=async()=>{
  try{
const res=await api.post('/orders/api/payment',{
token:stripeToken,
amount:cartTotalPrice*100
})
history('/order-success')
  }
  catch{

  }
  
}
stripeToken && makeRequest();
  },[stripeToken,cartTotalPrice,history])
  const [cartItems, setCartItems] = useState([]);
  const [userData, setUserData] = useState();
  const [orderDetail, setOrderDetail] = useState({});
  const [allcountries, setallCountries] = useState();
  const getAllCountries = () => {
    api
      .get('/commonApi/getCountry')
      .then((res) => {
        setallCountries(res.data.data);
      })
      .catch(() => {
         });
  };

  const handleOrderDetail = (e) => {
    setOrderDetail({ ...orderDetail, [e.target.name]: e.target.value });
  };

  // const handleQtyChanges = (itemId, newQty) => {
  //   // Update the quantity of the item with itemId to newQty
  //   // You can use setCartItems to update the cartItems state with the new quantity
  //   const updatedCartItems = cartItems.map(item => {
  //     if (item.id === itemId) {
  //       return { ...item, qty: newQty };
  //     }
  //     return item;
  //   });
  //   setCartItems(updatedCartItems); 
  //  const total =((cartItems).reduce((total, item) => total + item.price * item.qty, 0));
  //  console.log('total',total)
  // };
  const handleQtyChange = (index, newQuantity) => {
    const newCart = [...cartItems];
    newCart[index].qty = newQuantity;
    setCartItems(newCart);
  };

  const decrementQuantity = (index) => {
    const newQuantity = Math.max(0, cartItems[index].qty - 1);
    handleQtyChange(index, newQuantity);
  };

  const incrementQuantity = (index) => {
    const newQuantity = cartItems[index].qty + 1;
    handleQtyChange(index, newQuantity);
  };

  const containerStyle = {
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px'
  };
  
  const sectionStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px'
  };
  
  const imageStyle = {
    maxWidth: '100px',
    marginRight: '10px',
    marginBottom: '10px'
  };
  
  const labelStyle = {
    fontWeight: 'bold',
    width: '50px',
    marginLeft: '10px'
  };
  
  const buttonStyle = {
    fontWeight: 'bold',
    width: '50px',
    marginLeft: '10px'
  };
  
  const orderTopStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
    backgroundColor: '#f9f9f9'
  };
  
  const orderMiddleStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px'
  };
  const containerStyles = {
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
    backgroundColor: '#f9f9f9'
  };
  
  const sectionStyles = {
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
    backgroundColor: '#fff'
  };
  
  const inputContainerStyle = {
    marginBottom: '10px'
  };
  
  
  const getTotalPrice = () => {
    return cartItems.reduce((total, product) => total + product.price * product.qty, 0).toFixed(2);
  };

  const totalAmount = 100
  const user = getUser();
  const  userContactId = user.contact_id

  const placeOrder = () => {
    // Validate fields
   
  
    api.post('/orders/insertorders', { ...orderDetail, contact_id: userContactId })
      .then(response => {
        if (response.status === 200) {
          const orderId = response.data.data.insertId;
          Promise.all(cartItems.map(item => {
            console.log('orderitem',item)
            return api.post('/orders/insertOrderItem1', {
              qty: item.qty,
              unit_price: item.price,
              contact_id: userContactId,
              order_id:orderId,
              cost_price:item.qty*item.price,
               item_title:item.title
            });
          }))
            .then(responses => {
              const allInserted = responses.every(response => response.status === 200);
              if (allInserted) {
                SendEmail();
                removeBacket();
              } else {
                console.error('Error placing one or more order items');
              }
            })
            .catch(error => {
              console.error('Error placing order items:', error);
            });
        } else {
          console.error('Error');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const SendEmail = () => {

    const to = orderDetail.shipping_email;
    const subject = "Order Confirmed";
    const phone = orderDetail.shipping_phone;
    const names = orderDetail.shipping_first_name;
    const address = orderDetail.shipping_address1;
    const city = orderDetail.shipping_address_city;
    const state = orderDetail.shipping_address_state;
    const Country = orderDetail.shipping_address_country_code;
    const TotalAmount = totalAmount;
    const code = orderDetail.shipping_address_po_code;

    api
        .post('/commonApi/sendUseremail', {
            to,
            subject,
            phone,
            names,
            address,
            city,
            state,
            Country,
            TotalAmount,
            code


        })
        .then(response => {
            if (response.status === 200) {
              window.confirm('Orders Sent successfully on your mail.');
                // Alert.alert('Orders Sent successfully on your mail.');
                // navigation.navigate(StackNav.ProductList)
               history('/நூற்கள்/49');
            } else {
                console.error('Error');
            }
        });
};

const handlePaymentSuccess = (data) => {
  console.log('Payment Successful:', data);
  placeOrder()
 
  // history('/order-success');
};

const handlePaymentFailure = (error) => {
  console.error('Payment Failed:', error);
  // history('/orderfail');
};


const onPaymentPress = () => {


  if (!orderDetail.shipping_first_name) {
    alert('Please enter your first Name.');
    return;
  }
  if (!orderDetail.shipping_email) {
    alert('Please enter your email.');
    return;
  }
  if (!orderDetail.shipping_phone) {
    alert('Please enter your phone number.');
    return;
  }
  if (!orderDetail.shipping_address1) {
    alert('Please enter your address.');
    return;
  }

  // Proceed with adding delivery address
  if (!userContactId) {
    alert('User information not found.');
    return;
  }

  const totalAmount = getTotalPrice();
  const amountInPaise = totalAmount * 100;

  const options = {
    key: "rzp_test_yE3jJN90A3ObCp", // Replace with your Razorpay test/live key
    key_secret:"tt8BnBOG7yRvYZ6TSB28RXJy",
    amount: amountInPaise,
    currency: "INR",
    name: "United",
    description: "Purchase Description",
    image: "",
    handler: handlePaymentSuccess,
    prefill: {
      name: orderDetail.shipping_first_name,
      email: orderDetail.shipping_email,
      contact: orderDetail.shipping_phone,
    },
    notes: {
      address: "Corporate Office",
    },
    theme: {
      color: "#532C6D",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
  rzp.on('payment.failed', handlePaymentFailure);
};



  const placeOrders = (os) => {
    console.log("userData", userData);
    if (userData) {
      orderDetail.contact_id = userData.contact_id;
      orderDetail.cust_first_name = userData.first_name;
      orderDetail.cust_last_name = userData.last_name;
      orderDetail.cust_email = userData.email;
      orderDetail.cust_address1 = userData.address1;
      orderDetail.cust_address2 = userData.address2;
      orderDetail.cust_address_area = userData.address_area;
      orderDetail.cust_address_city = userData.address_city;
      orderDetail.cust_address_country = userData.address_country;
      orderDetail.cust_address_state = userData.address_state;
      orderDetail.cust_address_po_code = userData.address_po_code;
      orderDetail.cust_phone = userData.phone;
      orderDetail.cust_address_country = userData.address_country;
      orderDetail.cust_address_state = userData.address_state;
      orderDetail.order_status =os;
      api
        .post("/orders/insertorders", orderDetail)
        .then((res) => {
          const insertedId = res.data.data.insertId;
          cartItems.forEach((item) => {
            item.cantact_id = userData.contact_id;
            item.order_id = insertedId;
            item.unit_price=item.price;
            item.cost_price=item.qty*item.price;
            item.item_title=item.title;
            api
              .post("/orders/insertOrderItem", item)
              .then(() => {
                console.log("order placed");
              })
              .catch((err) => console.log(err));
          });
        })
        .then(() => {
          // history("/order-success");
          console.log("order-success");
        })
        .catch((err) => console.log(err));
    } else {
      console.log("please login");
    }
    const orderDate = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(orderDate.getDate() + 7);

    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    {
      
      const to = userData.email;
      const dynamic_template_data= 
      {
     first_name:userData.first_name,
     order_date:formatDate(orderDate),
     delivery_date:formatDate(deliveryDate),
     order_status: os
    };
    api
      .post('/commonApi/sendgmail',{to,dynamic_template_data})
      .then(() => {
        // addToast("Send Mail Successfully", {
        //   appearance: "success",
        //   autoDismiss: true,
        // })
      })
      .catch(() => {
        // addToast("Send Mail Successfully", {
        //   appearance: "success",
        //   autoDismiss: true,
        // })
      });
    
    };

  };

  useEffect(() => {
    const user = getUser();
    setUserData(user);
    console.log(user);
    if (user) {
      api
        .post("/contact/getCartProductsByContactId", {
          contact_id: user.contact_id,
        })
        .then((res) => {
          setCartItems(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getAllCountries();
  }, []);

  const removeBacket = async () => {
    try {
      await api.post('/orders/deleteBasketContact', { contact_id: userContactId });
      
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  return (
    
    <Fragment>
      <br/>
      <br/>
      
      {/* <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Checkout
      </BreadcrumbsItem> */}
      {/* <LayoutOne headerTop="visible"> */}
        {/* breadcrumb */}
        {/* <Breadcrumb /> */}
        <div className="checkout-area pt-95 pb-100" style={containerStyles}>
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap" style={sectionStyles}>
                    <h3 style={{ fontWeight: 'bold'}}>Billing Details</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6" style={inputContainerStyle}>
                        <div className="billing-info mb-20">
                           <label style={{ color: "black" ,fontWeight:'bold'}}>First Name</label>
                           
                          <Input
                         type="text"
                        name="shipping_first_name"
                       value={orderDetail && orderDetail.shipping_first_name}
                        onChange={handleOrderDetail}
                         />
                        </div>
                      </div>
                      <br/>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                           <label style={{ color: "black" ,fontWeight:'bold'}}>Last Name</label>
                          <Input
                         type="text"
                        name="shipping_last_name"
                       value={orderDetail && orderDetail.shipping_last_name}
                        onChange={handleOrderDetail}
                         />
                        </div>
                      </div>
                      <br/>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                           <label style={{ color: "black",fontWeight:'bold' }}>Company Name</label>
                          <Input
                         type="text"
                        name="selling_company"
                       value={orderDetail && orderDetail.selling_company}
                        onChange={handleOrderDetail}
                         />
                        </div>
                      </div>
                      
                      <br/>
                      <div className="col-lg-12">
                      <br/>
                        <div className="billing-info mb-20">
                          <label style={{ color: "black",fontWeight:'bold' }}>Street Address</label>
                          <Input
                          type="textarea"
                            className="billing-address"
                            placeholder="House number and street name"
                           
                            name="shipping_address1"
                            value={orderDetail && orderDetail.shipping_address1}
                            onChange={handleOrderDetail}
                          />
                          <br/>
                          <Input
                            placeholder="Apartment, suite, unit etc."
                            type="textarea"
                            name="shipping_address2"
                            value={orderDetail && orderDetail.shipping_address2}
                            onChange={handleOrderDetail}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                      <br/>
                        <div className="billing-info mb-20">
                          <label style={{ color: "black",fontWeight:'bold' }}>Town / City</label>
                          <Input
                            type="text"
                            name="shipping_address_city"
                            value={
                              orderDetail && orderDetail.shipping_address_city
                            }
                            onChange={handleOrderDetail}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                      <br/>
                        <div className="billing-info mb-20">
                          <label style={{ color: "black",fontWeight:'bold' }}>State / County</label>
                          <Input
                            type="text"
                            name="shipping_address_state"
                            value={
                              orderDetail && orderDetail.shipping_address_state
                            }
                            onChange={handleOrderDetail}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                      <br/>
                        <div className="billing-info mb-20">
                          <label style={{ color: "black",fontWeight:'bold' }}>Postcode / ZIP</label>
                          <Input
                            type="text"
                            name="shipping_address_po_code"
                            value={
                              orderDetail &&
                              orderDetail.shipping_address_po_code
                            }
                            onChange={handleOrderDetail}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                      <br/>
                        <div className="billing-info mb-20">
                          <label style={{ color: "black",fontWeight:'bold' }}>Phone</label>
                          <Input
                            type="text"
                            name="shipping_phone"
                            value={orderDetail && orderDetail.shipping_phone}
                            onChange={handleOrderDetail}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                      <br/>
                        <div className="billing-info mb-20">
                          <label style={{ color: "black",fontWeight:'bold' }}>Email Address</label>
                          <Input
                            type="text"
                            name="shipping_email"
                            value={orderDetail && orderDetail.shipping_email}
                            onChange={handleOrderDetail}
                          />
                        </div>
                      </div>
                      <br/>
                      <div className="col-lg-12">
                      <br/>
                        <div className="billing-select mb-20">
                          <label style={{ color: "black",fontWeight:'bold' }}>Country</label>
                          <Input
                        type="select"
                      name="shipping_address_country_code"
                        onChange={handleOrderDetail}
                       value={orderDetail && orderDetail.shipping_address_country_code}
                        >
                <option defaultValue="selected" value="">
                  Please Select
                </option>
                {allcountries &&
                  allcountries.map((country) => (
                    <option key={country.country_code} value={country.country_code}>
                      {country.name}
                    </option>
                  ))}
              </Input>
                        </div>
                      </div>
                    </div>
                    <br/>
                    <div className="additional-info-wrap" style={sectionStyle}>
                      <h4>Additional information</h4>
                      <div className="additional-info">
                        <label style={{ color: "black",fontWeight:'bold' }}>Order notes</label>
                        <Input
                          type="textarea"
                          placeholder="Notes about your order, e.g. special notes for delivery. "
                          name="message"
                          defaultValue={""}
                          style={{ height: "100px", resize: "vertical" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                <div className="your-order-area" style={containerStyle}>
  <h3 style={{ fontWeight: 'bold' }}>Your order</h3>
  <div className="your-order-wrap gray-bg-4" style={sectionStyle}>
    <div className="your-order-product-info">
      <div className="your-order-bottom"></div>
      <br />
      <div className="place-order mt-25" style={sectionStyle}>
        <Row>
          <Col>
            <label style={{ fontSize: 18, marginLeft: 2, fontWeight: 'bold' }}>Total Price:</label>
          </Col>
          <Col md='2'>
            <h4 style={{ marginLeft: -40, color: 'green',fontSize: 16,marginTop:7 }}>{getTotalPrice()}</h4>
          </Col>
          <Col md='2'>
            <Button color="primary" style={{ marginLeft: 1, width: "110px" }} className="btn-hover" onClick={onPaymentPress}>
              Place Order
            </Button>
          </Col>
          <Col>
            <Link to={process.env.PUBLIC_URL + "/நூற்கள்/49"}>
              <Button style={{ marginLeft: 40, width: "110px" }} type='submit'>Book List</Button>
            </Link>
          </Col>
        </Row>
      </div>
      <br />
      <div className="your-order-top" style={orderTopStyle}>
        <ul>
          <label style={{ fontSize: 20 }}>Product List</label>
        </ul>
      </div>
      <div className="your-order-middle" style={orderMiddleStyle}>
        <ul>
          {cartItems.map((cartItem, index) => {
            const discountedPrice = cartItem.price;
            const finalProductPrice = cartItem.price.toFixed(2);
            const finalDiscountedPrice = discountedPrice.toFixed(2);
            const totalPrice = discountedPrice !== null ? finalDiscountedPrice * cartItem.qty : finalProductPrice * cartItem.qty;
            return (
              <li key={index}>
                <div className="image-and-qty" style={sectionStyle}>
                  <img src={`https://emsmedia.net/storage/uploads/${cartItem?.images}`} alt="" style={imageStyle} />
                  <label style={labelStyle}>Rs:</label>
                  <span style={{ fontWeight: "bold", width: "50px", marginLeft: -20, color: 'green' }}>{cartItem.price}</span>
                  <span>
                    <Button onClick={() => decrementQuantity(index)} style={buttonStyle}>-</Button>
                    <span style={{ fontWeight: "bold", marginLeft: 10 }}>{cartItem.qty}</span>
                    <Button onClick={() => incrementQuantity(index)} style={buttonStyle}>+</Button>
                  </span>
                  <br />
                  <label style={{ fontWeight: "bold" }}>{cartItem.title}</label>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  </div>
</div>

    </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
                <a href="https://www.instamojo.com/@sulfiya/l1d766e51cc7042599016fb8ee8aa58b9/" rel="im-checkout" data-text="Pay Now" data-css-style="color:#ffffff; background:#eb9694; width:180px; border-radius:30px"   data-layout="vertical"></a>
<script src="https://js.instamojo.com/v1/button.js"></script>
              </div> 
            )}
          </div>
        </div>
        <br/>
        <br/>
        <br/>
      {/* </LayoutOne> */}
    </Fragment>
   
  );
};

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
};



export default Checkout;
