import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, BookOpen, Award, GraduationCap, ExternalLink } from "lucide-react";
import headshotImage from "@/assets/zain-headshot-new.png";

const books = [
  { title: "The Giver", author: "Lois Lowry", description: "Step into a world where emotions are controlled—and one boy begins to see the truth." },
  { title: "The 4-Hour Workweek", author: "Tim Ferriss", description: "Tired of trading time for money? This book flips the script-and your schedule." },
  { title: "The Millionaire Fastlane", author: "MJ DeMarco", description: "Forget saving for 40 years. Build wealth the untraditional (but smart) way." },
  { title: "Work the System", author: "Sam Carpenter", description: "Life's not chaos—it's just poorly built systems. This book hands you the toolkit." },
  { title: "Atomic Habits", author: "James Clear", description: "Tiny tweaks, massive change. Learn why small habits are the real power moves." },
  { title: "Building a Second Brain", author: "Tiago Forte", description: "Your memory isn't failing—you just need an upgrade. This book shows how." },
  { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", description: "A lonely boy, a secret letter, and a world that changes everything. This is where magic begins." },
  { title: "The 7 Habits of Highly Effective People", author: "Stephen R. Covey", description: "The classic that changed how leaders lead and doers do. Still sharp. Still relevant." },
  { title: "Make Time", author: "Jake Knapp & John Zeratsky", description: "Drowning in busywork? Learn to fight back and focus on what truly matters—every day." },
  { title: "Feel-Good Productivity", author: "Ali Abdaal", description: "What if working less could make you feel better and get more done? This one's productivity with a soul." }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <img 
            src={headshotImage} 
            alt="Zain Adtani - Enrolled Agent" 
            className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-4 border-primary shadow-2xl mx-auto mb-8"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Hey Zain 👋
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            I'm Zain. I'm an Engineer turned Enrolled Agent, helping busy beginners pass the EA exam and get confident with taxes.
          </p>
          
          {/* Newsletter Signup */}
          <div className="max-w-md mx-auto mb-4">
            <form className="flex flex-col sm:flex-row gap-3">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 h-12 text-base"
              />
              <Button type="submit" size="lg" className="h-12 px-8">
                Subscribe
              </Button>
            </form>
          </div>
          <p className="text-sm text-muted-foreground">No spam. Ever.</p>
        </div>
      </section>

      {/* Main Action Buttons */}
      <section className="py-12 bg-card/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover-scale cursor-pointer" onClick={() => window.open('https://www.skool.com/eng2ea/about', '_blank')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-6 h-6" />
                  Engineer → Enrolled Agent
                </CardTitle>
                <CardDescription>Free community • Short lessons. No fluff.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-scale cursor-pointer" onClick={() => window.open('https://whop.com/eng2ea/?a=eng2ea', '_blank')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-6 h-6" />
                  Take the Full Course
                </CardTitle>
                <CardDescription>Engineer to Enrolled Agent Part 1</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-scale cursor-pointer" onClick={() => document.getElementById('books-tab')?.click()}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-6 h-6" />
                  Books I've Read
                </CardTitle>
                <CardDescription>My Personal Reading List</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-scale cursor-pointer" onClick={() => document.getElementById('certifications-tab')?.click()}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-6 h-6" />
                  My Certifications
                </CardTitle>
                <CardDescription>Professional credentials & achievements</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Tabbed Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
              <TabsTrigger value="products">Digital Products</TabsTrigger>
              <TabsTrigger value="books" id="books-tab">Books</TabsTrigger>
              <TabsTrigger value="certifications" id="certifications-tab">Certifications</TabsTrigger>
            </TabsList>

            {/* Digital Products Tab */}
            <TabsContent value="products" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Digital Products</h2>
                <p className="text-lg text-muted-foreground">Courses and resources to help you succeed</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Engineer to Enrolled Agent - Part 1</CardTitle>
                    <CardDescription>Complete course to pass the EA exam with confidence</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" onClick={() => window.open('https://whop.com/eng2ea/?a=eng2ea', '_blank')}>
                      View Course
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Free Community</CardTitle>
                    <CardDescription>Join fellow EA students and share your journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="secondary" className="w-full" onClick={() => window.open('https://www.skool.com/eng2ea/about', '_blank')}>
                      Join Now
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Books Tab */}
            <TabsContent value="books" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">My Digital Library</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  A simple space where I keep track of what I've read and what I want to read next. There's no deep commentary here (unless I'm in the mood). Just titles, a few notes, and a growing list that I update every week.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book, index) => (
                  <Card key={index} className="hover-scale">
                    <CardHeader>
                      <CardTitle className="text-lg">{book.title}</CardTitle>
                      <CardDescription className="text-sm">By: {book.author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{book.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Certifications Tab */}
            <TabsContent value="certifications" className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">My Certifications</h2>
                <p className="text-lg text-muted-foreground">Professional credentials and achievements</p>
              </div>

              {/* Professional Licenses */}
              <div>
                <h3 className="text-2xl font-bold mb-6">Professional Licenses & Certifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Enrolled Agent</CardTitle>
                      <CardDescription>IRS Licensed Tax Professional</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Notary Public</CardTitle>
                      <CardDescription>American Association of Notaries (Exp: Aug 2024)</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Licensed Life & Health Insurance Agent</CardTitle>
                      <CardDescription>State of Texas (2022)</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>First Aid & CPR</CardTitle>
                      <CardDescription>Certified</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>

              {/* QuickBooks */}
              <div>
                <h3 className="text-2xl font-bold mb-6">Bookkeeping & Accounting</h3>
                <Card>
                  <CardHeader>
                    <CardTitle>QuickBooks Certified ProAdvisor Level 2</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Running a business is hard enough—your books shouldn't be. I'm a QuickBooks Certified ProAdvisor (now Level 2 certified!) and I help business owners get their books cleaned up, organized, and running like clockwork.
                    </p>
                    <p className="text-muted-foreground">Whether you're struggling to reconcile accounts, track expenses, or just keep things up to date, I'm here to take that weight off your shoulders.</p>
                    <div className="space-y-2">
                      <p className="font-semibold">💼 What I offer:</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Full QuickBooks Online setup & training</li>
                        <li>Monthly reconciliations & cleanups</li>
                        <li>Help with invoicing, payments, and reports</li>
                        <li>Personalized support (yes, real answers—not robots)</li>
                      </ul>
                    </div>
                    <Button variant="outline" className="gap-2">
                      View My ProAdvisor Profile <ExternalLink className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* AWS */}
              <div>
                <h3 className="text-2xl font-bold mb-6">Cloud & Technical</h3>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>AWS Cloud Practitioner</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Proudly AWS Certified and ready to deliver cutting-edge cloud solutions tailored to your needs. Whether it's streamlining operations or building scalable systems, I've got the tools and knowledge to take your business to the next level.
                    </p>
                    <Button variant="outline" className="gap-2">
                      View AWS Badge <ExternalLink className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card><CardHeader><CardTitle className="text-base">AWS Fundamentals Specialization</CardTitle></CardHeader></Card>
                  <Card><CardHeader><CardTitle className="text-base">AWS Fundamentals: Migrating to the Cloud</CardTitle></CardHeader></Card>
                  <Card><CardHeader><CardTitle className="text-base">AWS Fundamentals: Addressing Security Risk</CardTitle></CardHeader></Card>
                  <Card><CardHeader><CardTitle className="text-base">AWS Cloud Technical Essentials</CardTitle></CardHeader></Card>
                  <Card><CardHeader><CardTitle className="text-base">Exam Prep: AWS Certified Cloud Practitioner Foundations</CardTitle></CardHeader></Card>
                  <Card><CardHeader><CardTitle className="text-base">AWS Cloud Practitioner Essentials</CardTitle></CardHeader></Card>
                </div>
              </div>

              {/* Programming */}
              <div>
                <h3 className="text-2xl font-bold mb-6">Programming & Data</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card><CardHeader><CardTitle className="text-base">Crash Course on Python</CardTitle></CardHeader></Card>
                  <Card><CardHeader><CardTitle className="text-base">The Structured Query Language (SQL)</CardTitle></CardHeader></Card>
                  <Card><CardHeader><CardTitle className="text-base">Introduction to Programming with MATLAB</CardTitle></CardHeader></Card>
                  <Card><CardHeader><CardTitle className="text-base">Python Data Structures</CardTitle></CardHeader></Card>
                  <Card><CardHeader><CardTitle className="text-base">Programming for Everybody (Getting Started with Python)</CardTitle></CardHeader></Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Zain Adtani. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
