import React from "react";
import { Link, Outlet } from "react-router-dom";
import service_icon_03 from "../../../assets/images/service-icon-03.png";
import service_icon_02 from "../../../assets/images/service-icon-02.png";
import service_icon_01 from "../../../assets/images/service-icon-01.png";
import "./Services.css";
export default function Services() {
  return (
    <div id="services" class="our-services section">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 offset-lg-3">
            <div
              class="section-heading wow bounceIn"
              data-wow-duration="1s"
              data-wow-delay="0.2s"
            >
              <h6>Our Services</h6>
              <h2>
                Discover What We Do &amp; <span>Offer</span> To Our{" "}
                <em>Clients</em>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-4">
            <div
              class="service-item wow bounceInUp"
              data-wow-duration="1s"
              data-wow-delay="0.3s"
            >
              <Link to="Service">
                <div class="row">
                  <div class="col-lg-4">
                    <div class="icon">
                      <img src={service_icon_01} alt="" />
                    </div>
                  </div>
                  <div class="col-lg-8">
                    <div class="right-content">
                      <h4>Agile Business Analysis</h4>
                      <p>
                        Using Agile techniques to deliver value to your
                        customers faster
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <Outlet />
            </div>
          </div>
          <div class="col-lg-4">
            <div
              class="service-item wow bounceInUp"
              data-wow-duration="1s"
              data-wow-delay="0.4s"
            >
              <Link to="digital">
                <div class="row">
                  <div class="col-lg-4">
                    <div class="icon">
                      <img src={service_icon_02} alt="" />
                    </div>
                  </div>
                  <div class="col-lg-8">
                    <div class="right-content">
                      <h4>Digital Business Analysis</h4>
                      <p>
                        Supporting the design of innovative technology solutions
                        to give you a competitive edge in the digital age
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div class="col-lg-4">
            <div
              class="service-item wow bounceInUp"
              data-wow-duration="1s"
              data-wow-delay="0.5s"
            >
              <Link to="business">
                <div class="row">
                  <div class="col-lg-4">
                    <div class="icon">
                      <img src={service_icon_03} alt="" />
                    </div>
                  </div>
                  <div class="col-lg-8">
                    <div class="right-content">
                      <h4>Business Data Analysis</h4>
                      <p>
                        Using data to drive improved decision-making within your
                        business
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div class="col-lg-4">
            <div
              class="service-item wow bounceInUp"
              data-wow-duration="1s"
              data-wow-delay="0.6s"
            >
              <div class="row">
                <div class="col-lg-4">
                  <div class="icon">
                    <img src={service_icon_03} alt="" />
                  </div>
                </div>
                <div class="col-lg-8">
                  <div class="right-content">
                    <h4>Optimizing Keywords</h4>
                    <p>
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium dormque laudantium.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div
              class="service-item wow bounceInUp"
              data-wow-duration="1s"
              data-wow-delay="0.7s"
            >
              <div class="row">
                <div class="col-lg-4">
                  <div class="icon">
                    <img src={service_icon_01} alt="" />
                  </div>
                </div>
                <div class="col-lg-8">
                  <div class="right-content">
                    <h4>Page Optimizations</h4>
                    <p>
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium dormque laudantium.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div
              class="service-item wow bounceInUp"
              data-wow-duration="1s"
              data-wow-delay="0.8s"
            >
              <div class="row">
                <div class="col-lg-4">
                  <div class="icon">
                    <img src={service_icon_02} alt="" />
                  </div>
                </div>
                <div class="col-lg-8">
                  <div class="right-content">
                    <h4>Deep URL Analysis</h4>
                    <p>
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium dormque laudantium.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
