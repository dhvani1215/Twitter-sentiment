"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface SentimentChartProps {
  scores: {
    positive: number
    negative: number
    neutral: number
  }
}

export function SentimentChart({ scores }: SentimentChartProps) {
  const data = [
    { name: "Positive", value: scores.positive, color: "#5AB9EA" },
    { name: "Negative", value: scores.negative, color: "#8860D0" },
    { name: "Neutral", value: scores.neutral, color: "#C1C8E4" },
  ]

  return (
    <ChartContainer
      config={{
        positive: {
          label: "Positive",
          color: "#5AB9EA",
        },
        negative: {
          label: "Negative",
          color: "#8860D0",
        },
        neutral: {
          label: "Neutral",
          color: "#C1C8E4",
        },
      }}
      className="h-[200px]"
    >
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }} accessibilityLayer>
        <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={8} stroke="#5680E9" />
        <YAxis
          domain={[0, 1]}
          axisLine={false}
          tickLine={false}
          tickMargin={8}
          tickFormatter={(value) => `${Math.round(value * 100)}%`}
          stroke="#5680E9"
        />
        <Bar dataKey="value" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-[var(--color-positive)]" />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} cursor={false} />
      </BarChart>
    </ChartContainer>
  )
}

