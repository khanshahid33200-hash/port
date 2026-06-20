"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSettings, getProjects, getTestimonials } from "@/lib/db";

export default function HomePage() {
  const [settings, setSettings] = useState(null);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const s = await getSettings();
        const p = await getProjects();
        const t = await getTestimonials();
        setSettings(s);
        // Show only first 2 projects on the homepage as "Featured Work"
        setProjects(p.slice(0, 2));
        setTestimonials(t);
      } catch (err) {
        console.error("Error loading home page data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-4xl text-primary animate-spin">
            sync
          </span>
          <p className="font-semibold text-text-muted">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  const hero = settings?.hero || {};
  const about = settings?.about || {};

  return (
    <div className="min-h-screen bg-background-custom text-text-main flex flex-col">
      <Navbar />

      <main className="pt-20">
        {/* Announcement Bar / Active Notification */}
        <div className="bg-primary-light text-primary text-center py-3 px-4 font-semibold text-sm border-b border-primary/10">
          <div className="max-w-container-max mx-auto flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            {hero.badge || "Available for new projects"}
          </div>
        </div>

        {/* Hero Section */}
        <section className="px-margin-mobile md:px-gutter max-w-container-max mx-auto py-stack-xl md:py-28 flex flex-col-reverse md:flex-row items-center gap-stack-lg" id="home">
          <div className="w-full md:w-1/2 flex flex-col gap-6 animate-fade-in-up">
            <h1 className="font-display-lg text-4xl md:text-5xl lg:text-6xl font-black text-text-main leading-tight tracking-tight">
              {hero.title}
            </h1>
            <p className="font-body-lg text-lg text-text-muted max-w-lg leading-relaxed">
              {hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                href="/portfolio" 
                className="inline-flex items-center justify-center bg-primary text-white font-label-md text-label-md px-8 py-4 rounded-lg font-bold hover:bg-primary-hover transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-transform"
              >
                {hero.primaryCta}
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center bg-white text-primary border border-primary font-label-md text-label-md px-8 py-4 rounded-lg font-bold hover:bg-primary-light transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-transform"
              >
                {hero.secondaryCta}
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 animate-fade-in-up">
            <div className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-border-custom/50 bg-gray-50">
              <img 
                className="w-full h-full object-cover" 
                alt="Shahid Khan workspace" 
                src={hero.image}
              />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </section>

        {/* About Snippet Section */}
        <section className="bg-section-bg py-stack-xl border-y border-border-custom/30" id="about">
          <div className="px-margin-mobile md:px-gutter max-w-container-max mx-auto text-center max-w-3xl flex flex-col items-center gap-6 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-text-main">
              Meticulous Code, Elegant Design
            </h2>
            <p className="font-body-lg text-lg text-text-muted leading-relaxed">
              {about.subtitle}
            </p>
            <Link 
              href="/about" 
              className="inline-flex items-center gap-2 text-primary font-label-md text-label-md font-bold hover:gap-3 transition-all"
            >
              Learn More 
              <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
            </Link>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="px-margin-mobile md:px-gutter max-w-container-max mx-auto py-stack-xl" id="portfolio">
          <div className="flex justify-between items-end mb-stack-lg animate-fade-in-up">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-main tracking-tight">Featured Work</h2>
              <p className="font-body-md text-text-muted mt-2">A selection of recent digital experiences.</p>
            </div>
            <Link href="/portfolio" className="hidden md:inline-flex text-primary font-label-md text-label-md font-bold hover:underline">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {projects.map((proj) => (
              <div 
                key={proj.id}
                className="group relative rounded-2xl overflow-hidden bg-white border border-border-custom/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    src={proj.image} 
                    alt={proj.title}
                  />
                </div>
                <div className="p-8">
                  <div className="flex gap-2 mb-4">
                    <span className="px-3 py-1 bg-primary-light text-primary font-semibold text-xs rounded-full">
                      {proj.category}
                    </span>
                    <span className="px-3 py-1 bg-secondary-light text-secondary font-semibold text-xs rounded-full">
                      {proj.subCategory}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-text-main mb-2">{proj.title}</h3>
                  <p className="font-body-md text-text-muted mb-6 leading-relaxed">
                    {proj.description}
                  </p>
                  <a 
                    href={proj.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-primary font-label-md text-label-md font-bold group-hover:gap-2 transition-all"
                  >
                    View Website 
                    <span className="material-symbols-outlined text-sm opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-1 transition-all">
                      arrow_forward
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/portfolio" className="inline-flex text-primary font-label-md text-label-md font-bold border border-primary px-6 py-2 rounded-lg hover:bg-primary-light transition-all">
              View All Projects
            </Link>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-section-bg py-stack-xl relative overflow-hidden border-t border-border-custom/30" id="services">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent opacity-50 pointer-events-none"></div>
          <div className="px-margin-mobile md:px-gutter max-w-container-max mx-auto relative z-10">
            <div className="text-center mb-stack-lg animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-text-main tracking-tight">Core Capabilities</h2>
              <p className="font-body-lg text-text-muted max-w-2xl mx-auto mt-2">End-to-end technical solutions designed for modern business needs.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-2xl border border-border-custom/50 shadow-sm hover:-translate-y-2 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-2xl font-bold">code</span>
                </div>
                <h3 className="text-xl font-bold text-text-main mb-3">Website Development</h3>
                <p className="font-body-md text-text-muted leading-relaxed">
                  Custom, responsive websites built with modern frameworks like React, Next.js, and Tailwind CSS. Focus on performance, accessibility, and pixel-perfect design.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-border-custom/50 shadow-sm hover:-translate-y-2 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-secondary-light text-secondary flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-2xl font-bold">database</span>
                </div>
                <h3 className="text-xl font-bold text-text-main mb-3">Platform Architecture</h3>
                <p className="font-body-md text-text-muted leading-relaxed">
                  Scalable backend systems, API development, and database design using Node.js, Python, and modern cloud infrastructure to power your applications.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-border-custom/50 shadow-sm hover:-translate-y-2 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-accent-light text-accent flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-2xl font-bold">trending_up</span>
                </div>
                <h3 className="text-xl font-bold text-text-main mb-3">Digital Marketing Tech</h3>
                <p className="font-body-md text-text-muted leading-relaxed">
                  Integration of analytics, CRM systems, and marketing automation tools to ensure your digital presence actively contributes to business growth.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link href="/services" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
                Explore All Services
                <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="px-margin-mobile md:px-gutter max-w-container-max mx-auto py-stack-xl border-t border-border-custom/30">
          <div className="text-center mb-stack-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-text-main tracking-tight">Client Stories</h2>
            <p className="font-body-md text-text-muted mt-2">What clients say about working with me.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div 
                key={t.id}
                className="bg-white p-8 rounded-2xl border border-border-custom/50 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 text-accent mb-4">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-lg fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                    ))}
                  </div>
                  <p className="italic text-text-main font-medium leading-relaxed mb-6">
                    &ldquo;{t.content}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-sm">
                    {t.author.charAt(0)}
                  </div>
                  <span className="font-bold text-text-main text-sm">{t.author}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
