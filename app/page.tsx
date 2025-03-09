import { SentimentAnalyzer } from "@/components/sentiment-analyzer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-theme-blue via-theme-skyblue to-theme-purple">
      <div className="container mx-auto py-10 px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Twitter Sentiment Analysis
            </h1>
            <p className="text-theme-lavender md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Analyze the sentiment of tweets to understand public opinion and emotional tone.
            </p>
          </div>
          <SentimentAnalyzer />
        </div>
      </div>
    </main>
  )
}

