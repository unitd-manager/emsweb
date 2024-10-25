import { Card } from 'antd';
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
// import NavMenu from '../components/NavMenu'
import api from "../constants/api";
import magazineimg from "../assets/images/magazine.jpg";

const MagazineSubscribe = () => {
  const [magazine, setMagazine] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const getMagazineSubscription = () => {
      api
        .get("/content/getMagazineSubscription", { content_type:'Magazine Subscription' })
        .then((res) => {
          setMagazine(res.data.data);
          console.log('MAGAZINE', res.data.data)
          AOS.init();
          
        })
        .catch(() => {});
    };

    getMagazineSubscription();
    setShowPopup(true);
  }, []); // Empty dependency array, runs once on mount
  const handleClosePopup = () => {
    // Close the popup by setting showPopup to false
    setShowPopup(false);
};

  return (
    <div className="container">
  <div className="row justify-content-center">
    <div className="col-xl-3 col-lg-3">
      <div className="part-txt">
        <h1 style={{ textAlign: "center" }}>Subscribe</h1>
        <ul className="custom-breadcrumb" style={{ display: "flex", justifyContent: "center", listStyle: "none", padding: 0 }}>
          <li className="custom-breadcrumb-item"><a href="/home">Home</a></li>
          <li className="custom-breadcrumb-item separator">/</li>
          <li className="custom-breadcrumb-item">Subscribe</li>
        </ul>
      </div>
    </div>
  </div>


      <div className="container" style={{ marginTop: "20px" }}>
        <div className="row justify-content-center">
          {magazine.map((e) => (
            <div className="col-xl-4 col-lg-4" key={e.id}>
              <Card hoverable style={{ width: 300, height: "100%" }}>
  {e.title}
</Card>
            </div>
          ))}
        </div>
      </div>
      {showPopup && (
                <div className="popup">
                    {/* Close button positioned at the top-left corner */}
                    <button className="close-btn" onClick={handleClosePopup}>X</button>
                    {/* Popup content with the image */}
                    <img src={magazineimg} alt="Popup" />
                </div>
            )}
            </div>
    );
}




export default MagazineSubscribe;
