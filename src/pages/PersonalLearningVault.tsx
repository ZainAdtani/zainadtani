import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExternalLink } from "lucide-react";

export default function PersonalLearningVault() {
  // Sample data for the table
  const sampleRows = [
    {
      videoTitle: "The 80/20 Rule for Learning",
      topic: "Productivity",
      keyIdeas: "Focus on the 20% of content that gives 80% of results. Skip perfection early on.",
      actionSteps: "Pick one skill. List 5 core concepts. Practice those first before moving to extras.",
      link: "https://youtube.com/example1",
      tags: "Productivity, Learning",
    },
    {
      videoTitle: "How to Take Smart Notes",
      topic: "Study Methods",
      keyIdeas: "Write notes in your own words. Link new ideas to old ones. Review weekly, not monthly.",
      actionSteps: "After each video, write 3 key points in a doc. Connect them to past notes.",
      link: "https://youtube.com/example2",
      tags: "Study, Mindset",
    },
    {
      videoTitle: "The Science of Building Habits",
      topic: "Mindset",
      keyIdeas: "Start small. Stack new habits onto old ones. Track progress daily to stay motivated.",
      actionSteps: "Choose one tiny habit (2 min). Do it after an existing routine. Mark it on a calendar.",
      link: "https://youtube.com/example3",
      tags: "Habits, Mindset",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Personal Learning Vault | Zain Adtani</title>
        <meta
          name="description"
          content="A simple place to store what you learn, so you can reuse it later."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12 max-w-6xl space-y-8">
        {/* Hero */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold">Personal Learning Vault</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A simple place to store what you learn, so you can reuse it later.
          </p>
        </header>

        {/* Intro paragraph */}
        <Card className="p-6 md:p-8 rounded-2xl">
          <p className="text-muted-foreground leading-relaxed">
            Whenever I watch a video or read an article, I drop the key ideas in this vault so I do not lose them a
            week later. This way, I build a searchable library of everything I learned, ready to use in my work and
            life.
          </p>
        </Card>

        {/* How to set up your vault */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold">How to set up your vault</h2>
          <Card className="p-6 md:p-8 rounded-2xl">
            <p className="text-muted-foreground leading-relaxed">
              Build a simple table in Notion, Excel, or Google Sheets with fields like: <strong>Video Title</strong>,{" "}
              <strong>Topic</strong>, <strong>Key ideas</strong>, <strong>Action steps</strong>,{" "}
              <strong>Reflection or quiz questions</strong>, <strong>Link</strong>, <strong>Tags</strong> such as
              Marketing, Productivity, Mindset.
              <br />
              <br />
              Each time you summarize a new video, add one new row to your vault. Over time you build a searchable
              library of everything you learned, ready to use in your work and life.
            </p>
          </Card>
        </section>

        {/* Sample table */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Sample vault table</h2>
          <Card className="p-6 md:p-8 rounded-2xl overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Video Title</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead>Key Ideas</TableHead>
                  <TableHead>Action Steps</TableHead>
                  <TableHead>Link</TableHead>
                  <TableHead>Tags</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleRows.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{row.videoTitle}</TableCell>
                    <TableCell>{row.topic}</TableCell>
                    <TableCell>{row.keyIdeas}</TableCell>
                    <TableCell>{row.actionSteps}</TableCell>
                    <TableCell>
                      <a
                        href={row.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Link
                      </a>
                    </TableCell>
                    <TableCell>{row.tags}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </section>
      </div>
    </div>
  );
}
