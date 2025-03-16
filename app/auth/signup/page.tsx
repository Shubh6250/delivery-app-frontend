"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Utensils, Upload } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { PageTransition } from "@/components/ui/page-transition"
import { signUp } from "@/app/services/authServices"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState("user")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [gstNumber, setGstNumber] = useState("")
  const [aadharNumber, setAadharNumber] = useState("")
  const [hotelRegNumber, setHotelRegNumber] = useState("")
  const [panNumber, setPanNumber] = useState("")
  const [aadharImage, setAadharImage] = useState<File | null>(null)
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Create a signup data object with conditional fields
    const signupData: any = {
      name,
      email,
      password,
      role: userType,
    }

    // Add role-specific fields
    if (userType === "restaurant") {
      signupData.gstNumber = gstNumber
      signupData.aadharNumber = aadharNumber
      signupData.hotelRegNumber = hotelRegNumber
    } else if (userType === "delivery") {
      signupData.aadharNumber = aadharNumber
      signupData.panNumber = panNumber
      // Note: File uploads would need to be handled differently, possibly with FormData
      // This is a simplified version
    }

    const { status, data } = await signUp(signupData)

    if (status === 201) {
      // Save token to localStorage (assuming API returns token)
      localStorage.setItem("authToken", data.token)

      toast({
        title: "Account created",
        description: `Your ${userType} account has been created successfully`,
      })

      // Redirect based on user type
      switch (userType) {
        case "user":
          router.push("/user/dashboard")
          break
        case "restaurant":
          router.push("/restaurant/dashboard")
          break
        case "delivery":
          router.push("/delivery/dashboard")
          break
        default:
          router.push("/")
      }
    } else {
      toast({
        title: "Signup failed",
        description: data.message || "Unable to create account",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

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
              <CardTitle className="text-2xl font-bold text-federal-blue">Create an account</CardTitle>
              <CardDescription>Enter your information to create an account</CardDescription>
            </CardHeader>
            <form onSubmit={handleSignup}>
              <CardContent className="space-y-4">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="space-y-2"
                >
                  <Label htmlFor="name" className="text-marian-blue">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-non-photo-blue focus:border-honolulu-blue"
                  />
                </motion.div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
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
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="space-y-2"
                >
                  <Label htmlFor="password" className="text-marian-blue">
                    Password
                  </Label>
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
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="space-y-2"
                >
                  <Label className="text-marian-blue">Register as</Label>
                  <RadioGroup
                    defaultValue="user"
                    className="grid grid-cols-3 gap-4"
                    value={userType}
                    onValueChange={setUserType}
                  >
                    <div>
                      <RadioGroupItem value="user" id="user-signup" className="peer sr-only" />
                      <Label
                        htmlFor="user-signup"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-non-photo-blue bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-honolulu-blue [&:has([data-state=checked])]:border-honolulu-blue transition-colors"
                      >
                        <span>Customer</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="restaurant" id="restaurant-signup" className="peer sr-only" />
                      <Label
                        htmlFor="restaurant-signup"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-non-photo-blue bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-honolulu-blue [&:has([data-state=checked])]:border-honolulu-blue transition-colors"
                      >
                        <span>Restaurant</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="delivery" id="delivery-signup" className="peer sr-only" />
                      <Label
                        htmlFor="delivery-signup"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-non-photo-blue bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-honolulu-blue [&:has([data-state=checked])]:border-honolulu-blue transition-colors"
                      >
                        <span>Delivery</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </motion.div>

                {userType === "restaurant" && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4 pt-2 border-t border-non-photo-blue"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="gst-number" className="text-marian-blue">
                        GST Number
                      </Label>
                      <Input
                        id="gst-number"
                        placeholder="22AAAAA0000A1Z5"
                        required={userType === "restaurant"}
                        value={gstNumber}
                        onChange={(e) => setGstNumber(e.target.value)}
                        className="border-non-photo-blue focus:border-honolulu-blue"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aadhar-number" className="text-marian-blue">
                        Aadhar Number
                      </Label>
                      <Input
                        id="aadhar-number"
                        placeholder="1234 5678 9012"
                        required={userType === "restaurant"}
                        value={aadharNumber}
                        onChange={(e) => setAadharNumber(e.target.value)}
                        className="border-non-photo-blue focus:border-honolulu-blue"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hotel-reg-number" className="text-marian-blue">
                        Hotel Registration Number
                      </Label>
                      <Input
                        id="hotel-reg-number"
                        placeholder="FSSAI123456789012"
                        required={userType === "restaurant"}
                        value={hotelRegNumber}
                        onChange={(e) => setHotelRegNumber(e.target.value)}
                        className="border-non-photo-blue focus:border-honolulu-blue"
                      />
                    </div>
                  </motion.div>
                )}

                {userType === "delivery" && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4 pt-2 border-t border-non-photo-blue"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="aadhar-number" className="text-marian-blue">
                        Aadhar Number
                      </Label>
                      <Input
                        id="aadhar-number"
                        placeholder="1234 5678 9012"
                        required={userType === "delivery"}
                        value={aadharNumber}
                        onChange={(e) => setAadharNumber(e.target.value)}
                        className="border-non-photo-blue focus:border-honolulu-blue"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pan-number" className="text-marian-blue">
                        PAN Card Number
                      </Label>
                      <Input
                        id="pan-number"
                        placeholder="ABCDE1234F"
                        required={userType === "delivery"}
                        value={panNumber}
                        onChange={(e) => setPanNumber(e.target.value)}
                        className="border-non-photo-blue focus:border-honolulu-blue"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aadhar-image" className="text-marian-blue">
                        Upload Aadhar Card
                      </Label>
                      <div className="border-2 border-dashed border-non-photo-blue rounded-md p-4 hover:border-honolulu-blue transition-colors">
                        <Input
                          id="aadhar-image"
                          type="file"
                          accept="image/*"
                          required={userType === "delivery"}
                          onChange={(e) => handleFileChange(e, setAadharImage)}
                          className="hidden"
                        />
                        <Label
                          htmlFor="aadhar-image"
                          className="flex flex-col items-center justify-center cursor-pointer"
                        >
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <span className="text-sm font-medium text-muted-foreground">
                            {aadharImage ? aadharImage.name : "Click to upload Aadhar Card"}
                          </span>
                          <span className="text-xs text-muted-foreground mt-1">JPG, PNG or PDF up to 5MB</span>
                        </Label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="profile-image" className="text-marian-blue">
                        Upload Profile Photo
                      </Label>
                      <div className="border-2 border-dashed border-non-photo-blue rounded-md p-4 hover:border-honolulu-blue transition-colors">
                        <Input
                          id="profile-image"
                          type="file"
                          accept="image/*"
                          required={userType === "delivery"}
                          onChange={(e) => handleFileChange(e, setProfileImage)}
                          className="hidden"
                        />
                        <Label
                          htmlFor="profile-image"
                          className="flex flex-col items-center justify-center cursor-pointer"
                        >
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <span className="text-sm font-medium text-muted-foreground">
                            {profileImage ? profileImage.name : "Click to upload Profile Photo"}
                          </span>
                          <span className="text-xs text-muted-foreground mt-1">JPG or PNG up to 5MB</span>
                        </Label>
                      </div>
                    </div>
                  </motion.div>
                )}
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
                      <span>Creating account...</span>
                    </div>
                  ) : (
                    <span>Create account</span>
                  )}
                </Button>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="text-honolulu-blue hover:text-blue-green transition-colors underline"
                  >
                    Sign in
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

