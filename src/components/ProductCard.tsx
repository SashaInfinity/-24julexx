'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, ShoppingCart, Sparkles, Shield } from 'lucide-react'
import { useAuthStore } from '@/lib/store'
import { useCartStore } from '@/lib/store'

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
}

interface ProductCardProps {
  product: Product
  variant?: 'default' | 'featured'
}

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { user, isAuthenticated } = useAuthStore()
  const { addItem } = useCartStore()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      product: {
        id: product.id,
        name: product.name,
        priceB2c: product.priceB2c,
        priceB2b: product.priceB2b,
        images: product.images,
        stockQuantity: product.stockQuantity
      },
      quantity: 1
    })
  }

  const handleWhatsAppOrder = () => {
    const message = `Hi! I'm interested in this product:\n\n*${product.name}*\n\nPrice: ₹${user?.role === 'reseller' && user.reseller?.isVerified && product.priceB2b ? product.priceB2b : product.priceB2c}\n\nProduct Link: ${window.location.origin}/product/${product.id}\n\nPlease help me with the order.`
    const whatsappUrl = `https://wa.me/919677886632?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const displayPrice = user?.role === 'reseller' && user.reseller?.isVerified && product.priceB2b 
    ? product.priceB2b 
    : product.priceB2c

  const mainImage = product.images[0] || '/placeholder-jewelry.jpg'

  return (
    <Card 
      className={`group relative overflow-hidden transition-all duration-300 hover:shadow-gold-lg ${
        variant === 'featured' ? 'ring-2 ring-yellow-400 ring-offset-2' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-500 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {product.isAntiTarnish && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-medium flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>Anti-Tarnish</span>
              </Badge>
            )}
            {product.isWaterproof && (
              <Badge className="bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xs font-medium flex items-center space-x-1">
                <Shield className="w-3 h-3" />
                <span>Waterproof</span>
              </Badge>
            )}
            {variant === 'featured' && (
              <Badge className="bg-gradient-to-r from-purple-400 to-pink-600 text-white text-xs font-medium">
                Featured
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-700 hover:text-red-500 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>

          {/* Quick Actions Overlay */}
          <div className={`absolute inset-0 bg-black/50 flex items-center justify-center space-x-2 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <Button
              size="sm"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-white hover:bg-gray-50 text-green-600 border-green-600 hover:border-green-700 font-medium"
              onClick={handleWhatsAppOrder}
            >
              WhatsApp
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="mb-2">
            <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
              {product.category.name}
            </Badge>
          </div>
          
          <Link href={`/product/${product.id}`}>
            <h3 className="font-display font-semibold text-deep-900 mb-2 line-clamp-2 group-hover:text-yellow-600 transition-colors">
              {product.name}
            </h3>
          </Link>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-deep-900">₹{displayPrice}</span>
                {user?.role === 'reseller' && user.reseller?.isVerified && product.priceB2b && (
                  <span className="text-sm text-gray-500 line-through">₹{product.priceB2c}</span>
                )}
              </div>
              {user?.role === 'reseller' && user.reseller?.isVerified && product.priceB2b && (
                <span className="text-xs text-green-600 font-medium">Reseller Price</span>
              )}
            </div>
            <div className="text-xs text-gray-500">
              {product.material}
            </div>
          </div>

          {/* Stock Status */}
          {product.stockQuantity <= 5 && (
            <div className="text-xs text-orange-600 font-medium mb-3">
              Only {product.stockQuantity} left in stock!
            </div>
          )}

          {/* Mobile Actions */}
          <div className="md:hidden flex space-x-2">
            <Button
              size="sm"
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-medium"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-white hover:bg-gray-50 text-green-600 border-green-600 hover:border-green-700 font-medium"
              onClick={handleWhatsAppOrder}
            >
              WhatsApp
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}