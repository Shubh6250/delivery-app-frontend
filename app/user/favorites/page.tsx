"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bell, Heart, Home, LogOut, Menu, Search, ShoppingBag, Star, User, Utensils, X } from "lucide-react"
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

export default function UserFavorites() {
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

  const favoriteRestaurants = [
    {
      id: 1,
      name: "Burger Palace",
      image: "/placeholder.svg?height=100&width=100",
      cuisine: "American",
      rating: 4.5,
      deliveryTime: "20-30 min",
      deliveryFee: "$2.99",
    },
    {
      id: 2,
      name: "Pizza Heaven",
      image: "/placeholder.svg?height=100&width=100",
      cuisine: "Italian",
      rating: 4.7,
      deliveryTime: "25-35 min",
      deliveryFee: "$1.99",
    },
    {
      id: 3,
      name: "Sushi World",
      image: "/placeholder.svg?height=100&width=100",
      cuisine: "Japanese",
      rating: 4.8,
      deliveryTime: "30-40 min",
      deliveryFee: "$3.99",
    },
  ]

  const removeFromFavorites = (id: number) => {
    toast({
      title: "Removed from favorites",
      description: "Restaurant has been removed from your favorites",
    })
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-muted-foreground">Loading your favorites...</p>
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
                  <Button variant="ghost" size="icon" className="text-honolulu-blue">
                    <Heart className="h-5 w-5 fill-honolulu-blue" />
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
                    <Button variant="ghost" className="w-full justify-start text-honolulu-blue bg-honolulu-blue/10">
                      <Heart className="mr-2 h-5 w-5 fill-honolulu-blue" />
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
              <h1 className="text-2xl font-bold tracking-tight text-federal-blue">Your Favorites</h1>
              <p className="text-muted-foreground">Restaurants and dishes you've saved</p>
            </motion.div>

            {favoriteRestaurants.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
              >
                {favoriteRestaurants.map((restaurant) => (
                  <Card
                    key={restaurant.id}
                    className="overflow-hidden transition-all hover:shadow-md border-non-photo-blue hover:border-honolulu-blue hover-lift"
                  >
                    <CardHeader className="p-0">
                      <div className="relative h-48 w-full">
                        <img
                          src={restaurant.image || "/placeholder.svg"}
                          alt={restaurant.name}
                          className="h-full w-full object-cover"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 bg-background/80 hover:bg-background/90 text-honolulu-blue hover:text-destructive transition-colors"
                          onClick={() => removeFromFavorites(restaurant.id)}
                        >
                          <Heart className="h-5 w-5 fill-honolulu-blue" />
                          <span className="sr-only">Remove from favorites</span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-federal-blue">{restaurant.name}</CardTitle>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-honolulu-blue text-honolulu-blue" />
                          <span className="text-sm font-medium">{restaurant.rating}</span>
                        </div>
                      </div>
                      <CardDescription className="mt-1">{restaurant.cuisine}</CardDescription>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between border-t p-4 pt-2 border-non-photo-blue">
                      <div className="text-sm text-muted-foreground">{restaurant.deliveryTime}</div>
                      <div className="text-sm font-medium text-honolulu-blue">{restaurant.deliveryFee}</div>
                    </CardFooter>
                  </Card>
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
                  <Heart className="h-12 w-12 text-muted-foreground" />
                </div>
                <h2 className="mb-2 text-xl font-semibold text-federal-blue">No favorites yet</h2>
                <p className="mb-6 text-center text-muted-foreground">
                  You haven't added any restaurants to your favorites yet.
                </p>
                <Link href="/user/dashboard">
                  <Button className="bg-honolulu-blue hover:bg-blue-green transition-colors duration-300 hover-lift ripple">
                    Browse Restaurants
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

