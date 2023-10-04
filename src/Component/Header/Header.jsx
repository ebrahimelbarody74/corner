import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import logo2 from "../../assets/img/logo-removebg-preview.png";
import logo from "../../assets/img/logo-icon.png";
export default function Header({ project }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        document
          .querySelector(".header-area")
          .classList.add("background-header");
      } else {
        document
          .querySelector(".header-area")
          .classList.remove("background-header");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className="header-area header-sticky wow slideInDown"
      data-wow-duration="0.75s"
      data-wow-delay="0s"
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              {/* <!-- ***** Logo Start ***** --> */}
              <a className="logo">
                <div className="">
                  <img
                    src={logo2}
                    className=" my-3"
                    style={{ width: "80px" }}
                  />
                </div>
              </a>
              {/* <!-- ***** Logo End ***** --> */}
              {/* <!-- ***** Menu Start ***** --> */}
              <ul
                className="nav"
                style={open ? { display: "block" } : { display: "none" }}
              >
                <li className="scroll-to-section">
                  <NavLink to="/" className="active">
                    Home
                  </NavLink>
                </li>
                <li className="scroll-to-section">
                  <NavLink to="/about">About Us</NavLink>
                </li>
                <li className="scroll-to-section">
                  <NavLink to="/services">Services</NavLink>
                </li>
                <li className="scroll-to-section">
                  <NavLink to="/contact">Contact Us</NavLink>
                </li>
                {!project && (
                  <li className="">
                    <Link
                      to={`/iiia`}
                      className="gradient-button"
                      style={{ lineHeight: "initial" }}
                    >
                      <div id="modal_trigger" href="#modal" className="active">
                        <i className="fa fa-sign-in-alt" /> Sign In Now
                      </div>
                    </Link>
                  </li>
                )}
              </ul>

              {open ? (
                <a
                  className="menu-trigger active"
                  onClick={() => setOpen(false)}
                >
                  <span>Menu</span>
                </a>
              ) : (
                <a className="menu-trigger" onClick={() => setOpen(true)}>
                  <span>Menu</span>
                </a>
              )}

              {/* <!-- ***** Menu End ***** --> */}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
