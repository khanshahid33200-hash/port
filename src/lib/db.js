import { db } from "./firebase";
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  limit 
} from "firebase/firestore";

// Seed Data & Fallbacks
export const DEFAULT_SETTINGS = {
  hero: {
    badge: "Available for new projects",
    title: "Freelance Full Stack Developer",
    subtitle: "Building modern websites, business platforms, and digital experiences that drive growth and engagement.",
    primaryCta: "View Portfolio",
    secondaryCta: "Hire Me",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeKMxPcmBSMPG6DXdsfqpsiffktGu3VHN6mSzOgDT8UAaEGrArXP2j2S6dp0lQdFxfethXntHVSyXcapZpdQv3Qh4vk1QfejOo3sux30KC4sDmG_s7NvSLKQJR7AQKzIFqSeBih1KMTatEjBSpYKGtTSqGFSMM7FqBSUWBF0nEIH-qY1ACt70jP84ZB8nVk9-00Ky0u5A8eK5SRsoE-LuGKltVuYh09_4wZz1hCZh3kJvDSVyC0hyOoQCyR9XkxnDAaOk2SmGFRLd9"
  },
  about: {
    badge: "My Journey",
    title: "Bridging Code & Creativity.",
    subtitle: "I build digital experiences that live at the intersection of robust engineering and thoughtful design. With a foundation in modern web technologies and an eye for marketing strategy, I craft solutions that not only work flawlessly but engage audiences deeply.",
    storyTitle: "Turning Ideas Into Professional Digital Experiences",
    storyParagraphs: [
      "I am a freelance web developer with experience in website development, frontend development, backend development, digital marketing, and visual design.",
      "My journey started with helping local businesses and startups establish their online presence. Over time, I expanded into full website development, branding, content creation, and digital solutions.",
      "I enjoy solving business problems through technology and creating websites that look professional, perform well, and generate results."
    ],
    location: "Jaipur, Rajasthan, India",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBl5p3Pss8KwvK99nWk70ncck_ScVjzMmN9LT0EtveuSv5g_FB1QkTcVLYk6kMl2e5ymhXBJdiuuiDRigw1Swfzktl1r8AXQYq0l4-WO8P6KuhCbGOCPnv1o_amVtYW8XM_Qp4ts9W0RNez_6nwZEbo-4WlDdbpNRp0w6kKQfnQTz7-TpHAR7xt74LZZJmmCVJKLOTwxWRoAxt4jQdgWuTFuwAt3nZ2rf5OqR96RuG1BAVxt7vj1VDz75k98qvKQkpB9AOJ3AbXD245",
    timeline: [
      { year: "2022 - Present", title: "Senior Frontend Engineer & AI Integrator", description: "Leading frontend architecture for enterprise SaaS products. Pioneered the integration of LLMs to automate content workflows and enhance user interaction." },
      { year: "2019 - 2022", title: "Full-Stack Developer", description: "Transitioned to full-stack development, mastering Node.js and React. Built scalable e-commerce platforms and automated backend processes." },
      { year: "2017 - 2019", title: "Digital Marketing Strategist", description: "Began journey in tech by driving growth through SEO, content strategy, and data-driven marketing campaigns for startups." }
    ]
  },
  skills: [
    { category: "Frontend Engineering", icon: "code", items: [ { name: "React & Next.js", level: 95 }, { name: "Tailwind CSS", level: 90 }, { name: "TypeScript", level: 85 } ] },
    { category: "Backend & Architecture", icon: "dns", items: [ { name: "Node.js / Express", level: 80 }, { name: "RESTful APIs", level: 90 }, { name: "PostgreSQL / MongoDB", level: 75 } ] },
    { category: "AI & Automation", icon: "smart_toy", type: "tags", description: "Leveraging artificial intelligence to accelerate workflows, generate complex assets, and build smarter user interfaces.", tags: ["ChatGPT Pro", "Prompt Engineering", "GitHub Copilot", "Midjourney", "LangChain"] },
    { category: "Digital Marketing", icon: "campaign", type: "tags", description: "Understanding the product from the user's perspective. Driving organic growth through technical SEO and content architecture.", tags: ["Technical SEO", "Content Strategy", "Analytics", "Conversion Rate Opt."] }
  ],
  seo: {
    title: "Shahid Khan - Freelance Full Stack Developer",
    description: "Freelance Full Stack Web Developer and Digital Creator. Building modern, high-converting websites, platforms, and digital experiences.",
    keywords: "freelance developer, full stack, React, Next.js, Jaipur, Node.js, portfolio"
  },
  contact: {
    email: "shahidbcsm@gmail.com",
    location: "Ja Jaipur, Rajasthan, India",
    whatsapp: "https://wa.me/919999999999",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    availability: "Open For Freelance Projects"
  }
};

export const DEFAULT_PROJECTS = [
  {
    id: "proj_1",
    title: "Shikvaa Foundation",
    category: "Web Dev",
    subCategory: "NGO",
    description: "A comprehensive digital platform designed to amplify the reach and impact of social initiatives through intuitive design and fast performance.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkq9VGPluPg3cI4gEaIicN-60JDnto6oxf8pCzydbG9VQFQzKhlstP2oTdBD1ZRXmskY1H5X15Br_RHE8yyGuHTmb1UEIeTM8PPHlLZcimVxLqx9cgY4SP5QvK3uBH2Dk75RGEg4WVM5npJgytCGqLXNXVy_A-LqQdViIK7DQlPPZJgldVjjpjKKsnDNzpS3cCusIVaFRq6WNYqiEWGF1UTii5CSZg7r3Yj01cfNZcS0kNNn9b-mgWh6Y2XtTJk68wQvpjbwNG8YFa",
    link: "https://shikvaafoundation.org",
    features: ["Responsive Design", "Modern User Interface", "SEO-Friendly Structure", "Organization Information Management"]
  },
  {
    id: "proj_2",
    title: "Media Levelling",
    category: "Full Stack",
    subCategory: "Agency",
    description: "A high-performance digital presence and internal tooling suite for a forward-thinking digital marketing agency, focused on conversion and analytics.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCI3c6d8PkYGqlbyQ8PfDzvIzKb0po7zuc_L54kS224mKuupyD4K0o8mFkR9cbXSgSq78octumuwLpgecs2W6vNoHJb023XqmmchRabDS-6xwjhEOfv-g0jYRO-biyugIgvZ8IEg_As1T2lA3nOQgMa27r7uchPAdbs7PpRl4k9Do1WRB5JIDFtO7RCpKo2Cy5l49uDd0yxdrL42tsEd9frdoLiBB-xLMjixYQCwbn3kORAQtEsHLe6PRbCVhh5rEzRiCXVqlSW9tXt",
    link: "https://media-levelling.com",
    features: ["Agency Branding", "Service Showcase", "Lead Generation Forms", "Responsive Layout", "Modern Business Design"]
  }
];

export const DEFAULT_SERVICES = [
  { id: "srv_1", title: "Website Development", description: "Custom, responsive websites built with modern frameworks like React, Next.js, and Tailwind CSS. Focus on performance, accessibility, and pixel-perfect design.", icon: "code" },
  { id: "srv_2", title: "Platform Architecture", description: "Scalable backend systems, API development, and database design using Node.js, Python, and modern cloud infrastructure to power your applications.", icon: "database" },
  { id: "srv_3", title: "Digital Marketing Tech", description: "Integration of analytics, CRM systems, and marketing automation tools to ensure your digital presence actively contributes to business growth.", icon: "trending_up" },
  { id: "srv_4", title: "Landing Page Development", description: "High-converting landing pages designed for marketing campaigns and lead generation.", icon: "web_asset" },
  { id: "srv_5", title: "Portfolio Websites", description: "Personal and professional portfolio websites that showcase expertise and achievements.", icon: "person" },
  { id: "srv_6", title: "Website Management", description: "Ongoing updates, content management, optimization, and technical support.", icon: "settings" }
];

export const DEFAULT_TESTIMONIALS = [
  { id: "test_1", content: "Professional work delivered on time. The website exceeded expectations.", author: "Business Client", rating: 5 },
  { id: "test_2", content: "Excellent communication and attention to detail throughout the project.", author: "Organization Representative", rating: 5 },
  { id: "test_3", content: "Strong understanding of both design and functionality.", author: "Agency Client", rating: 5 }
];

export const DEFAULT_BLOGS = [
  {
    id: "blog_1",
    title: "Website Development Tips for 2026",
    slug: "website-development-tips-2026",
    content: "Building high-performance websites requires focusing on speed, accessibility, and clean typography. Using modern React compilers and static site generation helps deliver instant load times. Developers should also optimize images, load code chunks on-demand, and leverage native CSS capabilities to reduce bundle sizes.",
    category: "Web Dev",
    readingTime: "4 min",
    date: "2026-06-20",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeKMxPcmBSMPG6DXdsfqpsiffktGu3VHN6mSzOgDT8UAaEGrArXP2j2S6dp0lQdFxfethXntHVSyXcapZpdQv3Qh4vk1QfejOo3sux30KC4sDmG_s7NvSLKQJR7AQKzIFqSeBih1KMTatEjBSpYKGtTSqGFSMM7FqBSUWBF0nEIH-qY1ACt70jP84ZB8nVk9-00Ky0u5A8eK5SRsoE-LuGKltVuYh09_4wZz1hCZh3kJvDSVyC0hyOoQCyR9XkxnDAaOk2SmGFRLd9"
  },
  {
    id: "blog_2",
    title: "SEO Best Practices for Startups",
    slug: "seo-best-practices-startups",
    content: "SEO isn't just about keywords anymore. It's about site structure, semantic HTML, core web vitals, and producing high-quality content that satisfies user intent. Start with strong H1 tags, clear metadata, responsive styles, and properly structured schema markup to make search crawlers happy.",
    category: "SEO",
    readingTime: "5 min",
    date: "2026-06-18",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkq9VGPluPg3cI4gEaIicN-60JDnto6oxf8pCzydbG9VQFQzKhlstP2oTdBD1ZRXmskY1H5X15Br_RHE8yyGuHTmb1UEIeTM8PPHlLZcimVxLqx9cgY4SP5QvK3uBH2Dk75RGEg4WVM5npJgytCGqLXNXVy_A-LqQdViIK7DQlPPZJgldVjjpjKKsnDNzpS3cCusIVaFRq6WNYqiEWGF1UTii5CSZg7r3Yj01cfNZcS0kNNn9b-mgWh6Y2XtTJk68wQvpjbwNG8YFa"
  },
  {
    id: "blog_3",
    title: "Leveraging AI in Full-Stack Workflows",
    slug: "leveraging-ai-full-stack",
    content: "AI-assisted coding and asset generation can accelerate web development by 10x. The key lies in precise prompt engineering, integrating LLMs into code compilers, and using automated pipeline workflows to manage code reviews and layout refactoring safely.",
    category: "AI Tools",
    readingTime: "6 min",
    date: "2026-06-15",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCI3c6d8PkYGqlbyQ8PfDzvIzKb0po7zuc_L54kS224mKuupyD4K0o8mFkR9cbXSgSq78octumuwLpgecs2W6vNoHJb023XqmmchRabDS-6xwjhEOfv-g0jYRO-biyugIgvZ8IEg_As1T2lA3nOQgMa27r7uchPAdbs7PpRl4k9Do1WRB5JIDFtO7RCpKo2Cy5l49uDd0yxdrL42tsEd9frdoLiBB-xLMjixYQCwbn3kORAQtEsHLe6PRbCVhh5rEzRiCXVqlSW9tXt"
  }
];

// Promise timeout helper
function timeoutPromise(promise, ms = 800) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Firestore timeout after ${ms}ms`));
    }, ms);
    
    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

// Helper to check if Firestore is configured and connected
async function tryFirestore(fn, fallback) {
  try {
    return await timeoutPromise(fn(), 800);
  } catch (error) {
    console.warn("Firestore error or timeout, using local fallback:", error);
    return fallback;
  }
}

// 1. Settings Operations
export async function getSettings() {
  return tryFirestore(async () => {
    const docRef = doc(db, "configs", "settings");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // Seed on first get if empty
      await setDoc(docRef, DEFAULT_SETTINGS);
      return DEFAULT_SETTINGS;
    }
  }, DEFAULT_SETTINGS);
}

export async function updateSettings(settingsData) {
  return tryFirestore(async () => {
    const docRef = doc(db, "configs", "settings");
    await setDoc(docRef, settingsData, { merge: true });
    return settingsData;
  }, settingsData);
}

// 2. Projects Operations
export async function getProjects() {
  return tryFirestore(async () => {
    const querySnapshot = await getDocs(collection(db, "projects"));
    if (querySnapshot.empty) {
      // Seed default projects
      for (const proj of DEFAULT_PROJECTS) {
        await setDoc(doc(db, "projects", proj.id), proj);
      }
      return DEFAULT_PROJECTS;
    }
    const projects = [];
    querySnapshot.forEach((doc) => {
      projects.push({ ...doc.data(), id: doc.id });
    });
    return projects;
  }, DEFAULT_PROJECTS);
}

export async function addProject(project) {
  return tryFirestore(async () => {
    const docRef = await addDoc(collection(db, "projects"), project);
    return { ...project, id: docRef.id };
  }, { ...project, id: "local_" + Date.now() });
}

export async function updateProject(id, project) {
  return tryFirestore(async () => {
    const docRef = doc(db, "projects", id);
    await updateDoc(docRef, project);
    return { ...project, id };
  }, { ...project, id });
}

export async function deleteProject(id) {
  return tryFirestore(async () => {
    const docRef = doc(db, "projects", id);
    await deleteDoc(docRef);
    return true;
  }, true);
}

// 3. Blogs Operations
export async function getBlogs() {
  return tryFirestore(async () => {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    if (querySnapshot.empty) {
      // Seed default blogs
      for (const blog of DEFAULT_BLOGS) {
        await setDoc(doc(db, "blogs", blog.id), blog);
      }
      return DEFAULT_BLOGS;
    }
    const blogs = [];
    querySnapshot.forEach((doc) => {
      blogs.push({ ...doc.data(), id: doc.id });
    });
    return blogs;
  }, DEFAULT_BLOGS);
}

export async function addBlog(blog) {
  return tryFirestore(async () => {
    const docRef = await addDoc(collection(db, "blogs"), blog);
    return { ...blog, id: docRef.id };
  }, { ...blog, id: "local_" + Date.now() });
}

export async function updateBlog(id, blog) {
  return tryFirestore(async () => {
    const docRef = doc(db, "blogs", id);
    await updateDoc(docRef, blog);
    return { ...blog, id };
  }, { ...blog, id });
}

export async function deleteBlog(id) {
  return tryFirestore(async () => {
    const docRef = doc(db, "blogs", id);
    await deleteDoc(docRef);
    return true;
  }, true);
}

// 4. Testimonials Operations
export async function getTestimonials() {
  return tryFirestore(async () => {
    const querySnapshot = await getDocs(collection(db, "testimonials"));
    if (querySnapshot.empty) {
      // Seed defaults
      for (const t of DEFAULT_TESTIMONIALS) {
        await setDoc(doc(db, "testimonials", t.id), t);
      }
      return DEFAULT_TESTIMONIALS;
    }
    const testimonials = [];
    querySnapshot.forEach((doc) => {
      testimonials.push({ ...doc.data(), id: doc.id });
    });
    return testimonials;
  }, DEFAULT_TESTIMONIALS);
}

export async function addTestimonial(testimonial) {
  return tryFirestore(async () => {
    const docRef = await addDoc(collection(db, "testimonials"), testimonial);
    return { ...testimonial, id: docRef.id };
  }, { ...testimonial, id: "local_" + Date.now() });
}

export async function deleteTestimonial(id) {
  return tryFirestore(async () => {
    const docRef = doc(db, "testimonials", id);
    await deleteDoc(docRef);
    return true;
  }, true);
}

// 5. Inquiries (Leads)
export async function getInquiries() {
  return tryFirestore(async () => {
    const querySnapshot = await getDocs(collection(db, "inquiries"));
    const inquiries = [];
    querySnapshot.forEach((doc) => {
      inquiries.push({ ...doc.data(), id: doc.id });
    });
    // Sort by date desc
    return inquiries.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, []);
}

export async function addInquiry(inquiry) {
  const newInquiry = { ...inquiry, date: new Date().toISOString(), status: "unread" };
  return tryFirestore(async () => {
    const docRef = await addDoc(collection(db, "inquiries"), newInquiry);
    return { ...newInquiry, id: docRef.id };
  }, { ...newInquiry, id: "local_" + Date.now() });
}

export async function updateInquiryStatus(id, status) {
  return tryFirestore(async () => {
    const docRef = doc(db, "inquiries", id);
    await updateDoc(docRef, { status });
    return true;
  }, true);
}

// 6. Announcement / Notification Banner
export async function getNotificationBanner() {
  const defaultBanner = { text: "Open for new freelance projects!", active: true };
  return tryFirestore(async () => {
    const docRef = doc(db, "configs", "banner");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      await setDoc(docRef, defaultBanner);
      return defaultBanner;
    }
  }, defaultBanner);
}

export async function updateNotificationBanner(bannerData) {
  return tryFirestore(async () => {
    const docRef = doc(db, "configs", "banner");
    await setDoc(docRef, bannerData, { merge: true });
    return bannerData;
  }, bannerData);
}

// 7. Seed Database manually
export async function seedAll() {
  try {
    console.log("Seeding configs/settings...");
    await setDoc(doc(db, "configs", "settings"), DEFAULT_SETTINGS);
    
    console.log("Seeding config/banner...");
    await setDoc(doc(db, "configs", "banner"), { text: "Open for new freelance projects!", active: true });

    console.log("Seeding projects...");
    for (const proj of DEFAULT_PROJECTS) {
      await setDoc(doc(db, "projects", proj.id), proj);
    }

    console.log("Seeding blogs...");
    for (const blog of DEFAULT_BLOGS) {
      await setDoc(doc(db, "blogs", blog.id), blog);
    }

    console.log("Seeding testimonials...");
    for (const t of DEFAULT_TESTIMONIALS) {
      await setDoc(doc(db, "testimonials", t.id), t);
    }

    console.log("Seeding services...");
    for (const s of DEFAULT_SERVICES) {
      await setDoc(doc(db, "services", s.id), s);
    }
    
    return true;
  } catch (err) {
    console.error("Failed seeding database:", err);
    return false;
  }
}
