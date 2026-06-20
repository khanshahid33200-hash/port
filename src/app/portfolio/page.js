"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProjects } from "@/lib/db";

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const p = await getProjects();
        setProjects(p);
        setFilteredProjects(p);

        // Extract unique categories
        const cats = ["All", ...new Set(p.map((proj) => proj.category))];
        setCategories(cats);
      } catch (err) {
        console.error("Error loading portfolio data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleFilterClick = (cat) => {
    setActiveFilter(cat);
    if (cat === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((p) => p.category === cat));
    }
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

  return (
    <div className="min-h-screen bg-background-custom text-text-main flex flex-col">
      <Navbar />

      <main className="pt-20">
        {/* Header Section */}
        <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-gutter py-stack-xl text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary font-bold text-xs uppercase tracking-wider mb-4">
            Portfolio
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-text-main tracking-tight leading-tight">
            Featured Work
          </h1>
          <p className="font-body-lg text-lg text-text-muted mt-6 leading-relaxed">
            A selection of recent digital experiences and technical solutions I have built.
          </p>
        </section>

        {/* Filter Navigation */}
        <section className="w-full pb-8">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterClick(cat)}
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-primary text-white shadow-sm"
                    : "bg-white text-text-muted border border-border-custom/50 hover:border-primary/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Projects Grid */}
        <section className="bg-section-bg py-stack-xl border-y border-border-custom/30">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-border-custom/50">
                <span className="material-symbols-outlined text-4xl text-text-muted mb-4">
                  search_off
                </span>
                <p className="text-text-muted font-semibold">No projects found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                {filteredProjects.map((proj) => (
                  <div 
                    key={proj.id}
                    className="group relative rounded-3xl overflow-hidden bg-white border border-border-custom/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
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
                      
                      {/* Project Features / Tags */}
                      {proj.features && proj.features.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-bold text-xs text-text-main uppercase tracking-wider mb-2">Key Features</h4>
                          <div className="flex flex-wrap gap-2">
                            {proj.features.map((feat, idx) => (
                              <span key={idx} className="text-xs bg-section-bg text-text-muted px-2.5 py-1 rounded-md border border-border-custom/30">
                                {feat}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

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
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
