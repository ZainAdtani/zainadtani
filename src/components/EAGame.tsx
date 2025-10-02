import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wand2, Shield, Zap } from "lucide-react";

const questions = [
  {
    question: "What does EA stand for?",
    options: ["Enrolled Agent", "Executive Accountant", "Expert Advisor", "Educational Associate"],
    correct: 0,
    spell: "Identifica Agentus"
  },
  {
    question: "Who regulates Enrolled Agents?",
    options: ["State Government", "IRS", "Department of Commerce", "Federal Reserve"],
    correct: 1,
    spell: "Regulatus Revealo"
  },
  {
    question: "Can EAs represent taxpayers in all 50 states?",
    options: ["Yes", "No", "Only with special permission", "Only in their home state"],
    correct: 0,
    spell: "Jurisdiction Maximus"
  }
];

export const EAGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setGameStarted(false);
  };

  if (!gameStarted) {
    return (
      <section id="ea-game" className="py-20 bg-gradient-to-b from-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                Try the <span className="text-accent">Enrolled Agent</span> Quest
              </h2>
              <p className="text-xl text-muted-foreground">
                A magical journey to learn EA fundamentals • Hogwarts meets Tax Law
              </p>
            </div>

            <Card className="p-12 space-y-6 hover-lift bg-gradient-to-br from-primary/5 via-background to-accent/5">
              <div className="flex justify-center gap-8 mb-6">
                <div className="text-center">
                  <Wand2 className="h-12 w-12 text-accent mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Cast Tax Spells</p>
                </div>
                <div className="text-center">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Defend Taxpayers</p>
                </div>
                <div className="text-center">
                  <Zap className="h-12 w-12 text-accent mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Level Up Knowledge</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-lg text-muted-foreground">
                  Test your knowledge of Enrolled Agent fundamentals through an interactive quiz adventure.
                  Learn the basics while having fun!
                </p>
                <div className="inline-block bg-gradient-to-r from-accent/20 to-primary/20 px-6 py-3 rounded-lg">
                  <p className="text-sm font-semibold text-foreground">
                    🎮 {questions.length} Questions • 🏆 Earn Your EA Badge
                  </p>
                </div>
              </div>

              <Button
                size="lg"
                onClick={() => setGameStarted(true)}
                className="bg-gradient-to-r from-accent to-primary hover:opacity-90 text-lg px-8 py-6"
              >
                Begin Quest
              </Button>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    let rank = "Apprentice";
    if (percentage === 100) rank = "Master EA";
    else if (percentage >= 66) rank = "Journeyman EA";

    return (
      <section id="ea-game" className="py-20 bg-gradient-to-b from-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="p-12 text-center space-y-6 hover-lift">
              <h3 className="text-3xl font-bold">Quest Complete! 🎉</h3>
              <div className="space-y-4">
                <div className="text-6xl font-bold text-primary">{score}/{questions.length}</div>
                <p className="text-2xl text-accent font-semibold">Rank: {rank}</p>
                <p className="text-muted-foreground">
                  {percentage === 100 
                    ? "Perfect! You're ready to start your EA journey!"
                    : percentage >= 66
                    ? "Great job! Keep learning to master EA topics."
                    : "Good start! Review the basics and try again."}
                </p>
              </div>
              <Button
                onClick={resetGame}
                size="lg"
                className="bg-gradient-to-r from-accent to-primary hover:opacity-90"
              >
                Play Again
              </Button>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="ea-game" className="py-20 bg-gradient-to-b from-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 space-y-6 hover-lift">
            {/* Progress */}
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-accent" />
                Score: {score}
              </span>
            </div>

            {/* Spell Name */}
            <div className="text-center py-4">
              <p className="text-sm text-accent font-semibold italic">
                ✨ {questions[currentQuestion].spell} ✨
              </p>
            </div>

            {/* Question */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center">
                {questions[currentQuestion].question}
              </h3>

              {/* Answer Options */}
              <div className="grid gap-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                    variant="outline"
                    size="lg"
                    className={`h-auto py-4 text-left justify-start transition-all ${
                      selectedAnswer === index
                        ? index === questions[currentQuestion].correct
                          ? "bg-primary/20 border-primary text-primary font-semibold"
                          : "bg-destructive/20 border-destructive text-destructive"
                        : "hover:bg-accent/10 hover:border-accent"
                    }`}
                  >
                    <span className="flex items-center gap-3 w-full">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
