export interface SentimentResult {
  sentiment: "positive" | "negative" | "neutral"
  scores: {
    positive: number
    negative: number
    neutral: number
  }
  keywords: {
    word: string
    type: "positive" | "negative" | "neutral"
    score: number
  }[]
}

