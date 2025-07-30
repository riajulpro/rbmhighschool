"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Mon", value: 400 },
  { name: "Tue", value: 300 },
  { name: "Wed", value: 600 },
  { name: "Thu", value: 800 },
  { name: "Fri", value: 500 },
  { name: "Sat", value: 700 },
  { name: "Sun", value: 400 },
]

export function ActivityChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="currentColor"
          strokeWidth={2}
          className="stroke-primary"
          dot={{ fill: "currentColor", className: "fill-primary" }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
