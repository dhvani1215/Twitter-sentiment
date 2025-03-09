"use client"

import { Button } from "@/components/ui/button"

interface SampleTweetsProps {
  onSelect: (sample: string) => void
}

export function SampleTweets({ onSelect }: SampleTweetsProps) {
  const samples = [
    "Just had the best customer service experience ever with @company! They went above and beyond to solve my problem. So impressed! #HappyCustomer",
    "This product is absolutely terrible. It broke after two days and customer service won't respond to my emails. Complete waste of money. #Disappointed",
    "The weather today is cloudy with a chance of rain later this afternoon. Temperature around 65°F. #WeatherUpdate",
    "I'm so excited to announce that I've accepted a new job offer! Can't wait to start this new chapter in my career. #NewBeginnings",
    "Frustrated with the constant delays on my commute this week. Third time being late to work because of train issues. #TransportProblems",
  ]

  return (
    <div className="space-y-2">
      <p className="text-sm text-theme-purple">Or try one of these samples:</p>
      <div className="flex flex-wrap gap-2">
        {samples.map((sample, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onSelect(sample)}
            className="text-xs border-theme-cyan text-theme-blue hover:bg-theme-lavender/30 hover:text-theme-purple"
          >
            Sample {index + 1}
          </Button>
        ))}
      </div>
    </div>
  )
}

