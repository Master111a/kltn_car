/** @format */

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { carModels } from "../components/Customizer/CarConfig";
import { Link } from "react-router-dom";
import "./StorePage.css";

const CarModel = ({ modelUrl }) => {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background

    // Camera setup
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 1000);
    camera.position.set(4.5, 2.2, 4.5);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    renderer.setClearColor(0x000000, 0);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 1.2);
    fillLight.position.set(-5, 3, -5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.0);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    // Load model
    const loader = new GLTFLoader();
    loader.load(modelUrl, (gltf) => {
      const model = gltf.scene;

      // Center the model
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);

      // Scale model to fit view
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 5.2 / maxDim;
      model.scale.multiplyScalar(scale);

      model.position.y -= 0.1;

      model.traverse((child) => {
        if (child.isMesh) {
          child.material.envMapIntensity = 1.8;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      scene.add(model);
    });

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 2.2;
    controlsRef.current = controls;

    // Handle resize
    const handleResize = () => {
      const container = mountRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    // Initial setup
    const container = mountRef.current;
    container.appendChild(renderer.domElement);
    handleResize();
    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [modelUrl]);

  return (
    <div className='model-container' ref={mountRef}>
      <div className='reflection' />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className='feature-card'>
    <span className='feature-icon'>{icon}</span>
    <h3 className='feature-title'>{title}</h3>
    <p className='feature-description'>{description}</p>
  </div>
);

const CarSpecifications = ({ specs }) => (
  <div className='specifications-grid'>
    {Object.entries(specs).map(([key, value]) => (
      <div key={key} className='spec-item'>
        <span className='spec-label'>{key}</span>
        <span className='spec-value'>{value}</span>
      </div>
    ))}
  </div>
);

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Smith",
      title: "Car Enthusiast",
      avatar: "/images/avatars/avatar1.jpg",
      content:
        "The 3D car customization experience was incredible! I could visualize every detail of my dream car before making the purchase.",
      rating: 5,
      date: "March 15, 2024",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      title: "Business Executive",
      avatar: "/images/avatars/avatar2.jpg",
      content:
        "The attention to detail in the 3D models is outstanding. It helped me make a confident decision about my luxury car purchase.",
      rating: 5,
      date: "March 10, 2024",
    },
    {
      id: 3,
      name: "Michael Chen",
      title: "Tech Entrepreneur",
      avatar: "/images/avatars/avatar3.jpg",
      content:
        "The interactive 3D experience is a game-changer. It's like having a virtual showroom at your fingertips.",
      rating: 5,
      date: "March 5, 2024",
    },
    {
      id: 4,
      name: "Emma Davis",
      title: "Luxury Car Collector",
      avatar: "/images/avatars/avatar4.jpg",
      content:
        "The quality of the 3D models and the customization options exceeded my expectations. A truly premium experience.",
      rating: 5,
      date: "March 1, 2024",
    },
  ];

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className='testimonials-section'>
      <h2 className='section-title'>What Our Customers Say</h2>
      <div className='testimonials-container'>
        <div className='testimonials-track'>
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className='testimonial-card'>
              <div className='testimonial-header'>
                <div className='testimonial-avatar'>
                  <img src={testimonial.avatar} alt={testimonial.name} />
                </div>
                <div className='testimonial-info'>
                  <h3 className='testimonial-name'>{testimonial.name}</h3>
                  <p className='testimonial-title'>{testimonial.title}</p>
                </div>
              </div>
              <p className='testimonial-content'>{testimonial.content}</p>
              <div className='testimonial-rating'>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className='testimonial-date'>{testimonial.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StorePage = () => {
  const [selectedCar, setSelectedCar] = useState(0);

  const features = [
    {
      icon: "🎨",
      title: "Custom Paint",
      description: "Choose from a wide range of premium colors and finishes",
    },
    {
      icon: "⚙️",
      title: "Performance Tuning",
      description:
        "Optimize your vehicle's performance to match your driving style",
    },
    {
      icon: "💺",
      title: "Interior Design",
      description: "Personalize your cabin with premium materials and finishes",
    },
    {
      icon: "🛡️",
      title: "Quality Assurance",
      description: "Rigorous testing and premium quality guaranteed",
    },
  ];

  return (
    <div className='store-page-container'>
      {/* Hero Section */}
      <section className='hero-section'>
        <div className='hero-content'>
          <h1 className='hero-title'>Customize Your Dream Car</h1>
          <p className='hero-subtitle'>
            Experience the prestige of a professionally customized car,
            redefining elegance and performance at every turn.
          </p>
          <a href='#models' className='hero-cta'>
            Explore Models
          </a>
        </div>
        <div className='hero-background'></div>
      </section>

      {/* Models Section */}
      <section id='models' className='models-section'>
        <h2 className='section-title'>Available Models</h2>
        <div className='cars-grid'>
          {carModels.map((car, index) => (
            <div
              className='car-card'
              key={car.id || index}
              onMouseEnter={() => setSelectedCar(index)}
              onMouseLeave={() => setSelectedCar(null)}>
              <div className='car-header'>
                <span className='car-brand'>Premium Series</span>
                <span className='price-tag'>${car.price || "150,000"}</span>
              </div>

              <div className='model-wrapper'>
                <CarModel modelUrl={car.modelUrl} />
              </div>

              <div className='car-info'>
                <h2 className='car-name'>{car.name}</h2>
                <p className='car-description'>
                  {car.description ||
                    "Discover the perfect blend of power and elegance. Customize this masterpiece to match your unique style."}
                </p>

                {selectedCar === index && (
                  <CarSpecifications
                    specs={{
                      Engine: car.specs?.engine || "V8 Twin-Turbo",
                      Power: car.specs?.power || "580 HP",
                      "0-60 mph": car.specs?.acceleration || "3.2s",
                      "Top Speed": car.specs?.topSpeed || "205 mph",
                    }}
                  />
                )}

                <div className='car-actions'>
                  <Link className='customize-button' to={`/customize/${index}`}>
                    Customize Car
                  </Link>
                  <button className='details-button'>View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className='process-section'>
        <h2 className='section-title'>Customization Process</h2>
        <div className='process-steps'>
          <div className='process-step'>
            <div className='step-number'>01</div>
            <h3>Choose Your Model</h3>
            <p>Select from our premium range of luxury vehicles</p>
          </div>
          <div className='process-step'>
            <div className='step-number'>02</div>
            <h3>Customize Design</h3>
            <p>Personalize every detail to match your preferences</p>
          </div>
          <div className='process-step'>
            <div className='step-number'>03</div>
            <h3>Preview in 3D</h3>
            <p>See your customizations in real-time 3D visualization</p>
          </div>
          <div className='process-step'>
            <div className='step-number'>04</div>
            <h3>Finalize Order</h3>
            <p>Confirm your design and proceed with the order</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='features-section'>
        <h2 className='section-title'>Why Choose Us</h2>
        <div className='features-grid'>
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Footer Section */}
      <footer className='footer-section'>
        <div className='footer-content'>
          <div className='footer-brand'>
            <h2>3D Car Connect</h2>
            <p>
              Experience the prestige of a professionally detailed car,
              radiating elegance and refinement at every turn.
            </p>
          </div>

          <div className='footer-links'>
            <h3>Website</h3>
            <ul>
              <li>
                <a href='/services'>Services</a>
              </li>
              <li>
                <a href='/pricing'>Pricing</a>
              </li>
              <li>
                <a href='/about'>About</a>
              </li>
            </ul>
          </div>

          <div className='footer-links'>
            <h3>Contact</h3>
            <ul>
              <li>
                <a href='/quote'>Get a quote</a>
              </li>
              <li>
                <a href='/contact'>Contact form</a>
              </li>
              <li>
                <a href='mailto:contact@luxuredetails.com'>Email us</a>
              </li>
            </ul>
          </div>

          <div className='footer-links'>
            <h3>Social Media</h3>
            <ul>
              <li>
                <a
                  href='https://facebook.com'
                  target='_blank'
                  rel='noopener noreferrer'>
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href='https://instagram.com'
                  target='_blank'
                  rel='noopener noreferrer'>
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href='https://twitter.com'
                  target='_blank'
                  rel='noopener noreferrer'>
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href='https://youtube.com'
                  target='_blank'
                  rel='noopener noreferrer'>
                  Youtube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='footer-bottom'>
          <div className='footer-bottom-left'>
            <p>3D Car Connect © 2024</p>
          </div>
          <div className='footer-bottom-right'>
            <a href='/cookie-policy'>Cookie policy</a>
            <a href='/terms'>Terms of service</a>
            <a href='/privacy'>Privacy policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StorePage;
