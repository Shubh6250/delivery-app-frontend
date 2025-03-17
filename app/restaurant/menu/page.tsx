"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Bell,
  Home,
  LogOut,
  Menu,
  Package,
  PieChart,
  Plus,
  Settings,
  Utensils,
  X,
  Search,
  Edit,
  Trash2,
  Filter,
  MoreHorizontal,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { PageTransition } from "@/components/ui/page-transition"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUser } from "@/hooks/useUser"
import { addMenuItem } from "@/app/services/restaurantService"

export default function RestaurantMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddMenuItemOpen, setIsAddMenuItemOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const router = useRouter()
  const { toast } = useToast()
const {user}=useUser()

  // Form state for new/edit menu item
  const [itemName, setItemName] = useState("")
  const [itemDescription, setItemDescription] = useState("")
  const [itemPrice, setItemPrice] = useState("")
  const [itemCategory, setItemCategory] = useState("burgers")
  const [itemImage, setItemImage] = useState<File | null>(null)
  const [isAvailable, setIsAvailable] = useState(true)
  const [isVegetarian, setIsVegetarian] = useState(false)
  const [isPopular, setIsPopular] = useState(false)

  interface MenuItem {
    id: number
    name: string
    description: string
    price: number
    image: string
    category: string
    available: boolean
    vegetarian: boolean
    popular: boolean
  }

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      name: "Double Cheeseburger",
      description: "Two beef patties with cheese, lettuce, tomato, and special sauce",
      price: 9.99,
      image: "/placeholder.svg?height=100&width=100",
      category: "burgers",
      available: true,
      vegetarian: false,
      popular: true,
    },
    {
      id: 2,
      name: "Bacon Deluxe Burger",
      description: "Beef patty with bacon, cheese, lettuce, tomato, and mayo",
      price: 10.99,
      image: "/placeholder.svg?height=100&width=100",
      category: "burgers",
      available: true,
      vegetarian: false,
      popular: true,
    },
    {
      id: 3,
      name: "Veggie Burger",
      description: "Plant-based patty with lettuce, tomato, and vegan mayo",
      price: 8.99,
      image: "/placeholder.svg?height=100&width=100",
      category: "burgers",
      available: true,
      vegetarian: true,
      popular: false,
    },
    {
      id: 4,
      name: "Classic Hamburger",
      description: "Beef patty with lettuce, tomato, onion, and ketchup",
      price: 7.99,
      image: "/placeholder.svg?height=100&width=100",
      category: "burgers",
      available: true,
      vegetarian: false,
      popular: false,
    },
    {
      id: 5,
      name: "French Fries",
      description: "Crispy golden fries with sea salt",
      price: 3.99,
      image: "/placeholder.svg?height=100&width=100",
      category: "sides",
      available: true,
      vegetarian: true,
      popular: true,
    },
    {
      id: 6,
      name: "Onion Rings",
      description: "Crispy battered onion rings",
      price: 4.99,
      image: "/placeholder.svg?height=100&width=100",
      category: "sides",
      available: true,
      vegetarian: true,
      popular: false,
    },
    {
      id: 7,
      name: "Mozzarella Sticks",
      description: "Breaded mozzarella sticks with marinara sauce",
      price: 5.99,
      image: "/placeholder.svg?height=100&width=100",
      category: "sides",
      available: false,
      vegetarian: true,
      popular: false,
    },
    {
      id: 8,
      name: "Soda",
      description: "Choice of Coke, Diet Coke, Sprite, or Dr. Pepper",
      price: 1.99,
      image: "/placeholder.svg?height=100&width=100",
      category: "drinks",
      available: true,
      vegetarian: true,
      popular: false,
    },
    {
      id: 9,
      name: "Milkshake",
      description: "Chocolate, vanilla, or strawberry",
      price: 4.99,
      image: "/placeholder.svg?height=100&width=100",
      category: "drinks",
      available: true,
      vegetarian: true,
      popular: true,
    },
    {
      id: 10,
      name: "Iced Tea",
      description: "Freshly brewed iced tea",
      price: 2.49,
      image: "/placeholder.svg?height=100&width=100",
      category: "drinks",
      available: true,
      vegetarian: true,
      popular: false,
    },
  ])

  const categories = [
    { id: "all", name: "All Items" },
    { id: "burgers", name: "Burgers" },
    { id: "sides", name: "Sides" },
    { id: "drinks", name: "Drinks" },
    { id: "desserts", name: "Desserts" },
  ]

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleAddMenuItem = async () => {
    if (!user || user.data.role !== "restaurant") {
      console.error("User is not a restaurant!");
      toast({
        title: "Error",
        description: "You are not authorized to add menu items.",
        variant: "destructive",
      });
      return;
    }
  
    if (!user.data.restaurantId) {
      console.error("Restaurant ID missing in user data!");
      toast({
        title: "Error",
        description: "Restaurant ID not found. Please contact support.",
        variant: "destructive",
      });
      return;
    }
  
    const newItem: MenuItem = {
      id: menuItems.length + 1, // or generate a unique id
      name: itemName,
      description: itemDescription,
      price: Number.parseFloat(itemPrice),
      image: itemImage ? URL.createObjectURL(itemImage) : "/placeholder.svg?height=100&width=100",
      category: itemCategory,
      available: isAvailable,
      vegetarian: isVegetarian,
      popular: isPopular,
    };
  
    try {
      const { status, data } = await addMenuItem(user.data.restaurantId, newItem);
  
      if (status === 201) {
        setMenuItems([...menuItems, newItem]);
        resetForm();
        setIsAddMenuItemOpen(false);
        toast({
          title: "Menu item added",
          description: `${itemName} has been added to your menu`,
        });
      } else {
        console.error("❌ Failed to add menu item:", data);
        toast({
          title: "Error",
          description: data.message || "Failed to add menu item.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("❌ Error adding menu item:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    }
  };
  
  
  const handleEditMenuItem = () => {
    if (!editingItem) return

    const updatedItems = menuItems.map((item) => {
      if (item.id === editingItem.id) {
        return {
          ...item,
          name: itemName,
          description: itemDescription,
          price: Number.parseFloat(itemPrice),
          image: itemImage ? URL.createObjectURL(itemImage) : item.image,
          category: itemCategory,
          available: isAvailable,
          vegetarian: isVegetarian,
          popular: isPopular,
        }
      }
      return item
    })

    setMenuItems(updatedItems)
    resetForm()
    setEditingItem(null)
    setIsAddMenuItemOpen(false)

    toast({
      title: "Menu item updated",
      description: `${itemName} has been updated`,
    })
  }

  const handleDeleteMenuItem = (id: number) => {
    setMenuItems(menuItems.filter((item) => item.id !== id))

    toast({
      title: "Menu item deleted",
      description: "The menu item has been deleted",
    })
  }

  const handleToggleAvailability = (id: number) => {
    const updatedItems = menuItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          available: !item.available,
        }
      }
      return item
    })

    setMenuItems(updatedItems)

    const item = menuItems.find((item) => item.id === id)
    if (item) {
      toast({
        title: item.available ? "Item marked as unavailable" : "Item marked as available",
        description: `${item.name} is now ${item.available ? "unavailable" : "available"} for ordering`,
      })
    }
  }

  const resetForm = () => {
    setItemName("")
    setItemDescription("")
    setItemPrice("")
    setItemCategory("burgers")
    setItemImage(null)
    setIsAvailable(true)
    setIsVegetarian(false)
    setIsPopular(false)
  }

  const openEditDialog = (item: MenuItem) => {
    setEditingItem(item)
    setItemName(item.name)
    setItemDescription(item.description)
    setItemPrice(item.price.toString())
    setItemCategory(item.category)
    setIsAvailable(item.available)
    setIsVegetarian(item.vegetarian)
    setIsPopular(item.popular)
    setIsAddMenuItemOpen(true)
  }

  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-muted-foreground">Loading menu items...</p>
        </div>
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xl text-primary">
              <Utensils className="h-6 w-6" />
              <span>FoodHub</span>
              <Badge className="ml-2">Restaurant</Badge>
            </div>
            <div className="hidden md:flex md:items-center md:gap-4">
              <nav className="flex items-center gap-6">
                <Link href="/restaurant/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
                  Dashboard
                </Link>
                <Link href="/restaurant/menu" className="text-sm font-medium text-primary">
                  Menu
                </Link>
                <Link href="/restaurant/orders" className="text-sm font-medium transition-colors hover:text-primary">
                  Orders
                </Link>
                <Link href="/restaurant/analytics" className="text-sm font-medium transition-colors hover:text-primary">
                  Analytics
                </Link>
              </nav>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                    3
                  </Badge>
                  <span className="sr-only">Notifications</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-user.jpg" alt="Restaurant" />
                        <AvatarFallback>BP</AvatarFallback>
                      </Avatar>
                      <span className="sr-only">Profile</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Burger Palace</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Package className="mr-2 h-4 w-4" />
                      <span>Orders</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/auth/login")}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="flex items-center gap-2 font-bold text-xl text-primary mb-6">
                  <Utensils className="h-6 w-6" />
                  <span>FoodHub</span>
                  <Badge className="ml-2">Restaurant</Badge>
                  <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setIsMenuOpen(false)}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
                <nav className="flex flex-col space-y-4">
                  <Link href="/restaurant/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <Home className="mr-2 h-5 w-5" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/restaurant/menu" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start bg-primary/10 text-primary">
                      <Utensils className="mr-2 h-5 w-5" />
                      Menu
                    </Button>
                  </Link>
                  <Link href="/restaurant/orders" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <Package className="mr-2 h-5 w-5" />
                      Orders
                      <Badge className="ml-auto">3</Badge>
                    </Button>
                  </Link>
                  <Link href="/restaurant/analytics" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <PieChart className="mr-2 h-5 w-5" />
                      Analytics
                    </Button>
                  </Link>
                  <Link href="/restaurant/settings" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="mr-2 h-5 w-5" />
                      Settings
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-destructive hover:text-destructive"
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
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Menu Management</h1>
                <p className="text-muted-foreground">Manage your restaurant's menu items</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search menu items..."
                    className="w-full pl-8 md:w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-1">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                  <Dialog open={isAddMenuItemOpen} onOpenChange={setIsAddMenuItemOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-1">
                        <Plus className="h-4 w-4" />
                        Add Menu Item
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[550px]">
                      <DialogHeader>
                        <DialogTitle>{editingItem ? "Edit Menu Item" : "Add New Menu Item"}</DialogTitle>
                        <DialogDescription>
                          {editingItem
                            ? "Update the details of your menu item"
                            : "Fill in the details to add a new item to your menu"}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="item-name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="item-name"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            className="col-span-3"
                            placeholder="Double Cheeseburger"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="item-description" className="text-right">
                            Description
                          </Label>
                          <Textarea
                            id="item-description"
                            value={itemDescription}
                            onChange={(e) => setItemDescription(e.target.value)}
                            className="col-span-3"
                            placeholder="Delicious burger with two beef patties and cheese"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="item-price" className="text-right">
                            Price ($)
                          </Label>
                          <Input
                            id="item-price"
                            type="number"
                            step="0.01"
                            min="0"
                            value={itemPrice}
                            onChange={(e) => setItemPrice(e.target.value)}
                            className="col-span-3"
                            placeholder="9.99"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="item-category" className="text-right">
                            Category
                          </Label>
                          <Select value={itemCategory} onValueChange={setItemCategory}>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="burgers">Burgers</SelectItem>
                              <SelectItem value="sides">Sides</SelectItem>
                              <SelectItem value="drinks">Drinks</SelectItem>
                              <SelectItem value="desserts">Desserts</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="item-image" className="text-right">
                            Image
                          </Label>
                          <Input
                            id="item-image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setItemImage(e.target.files?.[0] || null)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <div className="text-right">Options</div>
                          <div className="col-span-3 space-y-2">
                            <div className="flex items-center space-x-2">
                              <Switch id="item-available" checked={isAvailable} onCheckedChange={setIsAvailable} />
                              <Label htmlFor="item-available">Available for ordering</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch id="item-vegetarian" checked={isVegetarian} onCheckedChange={setIsVegetarian} />
                              <Label htmlFor="item-vegetarian">Vegetarian</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch id="item-popular" checked={isPopular} onCheckedChange={setIsPopular} />
                              <Label htmlFor="item-popular">Mark as popular</Label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => {
                            resetForm()
                            setEditingItem(null)
                            setIsAddMenuItemOpen(false)
                          }}
                        >
                          Cancel
                        </Button>
                        <Button onClick={editingItem ? handleEditMenuItem : handleAddMenuItem}>
                          {editingItem ? "Save Changes" : "Add Item"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>

            <Tabs defaultValue="all" className="mb-8">
              <TabsList>
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">{filteredItems.length}</span> items
                </div>
                <Select defaultValue="name">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="price-low">Price (Low to High)</SelectItem>
                    <SelectItem value="price-high">Price (High to Low)</SelectItem>
                    <SelectItem value="popular">Popularity</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="mt-4">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredItems
                      .filter((item) => category.id === "all" || item.category === category.id)
                      .map((item) => (
                        <Card key={item.id} className={!item.available ? "opacity-70" : ""}>
                          <CardHeader className="p-0">
                            <div className="relative h-48 w-full">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                              {item.popular && <Badge className="absolute left-2 top-2">Popular</Badge>}
                              {item.vegetarian && (
                                <Badge
                                  variant="outline"
                                  className="absolute right-2 top-2 bg-green-100 text-green-800 border-green-300"
                                >
                                  Vegetarian
                                </Badge>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{item.name}</CardTitle>
                              <Badge variant={item.available ? "outline" : "secondary"}>
                                {item.available ? "Available" : "Unavailable"}
                              </Badge>
                            </div>
                            <CardDescription className="mt-1 line-clamp-2">{item.description}</CardDescription>
                            <div className="mt-2 font-bold">${item.price.toFixed(2)}</div>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <Button variant="outline" size="sm" onClick={() => handleToggleAvailability(item.id)}>
                              {item.available ? "Mark Unavailable" : "Mark Available"}
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openEditDialog(item)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => handleDeleteMenuItem(item.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </main>
      </div>
    </PageTransition>
  )
}

