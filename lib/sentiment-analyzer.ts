import type { SentimentResult } from "./types"

// Simple sentiment analysis dictionary
const sentimentDictionary = {
  positive: [
    "good",
    "great",
    "excellent",
    "amazing",
    "wonderful",
    "fantastic",
    "terrific",
    "outstanding",
    "superb",
    "brilliant",
    "awesome",
    "happy",
    "excited",
    "love",
    "best",
    "perfect",
    "impressive",
    "exceptional",
    "delighted",
    "pleased",
    "joy",
    "beautiful",
    "recommend",
    "impressed",
    "thank",
    "thanks",
    "grateful",
    "appreciate",
    "helpful",
    "solved",
    "solution",
    "resolved",
    "above and beyond",
    "impressed",
  ],
  negative: [
    "bad",
    "terrible",
    "awful",
    "horrible",
    "poor",
    "disappointing",
    "disappointed",
    "worst",
    "hate",
    "dislike",
    "annoying",
    "frustrating",
    "frustrated",
    "useless",
    "waste",
    "problem",
    "issue",
    "broken",
    "failure",
    "fail",
    "failed",
    "complaint",
    "complain",
    "unhappy",
    "sad",
    "angry",
    "upset",
    "terrible",
    "horrible",
    "awful",
    "disgusting",
    "pathetic",
    "ridiculous",
    "sucks",
    "suck",
    "rubbish",
    "crap",
  ],
  neutral: [
    "okay",
    "ok",
    "fine",
    "average",
    "mediocre",
    "moderate",
    "standard",
    "normal",
    "common",
    "regular",
    "usual",
    "typical",
    "ordinary",
    "so-so",
    "alright",
    "fair",
    "decent",
    "acceptable",
    "satisfactory",
    "adequate",
    "sufficient",
    "passable",
  ],
}

export function analyzeSentiment(text: string): SentimentResult {
  const words = text.toLowerCase().split(/\s+/)

  let positiveScore = 0
  let negativeScore = 0
  let neutralScore = 0

  const keywordMatches: {
    word: string
    type: "positive" | "negative" | "neutral"
    score: number
  }[] = []

  // Count sentiment words
  words.forEach((word) => {
    // Clean the word of punctuation
    const cleanWord = word.replace(/[^\w\s]/gi, "")

    if (sentimentDictionary.positive.includes(cleanWord)) {
      positiveScore++
      keywordMatches.push({ word: cleanWord, type: "positive", score: 0.8 })
    } else if (sentimentDictionary.negative.includes(cleanWord)) {
      negativeScore++
      keywordMatches.push({ word: cleanWord, type: "negative", score: 0.8 })
    } else if (sentimentDictionary.neutral.includes(cleanWord)) {
      neutralScore++
      keywordMatches.push({ word: cleanWord, type: "neutral", score: 0.6 })
    }

    // Check for phrases (simple approach)
    sentimentDictionary.positive.forEach((phrase) => {
      if (phrase.includes(" ") && text.toLowerCase().includes(phrase)) {
        positiveScore += 2 // Phrases have higher weight
        keywordMatches.push({ word: phrase, type: "positive", score: 0.9 })
      }
    })

    sentimentDictionary.negative.forEach((phrase) => {
      if (phrase.includes(" ") && text.toLowerCase().includes(phrase)) {
        negativeScore += 2 // Phrases have higher weight
        keywordMatches.push({ word: phrase, type: "negative", score: 0.9 })
      }
    })
  })

  // Calculate total and normalize scores
  const total = positiveScore + negativeScore + neutralScore || 1 // Avoid division by zero

  const normalizedScores = {
    positive: positiveScore / total,
    negative: negativeScore / total,
    neutral: neutralScore / total,
  }

  // If no sentiment words found, default to neutral
  if (total === 0) {
    normalizedScores.neutral = 1
  }

  // Determine overall sentiment
  let sentiment: "positive" | "negative" | "neutral" = "neutral"

  if (normalizedScores.positive > normalizedScores.negative && normalizedScores.positive > normalizedScores.neutral) {
    sentiment = "positive"
  } else if (
    normalizedScores.negative > normalizedScores.positive &&
    normalizedScores.negative > normalizedScores.neutral
  ) {
    sentiment = "negative"
  }

  // Sort and limit keywords
  const uniqueKeywords = Array.from(new Map(keywordMatches.map((item) => [item.word, item])).values())

  const sortedKeywords = uniqueKeywords.sort((a, b) => b.score - a.score).slice(0, 5)

  return {
    sentiment,
    scores: normalizedScores,
    keywords: sortedKeywords,
  }
}

