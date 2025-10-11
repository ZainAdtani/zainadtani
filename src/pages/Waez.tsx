import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Helmet } from "react-helmet-async";

const GOOGLE_DRIVE_URL = "PASTE_MY_GOOGLE_DRIVE_LINK_HERE";

export default function Waez() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Waez & Lectures | Zain Adtani</title>
        <meta name="description" content="Stream or download religious talks and lectures from my Google Drive collection." />
      </Helmet>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Waez & Lectures
          </h1>
          <p className="text-xl text-muted-foreground">
            Stream or download from my Drive.
          </p>
        </div>

        <Card className="shadow-lg border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Audio Collection</CardTitle>
            <CardDescription>
              Access my complete collection of religious talks and lectures.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button 
              asChild 
              size="lg" 
              className="w-full"
              aria-label="Open Google Drive collection in new tab"
            >
              <a 
                href={GOOGLE_DRIVE_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                Open Google Drive
                <ExternalLink className="w-5 h-5" />
              </a>
            </Button>

            {/* Optional: Add iframe embed if the Drive folder is public */}
            {/* Uncomment and test if you want to embed the Drive folder */}
            {/* <div className="aspect-video w-full rounded-lg overflow-hidden border-2 border-border">
              <iframe
                src={GOOGLE_DRIVE_URL}
                className="w-full h-full"
                allow="autoplay"
                title="Google Drive Waez Collection"
              />
            </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
