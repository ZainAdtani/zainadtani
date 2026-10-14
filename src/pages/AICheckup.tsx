import { Helmet } from "react-helmet-async";
import { ArrowDown, ArrowUpRight, Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CHECKUP_DELIVERY_BUSINESS_DAYS, CHECKUP_FORM_URL, PARTNER_CHECKOUT_URL, PARTNER_PLAN, SAMPLE_REPORTS } from "@/data/ai-checkup";

const TITLE = "Free AI Checkup | Adtani Education Ventures";
const DESCRIPTION = "A free report card for your business: how your website, Google reviews, social pages, and AI search visibility stack up, and what to fix first. From Adtani Education Ventures in Bedford, Texas.";

function CheckupButton() {
  return <Button asChild variant="secondary" className="h-auto min-h-12 whitespace-normal px-6 py-3 text-base font-bold"><a href={CHECKUP_FORM_URL} target="_blank" rel="noopener noreferrer">Get my free checkup <ArrowUpRight aria-hidden="true" /></a></Button>;
}

function ReportCard({ report }: { report: typeof SAMPLE_REPORTS[number] }) {
  return (
    <article className="flex min-w-0 flex-col rounded-lg border border-border bg-card text-card-foreground">
      <div className="border-b border-border bg-accent/25 p-6 text-center">
        <div aria-label={`Grade ${report.grade}`} className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-primary text-4xl font-extrabold text-primary">{report.grade}</div>
        <h3 className="mt-5 text-xl leading-snug">{report.business}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{report.meta}</p>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm leading-6">{report.summary}</p>
        <div className="mt-7 space-y-6">
          {report.scores.map(row => (
            <div key={row.label}>
              <div className="mb-2 flex items-baseline justify-between gap-2 text-sm font-bold"><span>{row.label}</span><span className="shrink-0 tabular-nums text-primary">{row.value}/100</span></div>
              <Progress value={row.value} aria-label={`${report.business}: ${row.label}`} aria-valuenow={row.value} className="h-2 bg-primary/10" />
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{row.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-7 border-t border-border pt-6">
          <h4 className="text-base">3 biggest gaps</h4>
          <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm leading-6 marker:font-bold marker:text-primary">{report.gaps.map(gap => <li key={gap} className="pl-1">{gap}</li>)}</ol>
        </div>
        <p className="mt-auto pt-7 text-xs italic leading-5 text-muted-foreground">Sample checkup, researched from public sources on Oct 13, 2026 by Adtani Education Ventures.</p>
      </div>
    </article>
  );
}

export default function AICheckup() {
  const steps = [
    { title: "Tell us your business name.", text: "Fill in the short form with your business name, city, and trade. It takes about a minute, and it is free." },
    { title: "We research by hand.", text: "We study your public online presence the way a new customer would find you: your website, your Google listing and reviews, your social pages, and how you show up in AI search." },
    { title: "Your report card arrives.", text: `Within ${CHECKUP_DELIVERY_BUSINESS_DAYS} business day you get your grades, your three biggest gaps in plain words, and the fix spelled out. Yours to keep either way.` },
  ];
  const benefits = [
    "A one-page website with a booking link, built for your business",
    `${PARTNER_PLAN.socialPosts} social posts, ${PARTNER_PLAN.reels} Reel, and ${PARTNER_PLAN.graphics} graphic every month`,
    `${PARTNER_PLAN.websiteUpdates} website updates every month`,
    `${PARTNER_PLAN.googleProfileUpdates} Google profile update every month`,
    `A ${PARTNER_PLAN.checkInMinutes}-minute check-in call every month`,
  ];
  return (
    <div className="bg-background font-sans text-foreground">
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://zainadtani.com/ai-checkup" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zainadtani.com/ai-checkup" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
      </Helmet>

      <section className="surface-warm px-5 py-14 text-center md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase text-primary">Free AI Checkup</p>
          <h1 className="mt-4 text-4xl leading-tight sm:text-5xl md:text-6xl">Is Google sending your customers to someone else?</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">When neighbors search for a business like yours, Google and AI search tools point them somewhere. Your free checkup shows exactly where you stand, in a simple report card, and what to fix first.</p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <CheckupButton />
            <Button asChild variant="outline" className="h-auto min-h-12 px-6 py-3 text-base"><a href="#samples">See real checkups <ArrowDown aria-hidden="true" /></a></Button>
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">Free. Researched by hand from public sources. Yours to keep either way.</p>
          <p className="mt-5 text-sm">Call or text: <a className="inline-flex items-center gap-1 font-bold text-primary underline underline-offset-4" href="tel:+18176298220"><Phone className="h-3.5 w-3.5" aria-hidden="true" />817-629-8220</a></p>
        </div>
      </section>

      <section id="samples" className="section-y scroll-mt-20 px-5 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase text-primary">Sample report cards</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">See real checkups</h2>
            <p className="mt-4 leading-7 text-muted-foreground">These are real report cards for three DFW businesses, researched from public sources. Your checkup covers the same four areas, graded the same honest way.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">{SAMPLE_REPORTS.map(report => <ReportCard key={report.business} report={report} />)}</div>
        </div>
      </section>

      <section className="section-y border-y border-border bg-muted/50 px-5 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase text-primary">How it works</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Three simple steps</h2>
            <p className="mt-4 leading-7 text-muted-foreground">No homework for you. You answer a few quick questions, and we do the digging.</p>
          </div>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">{steps.map((step, index) => <li key={step.title}><span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-bold text-accent-foreground">{index + 1}</span><h3 className="mt-4 text-lg">{step.title}</h3><p className="mt-3 leading-7 text-muted-foreground">{step.text}</p></li>)}</ol>
        </div>
      </section>

      <section className="section-y bg-foreground px-5 text-background sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="text-xs font-bold uppercase text-accent">The Fix</p>
            <h2 className="mt-3 text-3xl leading-tight sm:text-4xl">Local AI Visibility Partner</h2>
            <p className="mt-5 leading-7 text-background/75">If your report card shows gaps, this is the plan that closes them. Steady, done-for-you work on how your business shows up, every single month.</p>
          </div>
          <div>
            <ul className="space-y-4">{benefits.map(benefit => <li key={benefit} className="flex items-start gap-3 leading-6"><Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" /><span>{benefit}</span></li>)}</ul>
            <p className="mt-8"><span className="text-5xl font-bold">${PARTNER_PLAN.monthlyPrice}</span><span className="ml-2 text-lg text-background/75">/month</span></p>
            <Button asChild variant="secondary" className="mt-6 h-auto min-h-12 w-full whitespace-normal px-5 py-3 text-base font-bold"><a href={PARTNER_CHECKOUT_URL} target="_blank" rel="noopener noreferrer">Start with the Partner Plan <ArrowUpRight aria-hidden="true" /></a></Button>
            <p className="mt-4 text-sm leading-6 text-background/75">Questions first? That is fine too. Call or text Zain at <a className="text-accent underline underline-offset-4" href="tel:+18176298220">817-629-8220</a>.</p>
          </div>
        </div>
      </section>

      <section className="section-y surface-warm px-5 text-center">
        <div className="mx-auto max-w-xl">
          <p className="text-xs font-bold uppercase text-primary">Ready when you are</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">Want your free checkup?</h2>
          <p className="mt-4 leading-7 text-muted-foreground">Tell us where to look and where to send it. Your report card is researched by hand and sent within {CHECKUP_DELIVERY_BUSINESS_DAYS} business day.</p>
          <div className="mt-7"><CheckupButton /></div>
        </div>
      </section>
      <div className="px-5 py-6 text-center text-sm leading-7 text-muted-foreground">Adtani Education Ventures LLC, Bedford, Texas · <a href="mailto:zkadtani@gmail.com" className="text-primary underline underline-offset-4">zkadtani@gmail.com</a> · <a href="tel:+18176298220" className="whitespace-nowrap text-primary underline underline-offset-4">817-629-8220</a></div>
    </div>
  );
}