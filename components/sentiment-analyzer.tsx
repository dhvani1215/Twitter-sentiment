"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { SentimentResults } from "@/components/sentiment-results"
import { SampleTweets } from "@/components/sample-tweets"
import { analyzeSentiment } from "@/lib/sentiment-analyzer"
import type { SentimentResult } from "@/lib/types"

export function SentimentAnalyzer() {
  const [text, setText] = useState("")
  const [results, setResults] = useState<SentimentResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = () => {
    if (!text.trim()) return

    setIsAnalyzing(true)

    // Simulate API call delay
    setTimeout(() => {
      const sentimentResults = analyzeSentiment(text)
      setResults(sentimentResults)
      setIsAnalyzing(false)
    }, 800)
  }

  const handleSampleSelect = (sample: string) => {
    setText(sample)
  }

  return (
    <div className="grid gap-6">
      <Card className="border-theme-lavender shadow-lg">
        <CardHeader className="bg-theme-lavender/30">
          <CardTitle className="text-theme-blue">Analyze Tweet Sentiment</CardTitle>
          <CardDescription className="text-theme-purple">
            Enter text to analyze its sentiment. Our algorithm will determine if the content is positive, negative, or
            neutral.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-4">
            <Textarea
              placeholder="Enter tweet text here..."
              className="min-h-[120px] border-theme-cyan focus-visible:ring-theme-purple"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <SampleTweets onSelect={handleSampleSelect} />
          </div>
        </CardContent>
        <CardFooter className="bg-theme-lavender/10">
          <Button
            onClick={handleAnalyze}
            disabled={!text.trim() || isAnalyzing}
            className="bg-theme-blue hover:bg-theme-purple transition-colors"
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Sentiment"}
          </Button>
        </CardFooter>
      </Card>

      {results && <SentimentResults results={results} text={text} />}
    </div>
  )
}

