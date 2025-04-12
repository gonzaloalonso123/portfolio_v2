"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, BookOpen, Share2, User, Tag, ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blog-posts";
import type { BlogPost } from "@/types/blog";
import ImageGallery from "@/components/image-gallery";
import CodeBlock from "@/components/code-block";

export default function BlogsPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedPost]);

  return (
    <div className="w-full py-16 px-4 overflow-y-auto max-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600"
        >
          My Blogs
        </motion.h2>

        {selectedPost ? (
          <div className="space-y-8">
            <Button
              variant="ghost"
              className="text-blue-400 hover:text-blue-300 mb-4 pl-0"
              onClick={() => setSelectedPost(null)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to all articles
            </Button>
            <BlogPostDetail post={selectedPost} />
          </div>
        ) : (
          <BlogList posts={blogPosts} onSelectPost={setSelectedPost} />
        )}
      </div>
    </div>
  );
}

function BlogList({ posts, onSelectPost }: { posts: BlogPost[]; onSelectPost: (post: BlogPost) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="bg-black/60 backdrop-blur-md border border-blue-500/30 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(0,200,255,0.2)] hover:shadow-[0_0_25px_rgba(0,200,255,0.3)] transition-all duration-300 cursor-pointer group"
          onClick={() => onSelectPost(post)}
        >
          <div className="relative h-60 overflow-hidden">
            <img
              src={post.featuredImage || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-4">
              <div className="flex items-center text-blue-300 text-sm mb-1">
                <Calendar className="h-3 w-3 mr-1" /> {post.date}
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">{post.title}</h3>
            </div>
          </div>
          <div className="p-4">
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-gray-300 text-sm line-clamp-2 mb-3">{post.description}</p>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-400">
                <User className="h-3 w-3 mr-1" /> {post.author}
              </div>
              <div className="flex items-center text-gray-400">
                <Clock className="h-3 w-3 mr-1" /> 10 min read
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function BlogPostDetail({ post }: { post: BlogPost }) {
  const processContent = (content: string) => {
    return content.replace(/\*\*(.*?)\*\*/g, '<span class="text-blue-300 font-bold">$1</span>');
  };
  const processedContent = processContent(post.content);
  const galleryImages = post.gallery || [post.featuredImage];
  const renderContent = () => {
    const blocks = processedContent.split("```");

    return blocks.map((block, index) => {
      if (index % 2 === 0) {
        return renderTextBlock(block, index);
      } else {
        const firstLineBreak = block.indexOf("\n");
        const language = firstLineBreak > 0 ? block.substring(0, firstLineBreak).trim() : "typescript";
        const code = firstLineBreak > 0 ? block.substring(firstLineBreak + 1) : block;

        return <CodeBlock key={index} code={code} language={language} />;
      }
    });
  };

  const renderTextBlock = (block: string, key: number) => {
    const paragraphs = block.split("\n\n").filter((p) => p.trim() !== "");

    return (
      <div key={key} className="space-y-6">
        {paragraphs.map((paragraph, idx) => {
          // Handle headings
          if (paragraph.trim().startsWith("## ")) {
            return (
              <h2 key={idx} className="text-2xl font-bold text-blue-400 mt-10 mb-4">
                {paragraph.trim().replace("## ", "")}
              </h2>
            );
          }
          if (paragraph.trim().startsWith("### ")) {
            return (
              <h3 key={idx} className="text-xl font-bold text-blue-300 mt-8 mb-3">
                {paragraph.trim().replace("### ", "")}
              </h3>
            );
          }
          if (paragraph.trim() === "---") {
            return <hr key={idx} className="my-8 border-blue-500/30" />;
          }
          if (paragraph.includes("\n- ")) {
            const listTitle = paragraph.split("\n")[0];
            const items = paragraph.split("\n- ").slice(1);

            return (
              <div key={idx} className="my-6">
                {listTitle && listTitle !== "-" && (
                  <p className="text-lg mb-2" dangerouslySetInnerHTML={{ __html: listTitle }} />
                )}
                <ul className="list-disc pl-6 space-y-2">
                  {items.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      className="text-lg text-gray-300 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.trim() }}
                    />
                  ))}
                </ul>
              </div>
            );
          }
          const processedParagraph = paragraph.replace(
            /`([^`]+)`/g,
            '<code class="bg-gray-800 text-blue-300 px-1 py-0.5 rounded font-mono text-sm">$1</code>'
          );
          return (
            <p key={idx} className="text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: processedParagraph }} />
          );
        })}
      </div>
    );
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black/60 backdrop-blur-md border border-blue-500/30 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,200,255,0.2)]"
    >
      <ImageGallery images={galleryImages} alt={post.title} />

      <div className="p-6 md:p-8">
        <div className="flex items-center text-blue-400 mb-4 space-x-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" /> {post.date}
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" /> {post.author}
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-6">{post.title}</h2>

        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <div key={tag} className="flex items-center">
              <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">
                <Tag className="h-3 w-3 inline mr-1" /> {tag}
              </span>
            </div>
          ))}
        </div>

        <p className="text-gray-300 text-xl leading-relaxed mb-8">{post.description}</p>

        <div className="blog-content text-gray-200 space-y-6 mb-12">{renderContent()}</div>

        {/* The STANDBOT Method Steps */}
        {post.steps && post.steps.length > 0 && (
          <div className="mt-16 mb-16">
            <h3 className="text-2xl font-bold mb-6 text-blue-400">Building with AI, Step by Step</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              The STANDBOT Method follows a structured approach to AI-assisted development. Each step is designed to
              maximize the benefits of AI while maintaining code quality and developer control.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {post.steps.map((step, index) => (
                <StandbotCard key={index} step={step} index={index} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 flex justify-between items-center border-t border-blue-500/30 pt-6">
          <div className="flex items-center text-blue-400">
            <BookOpen className="h-5 w-5 mr-2" />
            <span>10 min read</span>
          </div>

          <Button variant="outline" className="bg-blue-900/30 border-blue-500/30 hover:bg-blue-800/50">
            <Share2 className="h-4 w-4 mr-2" /> Share Article
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

function StandbotCard({ step, index }: { step: any; index: number }) {
  return (
    <div className="relative bg-black/50 border border-blue-500/30 rounded-xl p-6 transition-all duration-300 hover:bg-black/70 hover:shadow-[0_0_15px_rgba(0,200,255,0.3)]">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 flex items-center justify-center text-3xl mr-4">{step.icon}</div>
        <div className="text-xl font-bold text-white">
          {index + 1}. {step.title}
        </div>
      </div>
      <p className="text-gray-300 text-lg leading-relaxed mb-5">{step.content}</p>

      {step.images && step.images.length > 0 && (
        <div className="mt-4 rounded-lg overflow-hidden">
          <img
            src={step.images[0] || `/placeholder.svg?height=200&width=400&query=${step.title} illustration`}
            alt={step.title}
            className="w-full h-auto object-cover"
          />
        </div>
      )}
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-blue-500/50"></div>
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-blue-500/50"></div>
    </div>
  );
}
