"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Bell,
  ChevronDown,
  Clock,
  DollarSign,
  Home,
  LogOut,
  Menu,
  Package,
  PieChart,
  Plus,
  Settings,
  Star,
  Utensils,
  X,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function RestaurantDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const orders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      items: [
        { name: "Double Cheeseburger", quantity: 2 },
        { name: "French Fries", quantity: 1 },
      ],
      total: 23.97,
      status: "new",
      time: "5 min ago",
    },
    {
      id: "ORD-002",
      customer: "Alice Smith",
      items: [
        { name: "Veggie Burger", quantity: 1 },
        { name: "Onion Rings", quantity: 1 },
      ],
      total: 13.98,
      status: "preparing",
      time: "15 min ago",
    },
    {
      id: "ORD-003",
      customer: "Robert Johnson",
      items: [
        { name: "Classic Hamburger", quantity: 1 },
        { name: "Milkshake", quantity: 1 },
      ],
      total: 12.98,
      status: "ready",
      time: "25 min ago",
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      items: [
        { name: "Bacon Deluxe Burger", quantity: 1 },
        { name: "Soda", quantity: 2 },
      ],
      total: 14.97,
      status: "out-for-delivery",
      time: "35 min ago",
    },
    {
      id: "ORD-005",
      customer: "Michael Wilson",
      items: [
        { name: "Double Cheeseburger", quantity: 1 },
        { name: "French Fries", quantity: 1 },
        { name: "Soda", quantity: 1 },
      ],
      total: 15.97,
      status: "delivered",
      time: "1 hour ago",
    },
  ]

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    toast({
      title: "Order status updated",
      description: `Order ${orderId} has been updated to ${newStatus}`,
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
      case "preparing":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Preparing</Badge>
      case "ready":
        return <Badge className="bg-green-500 hover:bg-green-600">Ready</Badge>
      case "out-for-delivery":
        return <Badge className="bg-purple-500 hover:bg-purple-600">Out for Delivery</Badge>
      case "delivered":
        return <Badge variant="outline">Delivered</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getNextStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case "new":
        return "preparing"
      case "preparing":
        return "ready"
      case "ready":
        return "out-for-delivery"
      case "out-for-delivery":
        return "delivered"
      default:
        return currentStatus
    }
  }

  return (
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
              <Link href="/restaurant/analytics" className="text-sm font-medium transition-colors hover:text-primary">
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
                  <Button variant="ghost" className="w-full justify-start">
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
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Restaurant Dashboard</h1>
            <p className="text-muted-foreground">Manage your restaurant, orders, and menu</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">128</div>
                <p className="text-xs text-muted-foreground">+14% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,463.89</div>
                <p className="text-xs text-muted-foreground">+7.4% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$19.25</div>
                <p className="text-xs text-muted-foreground">+2.1% from last week</p>
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

          <Tabs defaultValue="new" className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Recent Orders</h2>
              <Link href="/restaurant/orders">
                <Button variant="outline">View All Orders</Button>
              </Link>
            </div>
            <TabsList className="mb-4">
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="preparing">Preparing</TabsTrigger>
              <TabsTrigger value="ready">Ready</TabsTrigger>
              <TabsTrigger value="out-for-delivery">Out for Delivery</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>
            <TabsContent value="new">
              <div className="space-y-4">
                {orders
                  .filter((order) => order.status === "new")
                  .map((order) => (
                    <Card key={order.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{order.id}</CardTitle>
                          {getStatusBadge(order.status)}
                        </div>
                        <CardDescription>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {order.time}
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="mb-2">
                          <div className="font-medium">{order.customer}</div>
                        </div>
                        <div className="space-y-1">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>
                                {item.quantity}x {item.name}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 flex items-center justify-between font-medium">
                          <span>Total</span>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm" onClick={() => updateOrderStatus(order.id, "rejected")}>
                          Reject
                        </Button>
                        <Button size="sm" onClick={() => updateOrderStatus(order.id, getNextStatus(order.status))}>
                          Accept & Prepare
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="preparing">
              <div className="space-y-4">
                {orders
                  .filter((order) => order.status === "preparing")
                  .map((order) => (
                    <Card key={order.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{order.id}</CardTitle>
                          {getStatusBadge(order.status)}
                        </div>
                        <CardDescription>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {order.time}
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="mb-2">
                          <div className="font-medium">{order.customer}</div>
                        </div>
                        <div className="space-y-1">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>
                                {item.quantity}x {item.name}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 flex items-center justify-between font-medium">
                          <span>Total</span>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className="w-full"
                          onClick={() => updateOrderStatus(order.id, getNextStatus(order.status))}
                        >
                          Mark as Ready
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="ready">
              <div className="space-y-4">
                {orders
                  .filter((order) => order.status === "ready")
                  .map((order) => (
                    <Card key={order.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{order.id}</CardTitle>
                          {getStatusBadge(order.status)}
                        </div>
                        <CardDescription>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {order.time}
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="mb-2">
                          <div className="font-medium">{order.customer}</div>
                        </div>
                        <div className="space-y-1">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>
                                {item.quantity}x {item.name}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 flex items-center justify-between font-medium">
                          <span>Total</span>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className="w-full"
                          onClick={() => updateOrderStatus(order.id, getNextStatus(order.status))}
                        >
                          Hand to Delivery Partner
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="out-for-delivery">
              <div className="space-y-4">
                {orders
                  .filter((order) => order.status === "out-for-delivery")
                  .map((order) => (
                    <Card key={order.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{order.id}</CardTitle>
                          {getStatusBadge(order.status)}
                        </div>
                        <CardDescription>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {order.time}
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="mb-2">
                          <div className="font-medium">{order.customer}</div>
                        </div>
                        <div className="space-y-1">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>
                                {item.quantity}x {item.name}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 flex items-center justify-between font-medium">
                          <span>Total</span>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className="w-full"
                          variant="outline"
                          onClick={() => updateOrderStatus(order.id, getNextStatus(order.status))}
                        >
                          Track Delivery
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="delivered">
              <div className="space-y-4">
                {orders
                  .filter((order) => order.status === "delivered")
                  .map((order) => (
                    <Card key={order.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{order.id}</CardTitle>
                          {getStatusBadge(order.status)}
                        </div>
                        <CardDescription>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {order.time}
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="mb-2">
                          <div className="font-medium">{order.customer}</div>
                        </div>
                        <div className="space-y-1">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>
                                {item.quantity}x {item.name}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 flex items-center justify-between font-medium">
                          <span>Total</span>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" variant="outline">
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Popular Menu Items</h2>
              <Link href="/restaurant/menu">
                <Button variant="outline">Manage Menu</Button>
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Double Cheeseburger</CardTitle>
                    <Badge variant="outline">Popular</Badge>
                  </div>
                  <CardDescription>$9.99</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center gap-4">
                    <img
                      src="/placeholder.svg?height=60&width=60"
                      alt="Double Cheeseburger"
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Two beef patties with cheese, lettuce, tomato, and special sauce
                      </p>
                      <div className="mt-2 flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-sm font-medium">4.8</span>
                        <span className="text-xs text-muted-foreground">(124 reviews)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <ChevronDown className="h-4 w-4" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Mark as Unavailable</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Bacon Deluxe Burger</CardTitle>
                    <Badge variant="outline">Popular</Badge>
                  </div>
                  <CardDescription>$10.99</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center gap-4">
                    <img
                      src="/placeholder.svg?height=60&width=60"
                      alt="Bacon Deluxe Burger"
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Beef patty with bacon, cheese, lettuce, tomato, and mayo
                      </p>
                      <div className="mt-2 flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-sm font-medium">4.7</span>
                        <span className="text-xs text-muted-foreground">(98 reviews)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <ChevronDown className="h-4 w-4" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Mark as Unavailable</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">French Fries</CardTitle>
                    <Badge variant="outline">Popular</Badge>
                  </div>
                  <CardDescription>$3.99</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center gap-4">
                    <img
                      src="/placeholder.svg?height=60&width=60"
                      alt="French Fries"
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div>
                      <p className="text-sm text-muted-foreground">Crispy golden fries with sea salt</p>
                      <div className="mt-2 flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-sm font-medium">4.6</span>
                        <span className="text-xs text-muted-foreground">(156 reviews)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <ChevronDown className="h-4 w-4" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Mark as Unavailable</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardFooter>
              </Card>
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="outline" className="gap-1">
                <Plus className="h-4 w-4" />
                Add New Menu Item
              </Button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Revenue Overview</h2>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    This Week
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Today</DropdownMenuItem>
                  <DropdownMenuItem>This Week</DropdownMenuItem>
                  <DropdownMenuItem>This Month</DropdownMenuItem>
                  <DropdownMenuItem>This Year</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Custom Range</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Revenue by Day</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <DollarSign className="mr-2 h-6 w-6" />
                    Revenue chart will be displayed here
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Top Selling Items</CardTitle>
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
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

