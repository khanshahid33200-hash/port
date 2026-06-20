"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { addInquiry } from "@/lib/db";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields.");
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      await addInquiry(formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setError("Failed to send message. Please try again or email directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-custom text-text-main flex flex-col">
      <Navbar />

      <main className="pt-20">
        {/* Header Section */}
        <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-gutter py-stack-xl text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary font-bold text-xs uppercase tracking-wider mb-4">
            Contact
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-text-main tracking-tight leading-tight">
            Let&apos;s Build Something Great Together
          </h1>
          <p className="font-body-lg text-lg text-text-muted mt-6 leading-relaxed">
            Whether you need a business website, portfolio website, landing page, or a custom full-stack web application, I would be happy to discuss your project.
          </p>
        </section>

        {/* Contact Form & Info Grid */}
        <section className="bg-section-bg py-stack-xl border-y border-border-custom/30">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              
              {/* Form Section */}
              <div className="lg:col-span-3 bg-white p-8 md:p-10 rounded-3xl border border-border-custom/50 shadow-sm">
                {submitted ? (
                  <div className="text-center py-10 flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-secondary-light text-secondary flex items-center justify-center mb-2">
                      <span className="material-symbols-outlined text-4xl font-bold">check_circle</span>
                    </div>
                    <h3 className="text-2xl font-bold text-text-main">Message Sent Successfully!</h3>
                    <p className="text-text-muted max-w-md">
                      Thank you for reaching out. I have received your message and will get back to you shortly.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="mt-4 bg-primary text-white font-bold px-6 py-2.5 rounded-lg hover:bg-primary-hover transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="text-2xl font-bold text-text-main mb-4">Send a Message</h3>
                    
                    {error && (
                      <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm font-semibold flex items-center gap-2">
                        <span className="material-symbols-outlined">error</span>
                        {error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-bold text-text-main">
                          Your Name <span className="text-primary">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-border-custom/50 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 font-medium text-sm"
                        />
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-bold text-text-main">
                          Email Address <span className="text-primary">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-border-custom/50 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 font-medium text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="text-sm font-bold text-text-main">
                        Phone Number <span className="text-text-muted font-normal">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 rounded-xl border border-border-custom/50 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 font-medium text-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-sm font-bold text-text-main">
                        Message <span className="text-primary">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project, goals, and timeline..."
                        required
                        rows="5"
                        className="w-full px-4 py-3 rounded-xl border border-border-custom/50 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 font-medium text-sm resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <span className="material-symbols-outlined animate-spin text-lg">sync</span>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-lg">send</span>
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Info Section */}
              <div className="lg:col-span-2 space-y-8 flex flex-col justify-between">
                <div className="space-y-6 bg-white p-8 rounded-3xl border border-border-custom/50 shadow-sm h-full">
                  <h3 className="text-2xl font-bold text-text-main">Contact Information</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary-light text-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-xl">mail</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-text-muted uppercase tracking-wider">Email Me</h4>
                        <a href="mailto:shahidbcsm@gmail.com" className="font-semibold text-text-main hover:text-primary transition-colors mt-1 block">
                          shahidbcsm@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-secondary-light text-secondary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-xl">location_on</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-text-muted uppercase tracking-wider">Location</h4>
                        <p className="font-semibold text-text-main mt-1">
                          Jaipur, Rajasthan, India
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent-light text-accent flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-xl">schedule</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-text-muted uppercase tracking-wider">Availability</h4>
                        <p className="font-semibold text-text-main mt-1">
                          Open For Freelance Projects
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border-custom/30 pt-6 mt-6">
                    <h4 className="font-bold text-xs text-text-muted uppercase tracking-wider mb-4">Quick Connect</h4>
                    <div className="flex flex-col gap-3">
                      <a 
                        href="https://wa.me/919999999999" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-[#25D366] text-white font-bold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity gap-2 w-full text-center"
                      >
                        <span className="material-symbols-outlined text-lg">chat</span>
                        Message on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
