"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Bell,
  Clock,
  Home,
  LogOut,
  Menu,
  Package,
  PieChart,
  Settings,
  Utensils,
  X,
  Search,
  Filter,
  Calendar,
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
import { PageTransition } from "@/components/ui/page-transition"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RestaurantOrders() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

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
    {
      id: "ORD-006",
      customer: "Sarah Brown",
      items: [
        { name: "Veggie Burger", quantity: 2 },
        { name: "Sweet Potato Fries", quantity: 1 },
        { name: "Iced Tea", quantity: 2 },
      ],
      total: 22.95,
      status: "delivered",
      time: "2 hours ago",
    },
    {
      id: "ORD-007",
      customer: "David Lee",
      items: [
        { name: "Bacon Deluxe Burger", quantity: 1 },
        { name: "Onion Rings", quantity: 1 },
        { name: "Chocolate Milkshake", quantity: 1 },
      ],
      total: 18.47,
      status: "delivered",
      time: "3 hours ago",
    },
    {
      id: "ORD-008",
      customer: "Jennifer Taylor",
      items: [
        { name: "Double Cheeseburger", quantity: 1 },
        { name: "Chicken Nuggets", quantity: 1 },
        { name: "Soda", quantity: 1 },
      ],
      total: 16.98,
      status: "cancelled",
      time: "4 hours ago",
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
      case "cancelled":
        return (
          <Badge variant="outline" className="border-destructive text-destructive">
            Cancelled
          </Badge>
        )
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

  const getNextStatusButton = (order: any) => {
    switch (order.status) {
      case "new":
        return (
          <Button size="sm" onClick={() => updateOrderStatus(order.id, getNextStatus(order.status))}>
            Accept & Prepare
          </Button>
        )
      case "preparing":
        return (
          <Button size="sm" onClick={() => updateOrderStatus(order.id, getNextStatus(order.status))}>
            Mark as Ready
          </Button>
        )
      case "ready":
        return (
          <Button size="sm" onClick={() => updateOrderStatus(order.id, getNextStatus(order.status))}>
            Hand to Delivery
          </Button>
        )
      case "out-for-delivery":
        return (
          <Button size="sm" variant="outline" onClick={() => updateOrderStatus(order.id, getNextStatus(order.status))}>
            Track Delivery
          </Button>
        )
      case "delivered":
      case "cancelled":
        return (
          <Button size="sm" variant="outline">
            View Details
          </Button>
        )
      default:
        return null
    }
  }

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-muted-foreground">Loading orders...</p>
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
                <Link href="/restaurant/orders" className="text-sm font-medium text-primary">
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
                    <Button variant="ghost" className="w-full justify-start bg-primary/10 text-primary">
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
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Orders Management</h1>
                <p className="text-muted-foreground">View and manage your restaurant orders</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search orders..."
                    className="w-full pl-8 md:w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-1">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" className="gap-1">
                    <Calendar className="h-4 w-4" />
                    Date
                  </Button>
                </div>
              </div>
            </div>

            <Tabs defaultValue="all" className="mb-8">
              <TabsList>
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
                <TabsTrigger value="preparing">Preparing</TabsTrigger>
                <TabsTrigger value="ready">Ready</TabsTrigger>
                <TabsTrigger value="out-for-delivery">Out for Delivery</TabsTrigger>
                <TabsTrigger value="delivered">Delivered</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>

              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">{filteredOrders.length}</span> orders
                </div>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="highest">Highest Value</SelectItem>
                    <SelectItem value="lowest">Lowest Value</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <TabsContent value="all" className="mt-4">
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
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
                        {order.status === "new" && (
                          <Button variant="outline" size="sm" onClick={() => updateOrderStatus(order.id, "cancelled")}>
                            Reject
                          </Button>
                        )}
                        {getNextStatusButton(order)}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {["new", "preparing", "ready", "out-for-delivery", "delivered", "cancelled"].map((status) => (
                <TabsContent key={status} value={status} className="mt-4">
                  <div className="space-y-4">
                    {filteredOrders
                      .filter((order) => order.status === status)
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
                            {order.status === "new" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, "cancelled")}
                              >
                                Reject
                              </Button>
                            )}
                            {getNextStatusButton(order)}
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </main>
      </div>
    </PageTransition>
  )
}

