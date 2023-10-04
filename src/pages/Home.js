import Footer from "Component/Footer/Footer";
import Header from "Component/Header/Header";
import axios from "axios";
import React, { useEffect } from "react";
import about_left from "../assets/img/about-left-image.png";
import service_icon_03 from "../assets/img/service-icon-03.png";
import service_icon_02 from "../assets/img/service-icon-02.png";
import service_icon_01 from "../assets/img/service-icon-01.png";
import email_icon from "../assets/img/contact-icon-01.png";
import phone from "../assets/img/contact-icon-02.png";
import location from "../assets/img/contact-icon-03.png";
import { Link } from "react-router-dom";
import { Fade, Zoom } from "react-reveal";
import { HiOutlineMailOpen } from "react-icons/hi";
import { BsFillTelephoneFill } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";

import About from "Component/About";
import Services from "Component/Services";
import Contact from "Component/Contact";
function Home({ setDomin }) {
  const path = window.location.pathname.split("/")[1];

  const getData = async () => {
    console.log("first");
    if (path) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            withCredentials: false,
          },
        };
        const res = await axios.get(
          `https://iiia.almnew.online/api/tenant`,

          config
        );
        if (res.status === 200) {
          setDomin(true);
        } else {
          setDomin(false);
        }
      } catch (error) {
        // setLoading(false);
        setDomin(false);
        console.log(error);

        //  setError(true);
      }
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Header />
      <div
        class="main-banner wow fadeIn"
        id="top"
        data-wow-duration="1s"
        data-wow-delay="0.5s"
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="row">
                <Fade left duration={1000}>
                  <div class="col-lg-6 align-self-center">
                    <div
                      class="left-content header-text wow fadeInLeft"
                      data-wow-duration="1s"
                      data-wow-delay="1s"
                    >
                      <div class="row">
                        {/* <div class="col-lg-4 col-sm-4">
                          <div class="info-stat">
                            <h6>Agency Status:</h6>
                            <h4>Ready Work</h4>
                          </div>
                        </div>
                        <div class="col-lg-4 col-sm-4">
                          <div class="info-stat">
                            <h6>Price:</h6>
                            <h4>$720/Month</h4>
                          </div>
                        </div>
                        <div class="col-lg-4 col-sm-4">
                          <div class="info-stat">
                            <h6>Schedules</h6>
                            <h4>$450/Meeting</h4>
                          </div>
                        </div> */}
                        <div class="col-lg-12 ">
                          <h1 class="fs-35 fw-bold text-green m-0 p-0">
                            Welcome To Corner Edge Group
                          </h1>
                        </div>
                        <div class="col-lg-12">
                          <h2>
                             Enginering Consultants
                          </h2>
                        </div>
                        <div class="col-lg-6 text-center pe-20">
                          <Link
                            to={`/iiia`}
                            className="gradient-button"
                            style={{ lineHeight: "initial" }}
                          >
                            <div
                              id="modal_trigger"
                              href="#modal"
                              className="active"
                            >
                              <i className="fa fa-sign-in-alt" /> Sign In Now
                            </div>
                          </Link>
                          {/* <div class="main-green-button scroll-to-section">
                            <Link to="/iiia">Sign In</Link>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </Fade>
                <div class="col-lg-6">
                  <div
                    class="right-image wow fadeInRight"
                    data-wow-duration="1s"
                    data-wow-delay="0.5s"
                  >
                    {/* <img src={banner_right_image} alt="" /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <About />

      <Services />
      <Contact />

      <Footer />
    </>
  );
}

export default Home;
