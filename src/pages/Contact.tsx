import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Youtube, Calendar } from "lucide-react";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact | Zain Adtani</title>
        <meta name="description" content="Get in touch with Zain Adtani." />
      </Helmet>

      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-2xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-extrabold text-foreground mb-3">
              Contact
            </h1>
            <p className="text-muted-foreground">
              Have a question or want to work together? Reach out below.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="p-6 flex flex-col items-center gap-3 text-center">
              <Mail className="h-8 w-8 text-primary" />
              <h2 className="font-display font-semibold text-foreground">Email</h2>
              <a
                href="mailto:zain@zainadtani.com"
                className="text-primary hover:underline text-sm"
              >
                zain@zainadtani.com
              </a>
            </Card>

            <Card className="p-6 flex flex-col items-center gap-3 text-center">
              <Linkedin className="h-8 w-8 text-primary" />
              <h2 className="font-display font-semibold text-foreground">LinkedIn</h2>
              <Button asChild variant="outline" size="sm">
                <a
                  href="https://www.linkedin.com/in/zainadtani/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Connect
                </a>
              </Button>
            </Card>

            <Card className="p-6 flex flex-col items-center gap-3 text-center">
              <Youtube className="h-8 w-8 text-primary" />
              <h2 className="font-display font-semibold text-foreground">YouTube</h2>
              <Button asChild variant="outline" size="sm">
                <a
                  href="https://youtube.com/@captainduaadventures?si=xPzuebAHwHZTl52V"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Subscribe
                </a>
              </Button>
            </Card>

            <Card className="p-6 flex flex-col items-center gap-3 text-center">
              <Calendar className="h-8 w-8 text-primary" />
              <h2 className="font-display font-semibold text-foreground">Book a Call</h2>
              <Button variant="outline" size="sm" disabled>
                Coming Soon
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
