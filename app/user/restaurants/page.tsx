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
  Star,
  User,
  Utensils,
  X,
  Filter,
  ChevronDown,
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
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function RestaurantsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("rating")
  const router = useRouter()

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const restaurants = [
    {
      id: 1,
      name: "Burger Palace",
      image: "/placeholder.svg?height=100&width=100",
      cuisine: "American",
      rating: 4.5,
      deliveryTime: "20-30 min",
      deliveryFee: "$2.99",
      featured: true,
      distance: 1.2,
    },
    {
      id: 2,
      name: "Pizza Heaven",
      image: "/placeholder.svg?height=100&width=100",
      cuisine: "Italian",
      rating: 4.7,
      deliveryTime: "25-35 min",
      deliveryFee: "$1.99",
      featured: true,
      distance: 0.8,
    },
    {
      id: 3,
      name: "Sushi World",
      image: "/placeholder.svg?height=100&width=100",
      cuisine: "Japanese",
      rating: 4.8,
      deliveryTime: "30-40 min",
      deliveryFee: "$3.99",
      featured: false,
      distance: 2.5,
    },
    {
      id: 4,
      name: "Taco Fiesta",
      image: "/placeholder.svg?height=100&width=100",
      cuisine: "Mexican",
      rating: 4.3,
      deliveryTime: "15-25 min",
      deliveryFee: "$2.49",
      featured: false,
      distance: 1.5,
    },
    {
      id: 5,
      name: "Curry House",
      image: "/placeholder.svg?height=100&width=100",
      cuisine: "Indian",
      rating: 4.6,
      deliveryTime: "25-40 min",
      deliveryFee: "$2.99",
      featured: false,
      distance: 3.0,
    },
    {
      id: 6,
      name: "Noodle Express",
      image: "/placeholder.svg?height=100&width=100",
      cuisine: "Chinese",
      rating: 4.4,
      deliveryTime: "20-30 min",
      deliveryFee: "$1.99",
      featured: false,
      distance: 1.8,
    },
    {
      id: 7,
      name: "Mediterranean Delight",
      image: "/placeholder.svg?height=100&width=100",
      cuisine: "Mediterranean",
      rating: 4.9,
      deliveryTime: "30-45 min",
      deliveryFee: "$3.49",
      featured: false,
      distance: 2.2,
    },
    {
      id: 8,
      name: "Veggie Paradise",
      image: "/placeholder.svg?height=100&width=100",
      cuisine: "Vegetarian",
      rating: 4.5,
      deliveryTime: "20-35 min",
      deliveryFee: "$2.49",
      featured: false,
      distance: 1.3,
    },
  ]

  const cuisines = ["American", "Italian", "Japanese", "Mexican", "Indian", "Chinese", "Mediterranean", "Vegetarian"]

  const sortedRestaurants = [...restaurants].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "delivery_time":
        return Number.parseInt(a.deliveryTime.split("-")[0]) - Number.parseInt(b.deliveryTime.split("-")[0])
      case "distance":
        return a.distance - b.distance
      case "delivery_fee":
        return Number.parseFloat(a.deliveryFee.replace("$", "")) - Number.parseFloat(b.deliveryFee.replace("$", ""))
      default:
        return 0
    }
  })

  const filteredRestaurants = sortedRestaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-muted-foreground">Loading restaurants...</p>
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
                  placeholder="Search restaurants or cuisines..."
                  className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px] border-non-photo-blue focus:border-honolulu-blue"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                    placeholder="Search restaurants or cuisines..."
                    className="w-full bg-background pl-8 border-non-photo-blue focus:border-honolulu-blue"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
              className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-federal-blue">Restaurants</h1>
                <p className="text-muted-foreground">Discover restaurants in your area</p>
              </div>
              <div className="flex items-center gap-2">
                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-honolulu-blue text-honolulu-blue hover:bg-honolulu-blue/10 transition-colors"
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l border-non-photo-blue">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-federal-blue">Filters</h2>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-honolulu-blue transition-colors"
                        >
                          Reset All
                        </Button>
                      </div>

                      <div className="space-y-6 flex-1 overflow-auto">
                        <div>
                          <h3 className="text-sm font-medium mb-3 text-federal-blue">Cuisines</h3>
                          <div className="space-y-2">
                            {cuisines.map((cuisine) => (
                              <div key={cuisine} className="flex items-center space-x-2">
                                <Checkbox id={`cuisine-${cuisine}`} />
                                <Label htmlFor={`cuisine-${cuisine}`} className="text-sm">
                                  {cuisine}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-3 text-federal-blue">Price Range</h3>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="price-1" />
                              <Label htmlFor="price-1" className="text-sm">
                                $
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="price-2" />
                              <Label htmlFor="price-2" className="text-sm">
                                $$
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="price-3" />
                              <Label htmlFor="price-3" className="text-sm">
                                $$$
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="price-4" />
                              <Label htmlFor="price-4" className="text-sm">
                                $$$$
                              </Label>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-3 text-federal-blue">Distance</h3>
                          <div className="px-2">
                            <Slider defaultValue={[5]} max={10} step={0.5} />
                            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                              <span>0 mi</span>
                              <span>5 mi</span>
                              <span>10 mi</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-3 text-federal-blue">Dietary Restrictions</h3>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="vegetarian" />
                              <Label htmlFor="vegetarian" className="text-sm">
                                Vegetarian
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="vegan" />
                              <Label htmlFor="vegan" className="text-sm">
                                Vegan
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="gluten-free" />
                              <Label htmlFor="gluten-free" className="text-sm">
                                Gluten-Free
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t mt-6">
                        <Button
                          className="w-full bg-honolulu-blue hover:bg-blue-green transition-colors duration-300 hover-lift ripple"
                          onClick={() => setIsFilterOpen(false)}
                        >
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-honolulu-blue text-honolulu-blue hover:bg-honolulu-blue/10 transition-colors"
                    >
                      Sort By
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className={sortBy === "rating" ? "bg-honolulu-blue/10 text-honolulu-blue" : ""}
                      onClick={() => setSortBy("rating")}
                    >
                      Rating (High to Low)
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={sortBy === "delivery_time" ? "bg-honolulu-blue/10 text-honolulu-blue" : ""}
                      onClick={() => setSortBy("delivery_time")}
                    >
                      Delivery Time
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={sortBy === "distance" ? "bg-honolulu-blue/10 text-honolulu-blue" : ""}
                      onClick={() => setSortBy("distance")}
                    >
                      Distance
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={sortBy === "delivery_fee" ? "bg-honolulu-blue/10 text-honolulu-blue" : ""}
                      onClick={() => setSortBy("delivery_fee")}
                    >
                      Delivery Fee
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </motion.div>

            {filteredRestaurants.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              >
                {filteredRestaurants.map((restaurant, index) => (
                  <motion.div
                    key={restaurant.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * (index % 4) }}
                  >
                    <Link href={`/user/restaurant/${restaurant.id}`}>
                      <Card className="overflow-hidden transition-all hover:shadow-md border-non-photo-blue hover:border-honolulu-blue hover-lift">
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
                              className="absolute right-2 top-2 bg-background/80 hover:bg-background/90 text-muted-foreground hover:text-honolulu-blue transition-colors"
                            >
                              <Heart className="h-5 w-5" />
                              <span className="sr-only">Add to favorites</span>
                            </Button>
                            {restaurant.featured && (
                              <Badge className="absolute left-2 top-2 bg-honolulu-blue">Featured</Badge>
                            )}
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
                    </Link>
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
                  <Search className="h-12 w-12 text-muted-foreground" />
                </div>
                <h2 className="mb-2 text-xl font-semibold text-federal-blue">No restaurants found</h2>
                <p className="mb-6 text-center text-muted-foreground">
                  We couldn't find any restaurants matching your search criteria.
                </p>
                <Button
                  className="bg-honolulu-blue hover:bg-blue-green transition-colors duration-300 hover-lift ripple"
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </Button>
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

