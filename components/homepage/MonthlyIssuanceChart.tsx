"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

const data = [
  { month: "May", personalized: 20, instant: 45 },
  { month: "Jun", personalized: 30, instant: 60 },
  { month: "Jul", personalized: 15, instant: 25 },
  { month: "Aug", personalized: 25, instant: 50 },
  { month: "Sep", personalized: 20, instant: 40 },
  { month: "Oct", personalized: 30, instant: 55 },
  { month: "Nov", personalized: 25, instant: 45 },
]

export default function MonthlyIssuanceChart() {
  return (
    <ChartContainer
      config={{
        personalized: {
          label: "Personalized",
          color: "hsl(220, 70%, 50%)",
        },
        instant: {
          label: "Instant",
          color: "hsl(200, 70%, 80%)",
        },
      }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis axisLine={false} tickLine={false} domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} />
          <Bar dataKey="personalized" fill="var(--color-personalized)" radius={0} />
          <Bar dataKey="instant" fill="var(--color-instant)" radius={0} />
          <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
