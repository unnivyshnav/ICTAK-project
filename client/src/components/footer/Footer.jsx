import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <h2 className="footerHead">ICT Academy Of Kerala</h2>
      <div div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2 className="zone">HEAD QUARTERS</h2>
            <p className="address">
              L-9, Thejaswini Building, Technopark, Thiruvananthapuram, Kerala,
              India. Phone: 7594051437
            </p>
          </div>
          <div className="footer-link-items">
            <h2 className="zone">CENTRAL REGION</h2>
            <p className="address">
              Ground Floor,Rajamally Building, Infopark, Koratty, Thrissur,
              Kerala
            </p>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2 className="zone">NORTH REGION</h2>
            <p className="address">
              2nd Floor, Ul Cyberpark Building, Nellikode PO, Kozhikode, Kerala,
              India.
            </p>
          </div>
          <div className="footer-link-items">
            <h2 className="zone">SOUTH REGION</h2>
            <p className="address">
              L-9, Thejaswini Building, Technopark, Thiruvananthapuram, Kerala,
              India.
            </p>
          </div>
        </div>
      </div>
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/" className="social-logo">
              ICTAK
            </Link>
          </div>
          <small className="website-rights">
            created as part of ICTAK @ 2022
          </small>
          <div className="social-icons">
            <Link
              className="social-icon-link facebook"
              to="/"
              target="_blank"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f" />
            </Link>
            <Link
              className="social-icon-link instagram"
              to="/"
              target="_blank"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram" />
            </Link>

            <Link
              className="social-icon-link twitter"
              to="/"
              target="_blank"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter" />
            </Link>
            <Link
              className="social-icon-link twitter"
              to="/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
