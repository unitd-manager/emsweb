import React, { useEffect, useState } from 'react';
import {useNavigate,useParams } from "react-router-dom"
import api from '../constants/api';
import { Row, Col, Button,} from 'reactstrap';
import { Card, CardTitle } from 'reactstrap';

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
    .post('/media/getNewsDetail', { content_id: id })
    .then((res) => {
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
        News Details
        
      </CardTitle>
      <Row>
        <Col md="7">
        <Button color="primary" onClick={handleBackToList}>
            Back to List
          </Button>
          <h3>{users && users.title}</h3>
          {users && (
            <div dangerouslySetInnerHTML={{ __html: users.description }} />
          )}
        </Col>
        <Col md="5">
        <img
    src={`http://43.228.126.245/EMS-API/storage/uploads/${users && users.news_image}`}
    alt={`News ${users && users.content_id}`}
    style={{ width: '370px', height: '285px'  }} // Adjust the width and height values as needed
  />
   </Col>
      </Row>
    </Card>  
  );
}

export default BlogDetails;
