import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, PiggyBank, LineChart, BookOpen, Target } from "lucide-react";

const Investing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* ===== Hero ===== */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Investing</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Building wealth through smart, simple systems and continuous learning.
          </p>
        </div>
      </section>

      {/* ===== Philosophy ===== */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              My Investment <span className="text-primary">Philosophy</span>
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>Investing isn’t just about returns—it’s about options and freedom.</p>
              <p>Balanced approach: core indexes + selective bets, sized with discipline.</p>
              <p>Compounding + risk management + patience &gt; chasing every wave.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6 text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-bold text-2xl mb-2">Long-Term</h3>
              <p className="text-muted-foreground">Sustainable growth focus</p>
            </Card>
            <Card className="p-6 text-center">
              <Target className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-bold text-2xl mb-2">Strategic</h3>
              <p className="text-muted-foreground">Data-driven entries/exits</p>
            </Card>
            <Card className="p-6 text-center">
              <PiggyBank className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-bold text-2xl mb-2">Diversified</h3>
              <p className="text-muted-foreground">Spread risk wisely</p>
            </Card>
            <Card className="p-6 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-bold text-2xl mb-2">Educated</h3>
              <p class
