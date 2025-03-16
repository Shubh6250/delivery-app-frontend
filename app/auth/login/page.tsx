"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Utensils } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { PageTransition } from "@/components/ui/page-transition"
import { login } from "@/app/services/authServices"
import { useUser } from "@/hooks/useUser"
import apiClient from "@/app/services/apiClient"


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState("user")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const { setUser } = useUser(); // Get setUser from useUser()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    const { status, data } = await login({ email, password,userType });
  
    if (status === 200) {
      // Store token in localStorage
      localStorage.setItem("authToken", data.token);
  
      // Fetch user details after login
      try {
        const userResponse = await apiClient.get("/details", {
          headers: { Authorization: `Bearer ${data.token}` },
        });
  
        if (userResponse.status === 200) {
          setUser(userResponse.data.data); // Update user context with fetched details
          console.log(userResponse.data.data);
          toast({
            title: "Login successful",
            description: `Welcome, ${userResponse.data.data.name}!`,
          });
        }
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
  
      // Redirect based on user type (if user type is part of user details)
      router.push("/user/dashboard");
    } else {
      toast({
        title: "Login failed",
        description: data.message || "Invalid credentials",
        variant: "destructive",
      });
    }
  
    setIsLoading(false);
  };
  
  

  return (
    <PageTransition>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-light-cyan to-white p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-non-photo-blue shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex justify-center mb-2"
              >
                <div className="flex items-center gap-2 font-bold text-xl text-honolulu-blue">
                  <Utensils className="h-6 w-6" />
                  <span>FoodHub</span>
                </div>
              </motion.div>
              <CardTitle className="text-2xl font-bold text-federal-blue">Sign in to your account</CardTitle>
              <CardDescription>Enter your email and password to login</CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="space-y-2"
                >
                  <Label htmlFor="email" className="text-marian-blue">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-non-photo-blue focus:border-honolulu-blue"
                  />
                </motion.div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-marian-blue">
                      Password
                    </Label>
                    <Link
                      href="/auth/forgot-password"
                      className="text-xs text-honolulu-blue hover:text-blue-green transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-non-photo-blue focus:border-honolulu-blue"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-honolulu-blue transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="space-y-2"
                >
                  <Label className="text-marian-blue">Login as</Label>
                  <RadioGroup
                    defaultValue="user"
                    className="grid grid-cols-2 gap-4"
                    value={userType}
                    onValueChange={setUserType}
                  >
                    <div>
                      <RadioGroupItem value="user" id="user" className="peer sr-only" />
                      <Label
                        htmlFor="user"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-non-photo-blue bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-honolulu-blue [&:has([data-state=checked])]:border-honolulu-blue transition-colors"
                      >
                        <span>Customer</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="restaurant" id="restaurant" className="peer sr-only" />
                      <Label
                        htmlFor="restaurant"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-non-photo-blue bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-honolulu-blue [&:has([data-state=checked])]:border-honolulu-blue transition-colors"
                      >
                        <span>Restaurant</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="delivery" id="delivery" className="peer sr-only" />
                      <Label
                        htmlFor="delivery"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-non-photo-blue bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-honolulu-blue [&:has([data-state=checked])]:border-honolulu-blue transition-colors"
                      >
                        <span>Delivery</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="admin" id="admin" className="peer sr-only" />
                      <Label
                        htmlFor="admin"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-non-photo-blue bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-honolulu-blue [&:has([data-state=checked])]:border-honolulu-blue transition-colors"
                      >
                        <span>Admin</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </motion.div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button
                  type="submit"
                  className="w-full bg-honolulu-blue hover:bg-blue-green transition-colors duration-300 hover-lift ripple"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <LoadingSpinner size="sm" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <span>Sign in</span>
                  )}
                </Button>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/auth/signup"
                    className="text-honolulu-blue hover:text-blue-green transition-colors underline"
                  >
                    Sign up
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  )
}

