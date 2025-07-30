"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, DollarSign, Users, CreditCard, Activity } from "lucide-react"

const metrics = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Subscriptions",
    value: "+2350",
    change: "+180.1%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Sales",
    value: "+12,234",
    change: "+19%",
    changeType: "positive" as const,
    icon: CreditCard,
  },
  {
    title: "Active Now",
    value: "+573",
    change: "+201",
    changeType: "positive" as const,
    icon: Activity,
  },
]

export function MetricsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {metric.changeType === "positive" ? (
                <ArrowUpIcon className="mr-1 h-3 w-3 text-green-500" />
              ) : (
                <ArrowDownIcon className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span className={metric.changeType === "positive" ? "text-green-500" : "text-red-500"}>
                {metric.change}
              </span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
