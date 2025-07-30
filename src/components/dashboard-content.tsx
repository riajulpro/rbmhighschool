"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { RecentSales } from "@/components/recent-sales"
import { MetricsCards } from "@/components/metrics-cards"
import { ActivityChart } from "@/components/activity-chart"

export function DashboardContent() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">Here's what's happening with your business today.</p>
          </div>
        </div>

        <MetricsCards />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>You made 265 sales this month.</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentSales />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
              <CardDescription>Your activity over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityChart />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Conversion Rate</span>
                <span className="text-sm text-muted-foreground">12.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Bounce Rate</span>
                <span className="text-sm text-muted-foreground">34.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Session Duration</span>
                <span className="text-sm text-muted-foreground">2m 34s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Page Views</span>
                <span className="text-sm text-muted-foreground">1,234</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
