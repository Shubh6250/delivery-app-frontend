"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Bell,
  ChevronDown,
  DollarSign,
  Home,
  LogOut,
  Menu,
  Package,
  PieChart,
  Settings,
  Star,
  Utensils,
  X,
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/hooks/use-toast"
import { PageTransition } from "@/components/ui/page-transition"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function RestaurantAnalytics() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("week")
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-muted-foreground">Loading analytics data...</p>
        </div>
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xl text-primary">
              <Utensils className="h-6 w-6" />
              <span>FoodHub</span>
              <Badge className="ml-2">Restaurant</Badge>
            </div>
            <div className="hidden md:flex md:items-center md:gap-4">
              <nav className="flex items-center gap-6">
                <Link href="/restaurant/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
                  Dashboard
                </Link>
                <Link href="/restaurant/menu" className="text-sm font-medium transition-colors hover:text-primary">
                  Menu
                </Link>
                <Link href="/restaurant/orders" className="text-sm font-medium transition-colors hover:text-primary">
                  Orders
                </Link>
                <Link href="/restaurant/analytics" className="text-sm font-medium text-primary">
                  Analytics
                </Link>
              </nav>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                    3
                  </Badge>
                  <span className="sr-only">Notifications</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-user.jpg" alt="Restaurant" />
                        <AvatarFallback>BP</AvatarFallback>
                      </Avatar>
                      <span className="sr-only">Profile</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Burger Palace</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Package className="mr-2 h-4 w-4" />
                      <span>Orders</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/auth/login")}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="flex items-center gap-2 font-bold text-xl text-primary mb-6">
                  <Utensils className="h-6 w-6" />
                  <span>FoodHub</span>
                  <Badge className="ml-2">Restaurant</Badge>
                  <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setIsMenuOpen(false)}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
                <nav className="flex flex-col space-y-4">
                  <Link href="/restaurant/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <Home className="mr-2 h-5 w-5" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/restaurant/menu" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <Utensils className="mr-2 h-5 w-5" />
                      Menu
                    </Button>
                  </Link>
                  <Link href="/restaurant/orders" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <Package className="mr-2 h-5 w-5" />
                      Orders
                      <Badge className="ml-auto">3</Badge>
                    </Button>
                  </Link>
                  <Link href="/restaurant/analytics" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start bg-primary/10 text-primary">
                      <PieChart className="mr-2 h-5 w-5" />
                      Analytics
                    </Button>
                  </Link>
                  <Link href="/restaurant/settings" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="mr-2 h-5 w-5" />
                      Settings
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-destructive hover:text-destructive"
                    onClick={() => router.push("/auth/login")}
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Logout
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </header>
        <main className="flex-1">
          <div className="container py-4 md:py-6">
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
                <p className="text-muted-foreground">Track your restaurant's performance and insights</p>
              </div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {timeRange === "day" && "Today"}
                      {timeRange === "week" && "This Week"}
                      {timeRange === "month" && "This Month"}
                      {timeRange === "year" && "This Year"}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTimeRange("day")}>Today</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTimeRange("week")}>This Week</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTimeRange("month")}>This Month</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTimeRange("year")}>This Year</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Custom Range</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button>
                  <Calendar className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">128</div>
                  <div className="flex items-center text-xs text-green-500">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    <span>+14% from last week</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2,463.89</div>
                  <div className="flex items-center text-xs text-green-500">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    <span>+7.4% from last week</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$19.25</div>
                  <div className="flex items-center text-xs text-green-500">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    <span>+2.1% from last week</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1 text-2xl font-bold">
                    4.8
                    <Star className="h-5 w-5 fill-primary text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground">Based on 243 reviews</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                  <CardDescription>Daily revenue for the past week</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <BarChart3 className="mr-2 h-6 w-6" />
                    Revenue chart will be displayed here
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Order Statistics</CardTitle>
                  <CardDescription>Order volume by time of day</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <BarChart3 className="mr-2 h-6 w-6" />
                    Order statistics chart will be displayed here
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Items</CardTitle>
                  <CardDescription>Most popular menu items by sales volume</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-full">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">Double Cheeseburger</div>
                          <div className="text-sm text-muted-foreground">124 sold</div>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[80%] rounded-full bg-primary"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">French Fries</div>
                          <div className="text-sm text-muted-foreground">98 sold</div>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[65%] rounded-full bg-primary"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">Bacon Deluxe Burger</div>
                          <div className="text-sm text-muted-foreground">87 sold</div>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[55%] rounded-full bg-primary"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">Milkshake</div>
                          <div className="text-sm text-muted-foreground">76 sold</div>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[45%] rounded-full bg-primary"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">Veggie Burger</div>
                          <div className="text-sm text-muted-foreground">52 sold</div>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[30%] rounded-full bg-primary"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Customer Demographics</CardTitle>
                  <CardDescription>Customer breakdown by age and location</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <Users className="mr-2 h-6 w-6" />
                    Demographics chart will be displayed here
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
                <CardDescription>Key metrics and recommendations to improve your business</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg bg-muted p-4">
                    <h3 className="font-medium mb-2 flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
                      Peak Hours Optimization
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Your restaurant is busiest between 6:00 PM and 8:00 PM. Consider adding more staff during these
                      hours to improve service speed and customer satisfaction.
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <h3 className="font-medium mb-2 flex items-center">
                      <Star className="mr-2 h-5 w-5 text-yellow-500" />
                      Menu Performance
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Your vegetarian options have seen a 15% increase in orders. Consider expanding your vegetarian
                      menu to capitalize on this trend.
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <h3 className="font-medium mb-2 flex items-center">
                      <DollarSign className="mr-2 h-5 w-5 text-green-500" />
                      Revenue Opportunities
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Customers who order appetizers spend 25% more on average. Consider training your staff to suggest
                      appetizers with main courses.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </PageTransition>
  )
}

