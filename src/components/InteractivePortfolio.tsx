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
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Handle language switch
  const switchLanguage = (newLang: string) => {
    const segments = pathname.split("/");
    segments[1] = newLang;
    router.push(segments.join("/"));
  };

  // GSAP animations on load
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

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
  }, { scope: heroRef });

  // Interactive Particle Canvas (Sci-fi grid animation)
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

    // Particles setup
    const particlesCount = 40;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }> = [];

    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint cyber grid lines
      ctx.strokeStyle = "rgba(245, 158, 11, 0.03)"; // Very subtle orange
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
        ctx.fillStyle = `rgba(20, 184, 166, ${p.alpha})`; // Glowing Teal
        ctx.shadowBlur = 4;
        ctx.shadowColor = "rgba(20, 184, 166, 0.5)";
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Connect particles with lines if close
        for (let j = idx + 1; j < particlesCount; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(20, 184, 166, ${0.15 * (1 - dist / 150)})`;
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
    <div className="relative min-h-screen flex flex-col font-sans overflow-x-hidden" ref={heroRef}>
      {/* Background Interactive Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-500 flex items-center justify-center font-bold text-black text-sm tracking-wider">
              EF
            </div>
            <span className="font-semibold text-lg tracking-widest text-zinc-100">
              ENDFIELD<span className="text-amber-500 font-light">.PORT</span>
            </span>
          </div>

          {/* Nav menu links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wider text-zinc-400">
            <a href="#home" className="hover:text-amber-500 transition-colors">
              {dict.nav.home.toUpperCase()}
            </a>
            <a href="#about" className="hover:text-amber-500 transition-colors">
              {dict.nav.about.toUpperCase()}
            </a>
            <a href="#projects" className="hover:text-amber-500 transition-colors">
              {dict.nav.projects.toUpperCase()}
            </a>
            <a href="#contact" className="hover:text-amber-500 transition-colors">
              {dict.nav.contact.toUpperCase()}
            </a>
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider">
            <button
              onClick={() => switchLanguage("id-id")}
              className={`px-3 py-1.5 border ${
                lang === "id-id"
                  ? "bg-amber-500 border-amber-500 text-black"
                  : "border-zinc-800 text-zinc-400 hover:border-zinc-600"
              } transition-all`}
            >
              ID
            </button>
            <button
              onClick={() => switchLanguage("en-us")}
              className={`px-3 py-1.5 border ${
                lang === "en-us"
                  ? "bg-amber-500 border-amber-500 text-black"
                  : "border-zinc-800 text-zinc-400 hover:border-zinc-600"
              } transition-all`}
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
          className="relative min-h-[calc(100vh-4rem)] w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center py-20"
        >
          {/* Cyberpunk Crosshair Graphics */}
          <div className="absolute top-20 left-10 w-24 h-24 border border-zinc-800/40 pointer-events-none hidden lg:block">
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-amber-500" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-amber-500" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-amber-500" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-amber-500" />
          </div>

          <div className="text-center max-w-4xl relative">
            {/* Tech tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-mono tracking-widest uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              Gryphline Endfield Tech Stack
            </div>

            <h1
              ref={titleRef}
              className="text-4xl md:text-7xl font-extrabold tracking-tight text-white leading-none uppercase mb-6"
            >
              {dict.hero.title}
            </h1>
            <p
              ref={subtitleRef}
              className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed mb-12"
            >
              {dict.hero.subtitle}
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#projects"
                className="w-full sm:w-auto px-8 py-4 bg-amber-500 text-black font-bold tracking-widest text-sm uppercase transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/20 active:scale-95 text-center relative overflow-hidden group"
              >
                <span className="relative z-10">{dict.hero.cta}</span>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-zinc-950 transform translate-x-1.5 translate-y-1.5 rotate-45" />
              </a>
              <a
                href="#about"
                className="w-full sm:w-auto px-8 py-4 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-bold tracking-widest text-sm uppercase transition-all active:scale-95 text-center relative"
              >
                {dict.hero.docs}
                <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-teal-400" />
              </a>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="w-full py-32 bg-zinc-950/60 border-t border-zinc-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-5 relative">
                <span className="text-xs font-mono tracking-widest text-amber-500 uppercase block mb-2">
                  // 01. INTRO
                </span>
                <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-wider mb-8">
                  {dict.about.title}
                </h2>
                <div className="w-20 h-1 bg-amber-500 mb-8" />
              </div>
              <div className="lg:col-span-7 anim-card">
                <div className="relative p-8 bg-zinc-900/40 border border-zinc-800 rounded-lg backdrop-blur-sm">
                  {/* Decorative corner highlights */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-teal-500" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-teal-500" />

                  <p className="text-lg text-zinc-300 font-light leading-relaxed mb-6">
                    {dict.about.description}
                  </p>
                  <p className="text-zinc-400 leading-relaxed text-sm">
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
        <section id="projects" className="w-full py-32 border-t border-zinc-900 bg-zinc-900/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-20">
              <span className="text-xs font-mono tracking-widest text-amber-500 uppercase block mb-2">
                // 02. PORTFOLIO
              </span>
              <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-wider">
                {dict.projects.title}
              </h2>
              <div className="w-20 h-1 bg-amber-500 mt-6" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Project Card 1 */}
              <div className="anim-card bg-zinc-900/50 border border-zinc-800/80 hover:border-amber-500/50 hover:bg-zinc-900 transition-all duration-300 p-8 relative flex flex-col justify-between group">
                <div className="absolute top-0 right-0 px-3 py-1 bg-amber-500/10 text-amber-400 font-mono text-2xs tracking-widest uppercase">
                  ACTIVE
                </div>
                <div>
                  <span className="text-4xl font-extrabold text-zinc-800 block mb-6 group-hover:text-amber-500/30 transition-colors">01</span>
                  <h3 className="text-xl font-bold uppercase text-white tracking-wide mb-3">Arknights Clone</h3>
                  <p className="text-zinc-400 font-light text-sm leading-relaxed mb-8">
                    Sebuah simulasi interface game taktis yang menggunakan HTML5 Canvas, interaksi audio, dan video background penuh.
                  </p>
                </div>
                <a href="#" className="inline-flex items-center gap-2 text-xs font-bold uppercase text-amber-500 tracking-wider hover:text-amber-400">
                  {dict.projects.view_more} &rarr;
                </a>
              </div>

              {/* Project Card 2 */}
              <div className="anim-card bg-zinc-900/50 border border-zinc-800/80 hover:border-amber-500/50 hover:bg-zinc-900 transition-all duration-300 p-8 relative flex flex-col justify-between group">
                <div className="absolute top-0 right-0 px-3 py-1 bg-teal-500/10 text-teal-400 font-mono text-2xs tracking-widest uppercase">
                  STABLE
                </div>
                <div>
                  <span className="text-4xl font-extrabold text-zinc-800 block mb-6 group-hover:text-amber-500/30 transition-colors">02</span>
                  <h3 className="text-xl font-bold uppercase text-white tracking-wide mb-3">Dynamic I18n Lib</h3>
                  <p className="text-zinc-400 font-light text-sm leading-relaxed mb-8">
                    Pustaka lokalisasi yang mengompresi ukuran kamus bahasa di server sebelum dikirimkan ke client-side JavaScript bundle.
                  </p>
                </div>
                <a href="#" className="inline-flex items-center gap-2 text-xs font-bold uppercase text-amber-500 tracking-wider hover:text-amber-400">
                  {dict.projects.view_more} &rarr;
                </a>
              </div>

              {/* Project Card 3 */}
              <div className="anim-card bg-zinc-900/50 border border-zinc-800/80 hover:border-amber-500/50 hover:bg-zinc-900 transition-all duration-300 p-8 relative flex flex-col justify-between group">
                <div className="absolute top-0 right-0 px-3 py-1 bg-zinc-800 text-zinc-500 font-mono text-2xs tracking-widest uppercase">
                  PLANNING
                </div>
                <div>
                  <span className="text-4xl font-extrabold text-zinc-800 block mb-6 group-hover:text-amber-500/30 transition-colors">03</span>
                  <h3 className="text-xl font-bold uppercase text-white tracking-wide mb-3">Go Web Engine</h3>
                  <p className="text-zinc-400 font-light text-sm leading-relaxed mb-8">
                    Framework mikro back-end menggunakan bahasa pemrograman Go yang melayani API dengan latensi super rendah di bawah 5ms.
                  </p>
                </div>
                <a href="#" className="inline-flex items-center gap-2 text-xs font-bold uppercase text-amber-500 tracking-wider hover:text-amber-400">
                  {dict.projects.view_more} &rarr;
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="w-full py-32 border-t border-zinc-900 bg-zinc-950/40">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-16">
              <span className="text-xs font-mono tracking-widest text-amber-500 uppercase block mb-2">
                // 03. CONNECT
              </span>
              <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-wider">
                {dict.contact.title}
              </h2>
              <div className="w-20 h-1 bg-amber-500 mt-6" />
            </div>

            <form
              onSubmit={handleFormSubmit}
              className="bg-zinc-900/30 border border-zinc-800/80 p-8 md:p-12 rounded-lg backdrop-blur-sm relative"
            >
              {/* Sci-fi corners */}
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-amber-500" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-amber-500" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-amber-500" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-amber-500" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-zinc-400 text-xs font-mono uppercase tracking-wider mb-2">
                    {dict.contact.name}
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-zinc-950/60 border border-zinc-800 px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-all font-sans text-sm"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs font-mono uppercase tracking-wider mb-2">
                    {dict.contact.email}
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-zinc-950/60 border border-zinc-800 px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-all font-sans text-sm"
                  />
                </div>
              </div>
              <div className="mb-8">
                <label className="block text-zinc-400 text-xs font-mono uppercase tracking-wider mb-2">
                  {dict.contact.message}
                </label>
                <textarea
                  rows={5}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-zinc-950/60 border border-zinc-800 px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-all font-sans text-sm resize-none"
                />
              </div>

              <div className="flex items-center justify-between gap-4 flex-wrap">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-4 bg-teal-500 text-black font-bold tracking-widest text-sm uppercase transition-all hover:bg-teal-400 disabled:opacity-50 cursor-pointer active:scale-95 text-center relative overflow-hidden"
                >
                  {isSubmitting ? "Sending..." : dict.contact.send}
                </button>

                {submitStatus === "success" && (
                  <span className="text-teal-400 text-sm font-mono tracking-wide">
                    ✓ Message sent successfully!
                  </span>
                )}
                {submitStatus === "error" && (
                  <span className="text-red-400 text-sm font-mono tracking-wide">
                    ✗ Failed to send message. Please try again.
                  </span>
                )}
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 border-t border-zinc-900 bg-zinc-950 z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-zinc-600 font-mono tracking-wider text-center md:text-left">
            &copy; 2026 ENDFIELD.PORT. INSPIRED BY GRYPHLINE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 text-xs text-zinc-500 font-mono uppercase tracking-widest">
            <a href="#" className="hover:text-amber-500">Privacy Policy</a>
            <a href="#" className="hover:text-amber-500">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
