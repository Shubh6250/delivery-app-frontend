"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Heart,
  MapPin,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Star,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function RestaurantPage() {
  const params = useParams();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  const restaurant = {
    id: params.id,
    name: "Burger Palace",
    image: "/placeholder.svg?height=200&width=600",
    cuisine: "American",
    rating: 4.5,
    reviewCount: 243,
    deliveryTime: "20-30 min",
    deliveryFee: "$2.99",
    minOrder: "$10.00",
    address: "123 Main St, Anytown, USA",
    distance: "1.2 miles away",
    hours: "10:00 AM - 10:00 PM",
    description:
      "Serving the juiciest burgers in town since 2010. Our beef is 100% grass-fed and locally sourced.",
  };

  const menuCategories = [
    {
      id: "popular",
      name: "Popular Items",
      items: [
        {
          id: 1,
          name: "Double Cheeseburger",
          description:
            "Two beef patties with cheese, lettuce, tomato, and special sauce",
          price: 9.99,
          image: "/placeholder.svg?height=100&width=100",
          popular: true,
        },
        {
          id: 2,
          name: "Bacon Deluxe Burger",
          description:
            "Beef patty with bacon, cheese, lettuce, tomato, and mayo",
          price: 10.99,
          image: "/placeholder.svg?height=100&width=100",
          popular: false,
        },
      ],
    },
    {
      id: "burgers",
      name: "Burgers",
      items: [
        {
          id: 1,
          name: "Double Cheeseburger",
          description:
            "Two beef patties with cheese, lettuce, tomato, and special sauce",
          price: 9.99,
          image: "/placeholder.svg?height=100&width=100",
        },
        {
          id: 2,
          name: "Bacon Deluxe Burger",
          description:
            "Beef patty with bacon, cheese, lettuce, tomato, and mayo",
          price: 10.99,
          image: "/placeholder.svg?height=100&width=100",
        },
        {
          id: 3,
          name: "Veggie Burger",
          description: "Plant-based patty with lettuce, tomato, and vegan mayo",
          price: 8.99,
          image: "/placeholder.svg?height=100&width=100",
        },
        {
          id: 4,
          name: "Classic Hamburger",
          description: "Beef patty with lettuce, tomato, onion, and ketchup",
          price: 7.99,
          image: "/placeholder.svg?height=100&width=100",
        },
      ],
    },
    {
      id: "sides",
      name: "Sides",
      items: [
        {
          id: 5,
          name: "French Fries",
          description: "Crispy golden fries with sea salt",
          price: 3.99,
          image: "/placeholder.svg?height=100&width=100",
        },
        {
          id: 6,
          name: "Onion Rings",
          description: "Crispy battered onion rings",
          price: 4.99,
          image: "/placeholder.svg?height=100&width=100",
        },
        {
          id: 7,
          name: "Mozzarella Sticks",
          description: "Breaded mozzarella sticks with marinara sauce",
          price: 5.99,
          image: "/placeholder.svg?height=100&width=100",
        },
      ],
    },
    {
      id: "drinks",
      name: "Drinks",
      items: [
        {
          id: 8,
          name: "Soda",
          description: "Choice of Coke, Diet Coke, Sprite, or Dr. Pepper",
          price: 1.99,
          image: "/placeholder.svg?height=100&width=100",
        },
        {
          id: 9,
          name: "Milkshake",
          description: "Chocolate, vanilla, or strawberry",
          price: 4.99,
          image: "/placeholder.svg?height=100&width=100",
        },
        {
          id: 10,
          name: "Iced Tea",
          description: "Freshly brewed iced tea",
          price: 2.49,
          image: "/placeholder.svg?height=100&width=100",
        },
      ],
    },
  ];

  const addToCart = (item: any) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
    });
  };

  const removeFromCart = (itemId: number) => {
    const existingItem = cartItems.find((item) => item.id === itemId);

    if (existingItem && existingItem.quantity > 1) {
      setCartItems(
        cartItems.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    } else {
      setCartItems(cartItems.filter((item) => item.id !== itemId));
    }
  };

  const getItemQuantity = (itemId: number) => {
    const item = cartItems.find((item) => item.id === itemId);
    return item ? item.quantity : 0;
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="text-lg font-semibold">{restaurant.name}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Favorite</span>
            </Button>
            <Link href="/user/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                    {getTotalItems()}
                  </Badge>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="relative h-48 md:h-64 lg:h-80">
          <img
            src={restaurant.image || "/placeholder.svg"}
            alt={restaurant.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="container py-4 md:py-6">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">{restaurant.name}</h1>
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <span className="font-medium">{restaurant.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({restaurant.reviewCount})
                </span>
              </div>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span>{restaurant.cuisine}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {restaurant.deliveryTime}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {restaurant.distance}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="rounded-md">
                Delivery Fee: {restaurant.deliveryFee}
              </Badge>
              <Badge variant="outline" className="rounded-md">
                Min Order: {restaurant.minOrder}
              </Badge>
              <Badge variant="outline" className="rounded-md">
                {restaurant.hours}
              </Badge>
            </div>
            <p className="mt-4 text-sm">{restaurant.description}</p>
          </div>

          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search menu items..."
                className="w-full bg-background pl-8"
              />
            </div>
          </div>

          <Tabs defaultValue="menu" className="mb-8">
            <TabsList>
              <TabsTrigger value="menu">Menu</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="info">Info</TabsTrigger>
            </TabsList>
            <TabsContent value="menu" className="mt-4">
              <div className="space-y-8">
                {menuCategories.map((category) => (
                  <div key={category.id} id={category.id}>
                    <h2 className="mb-4 text-xl font-bold">{category.name}</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {category.items.map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                          <div className="flex">
                            <CardContent className="flex-1 p-4">
                              <div className="flex flex-col justify-between h-full">
                                <div>
                                  <div className="flex items-start justify-between">
                                    <CardTitle className="text-lg">
                                      {item.name}
                                    </CardTitle>
                                    {"popular" in item && item.popular && (
                                      <Badge className="ml-2">Popular</Badge>
                                    )}
                                  </div>
                                  <CardDescription className="mt-1 line-clamp-2">
                                    {item.description}
                                  </CardDescription>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                  <div className="font-medium">
                                    ${item.price.toFixed(2)}
                                  </div>
                                  {getItemQuantity(item.id) > 0 ? (
                                    <div className="flex items-center gap-2">
                                      <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => removeFromCart(item.id)}
                                      >
                                        <Minus className="h-4 w-4" />
                                        <span className="sr-only">Remove</span>
                                      </Button>
                                      <span className="w-6 text-center">
                                        {getItemQuantity(item.id)}
                                      </span>
                                      <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => addToCart(item)}
                                      >
                                        <Plus className="h-4 w-4" />
                                        <span className="sr-only">Add</span>
                                      </Button>
                                    </div>
                                  ) : (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => addToCart(item)}
                                    >
                                      Add
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                            <div className="flex-shrink-0 w-24 h-24 p-2">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="h-full w-full rounded-md object-cover"
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Customer Reviews</h2>
                    <div className="mt-1 flex items-center gap-1">
                      <Star className="h-5 w-5 fill-primary text-primary" />
                      <span className="font-medium">{restaurant.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({restaurant.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                  <Button>Write a Review</Button>
                </div>
                <Separator />
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-medium">
                        JD
                      </div>
                      <div>
                        <div className="font-medium">John Doe</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= 5
                                    ? "fill-primary text-primary"
                                    : "text-muted"
                                }`}
                              />
                            ))}
                          </div>
                          <span>2 days ago</span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-sm">
                      The double cheeseburger was amazing! Juicy, flavorful, and
                      the fries were perfectly crispy. Delivery was fast too.
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-medium">
                        AS
                      </div>
                      <div>
                        <div className="font-medium">Alice Smith</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="flex">
                            {[1, 2, 3, 4].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= 4
                                    ? "fill-primary text-primary"
                                    : "text-muted"
                                }`}
                              />
                            ))}
                            <Star className="h-4 w-4 text-muted" />
                          </div>
                          <span>1 week ago</span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-sm">
                      Good food but the delivery took longer than expected. The
                      burger was still warm though, and tasted great.
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-medium">
                        RJ
                      </div>
                      <div>
                        <div className="font-medium">Robert Johnson</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= 5
                                    ? "fill-primary text-primary"
                                    : "text-muted"
                                }`}
                              />
                            ))}
                          </div>
                          <span>2 weeks ago</span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-sm">
                      Best burgers in town! I've tried almost everything on
                      their menu and have never been disappointed. Highly
                      recommend the bacon deluxe.
                    </p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button variant="outline">Load More Reviews</Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="info" className="mt-4">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold">Restaurant Information</h2>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Location & Hours
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="font-medium">Address</div>
                          <p className="text-sm text-muted-foreground">
                            {restaurant.address}
                          </p>
                        </div>
                        <div>
                          <div className="font-medium">Hours</div>
                          <div className="text-sm text-muted-foreground">
                            <div className="flex justify-between">
                              <span>Monday - Thursday</span>
                              <span>10:00 AM - 10:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Friday - Saturday</span>
                              <span>10:00 AM - 11:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Sunday</span>
                              <span>11:00 AM - 9:00 PM</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Delivery Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="font-medium">Delivery Fee</div>
                          <p className="text-sm text-muted-foreground">
                            {restaurant.deliveryFee}
                          </p>
                        </div>
                        <div>
                          <div className="font-medium">Delivery Time</div>
                          <p className="text-sm text-muted-foreground">
                            {restaurant.deliveryTime}
                          </p>
                        </div>
                        <div>
                          <div className="font-medium">Minimum Order</div>
                          <p className="text-sm text-muted-foreground">
                            {restaurant.minOrder}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold">About {restaurant.name}</h2>
                  <p className="mt-2 text-sm">
                    {restaurant.description} We pride ourselves on using only
                    the freshest ingredients and providing excellent service to
                    our customers. Our restaurant has been a local favorite
                    since opening in 2010, and we continue to serve the
                    community with delicious food and fast delivery.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      {cartItems.length > 0 && (
        <div className="sticky bottom-0 border-t bg-background p-4 shadow-md">
          <div className="container">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{getTotalItems()} items</div>
                <div className="text-lg font-bold">
                  ${getTotalPrice().toFixed(2)}
                </div>
              </div>
              <Link href="/user/cart">
                <Button className="gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  View Cart
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
