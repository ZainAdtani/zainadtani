import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Users, GraduationCap, Book, Award, ShoppingBag, Sparkles, Music } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import headshotImage from "@/assets/zain-headshot.png";
import communityImage from "@/assets/community-image.png";
import Logo3D from "@/components/Logo3D";
const QUOTES_AND_NOTES = ["It is the unknown we fear when we look upon death and darkness, nothing more. - J.K. Rowling, Harry Potter and the Deathly Hallows", "Instead of digging for gold, sell shovels. Instead of driving a taxi, build Uber. Wealth is not about working harder; it's about creating systems that work harder than you do. - MJ DeMarco, The Millionaire Fastlane", "More than 50% of graduates completely forget what they learn in college within 5 years, and within 10 years it's closer to 100%. If most of our \"education\" inevitably collects dust, then what was the point in learning it? Let's do some simple math: Let's be conservative and say that 5 hours per week are spent attending lectures and studying for exams (10 for finals week). If there are 15 weeks in a semester, that's 30 weeks a year. Multiply that by 4 we get 120 weeks, resulting in 600 hours invested into learning information that for the most part, will not be useful for your future work and career. Now I'm not saying you should renounce education completely, rather look past the shiny allure of \"financial stability and higher wages\" and make an informed decision of whether or not it aligns with what you desire. Almost anything can be learned on the internet, online education is booming. Opportunities for the next wave of innovators are scaling faster and faster thanks to technology and AI. Imagine what you could do with 600 extra hours, $200,000, and 4 years to learn and explore on your own? The future is wide open for those willing to diverge and create.", "Plan Your Day: Establish a clear plan for your daily activities. This sets the foundation for \"traction,\" where every action intentionally moves you toward your goals, contrasting with \"distraction,\" which pulls you away. Use tools like calendars to allocate specific time blocks for tasks.", "Did you know that the average person spends over one hour on social media per day, just consuming and not creating? Additionally, they spend another 2-3 hours watching television. That's four hours, on average, gone every day. Doing the math, 4 hours lost per day, multiplied by 7 days per week, equals 28 hours per week. That's basically equivalent to a part-time job. In fact, it's literally 3.5 eight-hour workdays lost per week. Four hours lost per day over 30 days = 120 hours = 15 WORKDAYS PER MONTH LOST.", "Motivation is not the cause of action, but the effect. If you wanna feel motivated to do something, take the smallest action towards doing it, then let the momentum carry you forward.", "Don't view exercise as an exchange for something. You don't work out to lose a few pounds or earn that hamburger and ice cream. With this mindset, you will lose motivation quickly and quit. Instead, view exercise as an investment. For every unit of energy you put in, you'll receive multiple units of energy back. The catch is that these units of energy you get back will be spread out over weeks, months and years. This is why exercising hardcore occasionally is far inferior than exercising a little bit every day.", "Statistically speaking, a normal person is physically unhealthy, emotionally anxious and depressed, socially lonely and financially in debt. Fuck being normal.", "Your mindset is the KEY to making more progress in your life, and journaling is the daily WORK that helps you master your mindset.", "Don't make assumptions about people, you have no fucking idea what they've been through. Don't make assumptions about yourself either. The last person we're objective about is ourselves.", "No one thinks about you as much as you think about yourself. Whatever you are insecure about, chances are 99% of people around you haven't even noticed it. This is because everybody else is too busy thinking about themselves. This may strike you as a little bit depressing, but it's actually liberating. It means that you are judged far less than you think.", "Develop a willingness to be disliked. It will grant you the freedom to do what needs to be done, even if it's unpopular.", "Nothing meaningful in life is easy, and nothing easy in life is meaningful. We think we'd like to have everything handed to us on a silver platter, but the truth is that we don't appreciate or enjoy things that we don't struggle for. So stop avoiding the difficult things in your life and instead find the difficult things you enjoy.", "It's never too late to change. It's never too late. I get emails all the time from people asking me, \"Hey, I'm 20 or 40 or 60 or 80, is it too late? Can I change? Is there time?\" The answer is it's never too late, there's always time. The only question is how long we're gonna sit here and make excuses and pretend there's not."];
const Index = () => {
  const [quote, setQuote] = useState("");
  const {
    toast
  } = useToast();
  const generateQuote = () => {
    const randomIndex = Math.floor(Math.random() * QUOTES_AND_NOTES.length);
    const selectedQuote = QUOTES_AND_NOTES[randomIndex];
    setQuote(selectedQuote);
    toast({
      title: "Quote Generated! ✨",
      description: "Here's your daily inspiration"
    });
  };
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
          <Logo3D />
          <nav className="hidden md:flex items-center gap-6">
            <a href="#digital-products" className="text-foreground hover:text-primary transition-all duration-300">
              Digital Products
            </a>
            <a href="#books" className="text-foreground hover:text-primary transition-all duration-300">
              Books
            </a>
            <a href="#certifications" className="text-foreground hover:text-primary transition-all duration-300">
              Certifications
            </a>
            <a href="#newsletter" className="scroll-smooth">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                Join Newsletter
              </Button>
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-hero-bg">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Headshot with decorative background */}
            <div className="flex-shrink-0 relative">
              <div className="absolute inset-0 bg-accent/20 rounded-full scale-110 -z-10"></div>
              <img src={headshotImage} alt="Zain Adtani - Enrolled Agent" className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover object-top border-4 border-background" />
            </div>
            
            {/* Hero Text */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
                Hey Friends 👋
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
                I'm Zain. I'm an Engineer turned Enrolled Agent, helping busy beginners pass the EA exam and get confident with taxes.
              </p>
              
              {/* Daily Quote Generator */}
              <Card className="p-6 shadow-lg border-2 border-primary/20">
                <div className="space-y-4">
                  <h3 className="text-lg flex items-center gap-2 text-center font-semibold text-zinc-950">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Daily Quote Generator
                  </h3>
                  <Textarea value={quote} readOnly placeholder="Click the button below to generate a quote or life note..." className="min-h-[120px] text-base resize-none bg-secondary/50" />
                  <Button onClick={generateQuote} className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg">
                    Generate Daily Quote
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Action Buttons */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Button 1: Free Community */}
            <Card className="p-8 hover-lift cursor-pointer transition-all duration-300 hover:shadow-xl border-2 shadow-lg">
              <a href="https://www.skool.com/eng2ea/about" target="_blank" rel="noopener noreferrer" className="block">
                <Users className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-foreground">Engineer → Enrolled Agent</h3>
                <p className="text-muted-foreground">Free community • Short lessons. No fluff.</p>
              </a>
            </Card>

            {/* Button 2: Full Course */}
            <Card className="p-8 hover-lift cursor-pointer transition-all duration-300 hover:shadow-xl border-2 shadow-lg">
              <a href="https://whop.com/eng2ea/?a=eng2ea" target="_blank" rel="noopener noreferrer" className="block">
                <GraduationCap className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-foreground">Take the Full Course</h3>
                <p className="text-muted-foreground">Engineer to Enrolled Agent Part 1</p>
              </a>
            </Card>

            {/* Button 3: Books */}
            <Card className="p-8 hover-lift cursor-pointer transition-all duration-300 hover:shadow-xl border-2 shadow-lg">
              <a href="#books" className="block">
                <Book className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-foreground">Books I've Read</h3>
                <p className="text-muted-foreground">My Personal Reading List</p>
              </a>
            </Card>

            {/* Button 4: Certifications */}
            <Card className="p-8 hover-lift cursor-pointer transition-all duration-300 hover:shadow-xl border-2 shadow-lg">
              <a href="#certifications" className="block">
                <Award className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-foreground">My Certifications</h3>
                <p className="text-muted-foreground">Professional credentials & achievements</p>
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* Tabbed Sections */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 max-w-6xl">
          <Tabs defaultValue="digital-products" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 h-auto">
              <TabsTrigger value="digital-products" id="digital-products" className="text-xs sm:text-sm px-2 py-2.5">
                Digital Products
              </TabsTrigger>
              <TabsTrigger value="books" id="books" className="text-xs sm:text-sm px-2 py-2.5">
                Books
              </TabsTrigger>
              <TabsTrigger value="certifications" id="certifications" className="text-xs sm:text-sm px-2 py-2.5">
                Certifications
              </TabsTrigger>
            </TabsList>

            {/* Digital Products Tab */}
            <TabsContent value="digital-products" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="overflow-hidden hover-lift transition-all duration-300 shadow-lg border-2">
                  <div className="p-8">
                    <ShoppingBag className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-2xl font-bold mb-3 text-foreground">Engineer to EA Part 1</h3>
                    <p className="text-muted-foreground mb-6">
                      Complete course covering all three parts of the Enrolled Agent exam. Fast-track your path from engineer to tax professional.
                    </p>
                    <Button asChild className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg">
                      <a href="https://whop.com/eng2ea/?a=eng2ea" target="_blank" rel="noopener noreferrer">
                        Enroll Now →
                      </a>
                    </Button>
                  </div>
                </Card>

                <Card className="overflow-hidden hover-lift transition-all duration-300 shadow-lg border-2">
                  <div className="p-8">
                    <Users className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-2xl font-bold mb-3 text-foreground">Free Community</h3>
                    <p className="text-muted-foreground mb-6">
                      Join fellow EA students, get study tips, and access free resources. No fluff, just actionable advice.
                    </p>
                    <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 transition-all duration-300">
                      <a href="https://www.skool.com/eng2ea/about" target="_blank" rel="noopener noreferrer">
                        Join Free →
                      </a>
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Books Tab */}
            <TabsContent value="books" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[{
                title: "Atomic Habits",
                author: "James Clear",
                rating: "⭐⭐⭐⭐⭐",
                take: "Small changes lead to remarkable results."
              }, {
                title: "Deep Work",
                author: "Cal Newport",
                rating: "⭐⭐⭐⭐⭐",
                take: "Focus is the new superpower in our distracted world."
              }, {
                title: "The E-Myth Revisited",
                author: "Michael Gerber",
                rating: "⭐⭐⭐⭐",
                take: "Essential reading for anyone building a business."
              }, {
                title: "$100M Offers",
                author: "Alex Hormozi",
                rating: "⭐⭐⭐⭐⭐",
                take: "Create offers so good people feel stupid saying no."
              }, {
                title: "Tax-Free Wealth",
                author: "Tom Wheelwright",
                rating: "⭐⭐⭐⭐",
                take: "How to build massive wealth by reducing taxes legally."
              }, {
                title: "The Lean Startup",
                author: "Eric Ries",
                rating: "⭐⭐⭐⭐",
                take: "Build, measure, learn - the modern approach to innovation."
              }].map((book, index) => <Card key={index} className="p-6 hover-lift transition-all duration-300 shadow-lg border-2">
                    <div className="aspect-[2/3] bg-accent mb-4 rounded-md flex items-center justify-center">
                      <Book className="w-16 h-16 text-primary" />
                    </div>
                    <h4 className="font-bold text-lg mb-1 text-foreground">{book.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
                    <p className="text-sm mb-2">{book.rating}</p>
                    <p className="text-sm text-muted-foreground italic">{book.take}</p>
                  </Card>)}
              </div>
            </TabsContent>

            {/* Certifications Tab */}
            <TabsContent value="certifications" className="space-y-6">
              <Card className="p-8 hover-lift transition-all duration-300 shadow-lg border-2">
                <Award className="w-16 h-16 text-primary mb-6" />
                <h3 className="text-3xl font-bold mb-4 text-foreground">Enrolled Agent (EA)</h3>
                <p className="text-lg text-muted-foreground mb-4">
                  Federally-authorized tax practitioner with unlimited rights to represent taxpayers before the IRS.
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>✓ Passed all three parts of the Special Enrollment Examination</p>
                  <p>✓ Licensed by the U.S. Department of the Treasury</p>
                  <p>✓ Authorized to represent clients in all 50 states</p>
                </div>
              </Card>

              <Card className="p-8 hover-lift transition-all duration-300 shadow-lg border-2">
                <GraduationCap className="w-16 h-16 text-primary mb-6" />
                <h3 className="text-3xl font-bold mb-4 text-foreground">Engineering Background</h3>
                <p className="text-lg text-muted-foreground">
                  Leveraging analytical and problem-solving skills from engineering to simplify complex tax concepts.
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Spotify Playlist Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="p-8 shadow-lg border-2">
            <div className="text-center mb-8">
              <Music className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
                Study Playlist 🎵
              </h2>
              <p className="text-lg text-muted-foreground">
                My curated playlist to help you focus while studying for the EA exam
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <iframe style={{
              borderRadius: '12px'
            }} src="https://open.spotify.com/embed/playlist/4ZHa92ZbMSi2Fwps39XZl5?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
            </div>
          </Card>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center md:text-left md:flex md:items-start md:gap-12">
            <div className="md:flex-1 mb-8 md:md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Subscribe to <br />
                <span className="inline-flex items-center gap-2">
                  Study Notes 
                  <Mail className="w-10 h-10 text-primary" />
                </span>
              </h2>
            </div>
            
            <div className="md:flex-1">
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Each week, I share actionable EA tips, practical study advice, and highlights from my favorite tax resources, directly to your inbox. It's free to join, and always will be.
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <Input type="email" placeholder="Enter your email" className="flex-1 h-12 text-base bg-background transition-all duration-300 focus:ring-2 focus:ring-primary" />
                <Button type="submit" size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8">
        <div className="container mx-auto px-4 max-w-6xl text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Zain Adtani. All rights reserved.
        </div>
      </footer>
    </div>;
};
export default Index;