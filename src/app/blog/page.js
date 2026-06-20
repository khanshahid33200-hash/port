"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBlogs } from "@/lib/db";

export default function BlogIndexPage() {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const b = await getBlogs();
        setBlogs(b);
        
        const cats = ["All", ...new Set(b.map((post) => post.category))];
        setCategories(cats);
      } catch (err) {
        console.error("Error loading blogs data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredBlogs = blogs.filter((post) => {
    const matchesSearch = 
      searchQuery.trim() === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      activeCategory === "All" || 
      post.category === activeCategory;
      
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-4xl text-primary animate-spin">
            sync
          </span>
          <p className="font-semibold text-text-muted">Loading articles...</p>
        </div>
      </div>
    );
  }

  // Find the featured blog post (usually the newest one)
  const featuredPost = blogs.length > 0 ? blogs[0] : null;
  const standardPosts = filteredBlogs.filter(p => p.id !== featuredPost?.id || activeCategory !== "All" || searchQuery !== "");

  return (
    <div className="min-h-screen bg-background-custom text-text-main flex flex-col">
      <Navbar />

      <main className="pt-20">
        {/* Header Section */}
        <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-gutter py-stack-xl text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary font-bold text-xs uppercase tracking-wider mb-4 animate-fade-in-up">
            Blog
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-text-main tracking-tight leading-tight animate-fade-in-up">
            Latest Articles
          </h1>
          <p className="font-body-lg text-lg text-text-muted mt-6 leading-relaxed animate-fade-in-up">
            Tips, guides, and thoughts on website development, SEO, and AI productivity tools.
          </p>
        </section>

        {/* Search & Categories */}
        <section className="w-full pb-8">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter space-y-6">
            <div className="max-w-md mx-auto relative">
              <span className="material-symbols-outlined text-text-muted absolute left-4 top-1/2 transform -translate-y-1/2">
                search
              </span>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-border-custom/50 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 font-medium text-sm"
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full font-bold text-xs transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-primary text-white shadow-sm"
                      : "bg-white text-text-muted border border-border-custom/50 hover:border-primary/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Layout */}
        <section className="bg-section-bg py-stack-xl border-y border-border-custom/30">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter space-y-12">
            
            {/* Featured Post Card (only shown when no query/category is active) */}
            {activeCategory === "All" && searchQuery === "" && featuredPost && (
              <div className="bg-white rounded-3xl border border-border-custom/50 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden bg-gray-100 min-h-[300px]">
                  <img 
                    className="w-full h-full object-cover" 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="px-3.5 py-1 bg-primary-light text-primary font-bold text-xs rounded-full">
                        Featured Post
                      </span>
                      <span className="text-xs text-text-muted font-semibold">{featuredPost.date}</span>
                      <span className="text-xs text-text-muted font-semibold">•</span>
                      <span className="text-xs text-text-muted font-semibold">{featuredPost.readingTime} read</span>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-black text-text-main hover:text-primary transition-colors">
                      <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                    </h2>
                    
                    <p className="font-body-md text-text-muted leading-relaxed line-clamp-3">
                      {featuredPost.content}
                    </p>
                  </div>
                  
                  <Link 
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center text-primary font-bold mt-6 hover:gap-2 transition-all gap-1"
                  >
                    Read Article 
                    <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Standard Grid Layout */}
            {standardPosts.length === 0 && (!featuredPost || activeCategory !== "All" || searchQuery !== "") ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-border-custom/50">
                <span className="material-symbols-outlined text-4xl text-text-muted mb-4">
                  search_off
                </span>
                <p className="text-text-muted font-semibold">No articles found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
                {standardPosts.map((post) => (
                  <div 
                    key={post.id}
                    className="bg-white rounded-3xl border border-border-custom/50 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                        <img 
                          className="w-full h-full object-cover" 
                          src={post.image} 
                          alt={post.title} 
                        />
                      </div>
                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-3 text-xs text-text-muted font-semibold">
                          <span className="text-primary">{post.category}</span>
                          <span>•</span>
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readingTime}</span>
                        </div>
                        <h3 className="text-xl font-bold text-text-main line-clamp-2 hover:text-primary transition-colors">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>
                        <p className="font-body-md text-text-muted text-sm leading-relaxed line-clamp-3">
                          {post.content}
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-6 pt-0 mt-4">
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-primary font-bold text-sm hover:gap-2 transition-all gap-1"
                      >
                        Read Article 
                        <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                      </Link>
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
