import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function Thanks() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Helmet>
        <title>Thank You | Zain Adtani</title>
        <meta name="description" content="Thank you for subscribing to Zain's World newsletter." />
      </Helmet>

      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-6 flex justify-center">
          <CheckCircle2 className="w-20 h-20 text-primary" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6">You're in!</h1>
        
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Check your inbox for a confirmation or welcome email. First issue lands Sunday.
        </p>

        <Button asChild size="lg">
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
