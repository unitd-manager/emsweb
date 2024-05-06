import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import AOS from "aos";
import api from "../constants/api";
import { Card, CardBody,Row,Col, Input } from "reactstrap";
import imageBase from "../constants/imageBase";

const NoolVivaram = () => {
  const { id } = useParams();
  const [sectiones, setSectiones] = useState([]);
  const [books, setBooks] = useState([]);
  console.log('books',books);
  // Fetch the sections when the component mounts
  useEffect(() => {
    api
      .post("/content/getSubContent", { sub_category_id: id })
      .then((res) => {
        setSectiones(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching sections:", error);
      });
      
  }, [id]); // No dependencies since we only fetch once on mount

  useEffect(() => {
    const getBooks = () => {
      //var formated = title.split("-").join(" ");

      api
        .post("/product/productDetail", { product_id:id })
        .then((res) => {
          res.data.data[0].images= String(res.data.data[0].images).split(',')
          setBooks(res.data.data[0]);
          
          AOS.init(); // Move AOS.init() inside the promise chain to ensure it's called after data is fetched
        })
        .catch(() => {});
    };

    getBooks();
  }, [id]);
  return (
    <div>
      <div className="breadcrumb service-breadcrumb">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-3 col-lg-3">
              <div className="part-txt">
                <h1>Services</h1>
                <ul>
                  <li>Home</li>
                  <li>-</li>
                  <li>Service Detail</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
{/* 
      <div className='container row justify-content-center'>
<div style={{width:'70%',marginTop:'-20px',backgroundColor:'red'}}>

</div>
</div> */}
{books&& books.title && <div className="container">
  <Row>
  <Col md='1'></Col>
  <Col md='10'>
<Card className="p-3">
  <CardBody >
    <Row>
      <Col md='6'>
    
<Card className="p-3">

</Card>

       
      {/* <div className="product-img">
           
              <img
                className="default-img"
                src={`https://emsweb.unitdtechnologies.com/storage/uploads/${books.images[0]}`}
                alt=""
                style={{height:'250px',width:'250px'}}
              />
               {books.images.length > 1 ? (
                <img
                  className="hover-img"
                  src={`${imageBase}${books.images[0]}`}
                  alt=""
                  style={{height:'250px',width:'250px'}}
                />
              ) : (
                ""
              )}
              
            
            </div> */}
      </Col>
      <Col md='6'>
        <Row> {books.title}</Row>
        <Row>{books.price}</Row>
        {/* <Row> {books.title}</Row> */}
        <Row>
          <Col md='4'><h6>Availablity</h6></Col>
          <Col md='4'><h6>Tags</h6></Col>
          <Col md='4'><h6>Product Code</h6></Col>
        </Row>
        <Row>
          <Col md='4'><h6>Qty</h6><Input type="number"/></Col>
         
        </Row>

</Col>
    </Row>
    <Row>
      <Row>
       <h6>BOOK DESCRIPTION</h6> 
      </Row>
      <div
                    className="part-txt"
                    dangerouslySetInnerHTML={{ __html: books.description }}
                  />
    </Row>
    <Row>
      <Row>
       <h6>BOOK DETAIL</h6> 
      </Row>
      <Row>
        <Col md='10'>
        <Card style={{border:'2px solid gray'}}>
          <CardBody>
          <Row><Col>BOOK TITLE</Col><Col>AUTHOR</Col><Col>BOOK TYPE</Col></Row>
          <Row><Col>SPECIFICATIONS</Col><Col>CHAPTERS & PAGES</Col><Col>DATE PUBLISHED</Col></Row>
          </CardBody>
        </Card>
        </Col>
      </Row>
    </Row>
  </CardBody>
</Card>
</Col>
<Col md='1'></Col>
</Row>
</div>}
      {/* <div className="feature-2"> */}
        {/* <div className="container">
          <div className="row justify-content-center">
            {sectiones.map((image, index) => (
              <div key={index} className="col-xl-12 col-lg-12 col-md-12">
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div
                    className="part-txt"
                    dangerouslySetInnerHTML={{ __html: image.description }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default NoolVivaram;
