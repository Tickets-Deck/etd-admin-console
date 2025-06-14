"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const data = [
  { name: "Active", value: 60, color: "#00A9A5" },
  { name: "Expired", value: 20, color: "#E91E63" },
  { name: "Checked In", value: 10, color: "#3F51B5" },
//   { name: "Blocked", value: 5, color: "#9C27B0" },
//   { name: "Lost", value: 5, color: "#FFC107" },
]

export default function TicketStatusChart() {
  return (
    <div className="flex flex-col items-center justify-center h-[300px]">
      <div className="relative w-full h-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              radius={80}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-sm text-muted-foreground">Total Tickets</div>
          <div className="text-3xl font-bold">2,450</div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-sm">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
