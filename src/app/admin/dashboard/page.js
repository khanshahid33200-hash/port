"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  getSettings, 
  updateSettings, 
  getProjects, 
  addProject, 
  updateProject, 
  deleteProject,
  getBlogs, 
  addBlog, 
  updateBlog, 
  deleteBlog,
  getTestimonials, 
  addTestimonial, 
  deleteTestimonial,
  getInquiries, 
  updateInquiryStatus, 
  seedAll 
} from "@/lib/db";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState("leads"); // leads, content, projects, blogs, testimonials, seo
  const [loading, setLoading] = useState(true);

  // Form states
  const [settings, setSettings] = useState({});
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  // Modals & temporary editing states
  const [projectForm, setProjectForm] = useState({ id: "", title: "", category: "Web Dev", subCategory: "", description: "", image: "", link: "", features: "" });
  const [blogForm, setBlogForm] = useState({ id: "", title: "", category: "Web Dev", content: "", image: "", readingTime: "5 min", slug: "" });
  const [testimonialForm, setTestimonialForm] = useState({ content: "", author: "", rating: 5 });
  const [editingId, setEditingId] = useState("");
  const [showProjModal, setShowProjModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  
  // Status message
  const [message, setMessage] = useState({ text: "", type: "" });

  const showStatus = useCallback((text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 4000);
  }, []);

  const loadAllData = useCallback(async () => {
    await Promise.resolve();
    setLoading(true);
    setAuthorized(true);
    try {
      const s = await getSettings();
      const p = await getProjects();
      const b = await getBlogs();
      const t = await getTestimonials();
      const i = await getInquiries();

      setSettings(s);
      setProjects(p);
      setBlogs(b);
      setTestimonials(t);
      setInquiries(i);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
      showStatus("Failed to load some dashboard data.", "error");
    } finally {
      setLoading(false);
    }
  }, [showStatus]);

  useEffect(() => {
    // Auth Check
    const token = localStorage.getItem("admin_token");
    if (token !== "shahid_admin_authenticated") {
      router.push("/admin/login");
    } else {
      const timer = setTimeout(() => {
        loadAllData();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [router, loadAllData]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  const handleSeedDb = async () => {
    setLoading(true);
    const success = await seedAll();
    if (success) {
      showStatus("Database seeded successfully with default values!");
      await loadAllData();
    } else {
      showStatus("Seeding failed. Check browser console.", "error");
    }
    setLoading(false);
  };

  // 1. Content & Settings Saves
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateSettings(settings);
      showStatus("Content settings saved successfully!");
    } catch (err) {
      showStatus("Failed to save content settings.", "error");
    } finally {
      setLoading(false);
    }
  };

  // 2. Project Actions
  const handleProjSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const featuresArray = typeof projectForm.features === "string" 
      ? projectForm.features.split(",").map(f => f.trim()).filter(Boolean)
      : projectForm.features;
    const data = { ...projectForm, features: featuresArray };

    try {
      if (editingId) {
        await updateProject(editingId, data);
        showStatus("Project updated successfully!");
      } else {
        await addProject(data);
        showStatus("Project added successfully!");
      }
      setShowProjModal(false);
      setProjectForm({ id: "", title: "", category: "Web Dev", subCategory: "", description: "", image: "", link: "", features: "" });
      setEditingId("");
      await loadAllData();
    } catch (err) {
      showStatus("Failed to save project.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditProj = (proj) => {
    setProjectForm({
      ...proj,
      features: proj.features ? proj.features.join(", ") : ""
    });
    setEditingId(proj.id);
    setShowProjModal(true);
  };

  const handleDeleteProj = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setLoading(true);
    try {
      await deleteProject(id);
      showStatus("Project deleted successfully!");
      await loadAllData();
    } catch (err) {
      showStatus("Failed to delete project.", "error");
    } finally {
      setLoading(false);
    }
  };

  // 3. Blog Actions
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const slug = blogForm.slug || blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const date = new Date().toISOString().split("T")[0];
    const data = { ...blogForm, slug, date };

    try {
      if (editingId) {
        await updateBlog(editingId, data);
        showStatus("Blog post updated successfully!");
      } else {
        await addBlog(data);
        showStatus("Blog post added successfully!");
      }
      setShowBlogModal(false);
      setBlogForm({ id: "", title: "", category: "Web Dev", content: "", image: "", readingTime: "5 min", slug: "" });
      setEditingId("");
      await loadAllData();
    } catch (err) {
      showStatus("Failed to save blog post.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditBlog = (blog) => {
    setBlogForm(blog);
    setEditingId(blog.id);
    setShowBlogModal(true);
  };

  const handleDeleteBlog = async (id) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    setLoading(true);
    try {
      await deleteBlog(id);
      showStatus("Blog post deleted successfully!");
      await loadAllData();
    } catch (err) {
      showStatus("Failed to delete blog post.", "error");
    } finally {
      setLoading(false);
    }
  };

  // 4. Testimonial Actions
  const handleTestSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addTestimonial(testimonialForm);
      showStatus("Testimonial added successfully!");
      setShowTestModal(false);
      setTestimonialForm({ content: "", author: "", rating: 5 });
      await loadAllData();
    } catch (err) {
      showStatus("Failed to add testimonial.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTest = async (id) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    setLoading(true);
    try {
      await deleteTestimonial(id);
      showStatus("Testimonial deleted successfully!");
      await loadAllData();
    } catch (err) {
      showStatus("Failed to delete testimonial.", "error");
    } finally {
      setLoading(false);
    }
  };

  // 5. Inquiry Actions
  const handleInquiryRead = async (id, currentStatus) => {
    setLoading(true);
    try {
      const nextStatus = currentStatus === "unread" ? "read" : "unread";
      await updateInquiryStatus(id, nextStatus);
      showStatus(`Inquiry marked as ${nextStatus}!`);
      await loadAllData();
    } catch (err) {
      showStatus("Failed to update inquiry status.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-section-bg flex flex-col font-sans">
      
      {/* Top Navbar */}
      <header className="bg-white border-b border-border-custom h-20 px-6 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-headline-lg text-headline-lg font-black text-primary tracking-tighter">
            Shahid Khan
          </Link>
          <span className="bg-gray-100 text-text-muted font-bold text-xs px-2.5 py-1 rounded-md">CMS Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSeedDb}
            className="hidden sm:inline-flex items-center gap-2 border border-primary text-primary font-bold text-xs px-4 py-2.5 rounded-lg hover:bg-primary-light transition-colors"
          >
            <span className="material-symbols-outlined text-sm font-bold">database</span>
            Seed Default Data
          </button>
          <button 
            onClick={handleLogout}
            className="bg-red-50 text-red-600 border border-red-100 font-bold text-xs px-4 py-2.5 rounded-lg hover:bg-red-100/50 transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            Logout
          </button>
        </div>
      </header>

      {/* Main Panel Layout */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 md:p-6 gap-6">
        
        {/* Left Side Tab Navigation */}
        <aside className="md:w-64 bg-white p-4 rounded-3xl border border-border-custom/50 shadow-sm shrink-0 flex flex-row md:flex-col gap-1 overflow-x-auto">
          {[
            { id: "leads", label: "Leads (Inquiries)", icon: "mail" },
            { id: "content", label: "Website Content", icon: "edit_document" },
            { id: "projects", label: "Projects Portfolio", icon: "work" },
            { id: "blogs", label: "Blogs CMS", icon: "article" },
            { id: "testimonials", label: "Testimonials", icon: "reviews" },
            { id: "seo", label: "SEO Config", icon: "search" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors shrink-0 ${
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "text-text-muted hover:bg-gray-50 hover:text-text-main"
              }`}
            >
              <span className="material-symbols-outlined text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </aside>

        {/* Right Side Content Area */}
        <main className="flex-1 bg-white p-6 md:p-8 rounded-3xl border border-border-custom/50 shadow-sm">
          
          {/* Status Message Alerts */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-xl text-sm font-semibold flex items-center gap-2 border ${
              message.type === "error" 
                ? "bg-red-50 text-red-600 border-red-100" 
                : "bg-green-50 text-green-700 border-green-100"
            }`}>
              <span className="material-symbols-outlined text-lg">
                {message.type === "error" ? "error" : "check_circle"}
              </span>
              {message.text}
            </div>
          )}

          {/* Loader Overlay */}
          {loading && (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
              <span className="material-symbols-outlined text-3xl text-primary animate-spin">sync</span>
              <p className="text-xs font-semibold text-text-muted">Processing request...</p>
            </div>
          )}

          {!loading && (
            <>
              {/* TAB 1: LEADS (INQUIRIES) */}
              {activeTab === "leads" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-border-custom/50 pb-4">
                    <h2 className="text-2xl font-bold text-text-main">Client Leads</h2>
                    <span className="bg-primary-light text-primary font-bold text-xs px-3 py-1 rounded-full">
                      {inquiries.filter(i => i.status === "unread").length} Unread
                    </span>
                  </div>

                  {inquiries.length === 0 ? (
                    <p className="text-text-muted text-center py-12">No inquiries received yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {inquiries.map((inq) => (
                        <div 
                          key={inq.id}
                          className={`p-6 rounded-2xl border transition-all ${
                            inq.status === "unread" 
                              ? "bg-primary-light/20 border-primary/20" 
                              : "bg-white border-border-custom/50"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                            <div>
                              <h4 className="font-bold text-text-main text-base">{inq.name}</h4>
                              <p className="text-xs text-text-muted">{inq.date ? new Date(inq.date).toLocaleString() : ""}</p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleInquiryRead(inq.id, inq.status)}
                                className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${
                                  inq.status === "unread"
                                    ? "bg-primary text-white hover:bg-primary-hover"
                                    : "bg-gray-100 text-text-muted hover:bg-gray-200"
                                }`}
                              >
                                {inq.status === "unread" ? "Mark Read" : "Mark Unread"}
                              </button>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm text-text-muted">
                            <p><strong>Email:</strong> <a href={`mailto:${inq.email}`} className="text-primary hover:underline">{inq.email}</a></p>
                            {inq.phone && <p><strong>Phone:</strong> {inq.phone}</p>}
                            <p className="bg-gray-50/50 p-4 rounded-xl text-text-main leading-relaxed mt-2 border border-gray-100">
                              {inq.message}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: WEBSITE CONTENT (HERO & ABOUT) */}
              {activeTab === "content" && (
                <form onSubmit={handleSaveSettings} className="space-y-8">
                  <div className="border-b border-border-custom/50 pb-4">
                    <h2 className="text-2xl font-bold text-text-main">Edit Homepage & About Content</h2>
                  </div>

                  {/* Hero Settings */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-primary border-l-4 border-primary pl-2.5">Hero Section</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-text-main">Badge Indicator</label>
                        <input
                          type="text"
                          value={settings.hero?.badge || ""}
                          onChange={(e) => setSettings({
                            ...settings,
                            hero: { ...settings.hero, badge: e.target.value }
                          })}
                          className="px-4 py-2.5 border border-border-custom rounded-xl font-medium text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-text-main">Hero Title</label>
                        <input
                          type="text"
                          value={settings.hero?.title || ""}
                          onChange={(e) => setSettings({
                            ...settings,
                            hero: { ...settings.hero, title: e.target.value }
                          })}
                          className="px-4 py-2.5 border border-border-custom rounded-xl font-medium text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-text-main">Hero Subtitle</label>
                      <textarea
                        rows="3"
                        value={settings.hero?.subtitle || ""}
                        onChange={(e) => setSettings({
                          ...settings,
                          hero: { ...settings.hero, subtitle: e.target.value }
                        })}
                        className="px-4 py-2.5 border border-border-custom rounded-xl font-medium text-sm resize-none"
                      />
                    </div>
                  </div>

                  {/* About Settings */}
                  <div className="space-y-4 pt-4 border-t border-border-custom/30">
                    <h3 className="text-lg font-bold text-primary border-l-4 border-primary pl-2.5">About Section</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-text-main">Badge Title</label>
                        <input
                          type="text"
                          value={settings.about?.badge || ""}
                          onChange={(e) => setSettings({
                            ...settings,
                            about: { ...settings.about, badge: e.target.value }
                          })}
                          className="px-4 py-2.5 border border-border-custom rounded-xl font-medium text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-text-main">Heading Title</label>
                        <input
                          type="text"
                          value={settings.about?.title || ""}
                          onChange={(e) => setSettings({
                            ...settings,
                            about: { ...settings.about, title: e.target.value }
                          })}
                          className="px-4 py-2.5 border border-border-custom rounded-xl font-medium text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-text-main">Sub-heading Text</label>
                      <textarea
                        rows="3"
                        value={settings.about?.subtitle || ""}
                        onChange={(e) => setSettings({
                          ...settings,
                          about: { ...settings.about, subtitle: e.target.value }
                        })}
                        className="px-4 py-2.5 border border-border-custom rounded-xl font-medium text-sm resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-text-main">Story Title</label>
                        <input
                          type="text"
                          value={settings.about?.storyTitle || ""}
                          onChange={(e) => setSettings({
                            ...settings,
                            about: { ...settings.about, storyTitle: e.target.value }
                          })}
                          className="px-4 py-2.5 border border-border-custom rounded-xl font-medium text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-text-main">Location Info</label>
                        <input
                          type="text"
                          value={settings.about?.location || ""}
                          onChange={(e) => setSettings({
                            ...settings,
                            about: { ...settings.about, location: e.target.value }
                          })}
                          className="px-4 py-2.5 border border-border-custom rounded-xl font-medium text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary-hover transition-colors shadow-sm"
                  >
                    Save Changes
                  </button>
                </form>
              )}

              {/* TAB 3: PORTFOLIO PROJECTS */}
              {activeTab === "projects" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-border-custom/50 pb-4">
                    <h2 className="text-2xl font-bold text-text-main">Portfolio Projects</h2>
                    <button
                      onClick={() => {
                        setEditingId("");
                        setProjectForm({ id: "", title: "", category: "Web Dev", subCategory: "", description: "", image: "", link: "", features: "" });
                        setShowProjModal(true);
                      }}
                      className="bg-primary text-white font-bold text-sm px-4 py-2.5 rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm font-bold">add</span>
                      Add Project
                    </button>
                  </div>

                  {/* Projects List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((proj) => (
                      <div key={proj.id} className="p-5 border border-border-custom/50 rounded-2xl bg-white shadow-sm flex flex-col justify-between">
                        <div>
                          <div className="aspect-video rounded-xl overflow-hidden bg-gray-50 border border-gray-100 mb-4">
                            <img className="w-full h-full object-cover" src={proj.image} alt={proj.title} />
                          </div>
                          <h4 className="font-bold text-text-main text-lg mb-1">{proj.title}</h4>
                          <div className="flex gap-2 mb-3">
                            <span className="bg-primary-light text-primary font-bold text-[10px] px-2.5 py-0.5 rounded-full">{proj.category}</span>
                            <span className="bg-secondary-light text-secondary font-bold text-[10px] px-2.5 py-0.5 rounded-full">{proj.subCategory}</span>
                          </div>
                          <p className="text-xs text-text-muted leading-relaxed line-clamp-3 mb-4">{proj.description}</p>
                        </div>
                        <div className="flex gap-2 border-t border-border-custom/30 pt-4">
                          <button
                            onClick={() => handleEditProj(proj)}
                            className="flex-1 bg-gray-50 border border-gray-200 text-text-main font-semibold text-xs py-2 rounded-md hover:bg-gray-100 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProj(proj.id)}
                            className="bg-red-50 border border-red-100 text-red-600 font-semibold text-xs px-4 py-2 rounded-md hover:bg-red-100/50 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Project Modal Overlay */}
                  {showProjModal && (
                    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                      <div className="bg-white w-full max-w-xl p-8 rounded-3xl border border-border-custom shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
                        <div className="flex justify-between items-center border-b border-border-custom/50 pb-3">
                          <h3 className="text-xl font-bold text-text-main">{editingId ? "Edit Project" : "Add Project"}</h3>
                          <button onClick={() => setShowProjModal(false)} className="text-text-muted hover:text-text-main">
                            <span className="material-symbols-outlined">close</span>
                          </button>
                        </div>
                        
                        <form onSubmit={handleProjSubmit} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-bold text-text-main">Title *</label>
                              <input
                                type="text"
                                required
                                value={projectForm.title}
                                onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                                className="px-3.5 py-2 border border-border-custom rounded-xl text-sm font-medium"
                              />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-bold text-text-main">Category *</label>
                              <select
                                value={projectForm.category}
                                onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                                className="px-3.5 py-2 border border-border-custom rounded-xl text-sm font-medium"
                              >
                                <option value="Web Dev">Web Dev</option>
                                <option value="Full Stack">Full Stack</option>
                                <option value="Design">Design</option>
                                <option value="Marketing">Marketing</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-bold text-text-main">Sub-Category (e.g. NGO, Agency) *</label>
                              <input
                                type="text"
                                required
                                value={projectForm.subCategory}
                                onChange={(e) => setProjectForm({ ...projectForm, subCategory: e.target.value })}
                                className="px-3.5 py-2 border border-border-custom rounded-xl text-sm font-medium"
                              />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-bold text-text-main">Project Live URL *</label>
                              <input
                                type="url"
                                required
                                value={projectForm.link}
                                onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                                className="px-3.5 py-2 border border-border-custom rounded-xl text-sm font-medium"
                              />
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-text-main">Screenshot URL *</label>
                            <input
                              type="text"
                              required
                              value={projectForm.image}
                              onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                              className="px-3.5 py-2 border border-border-custom rounded-xl text-sm font-medium"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-text-main">Key Features (comma-separated list)</label>
                            <input
                              type="text"
                              value={projectForm.features}
                              onChange={(e) => setProjectForm({ ...projectForm, features: e.target.value })}
                              placeholder="Responsive Design, Live Admin Dashboard, SEO Setup"
                              className="px-3.5 py-2 border border-border-custom rounded-xl text-sm font-medium"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-text-main">Description *</label>
                            <textarea
                              required
                              rows="3"
                              value={projectForm.description}
                              onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                              className="px-3.5 py-2 border border-border-custom rounded-xl text-sm font-medium resize-none"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-hover transition-colors"
                          >
                            {editingId ? "Update Project" : "Add Project"}
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: BLOGS CMS */}
              {activeTab === "blogs" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-border-custom/50 pb-4">
                    <h2 className="text-2xl font-bold text-text-main">Blog Management</h2>
                    <button
                      onClick={() => {
                        setEditingId("");
                        setBlogForm({ id: "", title: "", category: "Web Dev", content: "", image: "", readingTime: "5 min", slug: "" });
                        setShowBlogModal(true);
                      }}
                      className="bg-primary text-white font-bold text-sm px-4 py-2.5 rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm font-bold">add</span>
                      Write Article
                    </button>
                  </div>

                  {/* Blogs list */}
                  <div className="space-y-4">
                    {blogs.map((blog) => (
                      <div key={blog.id} className="p-4 border border-border-custom/50 rounded-xl bg-white shadow-sm flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-100">
                            <img className="w-full h-full object-cover" src={blog.image} alt={blog.title} />
                          </div>
                          <div>
                            <h4 className="font-bold text-text-main text-sm">{blog.title}</h4>
                            <p className="text-xs text-text-muted mt-0.5">{blog.date} • {blog.category} • {blog.readingTime}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditBlog(blog)}
                            className="bg-gray-50 border border-gray-200 text-text-main font-semibold text-xs px-3.5 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(blog.id)}
                            className="bg-red-50 border border-red-100 text-red-600 font-semibold text-xs px-3.5 py-2 rounded-lg hover:bg-red-100/50 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Blog Write Modal */}
                  {showBlogModal && (
                    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                      <div className="bg-white w-full max-w-2xl p-8 rounded-3xl border border-border-custom shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
                        <div className="flex justify-between items-center border-b border-border-custom/50 pb-3">
                          <h3 className="text-xl font-bold text-text-main">{editingId ? "Edit Article" : "Write Article"}</h3>
                          <button onClick={() => setShowBlogModal(false)} className="text-text-muted hover:text-text-main">
                            <span className="material-symbols-outlined">close</span>
                          </button>
                        </div>

                        <form onSubmit={handleBlogSubmit} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-bold text-text-main">Article Title *</label>
                              <input
                                type="text"
                                required
                                value={blogForm.title}
                                onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                                className="px-3.5 py-2 border border-border-custom rounded-xl text-sm font-medium"
                              />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-bold text-text-main">Category *</label>
                              <input
                                type="text"
                                required
                                value={blogForm.category}
                                onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                                placeholder="Web Dev, SEO, AI Tools"
                                className="px-3.5 py-2 border border-border-custom rounded-xl text-sm font-medium"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-bold text-text-main">Custom URL Slug (e.g. website-tips) *</label>
                              <input
                                type="text"
                                required
                                value={blogForm.slug}
                                onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                                className="px-3.5 py-2 border border-border-custom rounded-xl text-sm font-medium"
                              />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-bold text-text-main">Reading Time Estimate *</label>
                              <input
                                type="text"
                                required
                                value={blogForm.readingTime}
                                onChange={(e) => setBlogForm({ ...blogForm, readingTime: e.target.value })}
                                placeholder="5 min"
                                className="px-3.5 py-2 border border-border-custom rounded-xl text-sm font-medium"
                              />
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-text-main">Cover Image URL *</label>
                            <input
                              type="text"
                              required
                              value={blogForm.image}
                              onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                              className="px-3.5 py-2 border border-border-custom rounded-xl text-sm font-medium"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-text-main">Article Content (markdown format or paragraphs separated by double enter) *</label>
                            <textarea
                              required
                              rows="8"
                              value={blogForm.content}
                              onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                              className="px-3.5 py-2 border border-border-custom rounded-xl text-sm font-medium resize-none font-mono"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary-hover transition-colors"
                          >
                            {editingId ? "Update Article" : "Publish Article"}
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: TESTIMONIALS */}
              {activeTab === "testimonials" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-border-custom/50 pb-4">
                    <h2 className="text-2xl font-bold text-text-main">Testimonials</h2>
                    <button
                      onClick={() => setShowTestModal(true)}
                      className="bg-primary text-white font-bold text-sm px-4 py-2.5 rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm font-bold">add</span>
                      Add Testimonial
                    </button>
                  </div>

                  {/* Reviews list */}
                  <div className="space-y-4">
                    {testimonials.map((t) => (
                      <div key={t.id} className="p-5 border border-border-custom/50 rounded-xl bg-white shadow-sm flex justify-between items-start gap-4">
                        <div>
                          <div className="flex gap-1 text-accent mb-2">
                            {[...Array(t.rating || 5)].map((_, i) => (
                              <span key={i} className="material-symbols-outlined text-sm fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            ))}
                          </div>
                          <p className="text-sm font-medium italic text-text-main">&ldquo;{t.content}&rdquo;</p>
                          <p className="text-xs text-text-muted mt-2 font-bold">— {t.author}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteTest(t.id)}
                          className="bg-red-50 text-red-600 hover:bg-red-100/50 border border-red-100 p-2 rounded-lg transition-colors shrink-0"
                        >
                          <span className="material-symbols-outlined text-sm font-bold">delete</span>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Testimonial Modal */}
                  {showTestModal && (
                    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                      <div className="bg-white w-full max-w-md p-6 rounded-3xl border border-border-custom shadow-2xl space-y-6">
                        <div className="flex justify-between items-center border-b border-border-custom/50 pb-3">
                          <h3 className="text-xl font-bold text-text-main">Add Testimonial</h3>
                          <button onClick={() => setShowTestModal(false)} className="text-text-muted hover:text-text-main">
                            <span className="material-symbols-outlined">close</span>
                          </button>
                        </div>

                        <form onSubmit={handleTestSubmit} className="space-y-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-text-main">Author Name / Role *</label>
                            <input
                              type="text"
                              required
                              value={testimonialForm.author}
                              onChange={(e) => setTestimonialForm({ ...testimonialForm, author: e.target.value })}
                              placeholder="e.g. Jane Doe, NGO President"
                              className="px-3.5 py-2 border border-border-custom rounded-xl text-sm font-medium"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-text-main">Rating (1 to 5 Stars)</label>
                            <select
                              value={testimonialForm.rating}
                              onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) })}
                              className="px-3.5 py-2 border border-border-custom rounded-xl text-sm font-medium"
                            >
                              <option value="5">5 Stars</option>
                              <option value="4">4 Stars</option>
                              <option value="3">3 Stars</option>
                            </select>
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-text-main">Client Quote *</label>
                            <textarea
                              required
                              rows="4"
                              value={testimonialForm.content}
                              onChange={(e) => setTestimonialForm({ ...testimonialForm, content: e.target.value })}
                              className="px-3.5 py-2 border border-border-custom rounded-xl text-sm font-medium resize-none"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-hover transition-colors"
                          >
                            Save Testimonial
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 6: SEO SETTINGS */}
              {activeTab === "seo" && (
                <form onSubmit={handleSaveSettings} className="space-y-6">
                  <div className="border-b border-border-custom/50 pb-4">
                    <h2 className="text-2xl font-bold text-text-main">SEO Configuration</h2>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-text-main">Meta Page Title</label>
                    <input
                      type="text"
                      value={settings.seo?.title || ""}
                      onChange={(e) => setSettings({
                        ...settings,
                        seo: { ...settings.seo, title: e.target.value }
                      })}
                      className="px-4 py-2.5 border border-border-custom rounded-xl font-medium text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-text-main">Meta Description</label>
                    <textarea
                      rows="3"
                      value={settings.seo?.description || ""}
                      onChange={(e) => setSettings({
                        ...settings,
                        seo: { ...settings.seo, description: e.target.value }
                      })}
                      className="px-4 py-2.5 border border-border-custom rounded-xl font-medium text-sm resize-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-text-main">Meta Keywords (comma separated)</label>
                    <input
                      type="text"
                      value={settings.seo?.keywords || ""}
                      onChange={(e) => setSettings({
                        ...settings,
                        seo: { ...settings.seo, keywords: e.target.value }
                      })}
                      className="px-4 py-2.5 border border-border-custom rounded-xl font-medium text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary-hover transition-colors shadow-sm"
                  >
                    Save SEO Settings
                  </button>
                </form>
              )}
            </>
          )}

        </main>
      </div>

    </div>
  );
}
