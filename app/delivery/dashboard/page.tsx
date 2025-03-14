"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Bell,
  CheckCircle,
  Clock,
  Home,
  LogOut,
  MapPin,
  Menu,
  Navigation,
  Package,
  Settings,
  Star,
  Truck,
  User,
  Utensils,
  X,
  DollarSign,
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
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function DeliveryDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  const availableOrders = [
    {
      id: "ORD-003",
      restaurant: {
        name: "Burger Palace",
        address: "123 Main St, Anytown, USA",
        distance: "0.8 miles away",
      },
      customer: {
        name: "Robert Johnson",
        address: "456 Oak St, Anytown, USA",
        distance: "1.2 miles away",
      },
      items: [
        { name: "Classic Hamburger", quantity: 1 },
        { name: "Milkshake", quantity: 1 },
      ],
      total: 12.98,
      estimatedTime: "20-30 min",
      estimatedEarning: "$5.50",
    },
  ]

  const activeOrders = [
    {
      id: "ORD-004",
      restaurant: {
        name: "Burger Palace",
        address: "123 Main St, Anytown, USA",
        distance: "0.3 miles away",
      },
      customer: {
        name: "Emily Davis",
        address: "789 Pine St, Anytown, USA",
        distance: "1.5 miles away",
      },
      items: [
        { name: "Bacon Deluxe Burger", quantity: 1 },
        { name: "Soda", quantity: 2 },
      ],
      total: 14.97,
      status: "picked-up",
      estimatedEarning: "$6.25",
    },
  ]

  const completedOrders = [
    {
      id: "ORD-001",
      restaurant: {
        name: "Burger Palace",
      },
      customer: {
        name: "John Doe",
      },
      total: 23.97,
      completedAt: "Today, 2:30 PM",
      earning: "$7.50",
    },
    {
      id: "ORD-002",
      restaurant: {
        name: "Pizza Heaven",
      },
      customer: {
        name: "Alice Smith",
      },
      total: 18.99,
      completedAt: "Today, 12:15 PM",
      earning: "$6.75",
    },
  ]

  const acceptOrder = (orderId: string) => {
    toast({
      title: "Order accepted",
      description: `You've accepted order ${orderId}`,
    })
  }

  const updateOrderStatus = (orderId: string, status: string) => {
    toast({
      title: "Order status updated",
      description: `Order ${orderId} has been updated to ${status}`,
    })
  }

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline)
    toast({
      title: isOnline ? "You're now offline" : "You're now online",
      description: isOnline ? "You won't receive new delivery requests" : "You'll start receiving delivery requests",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
            <Utensils className="h-6 w-6" />
            <span>FoodHub</span>
            <Badge className="ml-2">Delivery</Badge>
          </div>
          <div className="hidden md:flex md:items-center md:gap-4">
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${isOnline ? "text-green-500" : "text-muted-foreground"}`}>
                {isOnline ? "Online" : "Offline"}
              </span>
              <Switch
                checked={isOnline}
                onCheckedChange={toggleOnlineStatus}
                className={isOnline ? "bg-green-500" : ""}
              />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                2
              </Badge>
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="Delivery Partner" />
                    <AvatarFallback>DP</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Profile</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Michael Johnson</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Package className="mr-2 h-4 w-4" />
                  <span>Earnings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/auth/login")}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                <Badge className="ml-2">Delivery</Badge>
                <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setIsMenuOpen(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <span className={`text-sm font-medium ${isOnline ? "text-green-500" : "text-muted-foreground"}`}>
                  {isOnline ? "Online" : "Offline"}
                </span>
                <Switch
                  checked={isOnline}
                  onCheckedChange={toggleOnlineStatus}
                  className={isOnline ? "bg-green-500" : ""}
                />
              </div>
              <nav className="flex flex-col space-y-4">
                <Link href="/delivery/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <Home className="mr-2 h-5 w-5" />
                    Dashboard
                  </Button>
                </Link>
                <Link href="/delivery/orders" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <Package className="mr-2 h-5 w-5" />
                    Orders
                  </Button>
                </Link>
                <Link href="/delivery/earnings" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <DollarSign className="mr-2 h-5 w-5" />
                    Earnings
                  </Button>
                </Link>
                <Link href="/delivery/profile" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="mr-2 h-5 w-5" />
                    Profile
                  </Button>
                </Link>
                <Link href="/delivery/settings" onClick={() => setIsMenuOpen(false)}>
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
            <h1 className="text-2xl font-bold tracking-tight">Delivery Dashboard</h1>
            <p className="text-muted-foreground">Manage your deliveries and track your earnings</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Today's Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$14.25</div>
                <p className="text-xs text-muted-foreground">2 deliveries completed</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$87.50</div>
                <p className="text-xs text-muted-foreground">12 deliveries completed</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Acceptance Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 text-2xl font-bold">
                  4.9
                  <Star className="h-5 w-5 fill-primary text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">Based on 56 ratings</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="available" className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Orders</h2>
              <Link href="/delivery/orders">
                <Button variant="outline">View All Orders</Button>
              </Link>
            </div>
            <TabsList className="mb-4">
              <TabsTrigger value="available">Available</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="available">
              {isOnline ? (
                <div className="space-y-4">
                  {availableOrders.length > 0 ? (
                    availableOrders.map((order) => (
                      <Card key={order.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{order.id}</CardTitle>
                            <Badge variant="outline" className="font-medium">
                              {order.estimatedEarning}
                            </Badge>
                          </div>
                          <CardDescription>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              Estimated time: {order.estimatedTime}
                            </div>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="space-y-4">
                            <div>
                              <div className="flex items-center gap-1 font-medium">
                                <Utensils className="h-4 w-4" />
                                Pickup from: {order.restaurant.name}
                              </div>
                              <div className="mt-1 flex items-start gap-1 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                                <span>{order.restaurant.address}</span>
                              </div>
                              <div className="mt-1 text-sm text-muted-foreground">{order.restaurant.distance}</div>
                            </div>
                            <div>
                              <div className="flex items-center gap-1 font-medium">
                                <User className="h-4 w-4" />
                                Deliver to: {order.customer.name}
                              </div>
                              <div className="mt-1 flex items-start gap-1 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                                <span>{order.customer.address}</span>
                              </div>
                              <div className="mt-1 text-sm text-muted-foreground">{order.customer.distance}</div>
                            </div>
                            <div>
                              <div className="font-medium">Order Details</div>
                              <div className="mt-1 space-y-1 text-sm">
                                {order.items.map((item, index) => (
                                  <div key={index} className="flex justify-between">
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
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" size="sm">
                            Decline
                          </Button>
                          <Button size="sm" onClick={() => acceptOrder(order.id)}>
                            Accept
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-8">
                        <div className="mb-4 rounded-full bg-muted p-6">
                          <Package className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold">No available orders</h3>
                        <p className="text-center text-muted-foreground">
                          Stay online and you'll be notified when new orders are available
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-8">
                    <div className="mb-4 rounded-full bg-muted p-6">
                      <Truck className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">You're currently offline</h3>
                    <p className="mb-4 text-center text-muted-foreground">
                      Go online to start receiving delivery requests
                    </p>
                    <Button onClick={toggleOnlineStatus}>Go Online</Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            <TabsContent value="active">
              <div className="space-y-4">
                {activeOrders.length > 0 ? (
                  activeOrders.map((order) => (
                    <Card key={order.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{order.id}</CardTitle>
                          <Badge>{order.status === "picked-up" ? "In Delivery" : "Pickup"}</Badge>
                        </div>
                        <CardDescription>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Earning: {order.estimatedEarning}
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center gap-1 font-medium">
                              <Utensils className="h-4 w-4" />
                              Pickup from: {order.restaurant.name}
                            </div>
                            <div className="mt-1 flex items-start gap-1 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                              <span>{order.restaurant.address}</span>
                            </div>
                            <div className="mt-1 text-sm text-muted-foreground">{order.restaurant.distance}</div>
                          </div>
                          <div>
                            <div className="flex items-center gap-1 font-medium">
                              <User className="h-4 w-4" />
                              Deliver to: {order.customer.name}
                            </div>
                            <div className="mt-1 flex items-start gap-1 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                              <span>{order.customer.address}</span>
                            </div>
                            <div className="mt-1 text-sm text-muted-foreground">{order.customer.distance}</div>
                          </div>
                          <div>
                            <div className="font-medium">Order Details</div>
                            <div className="mt-1 space-y-1 text-sm">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between">
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
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" className="gap-1">
                          <Navigation className="h-4 w-4" />
                          Navigate
                        </Button>
                        {order.status === "picked-up" ? (
                          <Button className="gap-1" onClick={() => updateOrderStatus(order.id, "delivered")}>
                            <CheckCircle className="h-4 w-4" />
                            Complete Delivery
                          </Button>
                        ) : (
                          <Button className="gap-1" onClick={() => updateOrderStatus(order.id, "picked-up")}>
                            <CheckCircle className="h-4 w-4" />
                            Confirm Pickup
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <div className="mb-4 rounded-full bg-muted p-6">
                        <Package className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold">No active orders</h3>
                      <p className="text-center text-muted-foreground">
                        You don't have any active deliveries at the moment
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            <TabsContent value="completed">
              <div className="space-y-4">
                {completedOrders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <Badge variant="outline">Completed</Badge>
                      </div>
                      <CardDescription>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {order.completedAt}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Utensils className="h-4 w-4" />
                            <span className="font-medium">{order.restaurant.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{order.customer.name}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Order Total</span>
                          <span className="font-medium">${order.total.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Your Earning</span>
                          <span className="font-medium text-green-600">{order.earning}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Delivery Map</h2>
            </div>
            <Card>
              <CardContent className="h-[400px] p-0">
                <div className="flex h-full items-center justify-center bg-muted/40 text-muted-foreground">
                  <MapPin className="mr-2 h-6 w-6" />
                  Delivery map will be displayed here
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

