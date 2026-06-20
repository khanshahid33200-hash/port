"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSettings, getProjects, getTestimonials, getBlogs } from "@/lib/db";

export default function HomePage() {
  const [settings, setSettings] = useState(null);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [s, p, t, b] = await Promise.all([
          getSettings(),
          getProjects(),
          getTestimonials(),
          getBlogs()
        ]);
        setSettings(s);
        // Show up to 4 projects for a detailed portfolio grid
        setProjects(p.slice(0, 4));
        setTestimonials(t);
        // Show top 3 blogs for the insights section
        setBlogs(b.slice(0, 3));
      } catch (err) {
        console.error("Error loading home page data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

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

  const stats = [
    { value: "4+", label: "Years of Experience", desc: "Crafting digital systems", icon: "timeline" },
    { value: "50+", label: "Projects Completed", desc: "Delivered successfully", icon: "task_alt" },
    { value: "99%", label: "Client Satisfaction", desc: "Based on regular feedback", icon: "sentiment_satisfied" },
    { value: "100%", label: "On-Time Delivery", desc: "Reliable production cycles", icon: "schedule" }
  ];

  const clientLogos = [
    "Fintech Inc.", "Global SaaS", "Creative Agency", "Media Group", 
    "E-Comm Labs", "Tech Ventures", "Health Hub", "Retail Solution"
  ];

  const processSteps = [
    {
      num: "01",
      title: "Discovery & Strategy",
      desc: "Consultation and deep dive into your business goals, target audience, and layout architecture to establish a solid roadmap.",
      icon: "search"
    },
    {
      num: "02",
      title: "Design & Prototyping",
      desc: "Creating elegant wireframes, user journeys, responsive design configurations, and custom visual identities for approval.",
      icon: "palette"
    },
    {
      num: "03",
      title: "Clean Production Code",
      desc: "Developing fast, scalable components using Next.js/React, Tailwind CSS, and optimized database/API structures.",
      icon: "code"
    },
    {
      num: "04",
      title: "Audit & Launch",
      desc: "Comprehensive testing for performance, Core Web Vitals scoring, SEO setups, and final deployment to hosting servers.",
      icon: "rocket_launch"
    }
  ];

  const techCategories = [
    {
      title: "Frontend Engineering",
      icon: "html",
      skills: ["React & Next.js", "Tailwind CSS v4", "TypeScript", "HTML5 & CSS3", "Framer Motion"]
    },
    {
      title: "Backend & Database",
      icon: "dns",
      skills: ["Node.js / Express", "Firebase / Firestore", "RESTful APIs", "PostgreSQL", "MongoDB"]
    },
    {
      title: "AI Integration & Tools",
      icon: "smart_toy",
      skills: ["ChatGPT Pro", "Prompt Engineering", "GitHub Copilot", "LangChain Workflows", "Midjourney API"]
    },
    {
      title: "Growth & Optimization",
      icon: "trending_up",
      skills: ["Technical SEO", "Google Analytics (GA4)", "Speed Auditing", "UI/UX Analysis", "Conversion Tuning"]
    }
  ];

  const faqs = [
    {
      q: "What is your typical project timeline?",
      a: "For standard business landing pages or portfolio websites, the timeline is usually 2 to 4 weeks. For more complex, multi-page platforms with custom CMS configurations, administrative dashboards, or API integrations, it typically takes 4 to 8 weeks."
    },
    {
      q: "Do you offer post-launch support and maintenance?",
      a: "Yes, I offer monthly support retainers which include security updates, speed tuning, Google Search Console audits, content adjustments, and minor layout modifications to keep your website performing optimally."
    },
    {
      q: "What hosting platforms and backend solutions do you recommend?",
      a: "I specialize in modern, serverless cloud solutions. For frontend hosting, I highly recommend Vercel, Netlify, or Firebase. For databases and backend systems, I utilize Firestore, Supabase, PostgreSQL, or custom Node.js servers, depending on scale requirements."
    },
    {
      q: "How does the payment and onboarding process work?",
      a: "We start with a free discovery call to outline specifications. Once approved, we sign a simple contract detailing milestones. I typically request a 50% deposit to initiate design wireframes, with the remaining 50% paid upon final deployment and testing."
    }
  ];

  return (
    <div className="min-h-screen bg-background-custom text-text-main flex flex-col glass-mesh">
      <Navbar />

      <main className="pt-20">
        {/* Announcement Bar / Active Notification */}
        <div className="bg-primary-light/50 backdrop-blur-md text-primary text-center py-3 px-4 font-semibold text-sm border-b border-primary/10">
          <div className="max-w-container-max mx-auto flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            {hero.badge || "Available for new projects"}
          </div>
        </div>

        {/* Hero Section */}
        <section className="px-margin-mobile md:px-gutter max-w-container-max mx-auto py-stack-xl md:py-28 flex flex-col-reverse md:flex-row items-center gap-stack-lg relative overflow-hidden" id="home">
          <div className="w-full md:w-1/2 flex flex-col gap-6 animate-fade-in-up relative z-10">
            <h1 className="font-display-lg text-4xl md:text-5xl lg:text-6xl font-black text-text-main leading-tight tracking-tight">
              {hero.title}
            </h1>
            <p className="font-body-lg text-lg text-text-muted max-w-lg leading-relaxed">
              {hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                href="/portfolio" 
                className="glass-btn-primary px-8 py-4 rounded-xl font-bold inline-flex items-center justify-center text-center animate-bounce-slow"
              >
                {hero.primaryCta}
              </Link>
              <Link 
                href="/contact" 
                className="glass-btn-secondary px-8 py-4 rounded-xl font-bold inline-flex items-center justify-center text-center"
              >
                {hero.secondaryCta}
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 animate-fade-in-up relative">
            <div className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-visible p-2">
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg border border-border-custom/50 bg-gray-50 relative">
                <img 
                  className="w-full h-full object-cover" 
                  alt="Shahid Khan workspace" 
                  src={hero.image}
                />
              </div>

              {/* Interactive Floating Glass Pills */}
              <div className="absolute -top-4 -left-4 px-4 py-2.5 glass-card shadow-lg rounded-full text-xs font-bold text-primary flex items-center gap-1.5 animate-float">
                <span className="material-symbols-outlined text-sm font-bold">code</span>
                <span>React / Next.js</span>
              </div>
              <div className="absolute top-1/2 -right-6 px-4 py-2.5 glass-card shadow-lg rounded-full text-xs font-bold text-secondary flex items-center gap-1.5 animate-float-delayed">
                <span className="material-symbols-outlined text-sm font-bold">palette</span>
                <span>Tailwind v4</span>
              </div>
              <div className="absolute -bottom-4 left-6 px-4 py-2.5 glass-card shadow-lg rounded-full text-xs font-bold text-accent flex items-center gap-1.5 animate-float-fast">
                <span className="material-symbols-outlined text-sm font-bold">smart_toy</span>
                <span>AI Integrations</span>
              </div>

              <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-secondary/5 rounded-full blur-2xl pointer-events-none"></div>
            </div>
          </div>
        </section>

        {/* Metrics Strip Section (NEW) */}
        <section className="px-margin-mobile md:px-gutter max-w-container-max mx-auto py-12 border-t border-border-custom/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="glass-card glass-card-hover p-6 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl font-bold">{stat.icon}</span>
                </div>
                <div>
                  <div className="text-3xl font-black text-text-main tracking-tight leading-none">{stat.value}</div>
                  <div className="font-bold text-sm text-text-main mt-1 leading-snug">{stat.label}</div>
                  <div className="text-xs text-text-muted mt-0.5">{stat.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Client Logos Infinite Scroll Marquee (NEW) */}
        <section className="bg-section-bg py-8 border-y border-border-custom/20 overflow-hidden w-full">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter mb-3 text-center">
            <p className="text-xs font-bold text-text-muted uppercase tracking-wider">Trusted By Brands & Agencies Worldwide</p>
          </div>
          <div className="relative flex overflow-x-hidden">
            <div className="animate-marquee animate-marquee-hover-pause flex items-center gap-16 py-2">
              {[...clientLogos, ...clientLogos].map((logo, idx) => (
                <span key={idx} className="text-lg md:text-xl font-extrabold text-text-muted/40 hover:text-primary/60 transition-colors tracking-tight cursor-default whitespace-nowrap">
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* About Snippet Section */}
        <section className="py-stack-xl relative overflow-hidden" id="about">
          <div className="px-margin-mobile md:px-gutter max-w-container-max mx-auto">
            <div className="glass-card p-8 md:p-12 rounded-3xl border border-border-custom/50 shadow-sm flex flex-col md:flex-row gap-8 items-center relative z-10">
              <div className="w-full md:w-1/2 flex flex-col gap-6 animate-fade-in-up">
                <div className="inline-flex self-start px-3 py-1 bg-secondary-light text-secondary font-bold text-xs rounded-full uppercase tracking-wider">
                  {about.badge || "My Journey"}
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-text-main tracking-tight leading-snug">
                  Meticulous Code, Elegant Design
                </h2>
                <p className="font-body-lg text-lg text-text-muted leading-relaxed">
                  {about.subtitle}
                </p>
                <div>
                  <Link 
                    href="/about" 
                    className="glass-btn-secondary px-6 py-3 rounded-lg font-bold inline-flex items-center gap-2"
                  >
                    Learn More 
                    <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                  </Link>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-border-custom/30 shadow-md">
                  <img 
                    className="w-full h-full object-cover" 
                    src={about.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuBl5p3Pss8KwvK99nWk70ncck_ScVjzMmN9LT0EtveuSv5g_FB1QkTcVLYk6kMl2e5ymhXBJdiuuiDRigw1Swfzktl1r8AXQYq0l4-WO8P6KuhCbGOCPnv1o_amVtYW8XM_Qp4ts9W0RNez_6nwZEbo-4WlDdbpNRp0w6kKQfnQTz7-TpHAR7xt74LZZJmmCVJKLOTwxWRoAxt4jQdgWuTFuwAt3nZ2rf5OqR96RuG1BAVxt7vj1VDz75k98qvKQkpB9AOJ3AbXD245"}
                    alt="Shahid Khan creative journey" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Working Process Section (NEW) */}
        <section className="bg-section-bg py-stack-xl border-y border-border-custom/30">
          <div className="px-margin-mobile md:px-gutter max-w-container-max mx-auto">
            <div className="text-center mb-stack-lg animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-black text-text-main tracking-tight">Structured Development Process</h2>
              <p className="font-body-lg text-text-muted max-w-2xl mx-auto mt-2">How I collaborate to transform concepts into pixel-perfect platforms.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {processSteps.map((step, idx) => (
                <div key={idx} className="glass-card glass-card-hover p-8 rounded-2xl border border-border-custom/50 flex flex-col gap-6 relative">
                  <div className="absolute top-4 right-6 text-5xl font-black text-primary/10 select-none">{step.num}</div>
                  <div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-2xl font-bold">{step.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-main mb-2 tracking-tight">{step.title}</h3>
                    <p className="text-sm text-text-muted leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="px-margin-mobile md:px-gutter max-w-container-max mx-auto py-stack-xl" id="portfolio">
          <div className="flex justify-between items-end mb-stack-lg animate-fade-in-up">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-text-main tracking-tight">Featured Work</h2>
              <p className="font-body-md text-text-muted mt-2">A selection of recent digital experiences and products.</p>
            </div>
            <Link href="/portfolio" className="hidden md:inline-flex glass-btn-secondary px-5 py-2.5 rounded-lg font-bold text-sm">
              View All Works
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {projects.map((proj) => (
              <div 
                key={proj.id}
                className="group relative rounded-3xl overflow-hidden glass-card glass-card-hover"
              >
                <div className="aspect-[16/10] overflow-hidden bg-gray-100 relative">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    src={proj.image} 
                    alt={proj.title}
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-primary font-bold text-xs rounded-full shadow-sm">
                      {proj.category}
                    </span>
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-secondary font-bold text-xs rounded-full shadow-sm">
                      {proj.subCategory}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black text-text-main mb-2 tracking-tight">{proj.title}</h3>
                  <p className="font-body-md text-text-muted mb-6 leading-relaxed">
                    {proj.description}
                  </p>
                  <a 
                    href={proj.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-primary font-bold text-label-md group-hover:gap-2 transition-all"
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
          <div className="mt-12 text-center md:hidden">
            <Link href="/portfolio" className="inline-flex glass-btn-secondary px-8 py-3.5 rounded-xl font-bold w-full justify-center">
              View All Projects
            </Link>
          </div>
        </section>

        {/* Interactive Tech Stack Showcase (NEW) */}
        <section className="bg-section-bg py-stack-xl border-y border-border-custom/30">
          <div className="px-margin-mobile md:px-gutter max-w-container-max mx-auto">
            <div className="text-center mb-stack-lg animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-black text-text-main tracking-tight">Core Tech Stack</h2>
              <p className="font-body-lg text-text-muted max-w-2xl mx-auto mt-2">The software, libraries, and design tools I leverage daily.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {techCategories.map((cat, idx) => (
                <div key={idx} className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-light text-primary flex items-center justify-center shrink-0 shadow-sm">
                      <span className="material-symbols-outlined text-xl font-bold">{cat.icon}</span>
                    </div>
                    <h3 className="font-black text-text-main text-lg tracking-tight">{cat.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="px-3 py-2 bg-white/70 border border-border-custom/50 text-xs font-bold text-text-main rounded-lg shadow-sm hover:border-primary/30 hover:text-primary transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="px-margin-mobile md:px-gutter max-w-container-max mx-auto py-stack-xl relative overflow-hidden" id="services">
          <div className="relative z-10">
            <div className="text-center mb-stack-lg animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-black text-text-main tracking-tight">Services & Capabilities</h2>
              <p className="font-body-lg text-text-muted max-w-2xl mx-auto mt-2">End-to-end technical integrations tailored to client specifications.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card glass-card-hover p-8 rounded-2xl flex flex-col gap-6">
                <div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-2xl font-bold">code</span>
                </div>
                <h3 className="text-xl font-bold text-text-main tracking-tight">Website Development</h3>
                <p className="font-body-md text-text-muted leading-relaxed">
                  Responsive corporate frontends built with modern libraries. Optimized loading speed, accessible DOM layouts, and beautiful styling systems.
                </p>
              </div>

              <div className="glass-card glass-card-hover p-8 rounded-2xl flex flex-col gap-6">
                <div className="w-12 h-12 rounded-xl bg-secondary-light text-secondary flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-2xl font-bold">database</span>
                </div>
                <h3 className="text-xl font-bold text-text-main tracking-tight">Platform Architecture</h3>
                <p className="font-body-md text-text-muted leading-relaxed">
                  Scalable express microservices, firestore collections, administrative dashboards, custom data endpoints, and backend logical code.
                </p>
              </div>

              <div className="glass-card glass-card-hover p-8 rounded-2xl flex flex-col gap-6">
                <div className="w-12 h-12 rounded-xl bg-accent-light text-accent flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-2xl font-bold">trending_up</span>
                </div>
                <h3 className="text-xl font-bold text-text-main tracking-tight">Digital Marketing Tech</h3>
                <p className="font-body-md text-text-muted leading-relaxed">
                  Configuring analytical funnels, custom landing pages, search console mappings, technical SEO tags, and conversion pipelines.
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

        {/* Latest Blog Posts Section (NEW) */}
        {blogs.length > 0 && (
          <section className="bg-section-bg py-stack-xl border-y border-border-custom/30">
            <div className="px-margin-mobile md:px-gutter max-w-container-max mx-auto">
              <div className="flex justify-between items-end mb-stack-lg animate-fade-in-up">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-text-main tracking-tight">Recent Insights</h2>
                  <p className="font-body-md text-text-muted mt-2">Articles covering website optimizations, layout design, and technical SEO.</p>
                </div>
                <Link href="/blog" className="hidden md:inline-flex glass-btn-secondary px-5 py-2.5 rounded-lg font-bold text-sm">
                  View All Posts
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogs.map((post) => (
                  <div key={post.id} className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="aspect-[16/10] overflow-hidden bg-gray-100 relative border-b border-border-custom/20">
                        <img className="w-full h-full object-cover" src={post.image} alt={post.title} />
                        <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-primary font-bold text-xs rounded-full shadow-sm">
                          {post.category}
                        </span>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-xs text-text-muted mb-3 font-semibold">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readingTime} read</span>
                        </div>
                        <h3 className="text-xl font-bold text-text-main mb-2 line-clamp-2 tracking-tight">{post.title}</h3>
                        <p className="text-sm text-text-muted line-clamp-3 leading-relaxed mb-4">{post.content}</p>
                      </div>
                    </div>
                    <div className="p-6 pt-0">
                      <Link href={`/blog/${post.slug}`} className="text-primary font-bold text-sm inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">
                        Read Article <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 text-center md:hidden">
                <Link href="/blog" className="inline-flex glass-btn-secondary px-8 py-3.5 rounded-xl font-bold w-full justify-center">
                  View All Blog Posts
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Testimonials Section */}
        <section className="px-margin-mobile md:px-gutter max-w-container-max mx-auto py-stack-xl">
          <div className="text-center mb-stack-lg">
            <h2 className="text-3xl md:text-4xl font-black text-text-main tracking-tight">Client Stories</h2>
            <p className="font-body-md text-text-muted mt-2">What clients say about our technical collaborations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div 
                key={t.id}
                className="glass-card glass-card-hover p-8 rounded-2xl flex flex-col justify-between"
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
                  <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-sm shadow-sm border border-white/80">
                    {t.author.charAt(0)}
                  </div>
                  <span className="font-bold text-text-main text-sm">{t.author}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Accordion Section (NEW) */}
        <section className="bg-section-bg py-stack-xl border-y border-border-custom/30">
          <div className="px-margin-mobile md:px-gutter max-w-3xl mx-auto">
            <div className="text-center mb-stack-lg animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-black text-text-main tracking-tight font-display-lg">Frequently Asked Questions</h2>
              <p className="font-body-md text-text-muted mt-2">Answers to key logistical questions regarding web projects.</p>
            </div>

            <div className="flex flex-col gap-4">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={idx} className="glass-card rounded-2xl overflow-hidden transition-all duration-300">
                    <button 
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-white/30 transition-colors"
                    >
                      <span className="font-bold text-text-main tracking-tight">{faq.q}</span>
                      <span className={`material-symbols-outlined text-text-muted transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                        keyboard_arrow_down
                      </span>
                    </button>
                    <div className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-60 border-t border-border-custom/25" : "max-h-0"}`}>
                      <div className="p-6 text-sm text-text-muted leading-relaxed">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner (NEW) */}
        <section className="px-margin-mobile md:px-gutter max-w-container-max mx-auto py-stack-xl">
          <div className="relative glass-card p-8 md:p-16 rounded-3xl overflow-hidden border border-border-custom/50 shadow-lg text-center flex flex-col items-center gap-6">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 pointer-events-none"></div>
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight leading-tight max-w-2xl relative z-10">
              Ready to build something premium together?
            </h2>
            <p className="font-body-lg text-lg text-text-muted max-w-lg leading-relaxed relative z-10">
              Let&apos;s talk about your project and build a high-performance web platform that sets your business apart.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4 relative z-10">
              <Link 
                href="/contact" 
                className="glass-btn-primary px-8 py-4 rounded-xl font-bold inline-flex items-center gap-2"
              >
                Hire Me Now
                <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
              </Link>
              <a 
                href="https://wa.me/919999999999" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="glass-btn-secondary px-8 py-4 rounded-xl font-bold inline-flex items-center gap-2"
              >
                WhatsApp Chat
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
