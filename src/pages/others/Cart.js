import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Row, Col } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../constants/api';
import { getUser } from '../../common/user';

const CartPage = () => {
  const [user, setUser] = useState();
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const currency = {
    currencySymbol: "$",
    currencyName: "USD",
    currencyRate: 1,
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  };
  
  const buttonStyle = {
    fontWeight: 'bold',
    width: '50px',
    marginLeft: '10px'
  };

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
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, qty: newQuantity } : item
      )
    );
  };

  const removeCartData = (item) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this item?");
    if (userConfirmed) {
      api.post("/contact/deleteCartItem", { basket_id: item.basket_id })
        .then(() => {
          window.confirm("Selected item is deleted");
          window.location.reload();
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  };

  const fetchCartItems = (userInfo) => {
    api.post('/contact/getCartProductsByContactId', { contact_id: userInfo.contact_id })
      .then((res) => {
        res.data.data.forEach(element => {
          element.images = String(element.images).split(',');
        });
        setCartItems(res.data.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    const userInfo = getUser();
    setUser(userInfo);
    if (userInfo) {
      fetchCartItems(userInfo);
    }
  }, []);

  const containerStyles = {
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
    backgroundColor: '#f9f9f9'
  };

  return (
    <>
     <br/>
     <br/>
     <br/>
    <Container style={containerStyles} >
      <br/>
      <Row>
       
        <Col md='3'>
        <h4>Total Price: {getTotalPrice()}</h4>
        </Col>
        <Col md='1'>
        <Button  color="primary" onClick={()=>navigate("/checkout")}>Checkout</Button>
        </Col>
        <Col md='2'>
          <Link to={process.env.PUBLIC_URL + "/நூற்கள்/49"}>
            <Button type='submit'>Book List</Button>
          </Link>
        </Col>
      </Row>
      <br/>
      <h2 style={{ fontWeight:'bold', }}>Cart Page</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ marginLeft: 40, width: "10px" }}>#</th>
            <th style={{ marginLeft: 40, width: "90px"}}>Product</th>
            <th style={{ marginLeft: 40, width: "80px" }}>Price</th>
            <th style={{ marginLeft: 40, width: "100px" }}>Quantity</th>
            <th style={{ marginLeft: 40, width: "10px" }}>Total</th>
            <th style={{ marginLeft: 40, width: "110px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={item.id}>
              <td><span style={{ marginTop:110 }}></span>{index + 1}</td>
              <td className="product-thumbnail">
                <Link to={process.env.PUBLIC_URL + "/Book/" + item.product_id}>
                  <img
                    className="img-fluid"
                    src={`https://emsweb.unitdtechnologies.com/storage/uploads/${item?.images}`}
                    alt=""
                    style={{ height: '200px', width: '200px',marginLeft:200,borderRadius:15  }}
                  />
                  <br />
                  <span style ={{marginLeft:220}}> {item.title}</span>
                 
                </Link>
              </td>
              <td><span style={{ marginTop:95,color:'green',fontWeight:'bold' }}> Rs : {item.price} </span></td>
              <td >
              <span style={{ marginTop:90 }}>
                    <Button onClick={() => decrementQuantity(index)} style={buttonStyle}>-</Button>
                    <span style={{ fontWeight: "bold", marginLeft: 10 }}>{item.qty}</span>
                    <Button onClick={() => incrementQuantity(index)} style={buttonStyle}>+</Button>
                  </span>
                {/* <input
                  type="number"
                  value={item.qty}
                  onChange={(e) =>
                    handleUpdateQuantity(item.id, parseInt(e.target.value))
                  }
                /> */}
              </td>
              <td>
                <span style={{ marginTop:90,marginLeft:20,color:'green',fontWeight:'bold' }}>Rs: {item.price * item.qty}</span></td>
              <td>
                <Button  style={{ marginTop:90,marginLeft:20 }}variant="danger" onClick={() => removeCartData(item)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    </>
  );
};

export default CartPage;
