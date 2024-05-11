import React, { useEffect, useState } from 'react';
import {useNavigate,useParams } from "react-router-dom"
import api from '../constants/api';
import { Row, Col, Button,Input} from 'reactstrap';
import { Card, CardTitle,CardBody } from 'reactstrap';

const BlogDetails = () => {
  const [users, setUsers] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const handleBackToList = () => {
    // Redirect to the home page
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    
    api
    .get("/product/getAllProducts")
    .then((res) => {
     // res.data.data[0].images= String(res.data.data[0].images).split(',')
      setUsers(res.data.data[0]);
    });
  }, [id]); // Include getContactLinked in the dependency array

  return (
    <Card
      body
      className=""
      style={{
        align: 'center'
      }}
    >
      <CardTitle tag="h5">
        Book Details
        
      </CardTitle>
      <Row>
      <Col md="5">
        {users&&<img
    src={`https://emsweb.unitdtechnologies.com/storage/uploads/${users.images}`}
    alt={`News ${users && users.content_id}`}
    style={{ width: '370px', height: '285px'  }} // Adjust the width and height values as needed
  />}
   </Col>
        <Col md="7">
        <Button color="primary" onClick={handleBackToList}>
            Back to List
          </Button>
          <h3>{users && users.title}</h3>
          {users && (
            <div dangerouslySetInnerHTML={{ __html: users.description_short }} />
          )}
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
                    dangerouslySetInnerHTML={{ __html: users.description }}
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
    </Card>  
  );
}

export default BlogDetails;
