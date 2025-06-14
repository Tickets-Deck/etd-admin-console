"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

const data = [
  {
    name: "Week 1",
    revenue: 120000,
    tickets: 24,
  },
  {
    name: "Week 2",
    revenue: 240000,
    tickets: 48,
  },
  {
    name: "Week 3",
    revenue: 350000,
    tickets: 70,
  },
  {
    name: "Week 4",
    revenue: 535670,
    tickets: 107,
  },
]

export function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" orientation="left" stroke="#9333ea" />
        <YAxis yAxisId="right" orientation="right" stroke="#22c55e" />
        <Tooltip
          formatter={(value, name) => {
            if (name === "revenue") return [`₦${Number(value).toLocaleString()}`, "Revenue"]
            return [value, "Tickets"]
          }}
        />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#9333ea" name="Revenue" activeDot={{ r: 8 }} />
        <Line yAxisId="right" type="monotone" dataKey="tickets" stroke="#22c55e" name="Tickets Sold" />
      </LineChart>
    </ResponsiveContainer>
  )
}
