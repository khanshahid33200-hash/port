"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBlogs } from "@/lib/db";

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const blogs = await getBlogs();
        const foundPost = blogs.find((b) => b.slug === params.slug);
        if (foundPost) {
          setPost(foundPost);
        } else {
          router.push("/blog");
        }
      } catch (err) {
        console.error("Error loading blog post:", err);
        router.push("/blog");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [params.slug, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-4xl text-primary animate-spin">
            sync
          </span>
          <p className="font-semibold text-text-muted">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen bg-background-custom text-text-main flex flex-col">
      <Navbar />

      <main className="pt-20">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-gutter py-12 space-y-8 animate-fade-in-up">
          
          {/* Back Button */}
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:-translate-x-1 transition-transform"
          >
            <span className="material-symbols-outlined text-sm font-bold">arrow_back</span>
            Back to Blog
          </Link>

          {/* Post Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-text-muted font-semibold">
              <span className="px-3 py-1 bg-primary-light text-primary rounded-full text-xs">
                {post.category}
              </span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readingTime} read</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-text-main leading-tight tracking-tight">
              {post.title}
            </h1>
          </div>

          {/* Post Image */}
          <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-gray-100 border border-border-custom/50 shadow-sm">
            <img 
              className="w-full h-full object-cover" 
              src={post.image} 
              alt={post.title} 
            />
          </div>

          {/* Post Content */}
          <article className="prose max-w-none text-text-main font-body-md text-base leading-relaxed space-y-6 pt-4">
            {post.content.split("\n\n").map((para, idx) => (
              <p key={idx} className="text-gray-700 leading-8">
                {para}
              </p>
            ))}
          </article>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}
