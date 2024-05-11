import React, { useState,useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Card,Row, Col, Image, Button, Form } from 'react-bootstrap';
import AOS from "aos";
import './BookDetailPage.css'; // Import your custom CSS for styling
import api from '../constants/api';


const BookDetailPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState();
  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const {id}=useParams();
console.log('id',id)

const addToCart=()=>{
  api.post('/contact/addToCart',product)
  .then(() =>{ 
    console.log("Item Added to cart")})
  .catch((error) =>console.log("Item error",error));
  
}

  useEffect(() => {
    
      //var formated = title.split("-").join(" ");

    //   api
    //     .post("/product/productDetail", { product_id:2 })
    //     .then((res) => {
    //       res.data.data[0].images= String(res.data.data[0].images).split(',')
    //       setProduct(res.data.data[0]);
          
    //       AOS.init(); // Move AOS.init() inside the promise chain to ensure it's called after data is fetched
    //     })
    //     .catch(() => {});
        api
        .post("/product/productDetail",{product_id:id})
        .then((res) => {
           console.log('proddetail',res.data.data[0])
          res.data.data.forEach((element) => {
            element.tag = String(element.tag).split(",");
          });
          setProduct(res.data.data[0]);
         
        })
        .catch(() => {
          console.log("error");
        });
    

  }, [id]);

  return (
   <><Row><Col md='8'></Col><Col md='4'>
     <Link to={process.env.PUBLIC_URL + "/cart"}>
     <Button type='submit'>Go to Cart</Button>
                </Link>
     </Col></Row>
   {product&& <Container className='p-3'>
      <Row>
        <Col md={5}>
            <Card className='p-3'>
            <Image
          // src={product.imageUrl} 
          src={`https://emsweb.unitdtechnologies.com/storage/uploads/${product?.images}`}
          alt=""
          style={{maxHeight:'500px'}}
           thumbnail />
            </Card>
         
        </Col>
        <Col md={7}>
          <h2 className="product-title">{product.title}</h2>
          <p className="product-author">By {product.author_name}</p>
          <p className="product-price">${product.price}</p>
          <div
                    className="part-txt"
                    dangerouslySetInnerHTML={{ __html: product.description_short }}
                  /> <Row className='p-3'>
            <Col md={4}>
            <h5>Availability:</h5>
            <Row>
                <Col>
            {product.qty_in_stock}
            </Col>
            </Row>
            </Col>
            <Col md={4}>
            <h5> Tags:</h5>
            <Row>
                <Col>
            {product.tags}
            </Col>
            </Row>
            </Col>
            <Col md={4}>
           < h5> Product Code:</h5>
            <Row>
                <Col>
            {product.product_code}
            </Col>
            </Row>
            </Col>
          </Row>
          <Row>
          <Col md={2}>
          <Form.Group controlId="formQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </Form.Group>
          </Col>
          </Row>
          
          <Button variant="dark" onClick={addToCart} className="add-to-cart-btn">Add to Cart</Button>
        </Col>
      </Row>
      <Container>
      <Row>
     <Row>
        <h2>Book Description</h2>
     </Row>
      <div
                    className="part-txt"
                    dangerouslySetInnerHTML={{ __html: product.product_description }}
                  />
      </Row>
      </Container>
    </Container>}
    </>
  );
};

export default BookDetailPage;
