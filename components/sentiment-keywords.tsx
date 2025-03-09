import { Badge } from "@/components/ui/badge"

interface SentimentKeywordsProps {
  keywords: {
    word: string
    type: "positive" | "negative" | "neutral"
    score: number
  }[]
}

export function SentimentKeywords({ keywords }: SentimentKeywordsProps) {
  const getKeywordColor = (type: string) => {
    switch (type) {
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
    <div className="flex flex-wrap gap-2">
      {keywords.length === 0 ? (
        <p className="text-sm text-muted-foreground">No significant keywords found</p>
      ) : (
        keywords.map((keyword, index) => (
          <Badge key={index} variant="outline" className={`${getKeywordColor(keyword.type)}`}>
            {keyword.word} ({(keyword.score * 100).toFixed(0)}%)
          </Badge>
        ))
      )}
    </div>
  )
}

