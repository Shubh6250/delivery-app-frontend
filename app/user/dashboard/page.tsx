"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageTransition } from "@/components/ui/page-transition";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function UserDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
    },
  ];

  const categories = [
    { name: "Pizza", icon: "🍕", id: 1 },
    { name: "Burgers", icon: "🍔", id: 2 },
    { name: "Sushi", icon: "🍣", id: 3 },
    { name: "Tacos", icon: "🌮", id: 4 },
    { name: "Salads", icon: "🥗", id: 5 },
    { name: "Desserts", icon: "🍰", id: 6 },
    { name: "Drinks", icon: "🥤", id: 7 },
    { name: "Breakfast", icon: "🍳", id: 8 },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
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
                      <AvatarFallback className="bg-honolulu-blue text-white">
                        JD
                      </AvatarFallback>
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
              <SheetContent
                side="left"
                className="w-[300px] sm:w-[400px] border-r border-non-photo-blue"
              >
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
                  <Link
                    href="/user/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                  >
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
                  <Link
                    href="/user/favorites"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-muted-foreground hover:text-honolulu-blue hover:bg-honolulu-blue/10 transition-colors"
                    >
                      <Heart className="mr-2 h-5 w-5" />
                      Favorites
                    </Button>
                  </Link>
                  <Link
                    href="/user/notifications"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-muted-foreground hover:text-honolulu-blue hover:bg-honolulu-blue/10 transition-colors"
                    >
                      <Bell className="mr-2 h-5 w-5" />
                      Notifications
                      <Badge className="ml-auto bg-honolulu-blue">2</Badge>
                    </Button>
                  </Link>
                  <Link
                    href="/user/profile"
                    onClick={() => setIsMenuOpen(false)}
                  >
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
              <h1 className="text-2xl font-bold tracking-tight text-federal-blue">
                Welcome back, John!
              </h1>
              <p className="text-muted-foreground">
                What would you like to eat today?
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 overflow-x-auto pb-2"
            >
              <div className="flex space-x-4">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <Link
                      href={`/user/category/${category.id}`}
                      className="flex flex-col items-center group"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-honolulu-blue/10 text-2xl group-hover:bg-honolulu-blue/20 transition-colors duration-300 hover-scale">
                        {category.icon}
                      </div>
                      <span className="mt-2 text-sm font-medium text-muted-foreground group-hover:text-honolulu-blue transition-colors duration-300">
                        {category.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8"
            >
              <Tabs defaultValue="all" className="mb-8">
                <div className="flex items-center justify-between">
                  <TabsList className="bg-muted border border-non-photo-blue">
                    <TabsTrigger
                      value="all"
                      className="data-[state=active]:bg-honolulu-blue data-[state=active]:text-white"
                    >
                      All
                    </TabsTrigger>
                    <TabsTrigger
                      value="featured"
                      className="data-[state=active]:bg-honolulu-blue data-[state=active]:text-white"
                    >
                      Featured
                    </TabsTrigger>
                    <TabsTrigger
                      value="nearby"
                      className="data-[state=active]:bg-honolulu-blue data-[state=active]:text-white"
                    >
                      Nearby
                    </TabsTrigger>
                    <TabsTrigger
                      value="popular"
                      className="data-[state=active]:bg-honolulu-blue data-[state=active]:text-white"
                    >
                      Popular
                    </TabsTrigger>
                  </TabsList>
                  <Link href="/user/restaurants">
                    <Button
                      variant="link"
                      className="gap-1 text-honolulu-blue hover:text-blue-green transition-colors"
                    >
                      View all <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <TabsContent value="all" className="mt-4">
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
                  >
                    {restaurants.map((restaurant) => (
                      <motion.div key={restaurant.id} variants={item}>
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
                                  <span className="sr-only">
                                    Add to favorites
                                  </span>
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg text-federal-blue">
                                  {restaurant.name}
                                </CardTitle>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-honolulu-blue text-honolulu-blue" />
                                  <span className="text-sm font-medium">
                                    {restaurant.rating}
                                  </span>
                                </div>
                              </div>
                              <CardDescription className="mt-1">
                                {restaurant.cuisine}
                              </CardDescription>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between border-t p-4 pt-2 border-non-photo-blue">
                              <div className="text-sm text-muted-foreground">
                                {restaurant.deliveryTime}
                              </div>
                              <div className="text-sm font-medium text-honolulu-blue">
                                {restaurant.deliveryFee}
                              </div>
                            </CardFooter>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>
                <TabsContent value="featured" className="mt-4">
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
                  >
                    {restaurants
                      .filter((restaurant) => restaurant.featured)
                      .map((restaurant) => (
                        <motion.div key={restaurant.id} variants={item}>
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
                                    <span className="sr-only">
                                      Add to favorites
                                    </span>
                                  </Button>
                                </div>
                              </CardHeader>
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <CardTitle className="text-lg text-federal-blue">
                                    {restaurant.name}
                                  </CardTitle>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-honolulu-blue text-honolulu-blue" />
                                    <span className="text-sm font-medium">
                                      {restaurant.rating}
                                    </span>
                                  </div>
                                </div>
                                <CardDescription className="mt-1">
                                  {restaurant.cuisine}
                                </CardDescription>
                              </CardContent>
                              <CardFooter className="flex items-center justify-between border-t p-4 pt-2 border-non-photo-blue">
                                <div className="text-sm text-muted-foreground">
                                  {restaurant.deliveryTime}
                                </div>
                                <div className="text-sm font-medium text-honolulu-blue">
                                  {restaurant.deliveryFee}
                                </div>
                              </CardFooter>
                            </Card>
                          </Link>
                        </motion.div>
                      ))}
                  </motion.div>
                </TabsContent>
                <TabsContent value="nearby" className="mt-4">
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
                  >
                    {restaurants.slice(2, 5).map((restaurant) => (
                      <motion.div key={restaurant.id} variants={item}>
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
                                  <span className="sr-only">
                                    Add to favorites
                                  </span>
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg text-federal-blue">
                                  {restaurant.name}
                                </CardTitle>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-honolulu-blue text-honolulu-blue" />
                                  <span className="text-sm font-medium">
                                    {restaurant.rating}
                                  </span>
                                </div>
                              </div>
                              <CardDescription className="mt-1">
                                {restaurant.cuisine}
                              </CardDescription>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between border-t p-4 pt-2 border-non-photo-blue">
                              <div className="text-sm text-muted-foreground">
                                {restaurant.deliveryTime}
                              </div>
                              <div className="text-sm font-medium text-honolulu-blue">
                                {restaurant.deliveryFee}
                              </div>
                            </CardFooter>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>
                <TabsContent value="popular" className="mt-4">
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
                  >
                    {restaurants
                      .sort((a, b) => b.rating - a.rating)
                      .slice(0, 3)
                      .map((restaurant) => (
                        <motion.div key={restaurant.id} variants={item}>
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
                                    <span className="sr-only">
                                      Add to favorites
                                    </span>
                                  </Button>
                                </div>
                              </CardHeader>
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <CardTitle className="text-lg text-federal-blue">
                                    {restaurant.name}
                                  </CardTitle>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-honolulu-blue text-honolulu-blue" />
                                    <span className="text-sm font-medium">
                                      {restaurant.rating}
                                    </span>
                                  </div>
                                </div>
                                <CardDescription className="mt-1">
                                  {restaurant.cuisine}
                                </CardDescription>
                              </CardContent>
                              <CardFooter className="flex items-center justify-between border-t p-4 pt-2 border-non-photo-blue">
                                <div className="text-sm text-muted-foreground">
                                  {restaurant.deliveryTime}
                                </div>
                                <div className="text-sm font-medium text-honolulu-blue">
                                  {restaurant.deliveryFee}
                                </div>
                              </CardFooter>
                            </Card>
                          </Link>
                        </motion.div>
                      ))}
                  </motion.div>
                </TabsContent>
              </Tabs>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-federal-blue">
                  Your recent orders
                </h2>
                <Link href="/user/orders">
                  <Button
                    variant="link"
                    className="gap-1 text-honolulu-blue hover:text-blue-green transition-colors"
                  >
                    View all <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="border-non-photo-blue hover:border-honolulu-blue transition-colors hover-lift">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg text-federal-blue">
                        Burger Palace
                      </CardTitle>
                      <Badge className="bg-green-500">Delivered</Badge>
                    </div>
                    <CardDescription>Order #12345 • Yesterday</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-4">
                      <img
                        src="/placeholder.svg?height=60&width=60"
                        alt="Burger Palace"
                        className="h-16 w-16 rounded-md object-cover"
                      />
                      <div>
                        <p className="font-medium text-federal-blue">
                          Double Cheeseburger Meal
                        </p>
                        <p className="text-sm text-muted-foreground">
                          2 items • $18.99
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-honolulu-blue text-honolulu-blue hover:bg-honolulu-blue/10 transition-colors"
                    >
                      Reorder
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-honolulu-blue transition-colors"
                    >
                      View details
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="border-non-photo-blue hover:border-honolulu-blue transition-colors hover-lift">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg text-federal-blue">
                        Pizza Heaven
                      </CardTitle>
                      <Badge className="bg-green-500">Delivered</Badge>
                    </div>
                    <CardDescription>Order #12346 • 2 days ago</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-4">
                      <img
                        src="/placeholder.svg?height=60&width=60"
                        alt="Pizza Heaven"
                        className="h-16 w-16 rounded-md object-cover"
                      />
                      <div>
                        <p className="font-medium text-federal-blue">
                          Large Pepperoni Pizza
                        </p>
                        <p className="text-sm text-muted-foreground">
                          3 items • $24.99
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-honolulu-blue text-honolulu-blue hover:bg-honolulu-blue/10 transition-colors"
                    >
                      Reorder
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-honolulu-blue transition-colors"
                    >
                      View details
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </motion.div>
          </div>
        </main>
        <footer className="border-t py-6 bg-federal-blue text-white">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} FoodHub. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm">
              <Link
                href="/terms"
                className="hover:underline hover:text-pacific-cyan transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="hover:underline hover:text-pacific-cyan transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/contact"
                className="hover:underline hover:text-pacific-cyan transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
}
