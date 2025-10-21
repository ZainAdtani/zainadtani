import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AiAvatars() {
  return (
    <>
      <Helmet>
        <title>My AI Avatars – Zain</title>
        <meta name="description" content="AI avatar video project powered by HeyGen." />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Breadcrumbs */}
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/projects" className="hover:text-primary transition-colors">Projects</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">My AI Avatars</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold mb-2">My AI Avatars</h1>
        <p className="text-lg text-muted-foreground mb-6">
          A quick demo of AI avatar videos generated with HeyGen.
        </p>

        <Card className="p-3 md:p-4 bg-card backdrop-blur border">
          {/* Responsive embed wrapper */}
          <div className="aspect-video w-full overflow-hidden rounded-xl">
            <iframe
              src="https://app.heygen.com/embedded-player/db8ce879a39c4148a60024e8c80b3033"
              title="HeyGen video player"
              className="w-full h-full"
              frameBorder={0}
              allow="encrypted-media; fullscreen"
              allowFullScreen
            />
          </div>
        </Card>

        <div className="mt-6">
          <Button asChild variant="outline">
            <a
              href="https://app.heygen.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Make your own on HeyGen →
            </a>
          </Button>
        </div>
      </div>
    </>
  );
}
