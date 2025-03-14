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
  Check,
  Info,
  ShoppingCart,
} from "lucide-react"
import { motion } from "framer-motion"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { PageTransition } from "@/components/ui/page-transition"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useToast } from "@/hooks/use-toast"

export default function UserNotifications() {
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

  const notifications = [
    {
      id: 1,
      type: "order",
      title: "Order Delivered",
      message: "Your order from Burger Palace has been delivered. Enjoy your meal!",
      time: "10 minutes ago",
      read: false,
      icon: ShoppingCart,
      color: "bg-green-500",
    },
    {
      id: 2,
      type: "promo",
      title: "Special Offer",
      message: "Get 20% off on your next order with code FOODHUB20",
      time: "2 hours ago",
      read: false,
      icon: Info,
      color: "bg-honolulu-blue",
    },
    {
      id: 3,
      type: "order",
      title: "Order Confirmed",
      message: "Your order from Pizza Heaven has been confirmed and is being prepared.",
      time: "Yesterday",
      read: true,
      icon: ShoppingCart,
      color: "bg-blue-green",
    },
    {
      id: 4,
      type: "system",
      title: "Account Update",
      message: "Your profile information has been successfully updated.",
      time: "2 days ago",
      read: true,
      icon: User,
      color: "bg-pacific-cyan",
    },
    {
      id: 5,
      type: "promo",
      title: "New Restaurant",
      message: "Sushi World has joined FoodHub! Try their delicious sushi today.",
      time: "3 days ago",
      read: true,
      icon: Info,
      color: "bg-honolulu-blue",
    },
  ]

  const markAsRead = (id: number) => {
    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read",
    })
  }

  const markAllAsRead = () => {
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read",
    })
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-muted-foreground">Loading your notifications...</p>
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
                  <Button variant="ghost" size="icon" className="relative text-honolulu-blue">
                    <Bell className="h-5 w-5 fill-honolulu-blue" />
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
                    <Button variant="ghost" className="w-full justify-start text-honolulu-blue bg-honolulu-blue/10">
                      <Bell className="mr-2 h-5 w-5 fill-honolulu-blue" />
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
              className="mb-6 flex justify-between items-center"
            >
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-federal-blue">Notifications</h1>
                <p className="text-muted-foreground">Stay updated with your orders and offers</p>
              </div>
              <Button
                variant="outline"
                className="border-honolulu-blue text-honolulu-blue hover:bg-honolulu-blue/10 transition-colors"
                onClick={markAllAsRead}
              >
                <Check className="mr-2 h-4 w-4" />
                Mark all as read
              </Button>
            </motion.div>

            {notifications.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-4"
              >
                {notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <Card
                      className={`border-l-4 ${notification.read ? "border-l-muted" : `border-l-${notification.color.split("-")[1]}-500`} hover-lift transition-all duration-300 ${notification.read ? "bg-background" : "bg-muted/30"}`}
                    >
                      <CardContent className="p-4 flex items-start gap-4">
                        <div className={`${notification.color} text-white p-2 rounded-full flex-shrink-0`}>
                          <notification.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-federal-blue">{notification.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                            </div>
                            <div className="text-xs text-muted-foreground">{notification.time}</div>
                          </div>
                          <div className="flex justify-end mt-2">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-honolulu-blue hover:text-honolulu-blue/80 transition-colors"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="mr-1 h-4 w-4" />
                                Mark as read
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <div className="mb-4 rounded-full bg-muted p-6">
                  <Bell className="h-12 w-12 text-muted-foreground" />
                </div>
                <h2 className="mb-2 text-xl font-semibold text-federal-blue">No notifications</h2>
                <p className="mb-6 text-center text-muted-foreground">
                  You don't have any notifications at the moment.
                </p>
                <Link href="/user/dashboard">
                  <Button className="bg-honolulu-blue hover:bg-blue-green transition-colors duration-300 hover-lift ripple">
                    Back to Dashboard
                  </Button>
                </Link>
              </motion.div>
            )}
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

