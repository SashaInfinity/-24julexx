'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import ProductCard from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter, Sparkles, Shield, Star } from 'lucide-react'

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
  rating?: number
  reviews?: number
}

const allProducts: Product[] = [
  {
    id: '1',
    name: 'Golden Heart Necklace',
    description: 'Elegant 18k gold-plated heart pendant with anti-tarnish coating',
    priceB2c: 699,
    priceB2b: 499,
    images: ['/api/placeholder/300/300'],
    stockQuantity: 15,
    isAntiTarnish: true,
    isWaterproof: true,
    material: '18k Gold Plated',
    weight: 5.2,
    category: {
      name: 'Necklaces',
      slug: 'necklaces'
    },
    rating: 4.8,
    reviews: 124
  },
  {
    id: '2',
    name: 'Crystal Drop Earrings',
    description: 'Stunning crystal earrings with waterproof design',
    priceB2c: 549,
    priceB2b: 399,
    images: ['/api/placeholder/300/300'],
    stockQuantity: 8,
    isAntiTarnish: false,
    isWaterproof: true,
    material: 'Crystal & Silver',
    weight: 3.8,
    category: {
      name: 'Earrings',
      slug: 'earrings'
    },
    rating: 4.9,
    reviews: 89
  },
  {
    id: '3',
    name: 'Rose Gold Bracelet',
    description: 'Delicate rose gold bracelet with anti-tarnish protection',
    priceB2c: 649,
    priceB2b: 449,
    images: ['/api/placeholder/300/300'],
    stockQuantity: 12,
    isAntiTarnish: true,
    isWaterproof: false,
    material: 'Rose Gold Plated',
    weight: 4.5,
    category: {
      name: 'Bracelets',
      slug: 'bracelets'
    },
    rating: 4.7,
    reviews: 156
  },
  {
    id: '4',
    name: 'Silver Infinity Ring',
    description: 'Timeless infinity design with waterproof silver finish',
    priceB2c: 449,
    priceB2b: 299,
    images: ['/api/placeholder/300/300'],
    stockQuantity: 20,
    isAntiTarnish: false,
    isWaterproof: true,
    material: '925 Silver',
    weight: 2.8,
    category: {
      name: 'Rings',
      slug: 'rings'
    },
    rating: 4.6,
    reviews: 203
  },
  {
    id: '5',
    name: 'Pearl Stud Earrings',
    description: 'Classic pearl studs with anti-tarnish silver posts',
    priceB2c: 399,
    priceB2b: 279,
    images: ['/api/placeholder/300/300'],
    stockQuantity: 25,
    isAntiTarnish: true,
    isWaterproof: false,
    material: 'Pearl & Silver',
    weight: 2.1,
    category: {
      name: 'Earrings',
      slug: 'earrings'
    },
    rating: 4.5,
    reviews: 167
  },
  {
    id: '6',
    name: 'Chain Link Bracelet',
    description: 'Modern chain link bracelet with golden finish',
    priceB2c: 529,
    priceB2b: 369,
    images: ['/api/placeholder/300/300'],
    stockQuantity: 18,
    isAntiTarnish: true,
    isWaterproof: true,
    material: 'Gold Plated Steel',
    weight: 6.3,
    category: {
      name: 'Bracelets',
      slug: 'bracelets'
    },
    rating: 4.8,
    reviews: 94
  },
  {
    id: '7',
    name: 'Layered Necklace Set',
    description: 'Two-layer necklace set with adjustable lengths',
    priceB2c: 749,
    priceB2b: 529,
    images: ['/api/placeholder/300/300'],
    stockQuantity: 10,
    isAntiTarnish: true,
    isWaterproof: false,
    material: 'Gold Plated Alloy',
    weight: 7.8,
    category: {
      name: 'Necklaces',
      slug: 'necklaces'
    },
    rating: 4.9,
    reviews: 78
  },
  {
    id: '8',
    name: 'Statement Cocktail Ring',
    description: 'Bold statement ring with crystal centerpiece',
    priceB2c: 599,
    priceB2b: 419,
    images: ['/api/placeholder/300/300'],
    stockQuantity: 14,
    isAntiTarnish: false,
    isWaterproof: true,
    material: 'Crystal & Brass',
    weight: 4.2,
    category: {
      name: 'Rings',
      slug: 'rings'
    },
    rating: 4.7,
    reviews: 112
  },
  {
    id: '9',
    name: 'Hoop Earrings Set',
    description: 'Set of 3 different sized hoop earrings',
    priceB2c: 479,
    priceB2b: 339,
    images: ['/api/placeholder/300/300'],
    stockQuantity: 22,
    isAntiTarnish: true,
    isWaterproof: true,
    material: 'Gold Plated',
    weight: 3.5,
    category: {
      name: 'Earrings',
      slug: 'earrings'
    },
    rating: 4.6,
    reviews: 145
  },
  {
    id: '10',
    name: 'Tennis Bracelet',
    description: 'Elegant tennis bracelet with crystal stones',
    priceB2c: 699,
    priceB2b: 489,
    images: ['/api/placeholder/300/300'],
    stockQuantity: 8,
    isAntiTarnish: false,
    isWaterproof: false,
    material: 'Crystal & Silver',
    weight: 5.8,
    category: {
      name: 'Bracelets',
      slug: 'bracelets'
    },
    rating: 4.8,
    reviews: 87
  },
  {
    id: '11',
    name: 'Choker Necklace',
    description: 'Trendy choker with adjustable chain',
    priceB2c: 349,
    priceB2b: 249,
    images: ['/api/placeholder/300/300'],
    stockQuantity: 30,
    isAntiTarnish: true,
    isWaterproof: true,
    material: 'Gold Plated',
    weight: 2.9,
    category: {
      name: 'Necklaces',
      slug: 'necklaces'
    },
    rating: 4.5,
    reviews: 198
  },
  {
    id: '12',
    name: 'Stacking Rings Set',
    description: 'Set of 5 delicate stacking rings',
    priceB2c: 429,
    priceB2b: 299,
    images: ['/api/placeholder/300/300'],
    stockQuantity: 16,
    isAntiTarnish: true,
    isWaterproof: false,
    material: 'Silver Plated',
    weight: 3.2,
    category: {
      name: 'Rings',
      slug: 'rings'
    },
    rating: 4.7,
    reviews: 176
  }
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  useEffect(() => {
    setTimeout(() => {
      setProducts(allProducts)
      setFilteredProducts(allProducts)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = products

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category.slug === selectedCategory
      )
    }

    // Price range filter
    if (selectedPriceRange !== 'all') {
      const [min, max] = selectedPriceRange.split('-').map(Number)
      filtered = filtered.filter(product =>
        product.priceB2c >= min && product.priceB2c <= max
      )
    }

    // Features filter
    if (selectedFeatures.length > 0) {
      filtered = filtered.filter(product => {
        return selectedFeatures.every(feature => {
          if (feature === 'anti-tarnish') return product.isAntiTarnish
          if (feature === 'waterproof') return product.isWaterproof
          return true
        })
      })
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory, selectedPriceRange, selectedFeatures])

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-50 via-white to-pink-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            <Badge className="bg-gradient-to-r from-purple-400 to-pink-600 text-white text-sm font-medium px-4 py-2">
              ✨ All Products Under ₹800
            </Badge>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-deep-900 leading-tight">
              Premium Jewelry
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                {' '}Under ₹800
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Affordable luxury with anti-tarnish and waterproof technology. Free shipping on all orders!
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <Card className="p-6 sticky top-4">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-yellow-600" />
                <h3 className="font-semibold text-lg">Filters</h3>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="necklaces">Necklaces</SelectItem>
                    <SelectItem value="earrings">Earrings</SelectItem>
                    <SelectItem value="bracelets">Bracelets</SelectItem>
                    <SelectItem value="rings">Rings</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Price Range</label>
                <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="0-400">Under ₹400</SelectItem>
                    <SelectItem value="400-600">₹400 - ₹600</SelectItem>
                    <SelectItem value="600-800">₹600 - ₹800</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Features Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Features</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFeatures.includes('anti-tarnish')}
                      onChange={() => toggleFeature('anti-tarnish')}
                      className="rounded text-yellow-600 focus:ring-yellow-500"
                    />
                    <span className="text-sm">Anti-Tarnish</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFeatures.includes('waterproof')}
                      onChange={() => toggleFeature('waterproof')}
                      className="rounded text-yellow-600 focus:ring-yellow-500"
                    />
                    <span className="text-sm">Waterproof</span>
                  </label>
                </div>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                  setSelectedPriceRange('all')
                  setSelectedFeatures([])
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold">
                  {filteredProducts.length} Products Found
                </h2>
                <p className="text-gray-600">
                  All prices include free shipping
                </p>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="bg-gray-200 h-64 animate-pulse" />
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* No Results */}
            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-deep-900 mb-4">
              Why Choose 24julex?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-0 shadow-lg">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Anti-Tarnish Technology</h3>
                <p className="text-gray-600">Advanced coating that keeps your jewelry shining bright for years</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Waterproof Design</h3>
                <p className="text-gray-600">Wear it anywhere, anytime. Completely waterproof and perfect for daily wear</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Under ₹800</h3>
                <p className="text-gray-600">Premium quality jewelry at affordable prices. Free shipping included!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}