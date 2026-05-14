"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// ─── Icon primitives ───────────────────────────────────────────────────────────

function IconArrow({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCheckCyan() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 6l2.8 2.8L10 3.5" stroke="#00D4FF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCheckEmerald() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 6l2.8 2.8L10 3.5" stroke="#34D399" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconMenu() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

// ─── Vertexa Logo ─────────────────────────────────────────────────────────────
// Uses PNG asset; falls back to SVG if PNG fails to load.

function VertexaLogo({ size = "default" }: { size?: "default" | "small" | "large" }) {
  const [src, setSrc] = useState("/vertexa-logo.png");
  const heightClass =
    size === "small" ? "h-8" : size === "large" ? "h-12" : "h-10";

  return (
    <Image
      src={src}
      alt="Vertexa"
      width={788}
      height={196}
      className={`${heightClass} w-auto object-contain`}
      priority={size !== "small"}
      onError={() => setSrc("/vertexa-logo.svg")}
    />
  );
}

// ─── Header ────────────────────────────────────────────────────────────────────

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Products", href: "#products" },
    { label: "Approach", href: "#approach" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0D1323]/80 backdrop-blur-2xl border-b border-white/[0.05]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <a href="#" className="flex-shrink-0" aria-label="Vertexa home">
            <VertexaLogo />
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-10"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[#6B7280] hover:text-white transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white rounded-xl border border-white/15 hover:border-white/30 hover:bg-white/[0.04] transition-all duration-200"
            >
              Contact us
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[#6B7280] hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0D1323]/95 backdrop-blur-2xl border-b border-white/[0.05] px-6 pb-8 pt-4">
          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-base text-[#6B7280] hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center px-5 py-3 text-sm font-medium border border-white/15 text-white rounded-xl"
            >
              Contact us
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 lg:pt-24">
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-[#0D1323]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 68% 42%, rgba(10,71,255,0.20) 0%, rgba(0,212,255,0.07) 40%, transparent 68%)",
        }}
      />
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage:
            "radial-gradient(ellipse 90% 80% at 50% 50%, black 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 50% 50%, black 0%, transparent 100%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 w-full py-32 lg:py-40">
        <div className="grid lg:grid-cols-[1fr_480px] gap-20 items-center">
          {/* Left: Copy */}
          <div className="space-y-10 animate-fade-up">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#007BFF]/35 bg-[#007BFF]/08 text-[11px] font-medium text-[#00D4FF] tracking-[0.18em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" aria-hidden="true" />
              Technology company
            </div>

            {/* Headline */}
            <h1
              className="text-5xl sm:text-6xl lg:text-[70px] xl:text-[78px] font-bold text-white leading-[1.04] tracking-[-0.03em]"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Building scalable
              <br />
              <span
                style={{
                  background: "linear-gradient(125deg, #007BFF 10%, #00D4FF 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                digital platforms
              </span>
              <br />
              for modern businesses.
            </h1>

            {/* Subheadline */}
            <p className="text-lg lg:text-xl text-[#6B7280] leading-[1.7] max-w-[500px]">
              Vertexa develops focused technology platforms that help modern
              businesses simplify operations, connect workflows, and deliver
              elevated customer experiences.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#products"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, #0A47FF 0%, #007BFF 100%)",
                  boxShadow: "0 0 40px rgba(10,71,255,0.38), 0 4px 16px rgba(10,71,255,0.25)",
                }}
              >
                Explore our products
                <IconArrow />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl text-sm font-semibold text-[#6B7280] border border-white/10 hover:border-white/25 hover:text-white hover:bg-white/[0.03] transition-all duration-300"
              >
                Contact Vertexa
                <IconArrow />
              </a>
            </div>
          </div>

          {/* Right: Ecosystem visual */}
          <div className="hidden lg:flex justify-end items-center">
            <PlatformEcosystem />
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="mt-28 lg:mt-36 pt-8 border-t border-white/[0.05]">
          <p
            className="text-[11px] tracking-[0.35em] text-[#6B7280]/60 uppercase"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Connect&nbsp;&nbsp;·&nbsp;&nbsp;Innovate&nbsp;&nbsp;·&nbsp;&nbsp;Grow
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Platform Ecosystem ─ decorative, abstract visualization of the Vertexa
//    platform layer and the products it powers. Not a functional UI.

function PlatformEcosystem() {
  return (
    <div className="relative w-[460px] h-[540px] select-none">
      {/* Ambient glow field */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 52% 44%, rgba(10,71,255,0.18) 0%, rgba(0,212,255,0.05) 48%, transparent 72%)",
        }}
      />

      {/* ── Platform base card ── */}
      <div
        className="absolute inset-x-0 top-0 bottom-[108px] rounded-[28px] overflow-hidden"
        style={{
          background:
            "linear-gradient(155deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(24px)",
        }}
      >
        {/* Inner dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse 90% 60% at 50% 0%, black 0%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 60% at 50% 0%, black 0%, transparent 80%)",
          }}
        />

        {/* Top label */}
        <div className="absolute top-6 left-6 flex items-center gap-2.5">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse"
            aria-hidden="true"
          />
          <span
            className="text-[10px] tracking-[0.22em] uppercase font-medium text-white/30"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Vertexa Platform
          </span>
        </div>

        {/* Central Vertexa node */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ paddingBottom: "24px" }}>
          <div className="relative flex items-center justify-center">
            {/* Outer ring */}
            <div
              className="absolute w-40 h-40 rounded-full"
              style={{ border: "1px solid rgba(10,71,255,0.10)" }}
            />
            {/* Middle ring */}
            <div
              className="absolute w-24 h-24 rounded-full"
              style={{ border: "1px solid rgba(10,71,255,0.15)" }}
            />
            {/* Glow */}
            <div
              className="absolute w-28 h-28 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(10,71,255,0.30) 0%, transparent 70%)",
                filter: "blur(18px)",
              }}
            />
            {/* Icon */}
            <div
              className="relative w-[72px] h-[72px] rounded-2xl flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(145deg, rgba(10,71,255,0.90) 0%, rgba(0,123,255,0.72) 100%)",
                border: "1px solid rgba(10,71,255,0.55)",
                boxShadow:
                  "0 0 48px rgba(10,71,255,0.50), 0 0 96px rgba(0,212,255,0.10), inset 0 1px 0 rgba(255,255,255,0.22)",
              }}
            >
              <Image
                src="/vertexa-icon.svg"
                alt="Vertexa"
                width={36}
                height={36}
                className="w-9 h-9"
              />
            </div>
          </div>
        </div>

        {/* Footer strip */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 px-6 py-3.5 flex items-center justify-between">
          <p className="text-[10px] text-white/18 tracking-wide">
            Technology infrastructure
          </p>
          <div className="flex gap-1.5 items-center">
            {["#0A47FF", "#007BFF", "#00D4FF"].map((c, i) => (
              <span
                key={i}
                className="w-1 h-1 rounded-full"
                style={{ background: c, opacity: 0.45 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Vaiter product node (bottom-right) ── */}
      <div
        className="absolute bottom-0 right-0 w-56 rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #0E1318 0%, #080C10 100%)",
          border: "1px solid rgba(16,185,129,0.20)",
          boxShadow:
            "0 0 48px rgba(16,185,129,0.08), 0 12px 40px rgba(0,0,0,0.50)",
        }}
      >
        {/* Emerald top rule */}
        <div
          className="h-[1px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(52,211,153,0.55), transparent)",
          }}
        />
        <div className="px-4 pt-4 pb-4">
          <Image
            src="/logo-vaiter-on-black.png"
            alt="Vaiter"
            width={400}
            height={120}
            className="h-6 w-auto object-contain object-left mb-2.5"
          />
          <p className="text-[10px] text-white/35 mb-3 leading-relaxed">
            Restaurant technology platform
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-emerald-400/75 font-medium">Live</span>
            <span
              className="ml-auto text-[9px] px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.18)",
                color: "rgba(52,211,153,0.65)",
              }}
            >
              A Vertexa product
            </span>
          </div>
        </div>
      </div>

      {/* ── Future platform node (bottom-left, ghost) ── */}
      <div
        className="absolute bottom-6 left-0 w-36 rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px dashed rgba(255,255,255,0.07)",
        }}
      >
        <div className="px-3.5 py-3.5">
          <div
            className="w-6 h-6 rounded-lg mb-2.5 flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px dashed rgba(255,255,255,0.09)",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M5 2v6M2 5h6" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          <p
            className="text-[10px] font-medium"
            style={{ color: "rgba(255,255,255,0.18)", fontFamily: "'Sora', sans-serif" }}
          >
            Platform 02
          </p>
          <p className="text-[9px] mt-0.5" style={{ color: "rgba(107,114,128,0.38)" }}>
            Coming soon
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── About / Positioning ───────────────────────────────────────────────────────

function About() {
  const pillars = [
    { value: "B2B", label: "Enterprise focus" },
    { value: "SaaS", label: "Scalable delivery" },
    { value: "Multi", label: "Product portfolio" },
    { value: "2024", label: "Founded" },
  ];

  return (
    <section id="about" className="py-36 lg:py-48 relative">
      <div className="absolute inset-0 bg-[#0D1323]" />
      <div
        className="absolute left-0 top-0 w-2/3 h-full opacity-35 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 75% at 0% 55%, rgba(10,71,255,0.14) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-28 items-center">
          {/* Left: Pillar grid */}
          <div className="grid grid-cols-2 gap-4">
            {pillars.map((p) => (
              <div
                key={p.label}
                className="p-7 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p
                  className="text-3xl lg:text-4xl font-bold mb-2"
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    background: "linear-gradient(125deg, #007BFF, #00D4FF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {p.value}
                </p>
                <p className="text-sm text-[#6B7280] leading-relaxed">{p.label}</p>
              </div>
            ))}
          </div>

          {/* Right: Copy */}
          <div className="space-y-7">
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#007BFF] font-medium">
              About Vertexa
            </p>
            <h2
              className="text-4xl lg:text-[52px] font-bold text-white leading-[1.08] tracking-tight"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Technology built to work{" "}
              <span
                style={{
                  background: "linear-gradient(125deg, #007BFF 0%, #00D4FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                behind the scenes.
              </span>
            </h2>
            <p className="text-lg text-[#6B7280] leading-[1.75]">
              Vertexa is a technology company that develops scalable digital
              products for service-driven industries. We build tools that work
              quietly — removing friction, connecting teams, and letting
              businesses focus on what they do best.
            </p>
            <p className="text-base text-[#6B7280] leading-[1.75]">
              Our products integrate with the existing identity of each business
              — not replace it. Vertexa powers the experience; your brand owns
              the stage.
            </p>
            <blockquote
              className="pl-5 mt-8"
              style={{ borderLeft: "2px solid rgba(10,71,255,0.55)" }}
            >
              <p className="text-white/80 text-lg italic font-light leading-[1.7]">
                &ldquo;We build technology that works behind the scenes, so
                businesses can deliver better experiences.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Products ──────────────────────────────────────────────────────────────────

function Products() {
  const vaiterFeatures = [
    "Table ordering",
    "Advance ordering",
    "Restaurant-first experience",
    "Operational efficiency",
    "Payment-ready architecture",
  ];

  return (
    <section id="products" className="py-36 lg:py-48 relative">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #0D1323 0%, #090D18 50%, #0D1323 100%)",
        }}
      />
      <div
        className="absolute right-0 top-0 w-1/2 h-full opacity-25 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 70% at 100% 55%, rgba(0,212,255,0.10) 0%, transparent 68%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-2xl mb-24">
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#007BFF] font-medium mb-5">
            Our products
          </p>
          <h2
            className="text-4xl lg:text-[52px] font-bold text-white leading-[1.08] tracking-tight"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            A portfolio of focused
            <br />
            digital tools.
          </h2>
          <p className="mt-6 text-lg text-[#6B7280] leading-[1.7]">
            Each Vertexa product is purpose-built for a specific industry
            challenge — designed to integrate seamlessly and scale reliably.
          </p>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-2 gap-6 items-start">

          {/* ── Vaiter card — dark / emerald ── */}
          <div
            className="relative rounded-3xl overflow-hidden flex flex-col"
            style={{
              background: "linear-gradient(155deg, #0E1318 0%, #080C10 100%)",
              border: "1px solid rgba(16,185,129,0.16)",
              boxShadow:
                "0 0 80px rgba(16,185,129,0.06), 0 0 0 1px rgba(16,185,129,0.06), 0 24px 60px rgba(0,0,0,0.50)",
            }}
          >
            {/* Emerald top rule */}
            <div
              className="h-[1px] flex-shrink-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(52,211,153,0.50) 30%, rgba(52,211,153,0.70) 50%, rgba(52,211,153,0.50) 70%, transparent 100%)",
              }}
            />
            {/* Subtle corner glow */}
            <div
              className="absolute top-0 left-0 w-72 h-72 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 0% 0%, rgba(16,185,129,0.07) 0%, transparent 60%)",
              }}
            />

            <div className="relative p-8 lg:p-10 flex flex-col flex-1">
              {/* Top row: badge */}
              <div className="flex items-center justify-between mb-8">
                <span
                  className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase font-semibold px-3.5 py-1.5 rounded-full"
                  style={{
                    background: "rgba(16,185,129,0.08)",
                    border: "1px solid rgba(16,185,129,0.16)",
                    color: "rgba(52,211,153,0.65)",
                  }}
                >
                  A Vertexa product
                </span>
                <span className="text-[10px] tracking-wide" style={{ color: "rgba(255,255,255,0.20)" }}>
                  vaiter.app
                </span>
              </div>

              {/* Vaiter logo */}
              <div className="mb-7">
                <Image
                  src="/logo-vaiter-on-black.png"
                  alt="Vaiter"
                  width={600}
                  height={200}
                  className="h-14 w-auto object-contain object-left"
                />
              </div>

              {/* Description */}
              <p className="text-white/45 leading-[1.75] mb-8 text-base">
                A restaurant technology platform designed to help restaurants
                offer table ordering, advance ordering, pickup workflows, and
                smoother service — without taking over the restaurant&apos;s brand.
              </p>

              {/* Features */}
              <ul className="space-y-3.5 mb-10">
                {vaiterFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-white/65">
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{
                        background: "rgba(16,185,129,0.10)",
                        border: "1px solid rgba(16,185,129,0.20)",
                      }}
                    >
                      <IconCheckEmerald />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-auto">
                <div
                  className="h-px mb-7"
                  style={{ background: "rgba(16,185,129,0.10)" }}
                />
                <a
                  href="https://vaiter.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 group"
                  style={{ color: "rgba(52,211,153,0.75)" }}
                >
                  <span className="group-hover:text-emerald-300 transition-colors">
                    Learn more about Vaiter
                  </span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    <IconArrow />
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* ── Coming soon card ── */}
          <div
            className="relative rounded-3xl p-8 lg:p-10 overflow-hidden flex flex-col justify-between min-h-[520px]"
            style={{
              background:
                "linear-gradient(155deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)",
                transform: "translate(30%, 30%)",
              }}
            />

            <div className="relative">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] tracking-[0.18em] uppercase font-medium mb-10"
                style={{
                  border: "1px solid rgba(255,255,255,0.10)",
                  color: "rgba(107,114,128,0.70)",
                }}
              >
                In development
              </div>
              <h3
                className="text-3xl lg:text-[40px] font-bold text-white leading-[1.1] tracking-tight mb-5"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                More platforms
                <br />
                coming soon.
              </h3>
              <p className="text-[#6B7280] leading-[1.75] text-base max-w-sm">
                Vertexa is building a portfolio of digital tools for
                service-driven businesses. New platforms are in development,
                targeting industries where operational technology lags behind
                customer expectations.
              </p>
            </div>

            <div className="relative mt-12">
              <div className="flex gap-2 mb-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-1 rounded-full"
                    style={{
                      width: i === 1 ? "2.5rem" : "0.5rem",
                      background:
                        i === 1
                          ? "linear-gradient(90deg, #0A47FF, #00D4FF)"
                          : "rgba(255,255,255,0.10)",
                    }}
                  />
                ))}
              </div>
              <p className="text-[11px] text-[#6B7280]/60 tracking-widest uppercase">
                Powered by Vertexa
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Approach ──────────────────────────────────────────────────────────────────

const approachCards = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M10 1.5v3M10 15.5v3M1.5 10h3M15.5 10h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M4.1 4.1l2.1 2.1M13.8 13.8l2.1 2.1M4.1 15.9l2.1-2.1M13.8 6.2l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    title: "Connect workflows",
    description:
      "We bridge the gaps between systems, teams, and touchpoints so information flows cleanly and nothing falls through the cracks.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4 14V8.5a6 6 0 1112 0V14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M2 14h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M8 14v1.5a2 2 0 004 0V14" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
    title: "Simplify operations",
    description:
      "We remove friction from the workflows that slow businesses down — replacing complex manual processes with intuitive digital tools.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 15l4.5-4.5 3.5 3.5L17 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Scale intelligently",
    description:
      "Vertexa products are built for growth from day one — architectures that handle increasing demand without requiring a rebuild.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="3" y="4.5" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7 4.5V3a.8.8 0 011.6 0v1.5M11.4 4.5V3a.8.8 0 011.6 0v1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    title: "Protect brand experience",
    description:
      "Technology should enhance your identity, not overshadow it. Every Vertexa product stays invisible — letting your brand lead.",
  },
];

function Approach() {
  return (
    <section id="approach" className="py-36 lg:py-48 relative">
      <div className="absolute inset-0 bg-[#0D1323]" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 55% at 50% 105%, rgba(10,71,255,0.10) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mx-auto text-center mb-24">
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#007BFF] font-medium mb-5">
            Our approach
          </p>
          <h2
            className="text-4xl lg:text-[52px] font-bold text-white leading-[1.08] tracking-tight"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            How Vertexa builds.
          </h2>
          <p className="mt-6 text-lg text-[#6B7280] leading-[1.7]">
            Four principles that guide every product we create.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {approachCards.map((card) => (
            <div
              key={card.title}
              className="group p-7 rounded-2xl relative overflow-hidden transition-all duration-300"
              style={{
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(10,71,255,0.07) 0%, transparent 70%)",
                }}
              />
              <div
                className="relative w-11 h-11 rounded-xl flex items-center justify-center mb-7 text-[#00D4FF]"
                style={{
                  background: "rgba(10,71,255,0.12)",
                  border: "1px solid rgba(10,71,255,0.20)",
                }}
              >
                {card.icon}
              </div>
              <h3
                className="text-base font-semibold text-white mb-3 leading-snug"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {card.title}
              </h3>
              <p className="text-sm text-[#6B7280] leading-[1.7]">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ───────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section id="contact" className="py-36 lg:py-48 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#09101E]" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 58% 55% at 50% 50%, rgba(10,71,255,0.14) 0%, rgba(0,212,255,0.05) 45%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(10,71,255,0.45), rgba(0,212,255,0.45), transparent)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <p className="text-[11px] tracking-[0.22em] uppercase text-[#007BFF] font-medium mb-7">
          Get in touch
        </p>
        <h2
          className="text-5xl sm:text-6xl lg:text-[68px] font-bold text-white leading-[1.04] tracking-tight mb-7"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          Let&apos;s build what&apos;s next.
        </h2>
        <p className="text-lg text-[#6B7280] leading-[1.7] max-w-lg mx-auto mb-14">
          For partnerships, product inquiries, or business opportunities, reach
          out to Vertexa. We&apos;re selective about what we build — and who we
          build it with.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="mailto:hello@vertexa.us"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, #0A47FF 0%, #007BFF 100%)",
              boxShadow:
                "0 0 48px rgba(10,71,255,0.44), 0 4px 20px rgba(10,71,255,0.28)",
            }}
          >
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
              <rect x="2" y="4" width="13" height="9" rx="2" stroke="white" strokeWidth="1.4" />
              <path d="M2 6l6.5 4.5L15 6" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            hello@vertexa.us
          </a>
          <a
            href="mailto:hello@vertexa.us"
            className="text-sm text-[#6B7280] hover:text-white transition-colors underline underline-offset-4"
          >
            Send us a message
          </a>
        </div>

        <div className="mt-24 flex flex-wrap gap-10 justify-center items-center">
          {["Enterprise-ready", "B2B focused", "US incorporated"].map((tag) => (
            <div key={tag} className="flex items-center gap-2.5 text-sm text-[#6B7280]/70">
              <span className="w-1 h-1 rounded-full bg-[#007BFF]/60" />
              {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      className="relative bg-[#0D1323]"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
          <div className="text-center md:text-left space-y-3">
            <VertexaLogo size="small" />
            <p
              className="text-[10px] tracking-[0.28em] uppercase"
              style={{ color: "rgba(107,114,128,0.55)", fontFamily: "'Sora', sans-serif" }}
            >
              Connect · Innovate · Grow
            </p>
          </div>

          <nav
            className="flex flex-wrap gap-8 justify-center"
            aria-label="Footer navigation"
          >
            {["About", "Products", "Approach", "Contact"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="text-sm transition-colors"
                style={{ color: "rgba(107,114,128,0.7)" }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "#fff")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "rgba(107,114,128,0.7)")
                }
              >
                {label}
              </a>
            ))}
          </nav>

          <p
            className="text-xs text-center md:text-right leading-relaxed"
            style={{ color: "rgba(107,114,128,0.55)" }}
          >
            © 2026 Vertexa LLC.
            <br className="hidden md:block" />
            {" "}All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0D1323]">
      <Header />
      <main>
        <Hero />
        <About />
        <Products />
        <Approach />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
