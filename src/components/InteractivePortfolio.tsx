"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface Dictionary {
  nav: {
    home: string;
    about: string;
    projects: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    docs: string;
  };
  about: {
    title: string;
    description: string;
  };
  projects: {
    title: string;
    view_more: string;
  };
  contact: {
    title: string;
    name: string;
    email: string;
    message: string;
    send: string;
  };
}

interface InteractivePortfolioProps {
  dict: Dictionary;
  lang: string;
}

export default function InteractivePortfolio({ dict, lang }: InteractivePortfolioProps) {
  const router = useRouter();
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [activeNav, setActiveNav] = useState("home");

  // Handle language switch
  const switchLanguage = (newLang: string) => {
    const segments = pathname.split("/");
    segments[1] = newLang;
    router.push(segments.join("/"));
  };

  // GSAP animations on load
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2 }
    );
    tl.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 0.8, duration: 0.8 },
      "-=0.6"
    );
    tl.fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.6"
    );

    // Animating grid items and section cards
    gsap.from(".anim-card", {
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".anim-card",
        start: "top 85%",
      },
    });
  }, { scope: mainRef });

  // Interactive Particle Canvas (Sci-fi grid animation matching design colors)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particles setup (Electric Yellow `#FFFA00` and Bright Blue `#007AFF`)
    const particlesCount = 35;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      color: string;
      glowColor: string;
    }> = [];

    for (let i = 0; i < particlesCount; i++) {
      const isYellow = Math.random() > 0.6;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 1,
        alpha: Math.random() * 0.4 + 0.1,
        color: isYellow ? "255, 250, 0" : "0, 122, 255", // Yellow or Blue
        glowColor: isYellow ? "rgba(255, 250, 0, 0.4)" : "rgba(0, 122, 255, 0.4)",
      });
    }

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint cyber grid lines (10% opacity)
      ctx.strokeStyle = "rgba(255, 250, 0, 0.015)";
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw and update particles
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.shadowBlur = 3;
        ctx.shadowColor = p.glowColor;
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Connect particles with lines if close
        for (let j = idx + 1; j < particlesCount; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 180) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            // Mix connection colors
            ctx.strokeStyle = `rgba(120, 120, 120, ${0.1 * (1 - dist / 180)})`;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setFormState({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden font-sans" ref={mainRef}>
      {/* Background Interactive Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Navigation Header - height: 64px, background: #000000 */}
      <header className="sticky top-0 z-50 w-full h-[64px] border-b border-surface-secondary bg-surface-dark/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent-yellow flex items-center justify-center font-bold text-black text-sm tracking-wider font-display-demi">
              EF
            </div>
            <span className="font-display-demi text-lg tracking-widest text-white">
              ENDFIELD<span className="text-accent-yellow font-light">.PORT</span>
            </span>
          </div>

          {/* Nav menu links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-display-demi tracking-wider">
            <a
              href="#home"
              onClick={() => setActiveNav("home")}
              className={`py-2 px-4 transition-colors hover:text-accent-yellow hover:underline ${
                activeNav === "home" ? "text-accent-yellow border-b-2 border-accent-yellow" : "text-white"
              }`}
            >
              {dict.nav.home.toUpperCase()}
            </a>
            <a
              href="#about"
              onClick={() => setActiveNav("about")}
              className={`py-2 px-4 transition-colors hover:text-accent-yellow hover:underline ${
                activeNav === "about" ? "text-accent-yellow border-b-2 border-accent-yellow" : "text-white"
              }`}
            >
              {dict.nav.about.toUpperCase()}
            </a>
            <a
              href="#projects"
              onClick={() => setActiveNav("projects")}
              className={`py-2 px-4 transition-colors hover:text-accent-yellow hover:underline ${
                activeNav === "projects" ? "text-accent-yellow border-b-2 border-accent-yellow" : "text-white"
              }`}
            >
              {dict.nav.projects.toUpperCase()}
            </a>
            <a
              href="#contact"
              onClick={() => setActiveNav("contact")}
              className={`py-2 px-4 transition-colors hover:text-accent-yellow hover:underline ${
                activeNav === "contact" ? "text-accent-yellow border-b-2 border-accent-yellow" : "text-white"
              }`}
            >
              {dict.nav.contact.toUpperCase()}
            </a>
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider font-display-demi">
            <button
              onClick={() => switchLanguage("id-id")}
              className={`px-3 py-1.5 border min-w-[44px] min-h-[44px] flex items-center justify-center ${
                lang === "id-id"
                  ? "bg-accent-yellow border-accent-yellow text-black"
                  : "border-gray-1 text-gray-2 hover:border-gray-4"
              } transition-all cursor-pointer`}
            >
              ID
            </button>
            <button
              onClick={() => switchLanguage("en-us")}
              className={`px-3 py-1.5 border min-w-[44px] min-h-[44px] flex items-center justify-center ${
                lang === "en-us"
                  ? "bg-accent-yellow border-accent-yellow text-black"
                  : "border-gray-1 text-gray-2 hover:border-gray-4"
              } transition-all cursor-pointer`}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      {/* Main Sections */}
      <main className="flex-1 flex flex-col items-center justify-start z-10">
        
        {/* HERO SECTION */}
        <section
          id="home"
          className="relative min-h-[calc(100vh-64px)] w-full max-w-7xl mx-auto px-8 flex flex-col items-center justify-center py-16"
        >
          {/* Tactical Crosshair Graphics (Level 0 Shadow, Tactical design) */}
          <div className="absolute top-16 left-12 w-24 h-24 border border-gray-1/20 pointer-events-none hidden lg:block">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent-yellow" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-accent-yellow" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-accent-yellow" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent-yellow" />
          </div>

          <div className="text-center max-w-4xl relative">
            {/* Tech tag / Badge style */}
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="ef-badge uppercase font-display-demi tracking-wider">
                TACTICAL UNIT
              </span>
              <span className="ef-badge-secondary uppercase font-display-demi tracking-wider">
                CORE SYSTEM v1.0
              </span>
            </div>

            <h1
              ref={titleRef}
              className="text-display-hero text-white leading-none uppercase mb-6"
            >
              {dict.hero.title}
            </h1>
            <p
              ref={subtitleRef}
              className="text-base md:text-lg text-gray-4 max-w-2xl mx-auto font-light leading-relaxed mb-12"
            >
              {dict.hero.subtitle}
            </p>

            {/* Tactical progress indicator */}
            <div className="max-w-xs mx-auto mb-10">
              <div className="flex justify-between text-2xs font-mono text-gray-1 mb-1.5 uppercase tracking-widest">
                <span>SYSTEM STATUS: READY</span>
                <span>100%</span>
              </div>
              <div className="ef-progress-bar">
                <div className="ef-progress-bar-fill" style={{ width: "100%" }} />
              </div>
            </div>

            <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#projects"
                className="w-full sm:w-auto ef-btn-primary min-h-[44px] min-w-[200px]"
              >
                {dict.hero.cta.toUpperCase()}
              </a>
              <a
                href="#about"
                className="w-full sm:w-auto ef-btn-ghost border border-gray-2 min-h-[44px] min-w-[200px]"
              >
                {dict.hero.docs.toUpperCase()}
              </a>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="w-full py-24 bg-surface-dark border-t border-surface-secondary">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-5 relative">
                <span className="text-xs font-mono tracking-widest text-accent-yellow uppercase block mb-2">
                  // 01. INTRO
                </span>
                <h2 className="text-h1 uppercase text-white tracking-wider mb-6">
                  {dict.about.title}
                </h2>
                <div className="w-16 h-[2px] bg-accent-yellow mb-8" />
              </div>
              <div className="lg:col-span-7 anim-card">
                {/* Default Card style - Level 2 shadow */}
                <div className="ef-card tactical-border-corners">
                  <p className="text-base text-white font-light leading-relaxed mb-6">
                    {dict.about.description}
                  </p>
                  <p className="text-gray-4 leading-relaxed text-sm">
                    Mengadopsi pola dari web resmi *Arknights: Endfield*, proyek ini mendemonstrasikan
                    transisi antarmuka yang sangat responsif, optimalisasi pemuatan gambar dan video latar
                    belakang (*mobile-first*), serta pengelolaan bahasa dinamis di server maupun client.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="w-full py-24 border-t border-surface-secondary bg-surface-secondary/20">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col items-center text-center mb-16">
              <span className="text-xs font-mono tracking-widest text-accent-yellow uppercase block mb-2">
                // 02. PORTFOLIO
              </span>
              <h2 className="text-h1 uppercase text-white tracking-wider">
                {dict.projects.title}
              </h2>
              <div className="w-16 h-[2px] bg-accent-yellow mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Project Card 1 - Elevated Card style */}
              <div className="anim-card ef-card-elevated hover:border-accent-yellow transition-all duration-300 relative flex flex-col justify-between group">
                <div className="absolute top-0 right-0">
                  <span className="ef-badge font-mono text-[9px] uppercase tracking-widest">
                    ACTIVE
                  </span>
                </div>
                <div>
                  <span className="text-4xl font-extrabold text-primary-charcoal block mb-6 group-hover:text-accent-yellow/20 transition-colors font-display-demi">01</span>
                  <h3 className="text-h3 uppercase text-white tracking-wide mb-3">Arknights Clone</h3>
                  <p className="text-gray-4 font-light text-sm leading-relaxed mb-8">
                    Sebuah simulasi interface game taktis yang menggunakan HTML5 Canvas, interaksi audio, dan video background penuh.
                  </p>
                </div>
                <a href="#" className="inline-flex items-center gap-2 text-xs font-bold uppercase text-accent-yellow tracking-wider hover:underline">
                  {dict.projects.view_more} &rarr;
                </a>
              </div>

              {/* Project Card 2 - Elevated Card style */}
              <div className="anim-card ef-card-elevated hover:border-accent-yellow transition-all duration-300 relative flex flex-col justify-between group">
                <div className="absolute top-0 right-0">
                  <span className="ef-badge font-mono text-[9px] uppercase tracking-widest" style={{ backgroundColor: "#007AFF", color: "white" }}>
                    STABLE
                  </span>
                </div>
                <div>
                  <span className="text-4xl font-extrabold text-primary-charcoal block mb-6 group-hover:text-accent-yellow/20 transition-colors font-display-demi">02</span>
                  <h3 className="text-h3 uppercase text-white tracking-wide mb-3">Dynamic I18n Lib</h3>
                  <p className="text-gray-4 font-light text-sm leading-relaxed mb-8">
                    Pustaka lokalisasi yang mengompresi ukuran kamus bahasa di server sebelum dikirimkan ke client-side JavaScript bundle.
                  </p>
                </div>
                <a href="#" className="inline-flex items-center gap-2 text-xs font-bold uppercase text-accent-yellow tracking-wider hover:underline">
                  {dict.projects.view_more} &rarr;
                </a>
              </div>

              {/* Project Card 3 - Elevated Card style */}
              <div className="anim-card ef-card-elevated hover:border-accent-yellow transition-all duration-300 relative flex flex-col justify-between group">
                <div className="absolute top-0 right-0">
                  <span className="ef-badge-secondary font-mono text-[9px] uppercase tracking-widest">
                    PLANNING
                  </span>
                </div>
                <div>
                  <span className="text-4xl font-extrabold text-primary-charcoal block mb-6 group-hover:text-accent-yellow/20 transition-colors font-display-demi">03</span>
                  <h3 className="text-h3 uppercase text-white tracking-wide mb-3">Go Web Engine</h3>
                  <p className="text-gray-4 font-light text-sm leading-relaxed mb-8">
                    Framework mikro back-end menggunakan bahasa pemrograman Go yang melayani API dengan latensi super rendah di bawah 5ms.
                  </p>
                </div>
                <a href="#" className="inline-flex items-center gap-2 text-xs font-bold uppercase text-accent-yellow tracking-wider hover:underline">
                  {dict.projects.view_more} &rarr;
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="w-full py-24 border-t border-surface-secondary bg-surface-dark/40">
          <div className="max-w-4xl mx-auto px-8">
            <div className="flex flex-col items-center text-center mb-16">
              <span className="text-xs font-mono tracking-widest text-accent-yellow uppercase block mb-2">
                // 03. CONNECT
              </span>
              <h2 className="text-h1 uppercase text-white tracking-wider">
                {dict.contact.title}
              </h2>
              <div className="w-16 h-[2px] bg-accent-yellow mt-4" />
            </div>

            {/* Custom Form Styling (Ghost Card style with corners) */}
            <form
              onSubmit={handleFormSubmit}
              className="ef-card-ghost tactical-border-corners p-8 md:p-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-4 text-xs font-mono uppercase tracking-wider mb-2">
                    {dict.contact.name}
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="ef-input"
                  />
                </div>
                <div>
                  <label className="block text-gray-4 text-xs font-mono uppercase tracking-wider mb-2">
                    {dict.contact.email}
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="ef-input"
                  />
                </div>
              </div>
              <div className="mb-8">
                <label className="block text-gray-4 text-xs font-mono uppercase tracking-wider mb-2">
                  {dict.contact.message}
                </label>
                <textarea
                  rows={5}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="ef-input resize-none"
                />
              </div>

              <div className="flex items-center justify-between gap-4 flex-wrap">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ef-btn-primary min-h-[44px] min-w-[150px] disabled:opacity-50"
                >
                  {isSubmitting ? "SENDING..." : dict.contact.send.toUpperCase()}
                </button>

                {submitStatus === "success" && (
                  <span className="text-accent-blue text-sm font-mono tracking-wide">
                    ✓ Message sent successfully!
                  </span>
                )}
                {submitStatus === "error" && (
                  <span className="text-red-500 text-sm font-mono tracking-wide">
                    ✗ Failed to send message. Please try again.
                  </span>
                )}
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 border-t border-surface-secondary bg-surface-dark z-10">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-gray-1 font-mono tracking-wider text-center md:text-left">
            &copy; 2026 ENDFIELD.PORT. INSPIRED BY GRYPHLINE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 text-xs text-gray-2 font-mono uppercase tracking-widest">
            <a href="#" className="hover:text-accent-yellow">Privacy Policy</a>
            <a href="#" className="hover:text-accent-yellow">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
