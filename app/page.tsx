"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, ChevronRight, Utensils, Truck, Users, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 font-bold text-xl text-honolulu-blue"
          >
            <Utensils className="h-6 w-6" />
            <span>FoodHub</span>
          </motion.div>
          <nav className="hidden md:flex gap-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link href="/about" className="text-sm font-medium transition-colors hover:text-honolulu-blue">
                About
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/features" className="text-sm font-medium transition-colors hover:text-honolulu-blue">
                Features
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/pricing" className="text-sm font-medium transition-colors hover:text-honolulu-blue">
                Pricing
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/contact" className="text-sm font-medium transition-colors hover:text-honolulu-blue">
                Contact
              </Link>
            </motion.div>
          </nav>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <Link href="/auth/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-honolulu-blue hover:text-honolulu-blue/80 hover:bg-honolulu-blue/10"
              >
                Log in
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm" className="bg-honolulu-blue hover:bg-blue-green transition-colors duration-300">
                Sign up
              </Button>
            </Link>
          </motion.div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-light-cyan to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="flex flex-col justify-center space-y-4"
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-federal-blue">
                    Your favorite food, delivered fast
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Order from local restaurants and track your delivery in real-time. Sign up today and get your first
                    delivery free!
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/auth/signup">
                    <Button
                      size="lg"
                      className="gap-1 bg-honolulu-blue hover:bg-blue-green transition-colors duration-300 hover-lift ripple"
                    >
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/restaurants">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-honolulu-blue text-honolulu-blue hover:bg-honolulu-blue/10 hover-lift ripple"
                    >
                      Browse Restaurants
                    </Button>
                  </Link>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex items-center justify-center"
              >
                <img
                  alt="Food Delivery"
                  className="aspect-video overflow-hidden rounded-xl object-cover object-center shadow-lg hover-scale"
                  src="https://res.cloudinary.com/dryp60cpr/image/upload/v1742146889/PizzaFood_ebod1g.jpg"
                />
              </motion.div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-pacific-cyan/20 px-3 py-1 text-sm text-pacific-cyan font-medium">
                  Choose your role
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-federal-blue">
                  Multiple interfaces for all users
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides tailored experiences for customers, restaurants, delivery partners, and
                  administrators.
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={container}
              initial="hidden"
              animate={isLoaded ? "show" : "hidden"}
              className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4"
            >
              <motion.div variants={item}>
                <Card className="hover-lift border-non-photo-blue hover:border-honolulu-blue transition-colors duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-honolulu-blue">Customer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center mb-4 text-pacific-cyan">
                      <Users className="h-12 w-12" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Browse restaurants, order food, and track your delivery in real-time.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/user/dashboard" className="w-full">
                      <Button
                        className="w-full bg-honolulu-blue hover:bg-blue-green transition-colors duration-300 ripple"
                        variant="default"
                      >
                        <span>Customer Login</span>
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
              <motion.div variants={item}>
                <Card className="hover-lift border-non-photo-blue hover:border-honolulu-blue transition-colors duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-honolulu-blue">Restaurant</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center mb-4 text-pacific-cyan">
                      <Utensils className="h-12 w-12" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Manage your menu, accept orders, and grow your business.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/restaurant/dashboard" className="w-full">
                      <Button
                        className="w-full bg-honolulu-blue hover:bg-blue-green transition-colors duration-300 ripple"
                        variant="default"
                      >
                        <span>Restaurant Login</span>
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
              <motion.div variants={item}>
                <Card className="hover-lift border-non-photo-blue hover:border-honolulu-blue transition-colors duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-honolulu-blue">Delivery Partner</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center mb-4 text-pacific-cyan">
                      <Truck className="h-12 w-12" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Accept delivery assignments and earn money on your schedule.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/delivery/dashboard" className="w-full">
                      <Button
                        className="w-full bg-honolulu-blue hover:bg-blue-green transition-colors duration-300 ripple"
                        variant="default"
                      >
                        <span>Delivery Login</span>
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
              <motion.div variants={item}>
                <Card className="hover-lift border-non-photo-blue hover:border-honolulu-blue transition-colors duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-honolulu-blue">Admin</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center mb-4 text-pacific-cyan">
                      <BarChart3 className="h-12 w-12" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Manage users, restaurants, and monitor system analytics.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/admin/dashboard" className="w-full">
                      <Button
                        className="w-full bg-honolulu-blue hover:bg-blue-green transition-colors duration-300 ripple"
                        variant="default"
                      >
                        <span>Admin Login</span>
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-t from-light-cyan to-white">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-pacific-cyan/20 px-3 py-1 text-sm text-pacific-cyan font-medium">
                  How it works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-federal-blue">
                  Simple steps to get your food
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform makes ordering food quick and easy with just a few simple steps.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-honolulu-blue text-white flex items-center justify-center text-2xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2 text-federal-blue">Choose a Restaurant</h3>
                <p className="text-muted-foreground">
                  Browse through our extensive list of restaurants and cuisines to find what you're craving.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-pacific-cyan text-white flex items-center justify-center text-2xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2 text-federal-blue">Select Your Meal</h3>
                <p className="text-muted-foreground">
                  Explore menus, read reviews, and add your favorite dishes to your cart.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-vivid-sky-blue text-white flex items-center justify-center text-2xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2 text-federal-blue">Enjoy Your Delivery</h3>
                <p className="text-muted-foreground">
                  Track your order in real-time and enjoy your meal delivered right to your doorstep.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex justify-center mt-12"
            >
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="bg-honolulu-blue hover:bg-blue-green transition-colors duration-300 hover-lift ripple"
                >
                  Get Started Today <ArrowRight className="ml-1 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0 bg-federal-blue text-white">
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
  )
}

