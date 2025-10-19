import { Header } from "@/components/Header";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { Calendar, Clock } from "lucide-react";

const BLOG_POSTS = [
  {
    id: 1,
    title: "My Top 10 (Insanely Simple) Prompts I Use Every Week",
    excerpt: "Discover the AI prompts that save me hours of work every single week.",
    date: "Coming Soon",
    readTime: "5 min read",
    status: "draft" as const,
  },
  {
    id: 2,
    title: "ChatGPT vs Claude: Which AI Should You Use (and When)?",
    excerpt: "A practical comparison of the two leading AI assistants and when to use each one.",
    date: "Coming Soon",
    readTime: "7 min read",
    status: "draft" as const,
  },
  {
    id: 3,
    title: "From Chaos to Clarity: How to Cut Your Inbox Time by 70% Using AI",
    excerpt: "Learn my exact system for managing email efficiently with AI assistance.",
    date: "Coming Soon",
    readTime: "6 min read",
    status: "draft" as const,
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Blog | Zain Adtani</title>
        <meta name="description" content="Practical insights on productivity, AI, taxes, and life optimization by Zain Adtani." />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Practical insights on productivity, AI, taxes, and life optimization
          </p>
        </div>

        <div className="space-y-6">
          {BLOG_POSTS.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <CardTitle className="text-2xl">{post.title}</CardTitle>
                  {post.status === "draft" && (
                    <Badge variant="secondary">Coming Soon</Badge>
                  )}
                </div>
                <CardDescription className="text-base mb-4">
                  {post.excerpt}
                </CardDescription>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
