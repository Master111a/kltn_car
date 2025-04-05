/** @format */

import React from "react";
import "./index.css";
import carImage from "../../../public/images/car-image.svg";
import vector from "../../../public/images/Vector.svg";
import service1Image from "../../../public/images/service-1.svg";
import service2Image from "../../../public/images/service-2.svg";
import service3Image from "../../../public/images/service-3.svg";
import carImage2 from "../../../public/images/car-bookcar-section.svg";
import { useNavigate, Link } from "react-router-dom";
const services = [
  {
    title: "Entry level detail",
    description:
      "Treat your luxury car to a thorough hand wash and wax application.",
    imgSrc: service2Image,
    alt: "Entry level detail",
  },
  {
    title: "Maintenance detail",
    description:
      "Ensure your car's longevity with a periodic exterior protection treatment.",
    imgSrc: service3Image,
    alt: "Maintenance detail",
  },
  {
    title: "Full detail",
    description:
      "Pamper your vehicle with a complete treatment, leaving no detail overlooked.",
    imgSrc: service1Image,
    alt: "Full detail",
  },
];

const commitments = [
  {
    title: "Precise Work",
    description:
      "We uphold the highest standards of professionalism when servicing your vehicles.",
  },
  {
    title: "Premium Products and Services",
    description:
      "Ensure your car's longevity with a periodic exterior protection treatment.",
  },
  {
    title: "High-Level Security and Privacy",
    description:
      "We understand the importance of privacy and security for our clientele.",
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className='homepage'>
      {/* Header Section */}
      <header className='header'>
        <div className='logo'>3DCarConnect</div>
        <nav>
          <ul>
            <li>
              <Link to='/store'>Store</Link>
              {/* <a href='#'>Store</a> */}
            </li>
            <li>
              <a href='#'>About</a>
            </li>
            <li>
              <a href='#'>Blogs</a>
            </li>
            <li>
              <a href='#'>Support</a>
            </li>
          </ul>
        </nav>
        <button className='login-btn' onClick={() => navigate("/onboarding")}>
          Logout
        </button>
      </header>

      {/* Hero Section */}
      <section className='hero'>
        <div className='hero-content'>
          <h1>Luxury car detailing</h1>
          <p>
            Experience the prestige of a professionally detailed car, radiating
            elegance and refinement at every turn.
          </p>
          <div className='connect'>
            <a href='#' className='connect-btn'>
              Let's connect
            </a>
            <img src={vector} alt='Arroow' />
          </div>
        </div>
        <div className='hero-image'>
          <img src={carImage} alt='Luxury Car' />
        </div>
      </section>

      {/* Services Section */}
      <section className='services'>
        <span className='service-divider'>Luxury Car Detailing</span>
        <div className='divider'></div>
        <div className='service-title'>
          <h2>Love in Every Detail</h2>
          <p>
            Immerse yourself in luxury with our bespoke detailing packages
            tailored to your car's unique needs.
          </p>
        </div>

        <div className='service-cards'>
          {services.map((service, index) => (
            <div key={index} className='service-card'>
              <img src={service.imgSrc} alt={service.alt} />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href='#' className='learn-more'>
                Learn more →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Video Section */}
      <section className='video-section'>
        <div className='video-container'>
          <iframe
            width='1120'
            height='600'
            src='https://www.youtube.com/embed/JbPBHtLstGw'
            title='2024 Mercedes-AMG GT “SO. AMG.” Commercial'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen></iframe>
        </div>
      </section>

      {/* Commitments Section */}
      <section className='commitment-section'>
        <div className='commitment-left'>
          <div className='commitment-header'>
            <h2 className='section-slogan'>
              We will take good{" "}
              <span className='block-text'>care of your car</span>
            </h2>
            <p className='section-intro'>
              Experience automotive perfection with our exclusive concierge
              detailing service.
            </p>
          </div>
          <img src={carImage} alt='Luxury Car' />
        </div>
        <div className='divider'></div>

        <div className='commitment-right'>
          <div className='commitment-grid'>
            {commitments.map((commitment, index) => (
              <div key={index} className='commitment-card'>
                <div className='card-decoration'></div>
                <h3 className='commitment-title'>{commitment.title}</h3>
                <p className='commitment-desc'>{commitment.description}</p>
              </div>
            ))}

            <button className='quote-button'>
              Get a quote now
              <span className='button-arrow'>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Section to book car detailing */}
      <section className='book-detailing'>
        <img src={carImage2} alt='Luxury Car' />
        <div className='book-detailing-left'>
          <h2 className='book-title'>Book your luxury car detailing today</h2>
          <p className='book-description'>
            Click the link below. Fill out the details and we'll get back to you
            in less than 24 hours.
          </p>
          <a href='#' className='quote-button'>
            Get a quote now <span className='arrow'>→</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className='footer'>
        <div className='footer-top'>
          <div className='footer-left'>
            <h3>3DCarConnect</h3>
            <p>
              Experience the prestige of a professionally detailed car,
              radiating elegance and refinement at every turn.
            </p>
          </div>
          <div className='footer-right'>
            <div className='footer-links'>
              <h4>Website</h4>
              <ul>
                <li>Services</li>
                <li>Pricing</li>
                <li>About</li>
              </ul>
            </div>
            <div className='footer-links'>
              <h4>Contact</h4>
              <ul>
                <li>Get a quote</li>
                <li>Contact form</li>
                <li>Email us</li>
              </ul>
            </div>
            <div className='footer-links'>
              <h4>Social Media</h4>
              <ul>
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Twitter</li>
                <li>YouTube</li>
              </ul>
            </div>
          </div>
        </div>
        <div className='footer-bottom'>
          <ul>
            <li>Cookie policy</li>
            <li>Terms of service</li>
            <li>Privacy policy</li>
          </ul>
          <p>3DCarConnect © 2024</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
