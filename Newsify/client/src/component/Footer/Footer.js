import React, {useState} from 'react';
import "./../Footer/Footer.scss";
import {Link} from "react-router-dom";
// import Searchbar from '../Cricket';

export default function Footer() {
    return (
        <>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css"
    integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA="
    crossOrigin="anonymous"
  />
  
  <footer className="deneb_footer">
    <div
      className="widget_wrapper">
      <div className="container" style={{height:"100%"}}>
        <div className="row">
          <div className="col-lg-4 col-md-6 col-12">
            <div className="widget widegt_about">
              <div className="widget_title">
                
              </div>
              <p>
              <h2 className='w3-xlarge w3-cursive w3-large'>About NEWSIFY</h2>
                A perfect website to start your day. Know whats going on around you and round the globe in just on click. We would love to get your feedback and connect with you.
                
              </p>
              <Link to="/team" className='w3-xlarge w3-cursive w3-large mb-2'>Give feedback</Link>
              <ul className="social">
                <li>
                  <Link to="/">
                    <i className="fab fa-facebook-f" />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i className="fab fa-twitter" />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i className="fab fa-instagram" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 text-white">
            <div className="widget widget_link ">
              <div className="widget_title">
                <h4 className='w3-cursive w3-xxlarge'>Links</h4>
              </div>
              <ul>
                <li>
                  <Link to="/" className='text-white w3-large'>About Us</Link>
                </li>
                <li>
                  <Link to="/" className='text-white w3-large'>Services</Link>
                </li> 
                <li>
                  <Link to="/" className='text-white w3-large'>FAQ</Link>
                </li>
                <li>
                  <Link to="/" className='text-white w3-large'>Contribute</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="widget widget_contact">
              <div className="widget_title">
                <h4 className='w3-cursive w3-xxlarge'>Contact Us</h4>
              </div>
              <div className="contact_info">
                <div className="single_info">
                  <div className="icon">
                    <i className="fas fa-phone-alt" />
                  </div>
                  <div className="info">
                    <p>
                      <Link to="tel:+918887928417" className='text-white w3-large'>8887-928-417</Link>
                    </p>
                    <p>
                      <Link to="tel:+918318268334" className='text-white w3-large'>831-826-8334</Link>
                    </p>
                  </div>
                </div>
                <div className="single_info">
                  <div className="icon">
                    <i className="fas fa-envelope" />
                  </div>
                  <div className="info">
                    <p>
                      <Link to="mailto:richesh.21ug1070@iiitranchi.ac.in" className='text-white w3-medium'>richesh.21ug1070@iiitranchi.ac.in</Link>
                    </p>
                    <p>
                      <Link to="mailto:aditya.21ug1017@iiitranchi.ac.in" className='text-white w3-medium'>aditya.21ug1017@iiitranchi.ac.in</Link>
                    </p>
                  </div>
                </div>
                <div className="single_info">
                  <div className="icon">
                    <i className="fas fa-map-marker-alt" />
                  </div>
                  <div className="info w3-large">
                    <p>
                      IIIT Ranchi, Dhurwa<span>Ranchi.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="copyright_area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="copyright_text">
              <p>Copyright © 2023 All rights reserved.</p>
              <h3 style={{color:"black", fontSize:"large"}}>Made with <i class="fa-solid fa-heart fa-xl" style={{color: "#f60404"}}></i> by <i class="fa-brands fa-bots fa-2xl"></i></h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</>

    )
}