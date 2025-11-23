import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

const FILE_SIZE_LYRICS = `[Verse 1]
Started with a bit, just a zero or one
Binary basic, that's where we begun
Eight bits together, that's a byte you see
The building block of all technology

Thousand bytes together, that's a kilobyte my friend
KB on your screen, let the data comprehend
Million bytes stacking, megabyte's the name
MB for your photos in the digital game

[Chorus]
It's the file size flow, from the smallest to the great
Bits to bytes to kilobytes, now let me educate
Megabytes to gigabytes, watch the numbers elevate
Understanding storage, man, isn't it just great?

[Verse 2]
Thousand megabytes, now we're talking gigabyte
GB for your movies, keep your hard drive tight
Every step is thousand times, that's the pattern here
From the tiny bit to gigs, let me make it clear

Documents are kilobytes, songs are megs you know
Videos are gigabytes when you let them flow
Understanding size helps you manage what you save
From your texts to your streams, be a storage wave

[Chorus]
It's the file size flow, from the smallest to the great
Bits to bytes to kilobytes, now let me educate
Megabytes to gigabytes, watch the numbers elevate
Understanding storage, man, isn't it just great?

[Bridge]
One bit, eight bits byte
Thousand KB in sight
Thousand MB that's a GB right
File size flow taking flight

[Outro]
Now you know the progression, from bit to byte to more
Kilobyte, megabyte, gigabyte core
Next time you save a file, you'll understand the score
File size flow, that's what knowledge is for!`;

const CARRY_IT_FORWARD_LYRICS = `[Verse 1]
Got my coffee and my files from last year
Pulling up returns, making everything clear
Client asks me "Why you need my old stuff?"
I say "Trust me friend, this year's not enough"

[Pre-Chorus]
'Cause what you lost last year isn't really gone
Those NOLs and credits? Man they carry on

[Chorus]
We gotta carry it forward, carry it forward
Don't let those losses disappear into the void
Carry it forward, carry it forward
Past year's pain becomes this year's employed
Check the carryovers, don't ignore them
Read the footnotes, file before them
Carry it forward, forward
That's how we score

[Verse 2]
Capital loss from stocks that fell?
Offset your gains, I know it well
Three thousand off your ordinary income
Prior year returns? Where they come from!

Education credits, depreciation too
Charitable gifts when deduction's due
Every carryforward's got an expiration date
File it right or you'll learn too late

[Bridge]
Twenty years for NOLs if you qualify
Five years for capital, don't let 'em pass you by
Check that 1040, line by line we'll go
Last year's return is the start of this year's show

[Chorus]
We gotta carry it forward, carry it forward
Don't let those losses disappear into the void
Carry it forward, carry it forward
Past year's pain becomes this year's employed
Check the carryovers, don't ignore them
Read the footnotes, file before them
Carry it forward, forward
That's how we score

[Outro]
So next time you file, bring your history
Prior year returns solve the mystery
Those carryforwards are money you can claim
Carry it forward, forward, play the game!`;

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
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              AI Songs
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fun study music made with AI to help you remember tricky topics.
            </p>
          </div>

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
