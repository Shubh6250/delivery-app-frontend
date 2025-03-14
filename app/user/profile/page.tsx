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
  Camera,
  MapPin,
  CreditCard,
  Lock,
  Settings,
} from "lucide-react"
import { motion } from "framer-motion"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { PageTransition } from "@/components/ui/page-transition"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useUser } from "@/hooks/useUser"
import { getInitials } from "@/utils/utils"

export default function UserProfile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState("John Doe")
  const [email, setEmail] = useState("john.doe@example.com")
  const [phone, setPhone] = useState("+1 (555) 123-4567")
  const router = useRouter()
  const { toast } = useToast()
 const { user ,setUser} = useUser();
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const saveProfile = () => {
    setIsEditing(false)
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully",
    })
  }
  useEffect(() => {
    if (user) {
      setName(user.data.name || "");
      setEmail(user.data.email || "");
      setPhone(user.data.phone || "");
    }
  }, [user]); 

  const addresses = [
    {
      id: 1,
      type: "Home",
      address: "123 Main St, Apt 4B",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      address: "456 Office Blvd, Suite 100",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      isDefault: false,
    },
  ]

  const paymentMethods = [
    {
      id: 1,
      type: "Visa",
      number: "**** **** **** 4242",
      expiry: "12/25",
      isDefault: true,
    },
    {
      id: 2,
      type: "Mastercard",
      number: "**** **** **** 5555",
      expiry: "10/24",
      isDefault: false,
    },
  ]

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    )
  }
  console.log(user,"user");
const initials = getInitials(user?.data?.name || "")

const handleLogout = () => {
  localStorage.removeItem("authToken"); // Remove token
  setUser(null)
  toast({
    title: "Logged out",
    description: "You have been logged out successfully.",
  });
  router.push("/auth/login"); // Redirect to login page
};

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
                  <Button variant="ghost" size="icon" className="text-honolulu-blue">
                    <Avatar className="h-8 w-8 border border-honolulu-blue">
                      <AvatarImage src="/placeholder-user.jpg" alt="User" />
                      <AvatarFallback className="bg-honolulu-blue text-white">{initials}</AvatarFallback>
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
                    <Button variant="ghost" className="w-full justify-start text-honolulu-blue bg-honolulu-blue/10">
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
              <h1 className="text-2xl font-bold tracking-tight text-federal-blue">Your Profile</h1>
              <p className="text-muted-foreground">Manage your account information and preferences</p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr]">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="border-non-photo-blue">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-4">
                        <Avatar className="h-24 w-24 border-2 border-honolulu-blue">
                          <AvatarImage src="/placeholder-user.jpg" alt="User" />
                          <AvatarFallback className="bg-honolulu-blue text-white text-xl">{initials}</AvatarFallback>
                        </Avatar>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute bottom-0 right-0 rounded-full bg-honolulu-blue text-white hover:bg-blue-green transition-colors"
                        >
                          <Camera className="h-4 w-4" />
                          <span className="sr-only">Change profile picture</span>
                        </Button>
                      </div>
                      <h2 className="text-xl font-bold text-federal-blue">{name}</h2>
                      <p className="text-sm text-muted-foreground">{email}</p>
                      <Separator className="my-4" />
                      <nav className="w-full space-y-2">
                        <Button variant="ghost" className="w-full justify-start text-honolulu-blue bg-honolulu-blue/10">
                          <User className="mr-2 h-5 w-5" />
                          Personal Info
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-muted-foreground hover:text-honolulu-blue hover:bg-honolulu-blue/10 transition-colors"
                        >
                          <MapPin className="mr-2 h-5 w-5" />
                          Addresses
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-muted-foreground hover:text-honolulu-blue hover:bg-honolulu-blue/10 transition-colors"
                        >
                          <CreditCard className="mr-2 h-5 w-5" />
                          Payment Methods
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-muted-foreground hover:text-honolulu-blue hover:bg-honolulu-blue/10 transition-colors"
                        >
                          <Lock className="mr-2 h-5 w-5" />
                          Security
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-muted-foreground hover:text-honolulu-blue hover:bg-honolulu-blue/10 transition-colors"
                        >
                          <Settings className="mr-2 h-5 w-5" />
                          Preferences
                        </Button>
                        <Button
                    variant="ghost"
                    className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Logout
                  </Button>
                      </nav>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="mb-4 bg-muted border border-non-photo-blue">
                    <TabsTrigger
                      value="personal"
                      className="data-[state=active]:bg-honolulu-blue data-[state=active]:text-white"
                    >
                      Personal Info
                    </TabsTrigger>
                    <TabsTrigger
                      value="addresses"
                      className="data-[state=active]:bg-honolulu-blue data-[state=active]:text-white"
                    >
                      Addresses
                    </TabsTrigger>
                    <TabsTrigger
                      value="payment"
                      className="data-[state=active]:bg-honolulu-blue data-[state=active]:text-white"
                    >
                      Payment Methods
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal">
                    <Card className="border-non-photo-blue">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle className="text-federal-blue">Personal Information</CardTitle>
                          <CardDescription>Manage your personal details</CardDescription>
                        </div>
                        <Button
                          variant={isEditing ? "outline" : "default"}
                          className={
                            isEditing
                              ? "border-honolulu-blue text-honolulu-blue hover:bg-honolulu-blue/10"
                              : "bg-honolulu-blue hover:bg-blue-green"
                          }
                          onClick={() => (isEditing ? saveProfile() : setIsEditing(true))}
                        >
                          {isEditing ? "Save Changes" : "Edit Profile"}
                        </Button>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-marian-blue">
                            Full Name
                          </Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={!isEditing}
                            className="border-non-photo-blue focus:border-honolulu-blue"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-marian-blue">
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={!isEditing}
                            className="border-non-photo-blue focus:border-honolulu-blue"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-marian-blue">
                            Phone Number
                          </Label>
                          <Input
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            disabled={!isEditing}
                            className="border-non-photo-blue focus:border-honolulu-blue"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bio" className="text-marian-blue">
                            Bio
                          </Label>
                          <Textarea
                            id="bio"
                            placeholder="Tell us a little about yourself"
                            disabled={!isEditing}
                            className="border-non-photo-blue focus:border-honolulu-blue"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="addresses">
                    <Card className="border-non-photo-blue">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle className="text-federal-blue">Delivery Addresses</CardTitle>
                          <CardDescription>Manage your delivery addresses</CardDescription>
                        </div>
                        <Button className="bg-honolulu-blue hover:bg-blue-green transition-colors">
                          Add New Address
                        </Button>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {addresses.map((address) => (
                          <Card
                            key={address.id}
                            className="border-non-photo-blue hover:border-honolulu-blue transition-colors hover-lift"
                          >
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-medium text-federal-blue">{address.type}</h3>
                                    {address.isDefault && <Badge className="bg-honolulu-blue">Default</Badge>}
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">{address.address}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {address.city}, {address.state} {address.zipCode}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-muted-foreground hover:text-honolulu-blue transition-colors"
                                  >
                                    Edit
                                  </Button>
                                  {!address.isDefault && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-destructive hover:text-destructive/80 transition-colors"
                                    >
                                      Delete
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="payment">
                    <Card className="border-non-photo-blue">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle className="text-federal-blue">Payment Methods</CardTitle>
                          <CardDescription>Manage your payment methods</CardDescription>
                        </div>
                        <Button className="bg-honolulu-blue hover:bg-blue-green transition-colors">Add New Card</Button>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {paymentMethods.map((method) => (
                          <Card
                            key={method.id}
                            className="border-non-photo-blue hover:border-honolulu-blue transition-colors hover-lift"
                          >
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-medium text-federal-blue">{method.type}</h3>
                                    {method.isDefault && <Badge className="bg-honolulu-blue">Default</Badge>}
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">{method.number}</p>
                                  <p className="text-sm text-muted-foreground">Expires: {method.expiry}</p>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-muted-foreground hover:text-honolulu-blue transition-colors"
                                  >
                                    Edit
                                  </Button>
                                  {!method.isDefault && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-destructive hover:text-destructive/80 transition-colors"
                                    >
                                      Delete
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
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

