import PropTypes from "prop-types";
import React from "react";

const HeroSliderTwoSingle = ({ data, sliderClassName, events }) => {
  const stripHtmlTags = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    return doc.body.textContent || '';
  };

  return (
    <div class="blog">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6">
                <div class="heading">
                    <h5>Latest News</h5>
                    <h2>Latest News & Updates</h2>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-xl-12 col-lg-12 col-md-9">
                <div class="blog-slider owl-carousel">
                    <div class="single-box">
                        <div class="part-img">
                            <img src="assets/images/blog-1.jpg" alt="image"/>
                        </div>
                        <div class="part-txt">
                            <a href="blog-details.html" class="title">Business Strategy Marketing System Updated Soon</a>
                            <p>There are many variations of passages a of Lorem Ipsum available, but the majo rity have suffered alteration</p>
                            <div class="blog-info">
                                <ul>
                                    <li><span><i class="flaticon-user"></i></span><a href="#">By Admin</a></li>
                                    <li><span><i class="flaticon-heart"></i></span>10k</li>
                                    <li><span><i class="flaticon-bubble-speak"></i></span>2.5k</li>
                                </ul>
                            </div>
                            <div class="part-btn">
                                <a href="blog-details.html" class="def-btn">Read More</a>
                            </div>
                        </div>
                    </div>
                    <div class="single-box">
                        <div class="part-img">
                            <img src="assets/images/blog-2.jpg" alt="image"/>
                        </div>
                        <div class="part-txt">
                            <a href="blog-details.html" class="title">Control Allows You Create Finance Business</a>
                            <p>There are many variations of passages a of Lorem Ipsum available, but the majo rity have suffered alteration</p>
                            <div class="blog-info">
                                <ul>
                                    <li><span><i class="flaticon-user"></i></span><a href="#">By Admin</a></li>
                                    <li><span><i class="flaticon-heart"></i></span>10k</li>
                                    <li><span><i class="flaticon-bubble-speak"></i></span>2.5k</li>
                                </ul>
                            </div>
                            <div class="part-btn">
                                <a href="blog-details.html" class="def-btn">Read More</a>
                            </div>
                        </div>
                    </div>
                    <div class="single-box">
                        <div class="part-img">
                            <img src="assets/images/blog-3.jpg" alt="image"/>
                        </div>
                        <div class="part-txt">
                            <a href="blog-details.html" class="title">Stylish Businessman Working in a Our Office</a>
                            <p>There are many variations of passages a of Lorem Ipsum available, but the majo rity have suffered alteration</p>
                            <div class="blog-info">
                                <ul>
                                    <li><span><i class="flaticon-user"></i></span><a href="#">By Admin</a></li>
                                    <li><span><i class="flaticon-heart"></i></span>10k</li>
                                    <li><span><i class="flaticon-bubble-speak"></i></span>2.5k</li>
                                </ul>
                            </div>
                            <div class="part-btn">
                                <a href="blog-details.html" class="def-btn">Read More</a>
                            </div>
                        </div>
                    </div>
                    <div class="single-box">
                        <div class="part-img">
                            <img src="assets/images/blog-4.jpg" alt="image"/>
                        </div>
                        <div class="part-txt">
                            <a href="blog-details.html" class="title">How to Manage Business’s Online Reputation</a>
                            <p>There are many variations of passages a of Lorem Ipsum available, but the majo rity have suffered alteration</p>
                            <div class="blog-info">
                                <ul>
                                    <li><span><i class="flaticon-user"></i></span><a href="#">By Admin</a></li>
                                    <li><span><i class="flaticon-heart"></i></span>10k</li>
                                    <li><span><i class="flaticon-bubble-speak"></i></span>2.5k</li>
                                </ul>
                            </div>
                            <div class="part-btn">
                                <a href="blog-details.html" class="def-btn">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  );
};

HeroSliderTwoSingle.propTypes = {
  data: PropTypes.object,
  sliderClassName: PropTypes.string,
};

export default HeroSliderTwoSingle;