"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSettings } from "@/lib/db";

export default function AboutPage() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const s = await getSettings();
        setSettings(s);
      } catch (err) {
        console.error("Error loading about page data:", err);
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
          <p className="font-semibold text-text-muted">Loading journey...</p>
        </div>
      </div>
    );
  }

  const about = settings?.about || {};
  const skills = settings?.skills || [];

  return (
    <div className="min-h-screen bg-background-custom text-text-main flex flex-col">
      <Navbar />

      <main className="pt-20 w-full">
        {/* Hero Section */}
        <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-gutter py-stack-xl flex flex-col md:flex-row items-center gap-stack-lg">
          <div className="flex-1 space-y-stack-sm animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary font-bold text-xs uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              {about.badge || "My Journey"}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-text-main tracking-tight leading-tight">
              {about.title}
            </h1>
            <p className="font-body-lg text-lg text-text-muted leading-relaxed mt-6">
              {about.subtitle}
            </p>
          </div>
          <div className="flex-1 w-full relative animate-fade-in-up">
            <div className="aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden relative shadow-lg border border-border-custom/50">
              <img 
                className="w-full h-full object-cover" 
                alt="Shahid Khan portrait" 
                src={about.image} 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent mix-blend-overlay"></div>
            </div>
          </div>
        </section>

        {/* Detailed Career Story */}
        <section className="w-full bg-section-bg py-stack-xl border-y border-border-custom/30">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <h2 className="text-3xl font-bold tracking-tight text-text-main">
                  {about.storyTitle || "Turning Ideas Into Professional Digital Experiences"}
                </h2>
                <div className="mt-6 flex flex-col gap-4 text-sm font-semibold text-text-muted">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                    <span>Location: {about.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">work</span>
                    <span>Availability: {settings?.contact?.availability || "Open For Freelance Projects"}</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 space-y-6 text-text-muted leading-relaxed font-body-md text-base">
                {about.storyParagraphs?.map((p, idx) => (
                  <p key={idx}>{p}</p>
                )) || (
                  <p>I am a freelance web developer focused on design and functionality.</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Professional Timeline */}
        <section className="w-full bg-white py-stack-xl">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
            <div className="text-center mb-stack-lg">
              <h2 className="text-3xl md:text-4xl font-bold text-text-main tracking-tight">Professional Timeline</h2>
              <p className="font-body-md text-text-muted mt-2">The evolution of a digital craftsman.</p>
            </div>
            
            <div className="relative timeline-line py-8">
              {about.timeline?.map((item, idx) => (
                <div 
                  key={idx} 
                  className="relative flex items-center justify-between md:justify-normal md:even:flex-row-reverse group mb-stack-lg last:mb-0"
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-5 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white z-10 group-hover:scale-125 transition-transform duration-300 shadow-md ${idx === 0 ? "bg-primary" : "bg-text-muted"}`}></div>
                  
                  {/* Timeline Card */}
                  <div className="ml-12 md:ml-0 md:w-[45%] p-6 bg-white rounded-2xl border border-border-custom/50 shadow-sm group-hover:shadow-md transition-all duration-300">
                    <span className={`font-semibold text-xs mb-2 block ${idx === 0 ? "text-primary" : "text-text-muted"}`}>{item.year}</span>
                    <h3 className="text-xl font-bold mb-2 text-text-main">{item.title}</h3>
                    <p className="font-body-md text-text-muted text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Grid (Bento) */}
        <section className="w-full bg-section-bg py-stack-xl border-t border-border-custom/30">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
            <div className="mb-stack-lg text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-text-main tracking-tight">Technical Arsenal</h2>
              <p className="font-body-md text-text-muted mt-2">A curated stack of tools and technologies I use to bring ideas to life.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {skills.map((skill, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-3xl border border-border-custom/50 p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-6 transition-colors">
                    <span className="material-symbols-outlined text-2xl font-bold">{skill.icon || "code"}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-6 text-text-main">{skill.category}</h3>
                  
                  {skill.type === "tags" ? (
                    <div className="flex flex-col h-full justify-between">
                      <p className="font-body-md text-text-muted mb-6 leading-relaxed">{skill.description}</p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {skill.tags?.map((t, tid) => (
                          <span 
                            key={tid} 
                            className="px-3.5 py-1.5 bg-section-bg text-text-main font-semibold text-xs rounded-full border border-border-custom/30 hover:border-primary/50 transition-colors"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-auto space-y-4">
                      {skill.items?.map((item, iid) => (
                        <div key={iid}>
                          <div className="flex justify-between font-semibold text-xs mb-2">
                            <span className="text-text-main">{item.name}</span>
                            <span className="text-text-muted">{item.level}%</span>
                          </div>
                          <div className="h-2 w-full bg-section-bg rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${idx === 0 ? "bg-primary" : "bg-secondary"}`} 
                              style={{ width: `${item.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
