import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mic, X, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function TalkToAI() {
  const [chatOpen, setChatOpen] = useState(false);

  const handleMicClick = () => {
    // TODO: Integrate voice AI
    if (typeof window !== 'undefined' && (window as any).aiChat) {
      (window as any).aiChat.startVoice();
    }
    setChatOpen(true);
  };

  const handleStartForm = () => {
    // TODO: Integrate chat AI
    if (typeof window !== 'undefined' && (window as any).aiChat) {
      (window as any).aiChat.open();
    }
    setChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Helmet>
        <title>Talk to AI — Find Your Next Step</title>
        <meta
          name="description"
          content="Describe your goal, get a plan, and save time with AI guidance."
        />
      </Helmet>

      <div className="container max-w-5xl mx-auto px-4 py-12 space-y-12">
        {/* Breadcrumbs */}
        <nav className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/projects" className="hover:text-primary transition-colors">Projects</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Talk to AI</span>
        </nav>

        {/* Hero */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">
            Find Your Next Step with AI
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Describe your goal, get a plan, and save time.
          </p>
        </header>

        {/* Voice Interface Card */}
        <Card className="text-center p-8 max-w-md mx-auto rounded-2xl border bg-card/90 shadow-sm">
          <CardContent className="space-y-4">
            <div className="relative flex justify-center">
              <Button 
                size="lg"
                onClick={handleMicClick}
                className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_50px_rgba(99,102,241,0.6)] transition-all duration-300"
              >
                <Mic className="w-12 h-12" />
              </Button>
            </div>
            <p className="text-sm font-medium">Talk to AI</p>
          </CardContent>
        </Card>

        {/* Text Interface Card */}
        <Card className="max-w-md mx-auto p-6 rounded-2xl border bg-card/90 shadow-sm">
          <CardHeader>
            <CardTitle>Prefer typing?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full gap-2"
              onClick={handleStartForm}
            >
              <MessageSquare className="w-4 h-4" />
              Start the Form Below
            </Button>
            <ul className="text-sm text-muted-foreground space-y-1 pl-1">
              <li>• Work at your own pace</li>
              <li>• Review before submitting</li>
              <li>• No microphone needed</li>
              <li>• Traditional form experience</li>
            </ul>
          </CardContent>
        </Card>

        {/* Lead Form Placeholder */}
        <Card className="max-w-2xl mx-auto p-8 rounded-2xl border bg-card/90 shadow-sm">
          <CardHeader>
            <CardTitle>Tell us about your goal</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal">What's your goal?</Label>
                <Textarea 
                  id="goal" 
                  placeholder="Tell us what you're trying to achieve..." 
                  rows={5}
                  className="resize-none"
                />
              </div>
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Chat Window Placeholder */}
      {chatOpen && (
        <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-card border rounded-lg shadow-2xl z-50 flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold">AI Assistant</h3>
            <Button variant="ghost" size="icon" onClick={() => setChatOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="bg-muted p-3 rounded-lg text-sm">
              <p className="text-muted-foreground">
                Private preview. Responses are simulated.
              </p>
            </div>
          </div>
          <div className="p-4 border-t">
            <Input placeholder="Type your message..." />
          </div>
        </div>
      )}
    </div>
  );
}
