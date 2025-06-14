"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

const data = [
  { day: "Mon", value: 40 },
  { day: "Tue", value: 30 },
  { day: "Wed", value: 45 },
  { day: "Thu", value: 55 },
  { day: "Fri", value: 25 },
  { day: "Sat", value: 60 },
  { day: "Sun", value: 75 },
]

export default function WeeklyIncomeChart() {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Income",
          color: "hsl(142, 76%, 36%)",
        },
      }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" />
          <YAxis axisLine={false} tickLine={false} domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--color-value)"
            strokeWidth={2}
            dot={{ r: 0 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
