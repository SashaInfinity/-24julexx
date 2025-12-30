'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Heart, 
  Share2, 
  ShoppingCart, 
  Star, 
  Truck, 
  Shield, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Check,
  Phone,
  MessageCircle
} from 'lucide-react'
import { useAuthStore } from '@/lib/store'
import { useWhatsApp } from '@/lib/whatsapp'

interface Product {
  id: string
  name: string
  description: string
  priceB2c: number
  priceB2b?: number
  images: string[]
  stockQuantity: number
  isAntiTarnish: boolean
  isWaterproof: boolean
  material: string
  weight: number
  category: {
    name: string
    slug: string
  }
  isNew?: boolean
  discount?: number
  rating?: number
  reviews?: number
  specifications?: {
    dimensions?: string
    karat?: string
    plating?: string
    stoneType?: string
    claspType?: string
    warranty?: string
  }
  careInstructions?: string[]
  shippingInfo?: {
    processingTime: string
    deliveryTime: string
    freeShippingAbove: number
  }
}

const dummyProducts: Record<string, Product> = {
  '1': {
    id: '1',
    name: 'Golden Heart Necklace',
    description: 'Elegant 18k gold-plated heart pendant with anti-tarnish coating. This stunning piece features a beautifully crafted heart design that symbolizes love and affection. The pendant is carefully polished to a brilliant shine and comes with an adjustable chain that fits perfectly. Perfect for everyday wear and special occasions, this necklace adds a touch of elegance to any outfit.',
    priceB2c: 2999,
    priceB2b: 1999,
    images: [
      '/api/placeholder/600/600',
      '/api/placeholder/600/600',
      '/api/placeholder/600/600',
      '/api/placeholder/600/600'
    ],
    stockQuantity: 15,
    isAntiTarnish: true,
    isWaterproof: true,
    material: '18k Gold Plated',
    weight: 5.2,
    category: { name: 'Necklaces', slug: 'necklaces' },
    isNew: true,
    discount: 20,
    rating: 4.8,
    reviews: 127,
    specifications: {
      dimensions: 'Pendant: 2.5cm x 2.5cm, Chain: 45cm adjustable',
      karat: '18k Gold Plated',
      plating: 'Triple micron plating for durability',
      stoneType: 'Cubic Zirconia',
      claspType: 'Lobster clasp',
      warranty: '1 year manufacturing warranty'
    },
    careInstructions: [
      'Clean with soft cloth after each use',
      'Avoid contact with perfumes and chemicals',
      'Store in original packaging when not worn',
      'Remove before swimming or showering',
      'Professional cleaning recommended annually'
    ],
    shippingInfo: {
      processingTime: '1-2 business days',
      deliveryTime: '3-5 business days',
      freeShippingAbove: 1000
    }
  },
  '2': {
    id: '2',
    name: 'Crystal Drop Earrings',
    description: 'Stunning crystal earrings with waterproof design. These elegant drops feature brilliant-cut crystals that catch the light beautifully, creating a sparkling effect with every movement. The secure post-back design ensures comfortable all-day wear while the waterproof construction means you can wear them anywhere without worry.',
    priceB2c: 1899,
    priceB2b: 1299,
    images: [
      '/api/placeholder/600/600',
      '/api/placeholder/600/600',
      '/api/placeholder/600/600'
    ],
    stockQuantity: 8,
    isAntiTarnish: false,
    isWaterproof: true,
    material: 'Crystal & Silver',
    weight: 3.8,
    category: { name: 'Earrings', slug: 'earrings' },
    discount: 15,
    rating: 4.6,
    reviews: 89,
    specifications: {
      dimensions: 'Length: 4cm, Width: 1.5cm',
      karat: '925 Silver with gold plating',
      plating: 'Rhodium plating on silver parts',
      stoneType: 'Austrian Crystal',
      claspType: 'Butterfly post back',
      warranty: '6 months warranty'
    },
    careInstructions: [
      'Wipe with damp cloth after use',
      'Avoid harsh chemicals and cosmetics',
      'Store in soft pouch or jewelry box',
      'Handle with care to prevent stone damage'
    ],
    shippingInfo: {
      processingTime: '1-2 business days',
      deliveryTime: '2-4 business days',
      freeShippingAbove: 1000
    }
  },
  '3': {
    id: '3',
    name: 'Rose Gold Bracelet',
    description: 'Delicate rose gold bracelet with anti-tarnish protection. This adjustable chain bracelet features a series of delicate links that create a subtle, elegant look. The rose gold finish adds warmth and sophistication to any outfit, while the anti-tarnish coating ensures it maintains its beauty over time.',
    priceB2c: 2499,
    priceB2b: 1699,
    images: [
      '/api/placeholder/600/600',
      '/api/placeholder/600/600',
      '/api/placeholder/600/600'
    ],
    stockQuantity: 12,
    isAntiTarnish: true,
    isWaterproof: false,
    material: 'Rose Gold Plated',
    weight: 4.5,
    category: { name: 'Bracelets', slug: 'bracelets' },
    isNew: true,
    rating: 4.7,
    reviews: 156,
    specifications: {
      dimensions: 'Length: 18cm + 3cm extender',
      karat: '14k Rose Gold Plated',
      plating: 'PVD coating for durability',
      claspType: 'Carabiner clasp',
      warranty: '1 year warranty'
    },
    careInstructions: [
      'Clean gently with jewelry cloth',
      'Avoid water and humidity',
      'Keep away from direct sunlight',
      'Apply perfume before wearing bracelet'
    ],
    shippingInfo: {
      processingTime: '1-2 business days',
      deliveryTime: '3-5 business days',
      freeShippingAbove: 1000
    }
  }
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const { sendProductInquiry, createProductShareLink } = useWhatsApp()
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showAddedToCart, setShowAddedToCart] = useState(false)

  useEffect(() => {
    const productId = params.id as string
    const foundProduct = dummyProducts[productId]
    
    if (foundProduct) {
      setProduct(foundProduct)
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [params.id])

  const handleAddToCart = () => {
    if (!product) return
    
    // Add to cart logic here
    setShowAddedToCart(true)
    setTimeout(() => setShowAddedToCart(false), 3000)
  }

  const handleWhatsAppOrder = () => {
    if (!product) return
    
    sendProductInquiry({
      productName: product.name,
      price: user?.role === 'reseller' && user.reseller?.isVerified && product.priceB2b 
        ? product.priceB2b 
        : product.priceB2c,
      productUrl: window.location.href,
      customerName: user?.name,
      businessName: user?.reseller?.businessName,
      orderType: user?.role === 'reseller' ? 'B2B' : 'B2C'
    })
  }

  const handleShare = async () => {
    if (!product) return
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (product && newQuantity >= 1 && newQuantity <= product.stockQuantity) {
      setQuantity(newQuantity)
    }
  }

  const displayPrice = product && user?.role === 'reseller' && user.reseller?.isVerified && product.priceB2b 
    ? product.priceB2b 
    : product?.priceB2c

  const originalPrice = product && product.discount 
    ? Math.round(product.priceB2c * (1 + product.discount / 100))
    : product?.priceB2c

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-200 aspect-square rounded-xl"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-deep-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
            <Button onClick={() => router.push('/products')}>Back to Products</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <span className="hover:text-yellow-600 cursor-pointer" onClick={() => router.push('/')}>
            Home
          </span>
          <span className="mx-2">/</span>
          <span className="hover:text-yellow-600 cursor-pointer" onClick={() => router.push('/products')}>
            Products
          </span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Added to Cart Alert */}
        {showAddedToCart && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <Check className="w-4 h-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Product added to cart successfully!
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                {product.isAntiTarnish && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-sm font-medium flex items-center space-x-1">
                    <Sparkles className="w-4 h-4" />
                    <span>Anti-Tarnish</span>
                  </Badge>
                )}
                {product.isWaterproof && (
                  <Badge className="bg-gradient-to-r from-blue-400 to-blue-600 text-white text-sm font-medium flex items-center space-x-1">
                    <Shield className="w-4 h-4" />
                    <span>Waterproof</span>
                  </Badge>
                )}
                {product.isNew && (
                  <Badge className="bg-gradient-to-r from-green-400 to-green-600 text-white text-sm font-medium">
                    New Arrival
                  </Badge>
                )}
                {product.discount && (
                  <Badge className="bg-gradient-to-r from-red-400 to-red-600 text-white text-sm font-medium">
                    -{product.discount}% OFF
                  </Badge>
                )}
              </div>

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev + 1) % product.images.length)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-yellow-400 shadow-gold' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  {product.category.name}
                </Badge>
                {product.rating && (
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                  </div>
                )}
              </div>
              
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-deep-900 mb-4">
                {product.name}
              </h1>
              
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-deep-900">₹{displayPrice}</span>
                {product.discount && (
                  <span className="text-xl text-gray-500 line-through">₹{originalPrice}</span>
                )}
                {user?.role === 'reseller' && user.reseller?.isVerified && product.priceB2b && (
                  <Badge className="bg-green-100 text-green-800 text-sm">
                    Reseller Price
                  </Badge>
                )}
              </div>
              
              {product.discount && (
                <p className="text-green-600 font-medium">
                  You save ₹{originalPrice - displayPrice} ({product.discount}% off)
                </p>
              )}
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Material</p>
                <p className="font-medium text-deep-900">{product.material}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Weight</p>
                <p className="font-medium text-deep-900">{product.weight}g</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Stock</p>
                <p className="font-medium text-deep-900">{product.stockQuantity} units</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Shipping</p>
                <p className="font-medium text-deep-900">
                  {product.shippingInfo?.freeShippingAbove && displayPrice >= product.shippingInfo.freeShippingAbove 
                    ? 'Free' 
                    : `Free above ₹${product.shippingInfo.freeShippingAbove}`
                  }
                </p>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-deep-900">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="h-10 w-10 p-0"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <div className="w-16 text-center font-medium text-lg">
                    {quantity}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stockQuantity}
                    className="h-10 w-10 p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <span className="text-sm text-gray-600">
                  ({product.stockQuantity} available)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  onClick={handleAddToCart}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold py-3"
                  disabled={product.stockQuantity === 0}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleWhatsAppOrder}
                  className="border-green-600 text-green-600 hover:bg-green-50 font-semibold py-3"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Order via WhatsApp
                </Button>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex items-center space-x-2 ${isWishlisted ? 'text-red-500' : 'text-gray-600'}`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
                </Button>
                
                <Button
                  variant="ghost"
                  onClick={handleShare}
                  className="flex items-center space-x-2 text-gray-600"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.isAntiTarnish && (
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <Sparkles className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-deep-900">Anti-Tarnish</p>
                    <p className="text-sm text-gray-600">Stays shiny forever</p>
                  </div>
                </div>
              )}
              
              {product.isWaterproof && (
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-deep-900">Waterproof</p>
                    <p className="text-sm text-gray-600">Wear anywhere</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="details" className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="care">Care Instructions</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-display text-xl font-semibold text-deep-900 mb-4">Product Details</h3>
                <div className="prose max-w-none text-gray-600">
                  <p>{product.description}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-display text-xl font-semibold text-deep-900 mb-4">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="font-medium text-deep-900">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="care" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-display text-xl font-semibold text-deep-900 mb-4">Care Instructions</h3>
                <ul className="space-y-3">
                  {product.careInstructions?.map((instruction, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="shipping" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-display text-xl font-semibold text-deep-900 mb-4">Shipping Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <Truck className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-deep-900">Processing Time</p>
                      <p className="text-sm text-gray-600">{product.shippingInfo?.processingTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Truck className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-deep-900">Delivery Time</p>
                      <p className="text-sm text-gray-600">{product.shippingInfo?.deliveryTime}</p>
                    </div>
                  </div>
                </div>
                {product.shippingInfo?.freeShippingAbove && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <p className="text-green-800 font-medium">
                      Free shipping on orders above ₹{product.shippingInfo.freeShippingAbove}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}