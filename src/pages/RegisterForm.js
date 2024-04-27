import React from "react";
//import NavMenu from "../components/NavMenu";
import { useState } from "react";
import api from "../constants/api";
import { Button } from "reactstrap";
import { useEffect } from "react";

const RegisterForm = () => {
  const [registerForm, setRegisterForm] = useState({
    first_name: "",
    birth_year: "",
    email:"",
    pass_word:"",
    mobile:""
  });
  const [mailId, setmailId] = useState({});
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
      if (registerForm.first_name.trim() !== "") {
        // Check if first_name is not empty
        api
          .post("/contact/insertContact", registerForm)
          .then((response) => {
            console.log("Membership inserted successfully:", response.data);

            // Clear form fields after successful submission if needed
            setRegisterForm({});
            // Show success message
            showMessage("Form submitted successfully!", "success");
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
        showMessage("Please fill all required fields", "error");
      }
    }
  };
  const sendMail = () => {
    if (window.confirm(" Are you sure do you want to send Mail\n")) {
      
    {
  
      const to = registerForm.email;
       const dynamic_template_data = {
        first_name: registerForm.first_name,
        mobile: registerForm.mobile,
        pass_word: registerForm.pass_word,
     
      };
      api
        .post("/contact/sendMembershipUseremail", {
          to,
          dynamic_template_data,
        })
        .then(() => {
      
        })
        .catch((err) => {
     
        });
   
  };

    {
  
      const to = mailId && mailId.email;
       const dynamic_template_data = {
        first_name: registerForm.first_name,
        mobile: registerForm.mobile,
        pass_word: registerForm.pass_word,
     
      };
      api
        .post("/contact/sendMembershipemail", {
          to,
          dynamic_template_data,
        })
        .then(() => {
      
        })
        .catch((err) => {
     
        });
   
  };
} else {
 
}
}
  const showMessage = (message, type) => {
    const alertBox = document.createElement("div");
    alertBox.className =
      type === "success" ? "custom-alert success" : "custom-alert error";
    alertBox.textContent = message;
    document.body.appendChild(alertBox);
    // Remove alert box after 3 seconds
    setTimeout(() => {
      alertBox.remove();
    }, 3000);
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
            <div className="col-xl-10 col-lg-10">
                <label htmlFor="first_name" style={{ color: "#FFFFFF" }}>
                  Name
                </label>
                <br />
                <input
                  type="text"
                  name="first_name"
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
              <div className="col-xl-10 col-lg-10">
                <label htmlFor="birth_year" style={{ color: "#FFFFFF" }}>
                  Date of Birth
                </label>
                <br />
                <input
                  type="date"
                  name="birth_year"
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

              <div className="col-xl-10 col-lg-10">
                <label htmlFor="email" style={{ color: "#FFFFFF" }}>
                  Email
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
              <div
                className="col-xl-10 col-lg-10"
                style={{ backgroundColor: "#183368" }}
              >
                <label htmlFor="name" style={{ color: "#FFFFFF" }}>
                  User Name
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
              <div className="col-xl-10 col-lg-10">
                <label htmlFor="pass_word" style={{ color: "#FFFFFF" }}>
                  Password
                </label>
                <br />
                <input
                  type="text"
                  name="pass_word"
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
              <div className="col-xl-10 col-lg-10">
                <label htmlFor="mobile" style={{ color: "#FFFFFF" }}>
                  Contact Number
                </label>
                <br />
                <input
                  type="text"
                  name="mobile"
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
