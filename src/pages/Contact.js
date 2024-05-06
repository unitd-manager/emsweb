import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Button } from 'reactstrap';
import api from "../constants/api";


const Contact = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    email: '',
    phone: '',
    subject: '',
    comments: ''
  });

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const applyChanges = () => {};
  const stripHtmlTags = (htmlString) => {

    const doc = new DOMParser().parseFromString(htmlString,'text/html');
    return doc.body.textContent ||'';
    
    
    }
  const [email, setEmail] = useState([]);
  const [mailId, setmailId] = useState("");

  const getEnquiryEmail = () => {
    api.get("/setting/getEnquiryMailId")
    .then((res) => {
      setmailId(res.data.data[0]);
    });
  };
  useEffect(() => {
    // Fetch sections
    api.get('/content/getEmail')
      .then((res) => {
        setEmail(res.data.data[0]);
      })
      .catch(() => {
        // Handle error
      });

  
  }, []); // Empty dependency array ensures this effect runs only once when component mounts

  const [addressData, setAddressData] = useState([]); // To store fetched contact data

  useEffect(() => {
    // Fetch sections
    api.get('/content/getContacts')
      .then((res) => {
        setAddressData(res.data.data[0]);
      })
      .catch(() => {
        // Handle error
      });

  
  }, []); // Empty dependency array ensures this effect runs only once when component mounts

// Empty dependency array ensures this effect runs only once when component mounts
let name, value;
 
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setFormData({ ...formData, [name]: value });
    console.log({ [name]: value });
    // lname = e.target.lname
    // email = e.target.email
    // message = e.target.message
  };
  
  const sendMail = () => {
    if (window.confirm(" Are you sure do you want to send Mail\n")) {
      const to = mailId.email;
      const text = formData.comments;
      const subject = formData.notes;
      const dynamic_template_data = {
        first_name: formData.first_name,
        email: formData.email,
        phone: formData.phone,
        comments: formData.comments,
      };
      api
        .post("/contact/sendenquiryemail", {
          to,
          text,
          subject,
          dynamic_template_data,
        })
        .then(() => {
          // alert("Email has sent successfully", {
          //   appearance: "success",
          //   autoDismiss: true,
          // });
        })
        .catch((err) => {
          // alert("Unable to send Email", {
          //   appearance: "error",
          //   autoDismiss: true,
          // });
        });
    } else {
      applyChanges();
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Make an HTTP POST request to the API endpoint with the form data
    api.post("/enquiry/insertEnquiry", formData)
      .then(response => {
        console.log("Contact inserted successfully:", response.data);
        // Optionally, you can reset the form after successful submission
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          notes: '',
          comments: ''
        });
        sendMail();
      })
      .catch(error => {
        console.error("Error inserting contact:", error);
        // Handle error if needed
      });
  };

  useEffect(() => {
  
    getEnquiryEmail();

  }, []);
  return (
    <div>
      <div className="breadcrumb service-breadcrumb">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-3 col-lg-3">
              <div className="part-txt">
                <h1>CONTACTS</h1>
                <ul>
                  <li>Home</li>
                  <li>-</li>
                  <li>CONTACTS</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact">
        <Container>
          <Row className='ml-5'>
            <h2>Contact Details</h2></Row>
          <Row className='ml-5'>   
        
          <div>
                <span>{stripHtmlTags(addressData && addressData.description)}</span>
                </div>
          </Row>

          <Row className='ml-5'>
                <div>
                <span>{stripHtmlTags(email && email.description)}</span>
                </div>
          </Row>
          <h2>தொடர்பு கொள்ள</h2>
          <Form className="form mt-5" onSubmit={handleSubmit} style={{ backgroundColor: "#FFA500" }}>
            <Row className="justify-content-center  pt-0">

            <Col xl="10" lg="10">
              <label htmlFor="first_name" style={{ color: "#FFFFFF" }}>
              Name
                </label>
                <FormGroup textcolor='dark'>
                  <Input type="text"
                    name="first_name"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid white",
                      color: "#000000",
                    }}
                    value={formData && formData.first_name}
                    onChange={handleChange} required />
                </FormGroup>
              </Col>
              
              <Col xl="10" lg="10">
              <label htmlFor="email" style={{ color: "#FFFFFF" }}>
              Email
                </label>
                <FormGroup>
                  <Input type="email" name="email"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid white",
                    color: "#000000",
                  }} 
                   value={formData && formData.email} 
                   onChange={handleChange} required />
                </FormGroup>
              </Col>
              <Col xl="10" lg="10">
              <label htmlFor="phone" style={{ color: "#FFFFFF" }}>
               Phone
                </label>
                <FormGroup>
                  <Input type="text" name="phone" 
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid white",
                    color: "#000000",
                  }}
                   value={formData && formData.phone} 
                   onChange={handleChange} required />
                </FormGroup>
              </Col>
              <Col xl="10" lg="10">
              <label htmlFor="notes" style={{ color: "#FFFFFF" }}>
              Subject
                </label>
                <FormGroup>
                  <Input type="text" name="notes" 
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid white",
                    color: "#000000",
                  }}
                  value={formData && formData.notes} 
                  onChange={handleChange} required />
                </FormGroup>
              </Col>
              <Col xl="10" lg="10">
              <label htmlFor="comments" style={{ color: "#FFFFFF" }}>
              Message
                </label>
                <FormGroup>
                  <Input type="textarea" name="comments" 
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid white",
                    color: "#000000",
                  }}
                   value={formData && formData.comments} 
                   onChange={handleChange} required />
                </FormGroup>
                <Button className="def-btn def-btn-2" style={{marginLeft:"380px"}}>Send Message</Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </div>
  );
};
export default Contact;

