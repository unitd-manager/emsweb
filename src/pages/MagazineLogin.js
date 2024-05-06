import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import api from "../constants/api";

function Login() {
    

    const [signinData, setSigninData] = useState({
        email: "",
        password: "",
      });
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [emailError, setEmailError] = useState("");
      const [passwordError, setPasswordError] = useState("");


      const navigate=useNavigate();
      const validateEmail = (email) => {
        // Email validation regex pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
      };
     
      const validatePassword = (password) => {
        // Password validation regex pattern
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        return passwordPattern.test(password);
      };
    const handleSigninData = (e) => {
        setSigninData({ ...signinData, [e.target.name]: e.target.value });
        console.log("signin", signinData);
      };
    

    const signin = (event) => {
        event.preventDefault();
        // Reset previous errors
        setEmailError("");
        setPasswordError("");
    
        // Perform email and password validation
        if (!validateEmail(email)) {
          setEmailError("Invalid email");
        }
    
        if (!validatePassword(password)) {
          setPasswordError(
            "Password must contain at least 8 characters, including one UpperCase letter,one LowerCase letter,special characer and one number"
          );
        }
    
        // If both email and password are valid, proceed with form submission
        if (validateEmail(email) && validatePassword(password)) {
          api.post("/api/login", signinData).then((res) => {
            if (res && res.status === "400") {
              alert("Invalid Username or Password");
              // addToast("Invalid Username or Password", {
              //   appearance: "error",
              //   autoDismiss: true,
              // });
            } 
            else {
              localStorage.setItem("user", JSON.stringify(res.data.data));
              localStorage.setItem("token", JSON.stringify(res.data.token));
    
              setTimeout(()=>{
    navigate('/MagazineSubscripe')
              },300)
            }
          }).catch((err)=>{
            // addToast("Invalid Username or Password", {
            //   appearance: "error",
            //   autoDismiss: true,
            // });
          });
        }
      };
  return (
    <div className="container">
  <div className="row justify-content-center">
    <div className="col-xl-3 col-lg-3">
      <div className="part-txt">
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <ul className="custom-breadcrumb" style={{ display: "flex", justifyContent: "center", listStyle: "none", padding: 0 }}>
          <li className="custom-breadcrumb-item"><a href="/home">Home</a></li>
          <li className="custom-breadcrumb-item separator">/</li>
          <li className="custom-breadcrumb-item">Login</li>
        </ul>
      </div>
    </div>
  </div>


         
                          <div className="login-form-container">
                            <div className="login-register-form">
                              <form>
                              <div>
        <label htmlFor="email">Email</label>
        <br></br> 
                                <input
                                  type="text"
                                  name="email"
                                  placeholder="Email"
                                  onChange={(e) => {
                                    handleSigninData(e);
                                    setEmail(e.target.value);
                                  }}
                                />
                                {emailError && (
                                  <span className="error">{emailError}</span>
                                )}
                                <br></br>
                                <label htmlFor="password">Password</label>
        <br></br> 
                                <input
                                  type="password"
                                  name="password"
                                  placeholder="Password"
                                  onChange={(e) => {
                                    handleSigninData(e);
                                    setPassword(e.target.value);
                                  }}
                                />
                                {passwordError && (
                                  <span className="error">{passwordError}</span>
                                )}
                                <div className="button-box">
                                  {/* <div className="login-toggle-btn">
                                    <input type="checkbox" />
                                    <label className="ml-10">Remember me</label>
                                    <Link
                                      to={
                                        process.env.PUBLIC_URL +
                                        "/forgot-password"
                                      }
                                    >
                                      Forgot Password?
                                    </Link>
                                  </div> */}
                                  <button type="submit" onClick={signin}>
                                    <span>Login</span>
                                  </button>
                                </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        
    </div>
  )
}


export default Login