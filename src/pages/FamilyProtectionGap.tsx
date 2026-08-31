import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, ShoppingCart, Calendar, BookOpen, Shield, PiggyBank, Briefcase } from "lucide-react";
import pdfAsset from "@/assets/family-protection-gap-pdf.asset.json";

const AMAZON_URL = "https://a.co/d/0j8SnTJt";
const CALENDLY_URL = "https://calendly.com/zkadtani";
const PDF_URL = pdfAsset.url;

export default function FamilyProtectionGap() {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>The Family Protection Gap | Zain Adtani</title>
        <meta
          name="description"
          content="A plain-language guide to help families understand the gap between job benefits, savings, retirement accounts, and real protection. Free PDF."
        />
      </Helmet>

      {/* Hero */}
      <section className="container mx-auto px-4 pt-20 pb-16 max-w-4xl">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs text-muted-foreground">
            <BookOpen className="w-3.5 h-3.5" /> Free Guide · The Family Protection Gap
          </div>
          <h1 className="text-4xl md:text-6xl leading-tight">
            Most families think they're covered. Then life does the math.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your job benefits, savings, and 401(k) may help, but they may not be enough to protect
            your family if your paycheck suddenly stops. This free guide explains the protection gap
            in simple language so you can understand what may be missing and what questions to ask
            next.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button
              asChild
              size="lg"
              className="bg-[#DD5013] hover:bg-[#DD5013]/90 text-[#0A0F1A]"
            >
              <a href={PDF_URL} download="The-Family-Protection-Gap.pdf">
                <Download className="w-5 h-5 mr-2" />
                Download the Free PDF
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Get the Full Paperback on Amazon
              </a>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground pt-2">
            Written by Zain Adtani, Licensed Life &amp; Health Agent. Educational only. No pressure.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto border-t border-border" />

      {/* What is the gap */}
      <section className="container mx-auto px-4 py-20 max-w-4xl">
        <h2 className="text-3xl md:text-4xl mb-6">What is the Family Protection Gap?</h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10">
          The gap is the space between what your family thinks is protected and what would actually
          be available if income stopped tomorrow. Many families rely on employer life insurance,
          savings, and retirement accounts without realizing how limited or slow those resources can
          be when they are needed most.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-6 space-y-3">
            <Briefcase className="w-6 h-6 text-[#2F5C90]" />
            <h3 className="text-lg">Job Benefits</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Employer life insurance may only cover 1x to 2x salary.
            </p>
          </Card>
          <Card className="p-6 space-y-3">
            <PiggyBank className="w-6 h-6 text-[#2F5C90]" />
            <h3 className="text-lg">Savings</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Emergency funds can disappear quickly during a crisis.
            </p>
          </Card>
          <Card className="p-6 space-y-3">
            <Shield className="w-6 h-6 text-[#2F5C90]" />
            <h3 className="text-lg">Retirement Accounts</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A 401(k) is important, but it was not built to replace a protection plan.
            </p>
          </Card>
        </div>
      </section>

      <div className="max-w-4xl mx-auto border-t border-border" />

      {/* What's inside */}
      <section className="container mx-auto px-4 py-20 max-w-4xl">
        <h2 className="text-3xl md:text-4xl mb-8">What's Inside the Free PDF?</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            "Simple explanation of the protection gap",
            "Real family examples",
            "Questions to ask before a crisis",
            "Basic protection checklist",
            "Clear next steps with no jargon",
          ].map((item) => (
            <Card key={item} className="p-5 flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[#DD5013] mt-2 shrink-0" />
              <p className="leading-relaxed">{item}</p>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button
            asChild
            size="lg"
            className="bg-[#DD5013] hover:bg-[#DD5013]/90 text-[#0A0F1A]"
          >
            <a href={PDF_URL} download="The-Family-Protection-Gap.pdf">
              <Download className="w-5 h-5 mr-2" />
              Download the Free PDF
            </a>
          </Button>
        </div>
      </section>

      <div className="max-w-4xl mx-auto border-t border-border" />

      {/* Full version */}
      <section className="container mx-auto px-4 py-20 max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl mb-6">Want the complete version?</h2>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
          The full paperback includes the complete guide, worksheets, action steps, and resource
          section to help you think through your family's protection plan in more detail.
        </p>
        <Button asChild size="lg" variant="outline">
          <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Buy the Full Book on Amazon
          </a>
        </Button>
      </section>

      <div className="max-w-4xl mx-auto border-t border-border" />

      {/* Calendly */}
      <section className="container mx-auto px-4 py-20 max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl mb-6">
          Want to talk through your family's situation?
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
          If you want help understanding your current protection setup, you can book a simple
          education-first conversation. No pressure. No hype. Just clarity.
        </p>
        <Button asChild size="lg" className="bg-[#447BBE] hover:bg-[#447BBE]/90 text-[#0A0F1A]">
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
            <Calendar className="w-5 h-5 mr-2" />
            Book a Family Protection Review
          </a>
        </Button>
      </section>

      {/* Footer CTA */}
      <section className="container mx-auto px-4 py-16 max-w-4xl text-center border-t border-border">
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
          Download the free PDF, read it, and share it with someone who has people depending on
          them.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-sm text-muted-foreground">
          <a href="https://zainadtani.com" className="hover:text-[#2F5C90]">
            zainadtani.com
          </a>
          <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#2F5C90]">
            Amazon book
          </a>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#2F5C90]">
            Book a call
          </a>
        </div>
      </section>
    </div>
  );
}
