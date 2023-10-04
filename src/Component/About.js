import React from "react";
import { Fade } from "react-reveal";
import img from "../assets/img/about-1.jpg";
import img2 from "../assets/img/about-2.jpg";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
function About({ setDomin }) {
  return (
    <>
      <div id="about" class="about about-us section">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <Fade left duration={1000} className="px-6 w-100">
                {/* <div class="left-image wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0.5s"> */}

                <div
                  className="w-100 wow fadeIn"
                  data-wow-delay="0.1s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.1s",
                    animationName: "fadeIn",
                  }}
                >
                  <div className="d-flex flex-column">
                    <img
                      className="img-fluid rounded w-75 align-self-end"
                      src={img}
                      alt=""
                    />
                    <img
                      className="img-fluid rounded w-50 bg-white pt-3 pe-3"
                      src={img2}
                      alt=""
                      style={{ marginTop: "-25%" }}
                    />
                  </div>
                </div>
              </Fade>
            </div>
            <div
              class="col-lg-6 align-self-center wow fadeInRight"
              data-wow-duration="1s"
              data-wow-delay="0.5s"
            >
              {/* <Fade right duration={1000} className=" w-100"> */}
              <div class="section-heading  px-6">
                <h6>About Us</h6>
                <h2>
                  Top <em>marketing</em> agency &amp; consult your website{" "}
                  <span>with us</span>
                </h2>
                <p className="m-4">
                  <a
                    rel="nofollow"
                    href="https://templatemo.com/tm-563-seo-dream"
                    target="_parent"
                  >
                    SEO Dream
                  </a>{" "}
                  is free digital marketing CSS template provided by TemplateMo
                  website. You are allowed to use this template for your
                  business websites. Please DO NOT redistribute this template
                  ZIP file on any Free CSS collection websites. You may contact
                  us for more information. Thank you.
                </p>
                <p className="m-1">
                  <i className="far fa-check-circle text-green me-3" />
                  Quality health care
                </p>
                <p className="m-1">
                  <i className="far fa-check-circle text-green me-3" />
                  Quality health care
                </p>
                <p className="m-1">
                  <i className="far fa-check-circle text-green me-3" />
                  Quality health care
                </p>
                <div class="main-green-button">
                  <a href="/">Discover company</a>
                </div>
              </div>

              {/* </Fade> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
