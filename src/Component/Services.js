import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

function Services({ setDomin }) {
  return (
    <>
      <div id="features">
        <div className="container-xxl py-5">
          <div className="container">
            {/* <div
              className="text-center mx-auto mb-5 wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ maxWidth: "600px" }}
            >
              <p className="d-inline-block border rounded-pill py-1 px-4">
                Services
              </p>
              <h1>Health Care Solutions</h1>
            </div> */}
            <div className="row g-4">
              <div
                className="col-lg-4 mb-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div className="service-item bg-light rounded h-100 p-5">
                  <div
                    className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4"
                    style={{ width: "65px", height: "65px" }}
                  >
                    <i className="fa fs-30 fa-heartbeat text-green fs-4" />
                  </div>
                  <h4 className="mb-3">Cardiology</h4>
                  <p className="mb-4">
                    Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                    lorem sed diam stet diam sed stet.
                  </p>
                  <a className="btn" href>
                    <i className="fa fs-30 fa-plus text-green me-3" />
                    Read More
                  </a>
                </div>
              </div>
              <div
                className="col-lg-4 mb-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.3s"
              >
                <div className="service-item bg-light rounded h-100 p-5">
                  <div
                    className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4"
                    style={{ width: "65px", height: "65px" }}
                  >
                    <i className="fa fs-30 fa-x-ray text-green fs-4" />
                  </div>
                  <h4 className="mb-3">Pulmonary</h4>
                  <p className="mb-4">
                    Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                    lorem sed diam stet diam sed stet.
                  </p>
                  <a className="btn" href>
                    <i className="fa fs-30 fa-plus text-green me-3" />
                    Read More
                  </a>
                </div>
              </div>
              <div
                className="col-lg-4 mb-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <div className="service-item bg-light rounded h-100 p-5">
                  <div
                    className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4"
                    style={{ width: "65px", height: "65px" }}
                  >
                    <i className="fa fs-30 fa-brain text-green fs-4" />
                  </div>
                  <h4 className="mb-3">Neurology</h4>
                  <p className="mb-4">
                    Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                    lorem sed diam stet diam sed stet.
                  </p>
                  <a className="btn" href>
                    <i className="fa fs-30 fa-plus text-green me-3" />
                    Read More
                  </a>
                </div>
              </div>
              <div
                className="col-lg-4 mb-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div className="service-item bg-light rounded h-100 p-5">
                  <div
                    className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4"
                    style={{ width: "65px", height: "65px" }}
                  >
                    <i className="fa fs-30 fa-wheelchair text-green fs-4" />
                  </div>
                  <h4 className="mb-3">Orthopedics</h4>
                  <p className="mb-4">
                    Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                    lorem sed diam stet diam sed stet.
                  </p>
                  <a className="btn" href>
                    <i className="fa fs-30 fa-plus text-green me-3" />
                    Read More
                  </a>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.3s"
              >
                <div className="service-item bg-light rounded h-100 p-5">
                  <div
                    className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4"
                    style={{ width: "65px", height: "65px" }}
                  >
                    <i className="fa fs-30 fa-tooth text-green fs-4" />
                  </div>
                  <h4 className="mb-3">Dental Surgery</h4>
                  <p className="mb-4">
                    Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                    lorem sed diam stet diam sed stet.
                  </p>
                  <a className="btn" href>
                    <i className="fa fs-30 fa-plus text-green me-3" />
                    Read More
                  </a>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <div className="service-item bg-light rounded h-100 p-5">
                  <div
                    className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4"
                    style={{ width: "65px", height: "65px" }}
                  >
                    <i className="fa fs-30 fa-vials text-green fs-4" />
                  </div>
                  <h4 className="mb-3">Laboratory</h4>
                  <p className="mb-4">
                    Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                    lorem sed diam stet diam sed stet.
                  </p>
                  <a className="btn" href>
                    <i className="fa fs-30 fa-plus text-green me-3" />
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Services;
