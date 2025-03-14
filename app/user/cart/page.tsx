"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Home, MapPin, Minus, Plus, Trash2, Truck, Utensils, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Double Cheeseburger",
      description: "Two beef patties with cheese, lettuce, tomato, and special sauce",
      price: 9.99,
      quantity: 2,
      image: "/placeholder.svg?height=100&width=100",
      restaurant: "Burger Palace",
    },
    {
      id: 5,
      name: "French Fries",
      description: "Crispy golden fries with sea salt",
      price: 3.99,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
      restaurant: "Burger Palace",
    },
  ])
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [deliveryAddress, setDeliveryAddress] = useState("home")
  const [promoCode, setPromoCode] = useState("")
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)
  const [discount, setDiscount] = useState(0)

  const router = useRouter()
  const { toast } = useToast()

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))

    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
    })
  }

  const applyPromoCode = () => {
    setIsApplyingPromo(true)

    // Simulate API call
    setTimeout(() => {
      if (promoCode.toLowerCase() === "discount20") {
        const subtotal = getSubtotal()
        const discountAmount = subtotal * 0.2
        setDiscount(discountAmount)

        toast({
          title: "Promo code applied",
          description: "20% discount has been applied to your order",
        })
      } else {
        toast({
          title: "Invalid promo code",
          description: "The promo code you entered is invalid or expired",
          variant: "destructive",
        })
      }

      setIsApplyingPromo(false)
    }, 1000)
  }

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getDeliveryFee = () => {
    return 2.99
  }

  const getTax = () => {
    return getSubtotal() * 0.08
  }

  const getTotal = () => {
    return getSubtotal() + getDeliveryFee() + getTax() - discount
  }

  const handleCheckout = () => {
    router.push("/user/checkout")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="text-lg font-semibold">Your Cart</h1>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-4 md:py-6">
          {cartItems.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>Order Items</CardTitle>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Utensils className="h-4 w-4" />
                        <span>{cartItems[0].restaurant}</span>
                      </div>
                    </div>
                    <CardDescription>
                      {cartItems.reduce((total, item) => total + item.quantity, 0)} items in your cart
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-start gap-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-20 w-20 rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                              <div className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</div>
                            </div>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-4 w-4" />
                                <span className="sr-only">Decrease</span>
                              </Button>
                              <span className="w-6 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                                <span className="sr-only">Increase</span>
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="mr-1 h-4 w-4" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => router.push(`/user/restaurant/${1}`)}>
                      Add More Items
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => setCartItems([])}
                    >
                      <Trash2 className="mr-1 h-4 w-4" />
                      Clear Cart
                    </Button>
                  </CardFooter>
                </Card>

                <div className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Delivery Address</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup value={deliveryAddress} onValueChange={setDeliveryAddress} className="space-y-4">
                        <div className="flex items-start space-x-3 space-y-0">
                          <RadioGroupItem value="home" id="home" />
                          <div className="flex-1">
                            <Label htmlFor="home" className="flex items-center gap-2 font-medium">
                              <Home className="h-4 w-4" />
                              Home
                            </Label>
                            <div className="text-sm text-muted-foreground mt-1">
                              123 Main St, Apt 4B, Anytown, CA 12345
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                        <div className="flex items-start space-x-3 space-y-0">
                          <RadioGroupItem value="work" id="work" />
                          <div className="flex-1">
                            <Label htmlFor="work" className="flex items-center gap-2 font-medium">
                              <Utensils className="h-4 w-4" />
                              Work
                            </Label>
                            <div className="text-sm text-muted-foreground mt-1">
                              456 Office Blvd, Suite 100, Anytown, CA 12345
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                        <div className="flex items-start space-x-3 space-y-0">
                          <RadioGroupItem value="new" id="new" />
                          <div className="flex-1">
                            <Label htmlFor="new" className="flex items-center gap-2 font-medium">
                              <MapPin className="h-4 w-4" />
                              Add New Address
                            </Label>
                          </div>
                          <Button variant="ghost" size="sm">
                            Add
                          </Button>
                        </div>
                      </RadioGroup>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="saved" className="w-full">
                        <TabsList className="w-full">
                          <TabsTrigger value="saved" className="flex-1">
                            Saved Cards
                          </TabsTrigger>
                          <TabsTrigger value="new" className="flex-1">
                            New Card
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="saved" className="mt-4">
                          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                            <div className="flex items-start space-x-3 space-y-0">
                              <RadioGroupItem value="credit-card" id="credit-card" />
                              <div className="flex-1">
                                <Label htmlFor="credit-card" className="flex items-center gap-2 font-medium">
                                  <CreditCard className="h-4 w-4" />
                                  Visa ending in 4242
                                </Label>
                                <div className="text-sm text-muted-foreground mt-1">Expires 12/25</div>
                              </div>
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </div>
                            <div className="flex items-start space-x-3 space-y-0">
                              <RadioGroupItem value="new-card" id="new-card" />
                              <div className="flex-1">
                                <Label htmlFor="new-card" className="flex items-center gap-2 font-medium">
                                  <CreditCard className="h-4 w-4" />
                                  Add New Card
                                </Label>
                              </div>
                              <Button variant="ghost" size="sm">
                                Add
                              </Button>
                            </div>
                          </RadioGroup>
                        </TabsContent>
                        <TabsContent value="new" className="mt-4 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input id="card-number" placeholder="1234 5678 9012 3456" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input id="expiry" placeholder="MM/YY" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvc">CVC</Label>
                              <Input id="cvc" placeholder="123" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="name">Name on Card</Label>
                            <Input id="name" placeholder="John Doe" />
                          </div>
                          <Button className="w-full">Save Card</Button>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Subtotal</span>
                        <span>${getSubtotal().toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <Truck className="h-4 w-4" />
                          Delivery Fee
                        </span>
                        <span>${getDeliveryFee().toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Tax</span>
                        <span>${getTax().toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex items-center justify-between text-sm text-green-600">
                          <span>Discount</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between font-medium">
                      <span>Total</span>
                      <span>${getTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button variant="outline" onClick={applyPromoCode} disabled={!promoCode || isApplyingPromo}>
                        Apply
                      </Button>
                    </div>
                    <Button className="w-full" size="lg" onClick={handleCheckout}>
                      Proceed to Checkout
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      By placing your order, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="mb-4 rounded-full bg-muted p-6">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
              <p className="mb-6 text-center text-muted-foreground">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link href="/user/dashboard">
                <Button>Browse Restaurants</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

