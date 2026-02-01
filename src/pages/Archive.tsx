import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Calculator, ArrowRight } from "lucide-react";

const archivePages = [
  {
    title: "Enrolled Agent",
    description: "Tax prep certification and study resources.",
    path: "/enrolled-agent",
    icon: GraduationCap,
  },
  {
    title: "Personal Learning Vault",
    description: "Video summaries and course notes.",
    path: "/personal-learning-vault",
    icon: BookOpen,
  },
  {
    title: "QuickBooks",
    description: "Bookkeeping training and tools.",
    path: "/quickbooks",
    icon: Calculator,
  },
];

export default function Archive() {
  return (
    <>
      <Helmet>
        <title>Archive | Zain Adtani</title>
        <meta name="description" content="Old pages kept for reference." />
      </Helmet>

      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Archive</h1>
            <p className="text-muted-foreground">
              Old pages live here. I keep them for reference.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {archivePages.map((page) => (
              <Card key={page.path} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <page.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-lg">{page.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription>{page.description}</CardDescription>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to={page.path}>
                      Open <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
