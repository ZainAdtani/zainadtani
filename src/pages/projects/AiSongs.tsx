import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

const FILE_SIZE_LYRICS = `[Intro]
Scroll through my phone, see a download size
Brain feels stuck, numbers in disguise
KB MB GB on the line
Time to learn the code, turn data to mine

[Hook]
KB tiny, MB normal, GB huge
Now I read the numbers like a file size guru
KB tiny, MB normal, GB huge
No more panic when I hit the queue

[Verse 1]
Start with a bit, zero one in a row
Eight bits make a byte, simple smooth flow
Then kilo byte, thousand in the stack
Tiny text file, light in the pack
Mega byte next, million in the crew
Photos and songs, all sliding through
Giga byte big, billion on stage
Movies and games, full storage page

[Pre Hook]
Look at the letters, feel the size vibe
Small, medium, giant, pick the right tribe

[Hook]
KB tiny, MB normal, GB huge
Now I read the numbers like a file size guru
KB tiny, MB normal, GB huge
No more panic when I hit the queue

[Verse 2]
Text on the screen, three KB weight
Message to a friend, simple, great
Photo of the squad, four MB each
Ten shots total, forty MB reach
App on my phone, ninety MB wide
Needs wifi now, big digital ride
Game at five GB, better clear space
One big file takes a lot of place

[Bridge]
Under ten MB, I relax, hit go
Ten to a hundred, wifi, smooth flow
Hundred to a GB, check space, move slow
Over one GB, think twice, then download

[Hook]
KB tiny, MB normal, GB huge
Now I read the numbers like a file size guru
KB tiny, MB normal, GB huge
Brain unlocked in the data groove

[Outro]
Kilo then Mega then Giga in time
File size ladder in a simple rhyme
Next time a number pops up on screen
I know what it means, I keep my storage clean`;

const CARRY_IT_FORWARD_LYRICS = `[Verse 1]
Open last years file, flip the page and see
Names match, numbers clean, that is step one for me
Spot the little notes, circle what I owe
Tiny breadcrumbs from the past that help the story flow

[Pre-Chorus]
Capital loss limit, three thousand on the line
Did not use it all? Cool, roll it to this time
Charity too high? NOL in the air?
Write it in the margin, bring it over with care

[Chorus]
Carry it forward, do not leave it behind
Money on the table is money you will find
Last year talks, listen close to the clues
Carry it forward so nothing gets bruised

[Verse 2]
Check the prior credits sleeping in the stack
Foreign tax leftover waiting to come back
AMT memory, notes in blue pen
If it started last year, it can help you again

[Pre-Chorus]
Compare this years picture to the one before
If a number looks wild, pause and explore
Consistency wins, that is how pros play
Prior year roadmap shows you the way

[Chorus]
Carry it forward, do not leave it behind
Money on the table is money you will find
Last year talks, listen close to the clues
Carry it forward so nothing gets bruised

[Bridge]
Past is a mentor, future is a friend
Tie them together, start to end
Audit your habits, tighten the seam
Little carryovers power the dream

[Final Chorus]
Carry it forward, sing it again
Bring every credit, every win
Line by line, make the numbers rhyme
Carry it forward, this is your time

[Outro]
Check, compare, then move along
Prior year whisper becomes your song`;

export default function AiSongs() {
  return (
    <>
      <Helmet>
        <title>AI Songs | Zain Adtani</title>
        <meta
          name="description"
          content="Fun study music made with AI to help you remember tricky topics."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        {/* Hero Banner */}
        <div className="relative w-full h-64 md:h-80 overflow-hidden mb-8">
          <img 
            src="/images/ai-songs-banner.jpg" 
            alt="AI Songs - Play and Pause buttons with musical notes" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
              AI Songs
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto drop-shadow-md">
              Fun study music made with AI to help you remember tricky topics.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-12 max-w-4xl">

          {/* Songs Section */}
          <div className="space-y-8">
            {/* Song 1: File Size Flow */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl">File Size Flow: KB MB GB Rap</CardTitle>
                <CardDescription>
                  Rap lesson that explains bits, bytes, kilobytes, megabytes, and gigabytes in simple terms.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <audio
                  controls
                  className="w-full"
                  preload="metadata"
                >
                  <source src="/audio/file-size-flow-rap.mp3" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>

                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      View Lyrics
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4">
                    <div className="bg-muted/50 rounded-lg p-6">
                      <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed">
                        {FILE_SIZE_LYRICS}
                      </pre>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>

            {/* Song 2: Carry It Forward */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl">Carry It Forward</CardTitle>
                <CardDescription>
                  Pop style song about prior year tax returns, carryforwards, and why you always check last year's file.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <audio
                  controls
                  className="w-full"
                  preload="metadata"
                >
                  <source src="/audio/carry-it-forward.mp3" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>

                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      View Lyrics
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4">
                    <div className="bg-muted/50 rounded-lg p-6">
                      <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed">
                        {CARRY_IT_FORWARD_LYRICS}
                      </pre>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
