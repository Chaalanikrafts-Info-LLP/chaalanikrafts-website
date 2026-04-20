"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Building, GraduationCap, Target, Calendar, Sprout,
  Users, Award, LineChart, Shield,
  Monitor, Server, Smartphone, Send,
  ChevronRight, Phone, Mail, MapPin, Menu, X,
  Eye, Rocket, ArrowUpRight, Sparkles, Star,
  ArrowRight, Zap, Globe, Lock
} from "lucide-react";

function AnimatedCounter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime = null;
          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={countRef}>{count}{suffix}</span>;
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const videoRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleVideoTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const loopStart = video.duration - 4;
    if (video.currentTime >= video.duration - 0.05) {
      video.currentTime = loopStart > 0 ? loopStart : 0;
      video.play();
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing!");
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const scriptUrl = "https://script.google.com/macros/s/AKfycbxx-EM7pZb-BKgynij-TVfUPeIk2CcwAJ64R8CbPBOzD7dHAdfHFCLAjg8m7K1U5JjLlA/exec";
    const formData = new FormData(e.target);
    try {
      await fetch(scriptUrl, { method: 'POST', body: formData, mode: 'no-cors' });
      setSubmitSuccess(true);
      e.target.reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      alert('There was an error submitting the form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      icon: Monitor,
      title: "Digital Transformation",
      description: "Reimagine your workflows with purpose-built digital systems that scale with your ambitions.",
      tag: "Strategy & Tech",
      accent: "#00008b"
    },
    {
      icon: Server,
      title: "Cloud Solutions",
      description: "Infrastructure that breathes — elastic, secure cloud architecture for modern enterprises.",
      tag: "Infrastructure",
      accent: "#ffaa00"
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Proactive threat intelligence and layered security systems protecting your digital assets.",
      tag: "Protection",
      accent: "#00008b"
    },
    {
      icon: Smartphone,
      title: "Mobile Solutions",
      description: "Native and cross-platform apps crafted for seamless user experiences across every device.",
      tag: "Product",
      accent: "#059669"
    }
  ];

  const stats = [
    { icon: Users, value: 500, suffix: "ssi", label: "Clients Served" },
    { icon: Award, value: 98, suffix: "%", label: "Satisfaction Rate" },
    { icon: Target, value: 150, suffix: "+", label: "Projects Done" },
    { icon: LineChart, value: 25, suffix: "M+", label: "Revenue Generated" }
  ];

  const timeline = [
    { icon: Building, date: "March 2022", title: "Founded at SSIT", desc: "Established with support from alumni and industry professionals." },
    { icon: GraduationCap, date: "2022–2023", title: "Educational Initiatives", desc: "Conducted 6–7 free webinars for SSIT students." },
    { icon: Target, date: "Early 2024", title: "Commercial Launch", desc: "Started receiving and delivering client projects." },
    { icon: Calendar, date: "Nov 2024", title: "Official Registration", desc: "Registered as Chaalanikraftsinfo LLP." },
    { icon: GraduationCap, date: "Present", title: "Edu-Tech Focus", desc: "Developing innovative solutions for Edu-Tech challenges." }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --ink: #0a0a14;
          --navy: #00008b;
          --navy-mid: #0008a0;
          --gold: #ffaa00;
          --gold-light: #fff3d0;
          --slate: #5a6478;
          --mist: #f4f6fb;
          --white: #ffffff;
          --border: rgba(0, 0, 139, 0.10);
          --radius: 20px;
          --radius-sm: 12px;
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: 'Inter', sans-serif;
          color: var(--ink);
          background: #fafafa;
          -webkit-font-smoothing: antialiased;
        }

        .syne { font-family: 'Inter', sans-serif; }

        /* ── Header ── */
        .header {
          position: fixed; top: 0; width: 100%; z-index: 100;
          transition: all 0.4s ease;
          padding: 20px 0;
        }
        .header.scrolled {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(20px);
          box-shadow: 0 1px 0 var(--border), 0 8px 40px rgba(0,0,139,0.07);
          padding: 12px 0;
        }
        .header-inner {
          max-width: 1320px; margin: 0 auto;
          padding: 0 40px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .logo-wrap { display: flex; align-items: center; gap: 12px; text-decoration: none; }
        .logo-text {
          font-family: 'Inter', sans-serif;
          font-weight: 700; font-size: 20px;
          color: var(--navy); letter-spacing: -0.5px;
        }
        nav { display: flex; align-items: center; gap: 36px; }
        .nav-link {
          font-size: 15px; font-weight: 500;
          color: var(--slate); text-decoration: none;
          position: relative; padding-bottom: 2px;
          transition: color 0.2s;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: 0; left: 0;
          width: 0; height: 1.5px;
          background: var(--gold);
          transition: width 0.3s ease;
        }
        .nav-link:hover { color: var(--navy); }
        .nav-link:hover::after { width: 100%; }
        .btn-talk {
          font-family: 'Inter', sans-serif;
          font-weight: 700; font-size: 14px; letter-spacing: 0.3px;
          padding: 10px 24px; border-radius: 100px;
          background: var(--navy); color: white;
          text-decoration: none; display: flex; align-items: center; gap: 6px;
          transition: all 0.25s;
        }
        .btn-talk:hover {
          background: var(--gold); color: var(--navy);
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(255,170,0,0.3);
        }
        .hamburger {
          display: none; background: none; border: none;
          cursor: pointer; padding: 8px; color: var(--navy);
        }
        .mobile-nav {
          display: none; position: fixed; inset: 0;
          background: white; z-index: 200;
          flex-direction: column; align-items: center; justify-content: center; gap: 24px;
        }
        .mobile-nav.open { display: flex; }
        .mobile-nav-link {
          font-family: 'Inter', sans-serif; font-weight: 700; font-size: 24px;
          color: var(--navy); text-decoration: none;
          transition: color 0.2s;
        }
        .mobile-nav-link:hover { color: var(--gold); }
        .mobile-close {
          position: absolute; top: 24px; right: 24px;
          background: none; border: none; cursor: pointer; color: var(--navy);
        }

        /* ── Hero ── */
        .hero {
          min-height: 100vh; display: flex; align-items: center;
          padding: 120px 0 80px; position: relative; overflow: hidden;
        }
        .hero-bg {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background:
            radial-gradient(ellipse 800px 600px at 110% 50%, rgba(255,170,0,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 600px 600px at -10% 50%, rgba(0,0,139,0.05) 0%, transparent 60%);
        }
        .hero-dots {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image: radial-gradient(rgba(0,0,139,0.06) 1px, transparent 1px);
          background-size: 32px 32px;
          mask-image: radial-gradient(ellipse at center, black 20%, transparent 70%);
        }
        .hero-inner {
          max-width: 1320px; margin: 0 auto; padding: 0 40px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
          align-items: center; position: relative; z-index: 1;
        }
        .eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 14px; border-radius: 100px;
          background: var(--gold-light);
          border: 1px solid rgba(255,170,0,0.3);
          font-size: 12px; font-weight: 500; letter-spacing: 0.8px;
          color: #b87800; text-transform: uppercase;
          margin-bottom: 28px;
        }
        .hero-h1 {
          font-family: 'Inter', sans-serif;
          font-size: clamp(44px, 5.5vw, 72px);
          font-weight: 700; line-height: 1.05;
          letter-spacing: -2px; color: var(--ink);
          margin-bottom: 24px;
        }
        .hero-h1 .accent { color: var(--navy); }
        .hero-h1 .underline-word {
          position: relative; display: inline-block;
          background: linear-gradient(135deg, var(--navy) 0%, #4444ee 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .hero-h1 .underline-word::after {
          content: '';
          position: absolute; bottom: -4px; left: 0;
          width: 100%; height: 3px;
          background: var(--gold);
          border-radius: 2px;
          animation: growLine 1s 0.5s ease forwards;
          transform-origin: left;
          transform: scaleX(0);
        }
        @keyframes growLine { to { transform: scaleX(1); } }
        .hero-desc {
          font-size: 18px; line-height: 1.7; color: var(--slate);
          max-width: 480px; margin-bottom: 40px;
          font-weight: 300;
        }
        .hero-ctas { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; margin-bottom: 56px; }
        .btn-primary {
          font-family: 'Inter', sans-serif; font-weight: 700; font-size: 15px;
          padding: 14px 32px; border-radius: 100px;
          background: var(--navy); color: white; text-decoration: none;
          display: inline-flex; align-items: center; gap: 8px;
          transition: all 0.25s; border: 2px solid var(--navy);
        }
        .btn-primary:hover {
          background: var(--gold); border-color: var(--gold); color: var(--navy);
          transform: translateY(-2px); box-shadow: 0 12px 32px rgba(255,170,0,0.3);
        }
        .btn-ghost {
          font-family: 'Inter', sans-serif; font-weight: 700; font-size: 15px;
          padding: 14px 32px; border-radius: 100px;
          background: transparent; color: var(--navy);
          text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
          border: 2px solid var(--border);
          transition: all 0.25s;
        }
        .btn-ghost:hover { border-color: var(--navy); background: var(--mist); }
        .hero-trust {
          display: flex; align-items: center; gap: 16px;
        }
        .avatars { display: flex; }
        .avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, var(--navy), #4444dd);
          border: 2.5px solid white;
          display: flex; align-items: center; justify-content: center;
          color: white; font-size: 12px; font-weight: 700;
          margin-right: -8px;
        }
        .trust-text { font-size: 13px; color: var(--slate); margin-left: 12px; }
        .trust-text strong { color: var(--navy); }

        /* Hero visual */
        .hero-visual { position: relative; }
        .video-ring {
          position: absolute; inset: -24px;
          border: 1.5px dashed rgba(255,170,0,0.25); border-radius: 28px;
          animation: spin 25s linear infinite;
        }
        .video-ring-inner {
          position: absolute; inset: -12px;
          border: 1px solid rgba(0,0,139,0.08); border-radius: 24px;
          animation: spin 18s linear infinite reverse;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .video-frame {
          border-radius: 24px; overflow: hidden;
          box-shadow: 0 40px 80px rgba(0,0,139,0.18), 0 0 0 1px rgba(255,255,255,0.6);
          position: relative;
          animation: floatY 6s ease-in-out infinite;
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .video-frame video { width: 100%; display: block; }
        .video-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,139,0.12) 0%, transparent 40%);
        }
        .stat-chip {
          position: absolute;
          background: white;
          border-radius: 14px;
          padding: 12px 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          display: flex; align-items: center; gap: 10px;
          border: 1px solid var(--border);
        }
        .stat-chip.bottom-left {
          bottom: -20px; left: -24px;
          animation: floatY 5s ease-in-out infinite 1s;
        }
        .stat-chip.top-right {
          top: -16px; right: -20px;
          animation: floatY 7s ease-in-out infinite 0.5s;
        }
        .chip-icon {
          width: 36px; height: 36px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
        }
        .chip-label { font-size: 11px; color: var(--slate); }
        .chip-value { font-family: 'Inter', sans-serif; font-weight: 700; font-size: 16px; color: var(--navy); }
        .live-dot { width: 7px; height: 7px; border-radius: 50%; background: #10b981; }
        .live-dot::before {
          content: ''; position: absolute;
          width: 7px; height: 7px; border-radius: 50%;
          background: #10b981; opacity: 0.4;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(2.5); opacity:0} }

        /* ── Section commons ── */
        section { padding: 60px 0; }
        .container { max-width: 1320px; margin: 0 auto; padding: 0 40px; }
        .section-tag {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; color: var(--gold);
          margin-bottom: 16px;
        }
        .section-tag::before {
          content: ''; width: 20px; height: 1.5px; background: var(--gold);
        }
        .section-h2 {
          font-family: 'Inter', sans-serif;
          font-size: clamp(32px, 3.5vw, 52px);
          font-weight: 700; line-height: 1.1;
          letter-spacing: -1.5px; color: var(--ink);
        }
        .section-sub { font-size: 17px; color: var(--slate); line-height: 1.7; font-weight: 300; }

        /* ── About ── */
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 56px; }
        .vm-card {
          padding: 48px; border-radius: var(--radius);
          border: 1px solid var(--border);
          background: white;
          position: relative; overflow: hidden;
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .vm-card:hover { box-shadow: 0 20px 60px rgba(0,0,139,0.1); transform: translateY(-4px); }
        .vm-card::before {
          content: ''; position: absolute;
          top: 0; left: 0; right: 0; height: 3px;
        }
        .vm-card.vision::before { background: var(--navy); }
        .vm-card.mission::before { background: var(--gold); }
        .vm-card-bg {
          position: absolute; top: -40px; right: -40px;
          width: 180px; height: 180px; border-radius: 50%;
          opacity: 0.04; pointer-events: none;
        }
        .vm-card.vision .vm-card-bg { background: var(--navy); }
        .vm-card.mission .vm-card-bg { background: var(--gold); }
        .vm-icon {
          width: 56px; height: 56px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 28px;
        }
        .vm-card.vision .vm-icon { background: rgba(0,0,139,0.08); }
        .vm-card.vision .vm-icon svg { color: var(--navy); }
        .vm-card.mission .vm-icon { background: rgba(255,170,0,0.12); }
        .vm-card.mission .vm-icon svg { color: var(--gold); }
        .vm-tag {
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; margin-bottom: 12px;
        }
        .vm-card.vision .vm-tag { color: var(--navy); }
        .vm-card.mission .vm-tag { color: #b87800; }
        .vm-title {
          font-family: 'Inter', sans-serif; font-weight: 700; font-size: 26px;
          letter-spacing: -0.5px; color: var(--ink); margin-bottom: 16px; line-height: 1.2;
        }
        .vm-body { font-size: 16px; line-height: 1.75; color: var(--slate); font-weight: 300; }

        /* ── Timeline ── */
        .timeline-section { background: var(--mist); }
        .timeline-wrap { position: relative; max-width: 780px; margin: 64px auto 0; }
        .tl-line {
          position: absolute; left: 28px; top: 0; bottom: 0;
          width: 1px; background: linear-gradient(to bottom, var(--gold), var(--navy), var(--gold));
          opacity: 0.2;
        }
        .tl-item { display: flex; gap: 40px; margin-bottom: 48px; position: relative; }
        .tl-dot-wrap { position: relative; flex-shrink: 0; }
        .tl-dot {
          width: 16px; height: 16px; border-radius: 50%; margin-top: 4px;
          background: white; border: 2px solid var(--gold);
          box-shadow: 0 0 0 4px rgba(255,170,0,0.15);
          position: relative; z-index: 1;
        }
        .tl-card {
          flex: 1; background: white;
          padding: 28px 32px; border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .tl-card:hover { box-shadow: 0 10px 40px rgba(0,0,139,0.1); transform: translateX(4px); }
        .tl-date {
          font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
          color: var(--gold); margin-bottom: 8px; display: flex; align-items: center; gap: 6px;
        }
        .tl-title {
          font-family: 'Inter', sans-serif; font-weight: 700; font-size: 18px;
          color: var(--ink); margin-bottom: 8px; letter-spacing: -0.3px;
        }
        .tl-desc { font-size: 14px; color: var(--slate); line-height: 1.6; font-weight: 300; }

        /* ── Services ── */
        .services-layout { display: grid; grid-template-columns: 380px 1fr; gap: 48px; margin-top: 56px; align-items: start; }
        .service-tabs { display: flex; flex-direction: column; gap: 4px; }
        .service-tab {
          padding: 20px 24px; border-radius: var(--radius-sm);
          cursor: pointer; transition: all 0.25s;
          border: 1px solid transparent;
          display: flex; align-items: center; gap: 16px;
        }
        .service-tab:hover { background: var(--mist); }
        .service-tab.active { background: white; border-color: var(--border); box-shadow: 0 4px 20px rgba(0,0,139,0.08); }
        .tab-icon {
          width: 44px; height: 44px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          transition: all 0.25s;
        }
        .service-tab.active .tab-icon { background: var(--navy); }
        .service-tab.active .tab-icon svg { color: white; }
        .service-tab:not(.active) .tab-icon { background: var(--mist); }
        .service-tab:not(.active) .tab-icon svg { color: var(--slate); }
        .tab-label { font-family: 'Inter', sans-serif; font-weight: 700; font-size: 15px; color: var(--ink); }
        .tab-tag { font-size: 12px; color: var(--slate); margin-top: 2px; }
        .tab-arrow {
          margin-left: auto; color: var(--slate); opacity: 0;
          transition: opacity 0.2s, transform 0.2s;
        }
        .service-tab.active .tab-arrow { opacity: 1; color: var(--navy); transform: translateX(3px); }
        .service-panel {
          background: white; border-radius: var(--radius);
          border: 1px solid var(--border);
          padding: 48px; position: sticky; top: 100px;
          min-height: 360px;
          box-shadow: 0 20px 60px rgba(0,0,139,0.07);
        }
        .panel-tag {
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--gold); margin-bottom: 20px;
          display: flex; align-items: center; gap: 6px;
        }
        .panel-tag::before { content: ''; width: 16px; height: 1.5px; background: var(--gold); }
        .panel-icon {
          width: 64px; height: 64px; border-radius: 16px;
          background: rgba(0,0,139,0.06);
          display: flex; align-items: center; justify-content: center; margin-bottom: 28px;
        }
        .panel-title {
          font-family: 'Inter', sans-serif; font-weight: 700; font-size: 32px;
          letter-spacing: -1px; color: var(--ink); margin-bottom: 16px; line-height: 1.15;
        }
        .panel-desc { font-size: 17px; color: var(--slate); line-height: 1.75; font-weight: 300; margin-bottom: 32px; }
        .panel-cta {
          font-family: 'Inter', sans-serif; font-weight: 700; font-size: 14px;
          color: var(--navy); text-decoration: none;
          display: inline-flex; align-items: center; gap: 6px;
          padding: 10px 20px; border-radius: 100px; border: 2px solid var(--navy);
          transition: all 0.25s;
        }
        .panel-cta:hover { background: var(--navy); color: white; }

        /* ── Stats ── */
        .stats-section {
          background: var(--navy);
          position: relative; overflow: hidden;
          padding: 60px 0;
        }
        .stats-section::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .stats-section::after {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(to right, transparent, rgba(255,170,0,0.4), transparent);
        }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; position: relative; z-index: 1; }
        .stat-item {
          padding: 40px; text-align: center;
          position: relative;
        }
        .stat-item + .stat-item::before {
          content: ''; position: absolute; left: 0; top: 20%; bottom: 20%;
          width: 1px; background: rgba(255,255,255,0.1);
        }
        .stat-icon { color: var(--gold); margin-bottom: 16px; display: block; }
        .stat-num {
          font-family: 'Inter', sans-serif; font-weight: 700;
          font-size: clamp(40px, 4vw, 60px); letter-spacing: -2px;
          color: white; display: block; line-height: 1; margin-bottom: 8px;
        }
        .stat-label { font-size: 13px; letter-spacing: 1px; text-transform: uppercase; color: rgba(255,255,255,0.5); font-weight: 500; }

        /* ── Newsletter ── */
        .newsletter-section { background: var(--mist); padding: 60px 0; }
        .newsletter-box {
          background: white; border-radius: 28px;
          border: 1px solid var(--border);
          padding: 80px; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;
          box-shadow: 0 20px 60px rgba(0,0,139,0.06);
        }
        .nl-tag {
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; color: var(--gold); margin-bottom: 16px;
          display: flex; align-items: center; gap: 6px;
        }
        .nl-tag::before { content: ''; width: 16px; height: 1.5px; background: var(--gold); }
        .nl-title {
          font-family: 'Inter', sans-serif; font-weight: 700;
          font-size: 40px; letter-spacing: -1.5px; color: var(--ink); line-height: 1.1; margin-bottom: 12px;
        }
        .nl-sub { font-size: 16px; color: var(--slate); font-weight: 300; line-height: 1.6; }
        .nl-form { display: flex; flex-direction: column; gap: 12px; }
        .nl-input {
          padding: 16px 24px; border-radius: 100px;
          border: 1.5px solid var(--border); background: var(--mist);
          font-family: 'Inter', sans-serif; font-size: 15px; color: var(--ink);
          outline: none; transition: all 0.25s; width: 100%;
        }
        .nl-input:focus { border-color: var(--navy); background: white; box-shadow: 0 0 0 4px rgba(0,0,139,0.06); }
        .nl-input::placeholder { color: #aab; }

        /* ── Contact ── */
        .contact-grid { display: grid; grid-template-columns: 2fr 3fr; gap: 32px; margin-top: 56px; }
        .contact-info-card {
          background: var(--navy); border-radius: var(--radius);
          padding: 48px; color: white; position: relative; overflow: hidden;
        }
        .contact-info-card::before {
          content: ''; position: absolute; top: -80px; right: -80px;
          width: 240px; height: 240px; border-radius: 50%;
          background: rgba(255,170,0,0.12); pointer-events: none;
        }
        .contact-info-card::after {
          content: ''; position: absolute; bottom: -60px; left: -40px;
          width: 180px; height: 180px; border-radius: 50%;
          background: rgba(255,255,255,0.04); pointer-events: none;
        }
        .ci-title {
          font-family: 'Inter', sans-serif; font-weight: 700; font-size: 24px;
          color: white; margin-bottom: 8px; letter-spacing: -0.5px;
        }
        .ci-sub { font-size: 15px; color: rgba(255,255,255,0.6); font-weight: 300; margin-bottom: 40px; }
        .ci-row { display: flex; gap: 16px; align-items: flex-start; margin-bottom: 28px; }
        .ci-icon-wrap {
          width: 44px; height: 44px; border-radius: 10px;
          background: rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          transition: background 0.2s;
        }
        .ci-row:hover .ci-icon-wrap { background: var(--gold); }
        .ci-row:hover .ci-icon-wrap svg { color: var(--navy); }
        .ci-icon-wrap svg { color: var(--gold); transition: color 0.2s; }
        .ci-label { font-size: 11px; letter-spacing: 0.8px; text-transform: uppercase; color: rgba(255,255,255,0.45); margin-bottom: 4px; }
        .ci-val { font-size: 15px; color: white; font-weight: 500; }
        .contact-form-card { background: white; border-radius: var(--radius); padding: 48px; border: 1px solid var(--border); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        .form-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
        .form-label { font-size: 13px; font-weight: 600; color: var(--navy); letter-spacing: 0.3px; }
        .form-input, .form-textarea {
          padding: 14px 18px; border-radius: 12px;
          border: 1.5px solid var(--border); background: var(--mist);
          font-family: 'Inter', sans-serif; font-size: 15px; color: var(--ink);
          outline: none; transition: all 0.25s; width: 100%;
          resize: none;
        }
        .form-input:focus, .form-textarea:focus {
          border-color: var(--navy); background: white;
          box-shadow: 0 0 0 4px rgba(0,0,139,0.06);
        }
        .form-input::placeholder, .form-textarea::placeholder { color: #b0b8c8; }
        .btn-submit {
          width: 100%; padding: 16px; border-radius: 100px;
          background: var(--navy); color: white; border: none;
          font-family: 'Inter', sans-serif; font-weight: 700; font-size: 15px;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: all 0.25s;
        }
        .btn-submit:hover:not(:disabled) {
          background: var(--gold); color: var(--navy);
          box-shadow: 0 8px 24px rgba(255,170,0,0.3);
          transform: translateY(-1px);
        }
        .btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .success-banner {
          background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.25);
          border-radius: 12px; padding: 16px 20px;
          display: flex; align-items: center; gap: 12px;
          color: #059669; font-weight: 500; font-size: 14px; margin-bottom: 24px;
        }
        .spinner {
          width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        /* ── Footer ── */
        .footer {
          background: var(--ink); color: white;
          padding: 60px 0 32px;
        }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 64px; }
        .footer-brand-desc { font-size: 14px; color: rgba(255,255,255,0.45); line-height: 1.7; font-weight: 300; margin-top: 16px; margin-bottom: 24px; }
        .social-row { display: flex; gap: 8px; }
        .social-btn {
          width: 36px; height: 36px; border-radius: 9px;
          background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.5); text-decoration: none;
          transition: all 0.2s; font-size: 12px; font-weight: 700;
        }
        .social-btn:hover { background: var(--gold); color: var(--navy); border-color: var(--gold); }
        .footer-col-title {
          font-family: 'Inter', sans-serif; font-weight: 700; font-size: 13px;
          letter-spacing: 1px; text-transform: uppercase; color: rgba(255,255,255,0.4);
          margin-bottom: 20px;
        }
        .footer-link {
          display: block; font-size: 14px; color: rgba(255,255,255,0.6);
          text-decoration: none; margin-bottom: 12px;
          transition: color 0.2s;
        }
        .footer-link:hover { color: var(--gold); }
        .footer-contact-row {
          display: flex; gap: 10px; align-items: flex-start; margin-bottom: 14px;
          font-size: 13px; color: rgba(255,255,255,0.55);
        }
        .footer-contact-row svg { color: var(--gold); flex-shrink: 0; margin-top: 1px; }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.07);
          padding-top: 28px;
          display: flex; justify-content: space-between; align-items: center;
          font-size: 13px; color: rgba(255,255,255,0.35);
        }
        .footer-bottom span { display: flex; align-items: center; gap: 4px; }
        .heart { color: #e55; }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .services-layout { grid-template-columns: 1fr; }
          .service-panel { position: static; }
          .service-tabs { flex-direction: row; overflow-x: auto; gap: 8px; padding-bottom: 8px; }
          .service-tab { min-width: 180px; }
          .tab-arrow { display: none; }
          .newsletter-box { grid-template-columns: 1fr; padding: 48px; gap: 32px; }
          .contact-grid { grid-template-columns: 1fr; }
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 768px) {
          .header-inner { padding: 0 20px; }
          nav { display: none; }
          .btn-talk { display: none; }
          .hamburger { display: block; }
          .hero { padding: 100px 0 60px; }
          .hero-inner { grid-template-columns: 1fr; gap: 48px; text-align: center; }
          .hero-ctas { justify-content: center; }
          .hero-trust { justify-content: center; }
          .hero-visual { order: -1; }
          .stat-chip.bottom-left { bottom: -10px; left: -8px; }
          .stat-chip.top-right { top: -8px; right: -8px; }
          .about-grid { grid-template-columns: 1fr; }
          .vm-card { padding: 32px 24px; }
          .stats-grid { grid-template-columns: 1fr 1fr; }
          .stat-item + .stat-item::before { display: none; }
          .form-row { grid-template-columns: 1fr; }
          .contact-info-card, .contact-form-card { padding: 32px 24px; }
          .tl-item { gap: 20px; }
          .tl-card { padding: 24px 20px; }
          .tl-line { left: 8px; }
          .container { padding: 0 20px; }
          .footer-grid { grid-template-columns: 1fr; }
          .footer-bottom { flex-direction: column; gap: 8px; text-align: center; }
          .newsletter-box { padding: 32px 24px; }
          .service-panel { padding: 32px 20px; min-height: auto; }
          .panel-title { font-size: 24px; word-wrap: break-word; word-break: break-word; hyphens: auto; }
          .panel-desc { font-size: 15px; }
          .service-tab { padding: 16px 16px; min-width: 200px; flex-shrink: 0; }
          .services-layout { width: 100%; max-width: 100vw; overflow: hidden; }
          .service-tabs { margin-right: -20px; padding-right: 20px; }
        }
      `}</style>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="mobile-nav open" style={{ fontFamily: 'Inter, sans-serif' }}>
          <button className="mobile-close" onClick={() => setIsMenuOpen(false)}>
            <X size={28} />
          </button>
          {['Home', 'About', 'Services', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              {item}
            </a>
          ))}
        </div>
      )}

      {/* Header */}
      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <div className="header-inner">
          <a href="#home" className="logo-wrap">
            <Image src="/logo-without-bg.png" alt="Chaalanikrafts" width={40} height={40} priority />
            <span className="logo-text">Chaalanikrafts</span>
          </a>
          <nav>
            {['Home', 'About', 'Services', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
            ))}
          </nav>
          <a href="#contact" className="btn-talk">
            Let's Talk <ChevronRight size={16} />
          </a>
          <button className="hamburger" onClick={() => setIsMenuOpen(true)}>
            <Menu size={26} />
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section id="home" className="hero">
        <div className="hero-bg" />
        <div className="hero-dots" />
        <div className="hero-inner container">
          <div>
            <div className="eyebrow">
              <Sparkles size={13} />
              Actioning Aspirations Together
            </div>
            <h1 className="hero-h1">
              Cutting-Edge<br />
              <span className="underline-word">IT Solutions</span><br />
              <span style={{ color: '#7888a0', fontWeight: 700 }}>for a Digital World</span>
            </h1>
            <p className="hero-desc">
              Our innovative approach ensures seamless integration and growth through technology — empowering businesses to thrive at scale.
            </p>
            <div className="hero-ctas">
              <a href="#services" className="btn-primary">
                Explore Services <ArrowRight size={17} />
              </a>
              <a href="#about" className="btn-ghost">
                Our Story
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="video-ring" />
            <div className="video-ring-inner" />
            <div className="video-frame">
              <video
                ref={videoRef}
                src="/hero-video.mp4"
                autoPlay muted playsInline
                onTimeUpdate={handleVideoTimeUpdate}
              />
              <div className="video-overlay" />
            </div>
            {/* <div className="stat-chip bottom-left">
              <div className="chip-icon" style={{ background: 'rgba(255,170,0,0.12)' }}>
                <Star size={18} style={{ color: '#ffaa00' }} />
              </div>
              <div>
                <div className="chip-value">98%</div>
                <div className="chip-label">Client Satisfaction</div>
              </div>
            </div>
            <div className="stat-chip top-right">
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div className="live-dot" style={{ position: 'relative' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#10b981' }}>Active</span>
              </div>
              <div>
                <div className="chip-value" style={{ fontSize: '13px' }}>150+ Projects</div>
                <div className="chip-label">Live & Running</div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about">
        <div className="container">
          <div className="section-tag">Who We Are</div>
          <h2 className="section-h2" style={{ maxWidth: 520 }}>Built with vision,<br />driven by mission</h2>
          <div className="about-grid">
            <div className="vm-card vision">
              <div className="vm-card-bg" />
              <div className="vm-icon"><Eye size={26} /></div>
              <div className="vm-tag">Our Vision</div>
              <h3 className="vm-title">Leading Digital Excellence Globally</h3>
              <p className="vm-body">To be the global leader in innovative IT solutions, transforming businesses through cutting-edge technology and setting new standards in digital excellence. We envision a world where technology seamlessly empowers every organization.</p>
            </div>
            <div className="vm-card mission">
              <div className="vm-card-bg" />
              <div className="vm-icon"><Rocket size={26} /></div>
              <div className="vm-tag">Our Mission</div>
              <h3 className="vm-title">Driving Growth & Innovation</h3>
              <p className="vm-body">To deliver exceptional IT solutions that drive measurable results. We're committed to providing clients with reliable, scalable, and secure technology while maintaining the highest standards of quality and service excellence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="timeline-section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
            <div className="section-tag">Our History</div>
            <h2 className="section-h2">A journey of bold<br />decisions</h2>
            <p className="section-sub" style={{ marginTop: 16 }}>From a startup at SSIT to a forward-thinking Edu-Tech & Agri-Tech innovator.</p>
          </div>
          <div className="timeline-wrap">
            <div className="tl-line" />
            {timeline.map((item, i) => (
              <div key={i} className="tl-item">
                <div className="tl-dot-wrap">
                  <div className="tl-dot" />
                </div>
                <div className="tl-card">
                  <div className="tl-date">
                    <item.icon size={14} style={{ color: '#ffaa00' }} />
                    {item.date}
                  </div>
                  <div className="tl-title">{item.title}</div>
                  <div className="tl-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services">
        <div className="container">
          <div className="section-tag">What We Do</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
            <h2 className="section-h2">Services that<br />move businesses</h2>
            <p className="section-sub" style={{ maxWidth: 360 }}>Comprehensive IT solutions designed to accelerate your growth and streamline operations.</p>
          </div>
          <div className="services-layout">
            <div className="service-tabs">
              {services.map((s, i) => (
                <div key={i} className={`service-tab${activeService === i ? ' active' : ''}`} onClick={() => setActiveService(i)}>
                  <div className="tab-icon">
                    <s.icon size={20} />
                  </div>
                  <div>
                    <div className="tab-label">{s.title}</div>
                    <div className="tab-tag">{s.tag}</div>
                  </div>
                  <ChevronRight size={16} className="tab-arrow" />
                </div>
              ))}
            </div>
            <div className="service-panel">
              <div className="panel-tag">{services[activeService].tag}</div>
              <div className="panel-icon">
                {(() => {
                  const Icon = services[activeService].icon;
                  return <Icon size={32} style={{ color: 'var(--navy)' }} />;
                })()}
              </div>
              <h3 className="panel-title">{services[activeService].title}</h3>
              <p className="panel-desc">{services[activeService].description}</p>
              <a href="#contact" className="panel-cta">
                Start a Project <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      {/* <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div key={i} className="stat-item">
                <stat.icon size={28} className="stat-icon" />
                <span className="stat-num">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── NEWSLETTER ── */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-box">
            <div>
              <div className="nl-tag">Newsletter</div>
              <h2 className="nl-title">Stay ahead<br />of the curve</h2>
              <p className="nl-sub">Get tech insights and company updates delivered straight to your inbox — no noise, just signal.</p>
            </div>
            <form className="nl-form" onSubmit={handleNewsletterSubmit}>
              <input type="email" className="nl-input" placeholder="Your email address" required />
              <button type="submit" className="btn-submit" style={{ marginTop: 4 }}>
                <Send size={16} /> Subscribe for Updates
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact">
        <div className="container">
          <div className="section-tag">Get In Touch</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
            <h2 className="section-h2">Ready to transform<br />your business?</h2>
            <p className="section-sub" style={{ maxWidth: 360 }}>Tell us about your project and our team will respond within 24 hours.</p>
          </div>
          <div className="contact-grid">
            <div className="contact-info-card">
              <h3 className="ci-title">Contact Information</h3>
              <p className="ci-sub">We'd love to hear from you. Drop us a message or reach out directly.</p>
              {[
                { icon: Phone, label: "Phone", value: "+91 97310 67126" },
                { icon: Mail, label: "Email", value: "info@chaalanikrafts.in" },
                { icon: MapPin, label: "Location", value: "SSAHE INNOVATION AND INCUBATION COUNCIL, Scolar building, SSIT Campus, Tumkuru" }
              ].map((item, i) => (
                <div key={i} className="ci-row">
                  <div className="ci-icon-wrap"><item.icon size={18} /></div>
                  <div>
                    <div className="ci-label">{item.label}</div>
                    <div className="ci-val">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="contact-form-card">
              {submitSuccess && (
                <div className="success-banner">
                  <Sparkles size={18} style={{ color: '#059669' }} />
                  Your message was sent! We'll get back to you within 24 hours.
                </div>
              )}
              <form onSubmit={handleContactSubmit}>
                <div className="form-row">
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" className="form-input" placeholder="John" required />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" className="form-input" placeholder="Doe" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" className="form-input" placeholder="john@example.com" required />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" className="form-input" placeholder="+91 97310 67126" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={5} className="form-textarea" placeholder="Tell us about your project..." required />
                </div>
                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <><div className="spinner" /> Sending...</>
                  ) : (
                    <><Send size={16} /> Send Message</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Image src="/logo-without-bg.png" alt="Chaalanikrafts" width={50} height={50} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 18, color: 'white' }}>
                  Chaalanikrafts
                </span>
              </div>
              <p className="footer-brand-desc">
                Cutting-edge IT, Edu-Tech and Agri-Tech solutions that empower businesses to thrive in a rapidly digitizing world.
              </p>
             
            </div>
            <div>
              <div className="footer-col-title">Navigation</div>
              {['Home', 'About Us', 'Services', 'Contact'].map((l) => (
                <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`} className="footer-link">{l}</a>
              ))}
            </div>
            <div>
              <div className="footer-col-title">Legal</div>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((l) => (
                <a key={l} href="#" className="footer-link">{l}</a>
              ))}
            </div>
            <div>
              <div className="footer-col-title">Reach Us</div>
              <div className="footer-contact-row"><Phone size={14} /><span>+91 97310 67126</span></div>
              <div className="footer-contact-row"><Mail size={14} /><span>info@chaalanikrafts.in</span></div>
              <div className="footer-contact-row"><MapPin size={14} /><span>SSAHE INNOVATION AND INCUBATION COUNCIL, Scolar building, SSIT Campus, Tumkuru</span></div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Chaalanikraftsinfo LLP. All rights reserved.</span>
            <span>Made with <span className="heart">♥</span> in India</span>
          </div>
        </div>
      </footer>
    </>
  );
}
