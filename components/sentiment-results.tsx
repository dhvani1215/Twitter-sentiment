"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { SentimentResult } from "@/lib/types"
import { SentimentChart } from "@/components/sentiment-chart"
import { SentimentKeywords } from "@/components/sentiment-keywords"

interface SentimentResultsProps {
  results: SentimentResult
  text: string
}

export function SentimentResults({ results, text }: SentimentResultsProps) {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-theme-skyblue text-white hover:bg-theme-skyblue"
      case "negative":
        return "bg-theme-purple text-white hover:bg-theme-purple"
      case "neutral":
        return "bg-theme-lavender text-theme-blue hover:bg-theme-lavender"
      default:
        return ""
    }
  }

  return (
    <Card className="border-theme-lavender shadow-lg">
      <CardHeader className="bg-theme-lavender/30">
        <div className="flex items-center justify-between">
          <CardTitle className="text-theme-blue">Sentiment Analysis Results</CardTitle>
          <Badge className={getSentimentColor(results.sentiment)} variant="outline">
            {results.sentiment.charAt(0).toUpperCase() + results.sentiment.slice(1)}
          </Badge>
        </div>
        <CardDescription className="text-theme-purple">
          Analysis of the tweet's emotional tone and sentiment
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 pt-6">
        <div className="grid gap-2">
          <h3 className="text-sm font-medium text-theme-blue">Analyzed Text</h3>
          <div className="rounded-md bg-theme-lavender/20 p-3 text-sm border border-theme-lavender">{text}</div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium mb-2 text-theme-blue">Sentiment Score</h3>
            <SentimentChart scores={results.scores} />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2 text-theme-blue">Key Sentiment Words</h3>
            <SentimentKeywords keywords={results.keywords} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

