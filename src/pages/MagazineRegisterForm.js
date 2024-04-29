import React from "react";
//import NavMenu from "../components/NavMenu";
import { useState } from "react";
import api from "../constants/api";
import { Button } from "reactstrap";
import { useEffect } from "react";

const RegisterForm = () => {
  const [registerForm, setRegisterForm] = useState();
  const [mailId, setmailId] = useState({});
  console.log('mailId',mailId)
  const [validationError, setValidationError] = useState([]);
  const getEnquiryEmail = () => {
    api.get("/setting/getMembershipMailId")
    .then((res) => {
      setmailId(res.data.data[0]);
    });
  };
  const handleSectionForms = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };
  const validateForm = () => {
    //const { birth_year } = registerForm;

    // Check if birth year is not exactly 4 digits or contains non-digit characters
    // if (!/^\d{4}$/.test(birth_year)) {
    //   setValidationError("Please enter a valid year");
    //   return false;
    // }

    // Clear any previous validation error
    setValidationError("");
    return true;
  };
  const insertMembership = () => {
    if (validateForm()) {
      if (registerForm.name.trim() !== "") {
        // Check if first_name is not empty
        api
          .post("/content/insertMagazineRegisterDetails", registerForm)
          .then((response) => {
            console.log("Membership inserted successfully:", response.data);

            // Clear form fields after successful submission if needed
            setRegisterForm({});
            // Show success message
            
            // Reload the page after 3 seconds
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          })
          .catch((error) => {
            console.error("Error inserting membership:", error);
          });
      } else {
        // Show error message for required fields
        
      }
    }
  };
  const sendMail = () => {
      const to = registerForm.email;
      const name= registerForm.name;
      api
        .post("/commonApi/sendUseremailSignUp", {
          to,
          name,
        })
        .then((res) => {
      console.log('Mail', res.data.data)
        })
        .catch((err) => {
     
        });
   };

  useEffect(() => {
  
    getEnquiryEmail();

  }, []);
  return (
    <div>
      <div
        class="breadcrumb portfolio-breadcrumb"
        style={{
          //backgroundImage: `url(${MemberImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-xl-3 col-lg-3">
              <div class="part-txt">
                {/* <h1>Register</h1> */}
                <ul>
                  <li>Home</li>
                  <li>/</li>
                  <li>Register</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact">
        <div className="container">
          <form className="form" style={{ backgroundColor: "#183368" }}>
            {/* <i class="fas fa-user-plus register-user"></i> */}
            <h3 class="text-center">Create Your EMS Account</h3>
            <div className="row justify-content-center">
            <div className="col-sm-12 col-lg-6">
            <div className="col-xl-12 col-lg-12">
                <label htmlFor="name" style={{ color: "#FFFFFF" }}>
                  Name
                </label>
                <br />
                <input
                  type="text"
                  name="name"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid white",
                    color: "#000000",
                  }}
                  onChange={(e) => {
                    handleSectionForms(e);
                  }}
                />
              </div>
              <div className="col-xl-12 col-lg-12">
                <label htmlFor="father_name" style={{ color: "#FFFFFF" }}>
                  Father Name
                </label>
                <br />
                <input
                  type="text"
                  name="father_name"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid white",
                    color: "#000000",
                  }}
                  onChange={(e) => {
                    handleSectionForms(e);
                  }}
                />
              </div>
              <div className="col-xl-12 col-lg-12">
                <label htmlFor="date_of_birth" style={{ color: "#FFFFFF" }}>
                  Date of Birth
                </label>
                <br />
                <input
                  type="date"
                  name="date_of_birth"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid white",
                    color: "#000000",
                  }}
                  onChange={handleSectionForms}
                />
                {validationError && (
                  <p style={{ color: "red" }}>{validationError}</p>
                )}
              </div>

              <div className="col-xl-12 col-lg-12">
                <label htmlFor="date_of_baiyath" style={{ color: "#FFFFFF" }}>
                Date of Baiyath
                </label>
                <br />
                <input
                  type="date"
                  name="date_of_baiyath"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid white",
                    color: "#000000",
                  }}
                  onChange={handleSectionForms}
                />
                {validationError && (
                  <p style={{ color: "red" }}>{validationError}</p>
                )}
              </div>

              <div className="col-xl-12 col-lg-12">
                <label htmlFor="gender" style={{ color: "#FFFFFF" }}>
                Gender <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  name="gender"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid white",
                    color: "#000000",
                  }}
                  onChange={(e) => {
                    handleSectionForms(e);
                  }}
                />
              </div>
              
              <div className="col-xl-12 col-lg-12">
                <label htmlFor="currently_residing_country" style={{ color: "#FFFFFF" }}>
                Country(Currently Residing) <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  name="currently_residing_country"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid white",
                    color: "#000000",
                  }}
                  onChange={(e) => {
                    handleSectionForms(e);
                  }}
                />
              </div>
              <div className="col-xl-12 col-lg-12">
                <label htmlFor="currently_residing_state" style={{ color: "#FFFFFF" }}>
                State(Currently Residing)
                </label>
                <br />
                <input
                  type="text"
                  name="currently_residing_state"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid white",
                    color: "#000000",
                  }}
                  onChange={(e) => {
                    handleSectionForms(e);
                  }}
                />
              </div>
              <div className="col-xl-12 col-lg-12">
                <label htmlFor="currently_residing_city" style={{ color: "#FFFFFF" }}>
                City(Currently Residing)
                </label>
                <br />
                <input
                  type="text"
                  name="currently_residing_city"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid white",
                    color: "#000000",
                  }}
                  onChange={(e) => {
                    handleSectionForms(e);
                  }}
                />
              </div>

              <div className="col-xl-12 col-lg-12">
                <label htmlFor="contact_number" style={{ color: "#FFFFFF" }}>
                Contact Number
                </label>
                <br />
                <input
                  type="text"
                  name="contact_number"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid white",
                    color: "#000000",
                  }}
                  onChange={(e) => {
                    handleSectionForms(e);
                  }}
                />
              </div>
              <div className="col-xl-12 col-lg-12">
                <label htmlFor="alternate_number" style={{ color: "#FFFFFF" }}>
                Alternate Number
                </label>
                <br />
                <input
                  type="text"
                  name="alternate_number"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid white",
                    color: "#000000",
                  }}
                  onChange={(e) => {
                    handleSectionForms(e);
                  }}
                />
              </div>

              <div className="col-xl-12 col-lg-12">
                <label htmlFor="email" style={{ color: "#FFFFFF" }}>
                  Email <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  name="email"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid white",
                    color: "#000000",
                  }}
                  onChange={(e) => {
                    handleSectionForms(e);
                  }}
                />
              </div>
              
              </div>
              <div className="col-sm-6">
            <div className="col-xl-12 col-lg-12">
                <label htmlFor="qualification" style={{ color: "#FFFFFF" }}>
                Qualification
                </label>
                <br />
                <input
                  type="text"
                  name="qualification"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid white",
                    color: "#000000",
                  }}
                  onChange={(e) => {
                    handleSectionForms(e);
                  }}
                />
              </div>
              <div className="col-xl-12 col-lg-12">
                <label htmlFor="ug_specialization" style={{ color: "#FFFFFF" }}>
                UG Specialization
                </label>
                <br />
                <input
                  type="text"
                  name="ug_specialization"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid white",
                    color: "#000000",
                  }}
                  onChange={(e) => {
                    handleSectionForms(e);
                  }}
                />
              </div>
              <div className="col-xl-12 col-lg-12">
                <label htmlFor="pg_specialization" style={{ color: "#FFFFFF" }}>
                PG Specialization
                </label>
                <br />
                <input
                  type="text"
                  name="pg_specialization"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid white",
                    color: "#000000",
                  }}
                  onChange={(e) => {
                    handleSectionForms(e);
                  }}
                />
              </div>
              <div className="col-xl-12 col-lg-12">
                <label htmlFor="blood_group" style={{ color: "#FFFFFF" }}>
                Blood Group
                </label>
                <br />
                <input
                  type="text"
                  name="blood_group"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid white",
                    color: "#000000",
                  }}
                  onChange={(e) => {
                    handleSectionForms(e);
                  }}
                />
              </div>
              <div className="col-xl-12 col-lg-12">
                <label htmlFor="yaseeni" style={{ color: "#FFFFFF" }}>
                Are you a Yaseeni ?
                </label>
                <br />
                <input
                  type="text"
                  name="yaseeni"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid white",
                    color: "#000000",
                  }}
                  onChange={(e) => {
                    handleSectionForms(e);
                  }}
                />
              </div>
              <div className="col-xl-12 col-lg-12">
                <label htmlFor="present_address" style={{ color: "#FFFFFF" }}>
                Present Address
                </label>
                <br />
                <input
                  type="textarea"
                  name="present_address"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid white",
                    color: "#000000",
                  }}
                  onChange={(e) => {
                    handleSectionForms(e);
                  }}
                />
              </div>
              <div className="col-xl-12 col-lg-12">
                <label htmlFor="permanent_address" style={{ color: "#FFFFFF" }}>
                Permanent Address
                </label>
                <br />
                <input
                  type="textarea"
                  name="permanent_address"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid white",
                    color: "#000000",
                  }}
                  onChange={(e) => {
                    handleSectionForms(e);
                  }}
                />
              </div>
              <div className="col-xl-12 col-lg-12">
                <label htmlFor="user_name" style={{ color: "#FFFFFF" }}>
                User name <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  name="user_name"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid white",
                    color: "#000000",
                  }}
                  onChange={(e) => {
                    handleSectionForms(e);
                  }}
                />
              </div>
              <div className="col-xl-12 col-lg-12">
                <label htmlFor="password" style={{ color: "#FFFFFF" }}>
                  Password <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  name="password"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid white",
                    color: "#000000",
                  }}
                  onChange={(e) => {
                    handleSectionForms(e);
                  }}
                />
              </div>
              
              <div className="col-xl-12 col-lg-12">
                <label htmlFor="pic_text" style={{ color: "#FFFFFF" }}>
                  Enter the Text Shown Above
                </label>
                <br />
                <input
                  type="text"
                  name="pic_text"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid white",
                    color: "#000000",
                  }}
                  onChange={(e) => {
                    handleSectionForms(e);
                  }}
                />
              </div>
              </div>
              
              <div className="col-xl-12 col-lg-12">
                <Button
                  className="def-btn def-btn-2"
                  onClick={() => {
                    insertMembership();
                    sendMail();
                  }}
                  type="button"
                  style={{ textAlign: "center", marginLeft: "500px" }}
                >
                  Register
                </Button>
              </div>
              <br />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
