"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  Building, GraduationCap, Target, Calendar, Sprout,
  Users, Award, LineChart, Shield,
  Monitor, Server, Smartphone, Send,
  ChevronRight, Phone, Mail, MapPin, Zap, Menu, X,
  Eye, Rocket
} from "lucide-react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing! You'll receive our latest updates soon.");
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const videoRef = useRef(null);
  const handleVideoTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const loopStart = video.duration - 4;
    // Once the video reaches its natural end, jump back to loop start
    if (video.currentTime >= video.duration - 0.05) {
      video.currentTime = loopStart > 0 ? loopStart : 0;
      video.play();
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // The URL should be replaced with the user's Google Apps Script Web App URL
    const scriptUrl = "https://script.google.com/macros/s/AKfycbxx-EM7pZb-BKgynij-TVfUPeIk2CcwAJ64R8CbPBOzD7dHAdfHFCLAjg8m7K1U5JjLlA/exec";

    // Create FormData
    const formData = new FormData(e.target);

    try {
      await fetch(scriptUrl, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
      setSubmitSuccess(true);
      e.target.reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form', error);
      alert('There was an error submitting the form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header className="header">
        <div className="container nav-container">
          <div className="logo">
            <Image src="/logo-without-bg.png" alt="Chaalanikrafts Logo" width={40} height={40} priority />
            <span className="logo-text">
              Chaalanikrafts Info
            </span>
          </div>

          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`}>
            <ul className="nav-links">
              <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
              <li><a href="#about" onClick={() => setIsMenuOpen(false)}>About</a></li>
              <li><a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a></li>
              <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
            </ul>
            <a href="#contact" className="btn btn-primary mobile-only-btn" onClick={() => setIsMenuOpen(false)}>Let's Talk <ChevronRight size={18} /></a>
          </nav>
          <a href="#contact" className="btn btn-primary desktop-only-btn">Let's Talk <ChevronRight size={18} /></a>
        </div>
      </header>

      <main>
        {/* Visual Background Blobs */}
        <div className="bg-blob blob-1"></div>
        <div className="bg-blob blob-2" style={{ top: "40%" }}></div>
        <div className="bg-blob blob-1" style={{ top: "80%", right: "0", left: "auto" }}></div>

        {/* 1. Hero Section */}
        <section id="home" className="hero">
          <div className="hero-bg"></div>
          <div className="container hero-grid">
            <div className="hero-content">
              <div className="hero-caption">
                <span className="caption-text">Actioning Aspirations Together</span>
              </div>
              <h1>
                <span className="text-gradient">Cutting-Edge IT Solutions</span> <br />
                for a Digital World
              </h1>
              <p>
                Our innovative approach ensures seamless integration and growth through technology. We empower businesses to thrive and achieve their full potential.
              </p>
              <div className="hero-buttons">
                <a href="#services" className="btn btn-primary">Explore Services</a>
                <a href="#about" className="btn btn-outline">Our Story</a>
              </div>
            </div>
            <div className="hero-image-wrapper">
              <video
                ref={videoRef}
                src="/hero-video.mp4"
                autoPlay
                muted
                playsInline
                onTimeUpdate={handleVideoTimeUpdate}
                style={{ width: '100%', height: 'auto', objectFit: 'contain', borderRadius: '12px' }}
              />
            </div>
          </div>
        </section>

        {/* 2. About & Vision / Mission Section */}
        <section id="about" className="section container">
          <div className="services-header" style={{ marginBottom: "3rem" }}>
            <h4 className="section-label">Who We Are</h4>
            <h2 className="section-title">Our Vision &amp; Mission</h2>
          </div>
          <div className="about-grid">
            {/* Vision Card */}
            <div className="glass-card vision-mission-card">
              <div className="vm-icon-badge vm-icon-vision">
                <Eye size={28} />
              </div>
              <h4 className="section-label" style={{ marginTop: "1.25rem" }}>Our Vision</h4>
              <h3 className="vm-card-title">Leading Digital Excellence Globally</h3>
              <p className="about-text" style={{ margin: 0 }}>
                To be the global leader in innovative IT solutions, transforming businesses through cutting-edge technology
                and setting new standards in digital excellence. We envision a world where technology seamlessly empowers
                every organization.
              </p>
            </div>
            {/* Mission Card */}
            <div className="glass-card vision-mission-card">
              <div className="vm-icon-badge vm-icon-mission">
                <Rocket size={28} />
              </div>
              <h4 className="section-label" style={{ marginTop: "1.25rem" }}>Our Mission</h4>
              <h3 className="vm-card-title">Driving Growth &amp; Innovation</h3>
              <p className="about-text" style={{ margin: 0 }}>
                To deliver exceptional IT solutions that drive results. We are committed to
                providing our clients with reliable, scalable, and secure technology solutions while maintaining the
                highest standards of quality.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Our Journey / Timeline */}
        <section className="section" style={{ background: "rgba(255,255,255,0.02)", position: "relative" }}>
          <div className="container">
            <div className="services-header">
              <h4 className="section-label">Our History</h4>
              <h2 className="section-title">Our Journey</h2>
              <p className="text-muted" style={{ color: "var(--text-muted)" }}>
                From our humble beginnings at SSIT to becoming a forward-thinking agri-tech innovator,
                our journey has been defined by continuous growth.
              </p>
            </div>

            <div className="timeline-container">
              <div className="timeline-line"></div>

              <div className="timeline-item">
                <div className="timeline-content glass-card">
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>
                    <Building size={20} />
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>March 2022</span>
                  </div>
                  <h3>Founded at SSIT</h3>
                  <p className="text-muted" style={{ fontSize: '0.95rem' }}>Established with support from alumni and industry professionals.</p>
                </div>
                <div className="timeline-dot"></div>
                <div className="timeline-content"></div>
              </div>

              <div className="timeline-item">
                <div className="timeline-content"></div>
                <div className="timeline-dot"></div>
                <div className="timeline-content glass-card">
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>
                    <GraduationCap size={20} />
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>2022-2023</span>
                  </div>
                  <h3>Educational Initiatives</h3>
                  <p className="text-muted" style={{ fontSize: '0.95rem' }}>Conducted 6-7 free webinars for SSIT students.</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-content glass-card">
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>
                    <Target size={20} />
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Early 2024</span>
                  </div>
                  <h3>Commercial Launch</h3>
                  <p className="text-muted" style={{ fontSize: '0.95rem' }}>Started receiving and delivering client projects.</p>
                </div>
                <div className="timeline-dot"></div>
                <div className="timeline-content"></div>
              </div>

              <div className="timeline-item">
                <div className="timeline-content"></div>
                <div className="timeline-dot"></div>
                <div className="timeline-content glass-card">
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>
                    <Calendar size={20} />
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>November 13, 2024</span>
                  </div>
                  <h3>Official Registration</h3>
                  <p className="text-muted" style={{ fontSize: '0.95rem' }}>Registered as Chaalanikraftsinfo LLP.</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-content glass-card">
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>
                    <Sprout size={20} />
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Present</span>
                  </div>
                  <h3>Agri-Tech Focus</h3>
                  <p className="text-muted" style={{ fontSize: '0.95rem' }}>Developing innovative solutions for agricultural challenges.</p>
                </div>
                <div className="timeline-dot"></div>
                <div className="timeline-content"></div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. Services Section */}
        <section id="services" className="section container">
          <div className="services-header">
            <h4 className="section-label">What We Do</h4>
            <h2 className="section-title">Our Services</h2>
          </div>
          <div className="services-grid">
            <div className="service-card glass-card">
              <div className="service-icon"><Monitor size={32} /></div>
              <h3>Digital Transformation</h3>
              <p>Transform your business with cutting-edge digital solutions tailored to your workflow.</p>
            </div>
            <div className="service-card glass-card">
              <div className="service-icon" style={{ color: "var(--accent-primary)", background: "rgba(255, 170, 0, 0.1)" }}>
                <Server size={32} />
              </div>
              <h3>Cloud Solutions</h3>
              <p>Scalable and secure cloud infrastructure designed for modern business needs.</p>
            </div>
            <div className="service-card glass-card">
              <div className="service-icon" style={{ color: "var(--accent-secondary)", background: "rgba(0, 0, 139, 0.1)" }}>
                <Shield size={32} />
              </div>
              <h3>Cybersecurity</h3>
              <p>Protect your business from threats with advanced security measures and monitoring.</p>
            </div>
            <div className="service-card glass-card">
              <div className="service-icon" style={{ color: "#10b981", background: "rgba(16, 185, 129, 0.1)" }}>
                <Smartphone size={32} />
              </div>
              <h3>Mobile Solutions</h3>
              <p>Custom mobile applications allowing you to connect with users anywhere.</p>
            </div>
          </div>
        </section>

        {/* 5. Social Proof / Achievements */}
        <section className="section social-proof relative">
          <div className="container">
            <div className="services-header" style={{ marginBottom: "4rem" }}>
              <h2 className="section-title">Our Achievements</h2>
            </div>

            <div className="metrics-grid">
              <div>
                <Users className="mx-auto mb-4" size={48} style={{ color: "var(--accent-primary)" }} />
                <div className="metric-number">500+</div>
                <div className="metric-label">Clients Served</div>
              </div>
              <div>
                <Award className="mx-auto mb-4" size={48} style={{ color: "#10b981" }} />
                <div className="metric-number">98%</div>
                <div className="metric-label">Client Satisfaction</div>
              </div>
              <div>
                <Target className="mx-auto mb-4" size={48} style={{ color: "#ef4444" }} />
                <div className="metric-number">150+</div>
                <div className="metric-label">Projects Completed</div>
              </div>
              <div>
                <LineChart className="mx-auto mb-4" size={48} style={{ color: "var(--accent-secondary)" }} />
                <div className="metric-number">25M+</div>
                <div className="metric-label">Revenue Generated</div>
              </div>
            </div>

            {/* Newsletter Feature */}
            <div className="newsletter" style={{ marginTop: "6rem" }}>
              <h2 className="section-title" style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Stay Updated</h2>
              <p style={{ color: "var(--text-main)", opacity: 0.8 }}>Get the latest updates on our services and tech insights.</p>

              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="newsletter-input"
                />
                <button type="submit" className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem' }}>
                  <Send size={18} /> Subscribe
                </button>
              </form>
            </div>

          </div>
        </section>


      </main>

      {/* 7. Contact Us Section */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <div className="services-header">
            <h4 className="section-label">Get In Touch</h4>
            <h3 className="section-title">Ready to Transform Your Business?</h3>
            <p className="text-muted" style={{ color: "var(--text-muted)" }}>
              Reach out to us to discuss how our innovative IT and Agri-Tech solutions can help you achieve your goals.
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-info-card">
              <h3>Contact Information</h3>
              <p>Fill out the form and our team will get back to you within 24 hours.</p>

              <div className="info-item">
                <div className="info-item-icon">
                  <Phone size={24} />
                </div>
                <div className="info-item-content">
                  <h4>Phone Number</h4>
                  <p>+91 98765 43210</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-item-icon">
                  <Mail size={24} />
                </div>
                <div className="info-item-content">
                  <h4>Email Address</h4>
                  <p>info@chaalanikrafts.in</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-item-icon">
                  <MapPin size={24} />
                </div>
                <div className="info-item-content">
                  <h4>Location</h4>
                  <p>SSIT Campus, Innovation Hub,</p>
                  <p>Tech City, 560100</p>
                </div>
              </div>

              {/* Visual abstract blobs for the card */}
              <div style={{
                position: 'absolute', bottom: '-10%', right: '-10%',
                width: '250px', height: '250px',
                background: 'rgba(255,170,0,0.2)', borderRadius: '50%', filter: 'blur(40px)'
              }}></div>
            </div>

            <div className="contact-form-wrapper glass-card">
              <form onSubmit={handleContactSubmit}>
                {submitSuccess && (
                  <div style={{
                    padding: '1rem', marginBottom: '1.5rem', background: '#d1fae5',
                    color: '#065f46', borderRadius: '8px', border: '1px solid #10b981',
                    fontWeight: '500'
                  }}>
                    Thank you! Your message has been successfully submitted to our Google Sheet.
                  </div>
                )}

                <div className="contact-form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" className="form-input" placeholder="John" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" className="form-input" placeholder="Doe" required />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="email" className="form-input" placeholder="john@example.com" required />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" className="form-input" placeholder="+1 (555) 000-0000" />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea id="message" name="message" className="form-textarea" placeholder="How can we help you?" required></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', gap: '0.5rem' }} disabled={isSubmitting}>
                  {isSubmitting ? 'Sending to Google Sheets...' : (
                    <>
                      <Send size={18} /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="logo" style={{ marginBottom: "1.5rem" }}>
                <Image src="/logo-without-bg.png" alt="Chaalanikrafts Logo" width={40} height={40} />
                <span className="logo-text">
                  Chaalanikrafts Info
                </span>
              </div>
              <p className="text-muted" style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                Delivering cutting-edge IT and Agri-Tech solutions that empower businesses to thrive in a digital world.
              </p>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#services">Services</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <ul className="footer-links">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Cookie Policy</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact Us</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <Phone size={18} className="text-gradient" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="contact-item">
                  <Mail size={18} className="text-gradient" />
                  <span>info@chaalanikrafts.in</span>
                </div>
                <div className="contact-item">
                  <MapPin size={18} className="text-gradient" />
                  <span>SSIT Campus, Innovation Hub</span>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Chaalanikraftsinfo LLP. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
