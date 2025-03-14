"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Bell,
  Heart,
  Home,
  LogOut,
  Menu,
  Search,
  ShoppingBag,
  User,
  Utensils,
  X,
  Clock,
  Truck,
  Package,
} from "lucide-react"
import { motion } from "framer-motion"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { PageTransition } from "@/components/ui/page-transition"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function UserOrders() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
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
      restaurant: "Burger Palace",
      items: [
        { name: "Double Cheeseburger", quantity: 2 },
        { name: "French Fries", quantity: 1 },
      ],
      total: 23.97,
      status: "delivered",
      date: "Today, 2:30 PM",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "ORD-002",
      restaurant: "Pizza Heaven",
      items: [
        { name: "Large Pepperoni Pizza", quantity: 1 },
        { name: "Garlic Bread", quantity: 1 },
        { name: "Soda", quantity: 1 },
      ],
      total: 24.99,
      status: "delivered",
      date: "Yesterday, 7:15 PM",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "ORD-003",
      restaurant: "Burger Palace",
      items: [
        { name: "Classic Hamburger", quantity: 1 },
        { name: "Milkshake", quantity: 1 },
      ],
      total: 12.98,
      status: "in-transit",
      date: "Today, 11:45 AM",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "ORD-004",
      restaurant: "Sushi World",
      items: [
        { name: "California Roll", quantity: 2 },
        { name: "Miso Soup", quantity: 1 },
      ],
      total: 18.5,
      status: "preparing",
      date: "Today, 12:30 PM",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "ORD-005",
      restaurant: "Taco Fiesta",
      items: [
        { name: "Taco Combo", quantity: 1 },
        { name: "Nachos", quantity: 1 },
      ],
      total: 15.75,
      status: "cancelled",
      date: "Last week",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "preparing":
        return <Badge className="bg-yellow-500">Preparing</Badge>
      case "in-transit":
        return <Badge className="bg-honolulu-blue">In Transit</Badge>
      case "delivered":
        return <Badge className="bg-green-500">Delivered</Badge>
      case "cancelled":
        return (
          <Badge variant="outline" className="text-destructive border-destructive">
            Cancelled
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  const reorderItem = (orderId: string) => {
    toast({
      title: "Order placed",
      description: "Your order has been placed successfully",
    })
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-muted-foreground">Loading your orders...</p>
        </div>
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xl text-honolulu-blue">
              <Utensils className="h-6 w-6" />
              <span>FoodHub</span>
            </div>
            <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-4">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search restaurants or dishes..."
                  className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px] border-non-photo-blue focus:border-honolulu-blue"
                />
              </div>
              <nav className="flex items-center space-x-2">
                <Link href="/user/cart">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-muted-foreground hover:text-honolulu-blue transition-colors"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-honolulu-blue">
                      3
                    </Badge>
                    <span className="sr-only">Cart</span>
                  </Button>
                </Link>
                <Link href="/user/favorites">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-honolulu-blue transition-colors"
                  >
                    <Heart className="h-5 w-5" />
                    <span className="sr-only">Favorites</span>
                  </Button>
                </Link>
                <Link href="/user/notifications">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-muted-foreground hover:text-honolulu-blue transition-colors"
                  >
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-honolulu-blue">
                      2
                    </Badge>
                    <span className="sr-only">Notifications</span>
                  </Button>
                </Link>
                <Link href="/user/profile">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-honolulu-blue transition-colors"
                  >
                    <Avatar className="h-8 w-8 border border-non-photo-blue">
                      <AvatarImage src="/placeholder-user.jpg" alt="User" />
                      <AvatarFallback className="bg-honolulu-blue text-white">JD</AvatarFallback>
                    </Avatar>
                    <span className="sr-only">Profile</span>
                  </Button>
                </Link>
              </nav>
            </div>
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-muted-foreground hover:text-honolulu-blue transition-colors"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] border-r border-non-photo-blue">
                <div className="flex items-center gap-2 font-bold text-xl text-honolulu-blue mb-6">
                  <Utensils className="h-6 w-6" />
                  <span>FoodHub</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto text-muted-foreground hover:text-honolulu-blue transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
                <div className="relative mb-4">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search restaurants or dishes..."
                    className="w-full bg-background pl-8 border-non-photo-blue focus:border-honolulu-blue"
                  />
                </div>
                <nav className="flex flex-col space-y-4">
                  <Link href="/user/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-muted-foreground hover:text-honolulu-blue hover:bg-honolulu-blue/10 transition-colors"
                    >
                      <Home className="mr-2 h-5 w-5" />
                      Home
                    </Button>
                  </Link>
                  <Link href="/user/cart" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-muted-foreground hover:text-honolulu-blue hover:bg-honolulu-blue/10 transition-colors"
                    >
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Cart
                      <Badge className="ml-auto bg-honolulu-blue">3</Badge>
                    </Button>
                  </Link>
                  <Link href="/user/favorites" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-muted-foreground hover:text-honolulu-blue hover:bg-honolulu-blue/10 transition-colors"
                    >
                      <Heart className="mr-2 h-5 w-5" />
                      Favorites
                    </Button>
                  </Link>
                  <Link href="/user/notifications" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-muted-foreground hover:text-honolulu-blue hover:bg-honolulu-blue/10 transition-colors"
                    >
                      <Bell className="mr-2 h-5 w-5" />
                      Notifications
                      <Badge className="ml-auto bg-honolulu-blue">2</Badge>
                    </Button>
                  </Link>
                  <Link href="/user/profile" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-muted-foreground hover:text-honolulu-blue hover:bg-honolulu-blue/10 transition-colors"
                    >
                      <User className="mr-2 h-5 w-5" />
                      Profile
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors"
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h1 className="text-2xl font-bold tracking-tight text-federal-blue">Your Orders</h1>
              <p className="text-muted-foreground">Track and manage your orders</p>
            </motion.div>

            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="mb-4 bg-muted border border-non-photo-blue">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-honolulu-blue data-[state=active]:text-white"
                >
                  All Orders
                </TabsTrigger>
                <TabsTrigger
                  value="active"
                  className="data-[state=active]:bg-honolulu-blue data-[state=active]:text-white"
                >
                  Active
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="data-[state=active]:bg-honolulu-blue data-[state=active]:text-white"
                >
                  Completed
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-4"
                >
                  {orders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      <Card className="border-non-photo-blue hover:border-honolulu-blue transition-colors hover-lift">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-lg text-federal-blue">{order.restaurant}</CardTitle>
                            {getStatusBadge(order.status)}
                          </div>
                          <CardDescription className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {order.id} • {order.date}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex items-center gap-4">
                            <img
                              src={order.image || "/placeholder.svg"}
                              alt={order.restaurant}
                              className="h-16 w-16 rounded-md object-cover"
                            />
                            <div className="flex-1">
                              <div className="space-y-1">
                                {order.items.map((item, idx) => (
                                  <div key={idx} className="text-sm">
                                    <span className="font-medium">{item.quantity}x</span> {item.name}
                                  </div>
                                ))}
                              </div>
                              <div className="mt-2 font-medium text-honolulu-blue">
                                Total: ${order.total.toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          {order.status === "delivered" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-honolulu-blue text-honolulu-blue hover:bg-honolulu-blue/10 transition-colors"
                              onClick={() => reorderItem(order.id)}
                            >
                              Reorder
                            </Button>
                          )}
                          {order.status === "in-transit" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-honolulu-blue text-honolulu-blue hover:bg-honolulu-blue/10 transition-colors"
                            >
                              <Truck className="mr-1 h-4 w-4" />
                              Track Order
                            </Button>
                          )}
                          {order.status === "preparing" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-honolulu-blue text-honolulu-blue hover:bg-honolulu-blue/10 transition-colors"
                              disabled
                            >
                              <Package className="mr-1 h-4 w-4" />
                              Preparing
                            </Button>
                          )}
                          {order.status === "cancelled" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-honolulu-blue text-honolulu-blue hover:bg-honolulu-blue/10 transition-colors"
                              onClick={() => reorderItem(order.id)}
                            >
                              Order Again
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-honolulu-blue transition-colors"
                          >
                            View Details
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="active">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-4"
                >
                  {orders
                    .filter((order) => order.status === "preparing" || order.status === "in-transit")
                    .map((order, index) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                      >
                        <Card className="border-non-photo-blue hover:border-honolulu-blue transition-colors hover-lift">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between">
                              <CardTitle className="text-lg text-federal-blue">{order.restaurant}</CardTitle>
                              {getStatusBadge(order.status)}
                            </div>
                            <CardDescription className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {order.id} • {order.date}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="flex items-center gap-4">
                              <img
                                src={order.image || "/placeholder.svg"}
                                alt={order.restaurant}
                                className="h-16 w-16 rounded-md object-cover"
                              />
                              <div className="flex-1">
                                <div className="space-y-1">
                                  {order.items.map((item, idx) => (
                                    <div key={idx} className="text-sm">
                                      <span className="font-medium">{item.quantity}x</span> {item.name}
                                    </div>
                                  ))}
                                </div>
                                <div className="mt-2 font-medium text-honolulu-blue">
                                  Total: ${order.total.toFixed(2)}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            {order.status === "in-transit" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-honolulu-blue text-honolulu-blue hover:bg-honolulu-blue/10 transition-colors"
                              >
                                <Truck className="mr-1 h-4 w-4" />
                                Track Order
                              </Button>
                            )}
                            {order.status === "preparing" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-honolulu-blue text-honolulu-blue hover:bg-honolulu-blue/10 transition-colors"
                                disabled
                              >
                                <Package className="mr-1 h-4 w-4" />
                                Preparing
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground hover:text-honolulu-blue transition-colors"
                            >
                              View Details
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="completed">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-4"
                >
                  {orders
                    .filter((order) => order.status === "delivered" || order.status === "cancelled")
                    .map((order, index) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                      >
                        <Card className="border-non-photo-blue hover:border-honolulu-blue transition-colors hover-lift">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between">
                              <CardTitle className="text-lg text-federal-blue">{order.restaurant}</CardTitle>
                              {getStatusBadge(order.status)}
                            </div>
                            <CardDescription className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {order.id} • {order.date}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="flex items-center gap-4">
                              <img
                                src={order.image || "/placeholder.svg"}
                                alt={order.restaurant}
                                className="h-16 w-16 rounded-md object-cover"
                              />
                              <div className="flex-1">
                                <div className="space-y-1">
                                  {order.items.map((item, idx) => (
                                    <div key={idx} className="text-sm">
                                      <span className="font-medium">{item.quantity}x</span> {item.name}
                                    </div>
                                  ))}
                                </div>
                                <div className="mt-2 font-medium text-honolulu-blue">
                                  Total: ${order.total.toFixed(2)}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-honolulu-blue text-honolulu-blue hover:bg-honolulu-blue/10 transition-colors"
                              onClick={() => reorderItem(order.id)}
                            >
                              {order.status === "delivered" ? "Reorder" : "Order Again"}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground hover:text-honolulu-blue transition-colors"
                            >
                              View Details
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <footer className="border-t py-6 bg-federal-blue text-white">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
            <p className="text-sm">&copy; {new Date().getFullYear()} FoodHub. All rights reserved.</p>
            <div className="flex gap-4 text-sm">
              <Link href="/terms" className="hover:underline hover:text-pacific-cyan transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="hover:underline hover:text-pacific-cyan transition-colors">
                Privacy
              </Link>
              <Link href="/contact" className="hover:underline hover:text-pacific-cyan transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  )
}

