"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bell, LogOut, Menu, Utensils } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PageTransition } from "@/components/ui/page-transition"

export default function AdminDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const restaurants = [
    {
      id: 1,
      name: "Burger Palace",
      owner: "John Smith",
      location: "123 Main St, Anytown, USA",
      status: "active",
      orders: 128,
      revenue: 2463.89,
    },
    {
      id: 2,
      name: "Pizza Heaven",
      owner: "Maria Garcia",
      location: "456 Oak St, Anytown, USA",
      status: "active",
      orders: 95,
      revenue: 1872.5,
    },
    {
      id: 3,
      name: "Sushi World",
      owner: "David Kim",
      location: "789 Pine St, Anytown, USA",
      status: "pending",
      orders: 0,
      revenue: 0,
    },
  ]

  const users = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      type: "customer",
      orders: 12,
      joined: "Jan 15, 2023",
      status: "active",
    },
    {
      id: 2,
      name: "Bob Williams",
      email: "bob@example.com",
      type: "customer",
      orders: 8,
      joined: "Feb 20, 2023",
      status: "active",
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      type: "delivery",
      orders: 45,
      joined: "Mar 10, 2023",
      status: "active",
    },
    {
      id: 4,
      name: "Diana Miller",
      email: "diana@example.com",
      type: "restaurant",
      orders: 0,
      joined: "Apr 5, 2023",
      status: "pending",
    },
  ]

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      restaurant: "Burger Palace",
      total: 23.97,
      status: "delivered",
      date: "Today, 2:30 PM",
    },
    {
      id: "ORD-002",
      customer: "Alice Smith",
      restaurant: "Pizza Heaven",
      total: 18.99,
      status: "delivered",
      date: "Today, 12:15 PM",
    },
    {
      id: "ORD-003",
      customer: "Robert Johnson",
      restaurant: "Burger Palace",
      total: 12.98,
      status: "in-transit",
      date: "Today, 11:45 AM",
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      restaurant: "Burger Palace",
      total: 14.97,
      status: "preparing",
      date: "Today, 11:30 AM",
    },
    {
      id: "ORD-005",
      customer: "Michael Wilson",
      restaurant: "Sushi World",
      total: 32.5,
      status: "cancelled",
      date: "Yesterday, 7:15 PM",
    },
  ]

  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xl text-honolulu-blue">
              <Utensils className="h-6 w-6" />
              <span>FoodHub</span>
              <Badge className="ml-2">Admin</Badge>
            </div>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <div className="hidden md:flex md:items-center md:gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  5
                </Badge>
                <span className="sr-only">Notifications</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => router.push("/auth/login")}>
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Log out</span>
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1">
          <div className="container py-4 md:py-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage restaurants, users, and orders</p>
            </div>

            {/* Dashboard content would go here */}
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-4">Admin Dashboard Content</h2>
              <p className="text-muted-foreground">
                This page would contain admin controls for managing the food delivery platform.
              </p>
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  )
}

