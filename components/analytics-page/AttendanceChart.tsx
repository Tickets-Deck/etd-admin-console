"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const data = [
  {
    name: "The Ultimate 2-Hour Boat Cruise",
    sold: 120,
    attended: 98,
  },
  {
    name: "The Ginger Experience",
    sold: 85,
    attended: 65,
  },
  {
    name: "Shabamola Fest All White Party",
    sold: 210,
    attended: 180,
  },
  {
    name: "Lagos Tech Conference",
    sold: 320,
    attended: 290,
  },
  {
    name: "Afrobeats Night",
    sold: 450,
    attended: 410,
  },
];

export function AttendanceChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sold" name="Tickets Sold" fill="#9333ea" />
        <Bar dataKey="attended" name="Attendees" fill="#22c55e" />
      </BarChart>
    </ResponsiveContainer>
  );
}
