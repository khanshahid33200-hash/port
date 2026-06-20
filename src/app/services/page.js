"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      title: "Website Development",
      description: "Custom, responsive websites built with modern frameworks like React, Next.js, and Tailwind CSS. Focus on performance, accessibility, and pixel-perfect design.",
      icon: "code",
      accent: "bg-primary-light text-primary",
      features: ["React & Next.js SPAs/MPAs", "Tailwind CSS Styling", "Fluid Responsive Layouts", "Vercel / Netlify Deployments"]
    },
    {
      title: "Platform Architecture",
      description: "Scalable backend systems, API development, and database design using Node.js, Python, and modern cloud infrastructure to power your applications.",
      icon: "database",
      accent: "bg-secondary-light text-secondary",
      features: ["Node.js & Express REST APIs", "MongoDB / PostgreSQL Integration", "Firebase Authentication / JWT", "Cloud Hosting Configuration"]
    },
    {
      title: "Digital Marketing Tech",
      description: "Integration of analytics, CRM systems, and marketing automation tools to ensure your digital presence actively contributes to business growth.",
      icon: "trending_up",
      accent: "bg-accent-light text-accent",
      features: ["Google Analytics & Tag Manager", "Mailchimp & SendGrid Integrations", "Technical SEO Audits", "Custom Conversion Rate Funnels"]
    },
    {
      title: "Landing Page Development",
      description: "High-converting landing pages designed specifically for marketing campaigns, product launches, and lead generation.",
      icon: "web_asset",
      accent: "bg-primary-light text-primary",
      features: ["Optimized User Journeys", "A/B Testing Integrations", "Lead Storage & Notifications", "Ultra-fast Page Speeds"]
    },
    {
      title: "Portfolio Websites",
      description: "Personal and professional portfolio websites that showcase your expertise, achievements, and case studies in a premium light.",
      icon: "person",
      accent: "bg-secondary-light text-secondary",
      features: ["Custom Bento / Minimalist Layouts", "Interactive Showcases", "Dynamic Content Management", "Responsive Mobile Optimizations"]
    },
    {
      title: "Website Management",
      description: "Ongoing updates, content management, technical search engine optimization, and routine maintenance support.",
      icon: "settings",
      accent: "bg-accent-light text-accent",
      features: ["Regular Content Updates", "Plugin & Security Patching", "Core Web Vitals Auditing", "Emergency Technical Support"]
    }
  ];

  return (
    <div className="min-h-screen bg-background-custom text-text-main flex flex-col">
      <Navbar />

      <main className="pt-20">
        {/* Header Section */}
        <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-gutter py-stack-xl text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary font-bold text-xs uppercase tracking-wider mb-4 animate-fade-in-up">
            Services
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-text-main tracking-tight leading-tight animate-fade-in-up">
            Core Capabilities
          </h1>
          <p className="font-body-lg text-lg text-text-muted mt-6 leading-relaxed animate-fade-in-up">
            End-to-end technical solutions designed for modern business needs. I bridge the gap between technical complexity and user-centric design.
          </p>
        </section>

        {/* Detailed Services Grid */}
        <section className="bg-section-bg py-stack-xl border-y border-border-custom/30">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-3xl border border-border-custom/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${service.accent}`}>
                      <span className="material-symbols-outlined text-2xl font-bold">{service.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold text-text-main mb-3">{service.title}</h3>
                    <p className="font-body-md text-text-muted text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="border-t border-border-custom/30 pt-6 mt-4">
                    <h4 className="font-bold text-xs text-text-main uppercase tracking-wider mb-3">Key Deliverables</h4>
                    <ul className="space-y-2">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-text-muted font-medium">
                          <span className="material-symbols-outlined text-primary text-xs font-bold">check</span>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="w-full bg-white py-stack-xl">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter text-center max-w-3xl flex flex-col items-center gap-6">
            <h2 className="text-3xl md:text-4xl font-bold text-text-main tracking-tight">
              Ready to start your project?
            </h2>
            <p className="font-body-lg text-lg text-text-muted leading-relaxed">
              Whether you need a business website, portfolio website, landing page, or a complete custom web solution, I would be happy to discuss how I can help you succeed.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-2">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center bg-primary text-white font-label-md text-label-md px-8 py-4 rounded-lg font-bold hover:bg-primary-hover transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-transform"
              >
                Let&apos;s Talk
              </Link>
              <Link 
                href="/portfolio" 
                className="inline-flex items-center justify-center bg-white text-primary border border-primary font-label-md text-label-md px-8 py-4 rounded-lg font-bold hover:bg-primary-light transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-transform"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
