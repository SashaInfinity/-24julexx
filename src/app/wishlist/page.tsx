'use client'

import { useState } from 'react'
import { Heart, ShoppingBag, Star, Eye, Trash2, Sparkles, Shield, ArrowRight } from 'lucide-react'
import Link from 'next/link'

// Dummy wishlist data
const dummyWishlistItems = [
  {
    id: 1,
    product: {
      id: 1,
      name: "Golden Aura Necklace",
      price_b2c: 2999,
      price_b2b: 1899,
      images: ["https://picsum.photos/seed/goldnecklace1/400/400"],
      category: "necklaces",
      is_anti_tarnish: true,
      is_waterproof: true,
      material: "18K Gold Plated",
      weight: "15g",
      rating: 4.8,
      reviews: 234,
      sku: "GN-001"
    },
    addedDate: "2024-01-15"
  },
  {
    id: 2,
    product: {
      id: 2,
      name: "Silver Moon Earrings",
      price_b2c: 1899,
      price_b2b: 1199,
      images: ["https://picsum.photos/seed/silverearrings2/400/400"],
      category: "earrings",
      is_anti_tarnish: true,
      is_waterproof: false,
      material: "925 Sterling Silver",
      weight: "8g",
      rating: 4.6,
      reviews: 189,
      sku: "SE-002"
    },
    addedDate: "2024-01-10"
  },
  {
    id: 3,
    product: {
      id: 3,
      name: "Rose Gold Dream Bracelet",
      price_b2c: 2499,
      price_b2b: 1599,
      images: ["https://picsum.photos/seed/rosebracelet3/400/400"],
      category: "bracelets",
      is_anti_tarnish: true,
      is_waterproof: true,
      material: "Rose Gold Plated",
      weight: "12g",
      rating: 4.9,
      reviews: 312,
      sku: "RB-003"
    },
    addedDate: "2024-01-08"
  },
  {
    id: 4,
    product: {
      id: 4,
      name: "Crystal Cascade Ring",
      price_b2c: 1599,
      price_b2b: 999,
      images: ["https://picsum.photos/seed/crystalring4/400/400"],
      category: "rings",
      is_anti_tarnish: false,
      is_waterproof: true,
      material: "Crystal & Silver",
      weight: "6g",
      rating: 4.7,
      reviews: 156,
      sku: "CR-004"
    },
    addedDate: "2024-01-05"
  },
  {
    id: 5,
    product: {
      id: 5,
      name: "Vintage Lock Locket",
      price_b2c: 3499,
      price_b2b: 2299,
      images: ["https://picsum.photos/seed/vintagelocket5/400/400"],
      category: "necklaces",
      is_anti_tarnish: true,
      is_waterproof: false,
      material: "Antique Gold Plated",
      weight: "20g",
      rating: 4.8,
      reviews: 278,
      sku: "VL-005"
    },
    addedDate: "2024-01-03"
  }
]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(dummyWishlistItems)
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set())
  const [userRole, setUserRole] = useState<'customer' | 'reseller'>('customer')
  const [sortBy, setSortBy] = useState<'date' | 'price-low' | 'price-high' | 'name'>('date')

  const handleSelectItem = (itemId: number) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  const handleRemoveItem = (itemId: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId))
    setSelectedItems(prev => {
      const newSet = new Set(prev)
      newSet.delete(itemId)
      return newSet
    })
  }

  const handleAddSelectedToCart = () => {
    if (selectedItems.size === 0) {
      alert('Please select items to add to cart')
      return
    }
    
    alert(`Added ${selectedItems.size} items to cart!`)
    setSelectedItems(new Set())
  }

  const handleSelectAll = () => {
    setSelectedItems(new Set(wishlistItems.map(item => item.id)))
  }

  const handleDeselectAll = () => {
    setSelectedItems(new Set())
  }

  const displayPrice = (item: any) => {
    return userRole === 'reseller' ? item.product.price_b2b : item.product.price_b2c
  }

  const calculateTotal = () => {
    return wishlistItems.reduce((total, item) => total + displayPrice(item), 0)
  }

  const calculateAveragePrice = () => {
    if (wishlistItems.length === 0) return 0
    return calculateTotal() / wishlistItems.length
  }

  // Sort items
  const sortedWishlistItems = [...wishlistItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return displayPrice(a) - displayPrice(b)
      case 'price-high':
        return displayPrice(b) - displayPrice(a)
      case 'name':
        return a.product.name.localeCompare(b.product.name)
      case 'date':
      default:
        return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
    }
  })

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">💝</div>
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-4">
            Your wishlist is empty
          </h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Start adding your favorite pieces to keep track of items you love!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <ShoppingBag className="w-5 h-5" />
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="font-display text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-500" />
                My Wishlist
              </h1>
              <p className="text-gray-600 mt-1">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 rounded-xl p-1 flex">
                <button
                  onClick={() => setUserRole('customer')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${userRole === 'customer' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'}`}
                >
                  B2C
                </button>
                <button
                  onClick={() => setUserRole('reseller')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${userRole === 'reseller' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'text-gray-600'}`}
                >
                  B2B
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="date">Date Added</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A-Z</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <button
              onClick={handleSelectAll}
              className="text-gray-700 hover:text-yellow-600 font-medium flex items-center gap-2"
            >
              Select All
            </button>
            <button
              onClick={handleDeselectAll}
              className="text-gray-700 hover:text-yellow-600 font-medium flex items-center gap-2"
            >
              Deselect All
            </button>
          </div>
          
          <button
            onClick={handleAddSelectedToCart}
            disabled={selectedItems.size === 0}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold px-6 py-3 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none flex items-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" />
            Add Selected to Cart ({selectedItems.size})
          </button>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedWishlistItems.map((item) => (
            <div key={item.id} className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {/* Selection Checkbox */}
                <div className="absolute top-3 left-3 z-10">
                  <input
                    type="checkbox"
                    checked={selectedItems.has(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    className="w-5 h-5 text-yellow-600 rounded focus:ring-yellow-400"
                  />
                </div>
                
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Badge overlays */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    {item.product.is_anti_tarnish && (
                      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                        <Sparkles className="w-3 h-3" />
                        Anti-Tarnish
                      </div>
                    )}
                    {item.product.is_waterproof && (
                      <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                        <Shield className="w-3 h-3" />
                        Waterproof
                      </div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="bg-white/80 backdrop-blur-sm hover:bg-white text-red-500 rounded-full p-2 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="bg-white/80 backdrop-blur-sm hover:bg-white text-yellow-600 rounded-full p-2 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                        {item.product.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        SKU: {item.product.sku}
                      </span>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl font-bold text-gray-900">
                          ₹{displayPrice(item)}
                        </span>
                        {userRole === 'reseller' && (
                          <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                            Wholesale
                          </div>
                        )}
                      </div>
                      {userRole === 'reseller' && (
                        <div className="text-sm text-green-600 font-medium">
                          You save ₹{item.product.price_b2c - item.product.price_b2b} per item
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="font-display font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                    {item.product.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(item.product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({item.product.reviews}) • {item.product.material} • {item.product.weight}
                    </span>
                  </div>

                  <div className="text-xs text-gray-500 mb-3">
                    Added on {new Date(item.addedDate).toLocaleDateString()}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 font-medium px-4 py-2 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium px-4 py-2 rounded-xl transition-colors">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-medium px-4 py-2 rounded-xl transition-all">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-12 bg-gradient-to-r from-yellow-50 to-white rounded-2xl p-8">
          <h3 className="font-display text-2xl font-semibold text-gray-900 mb-6 text-center">
            Wishlist Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-2">{wishlistItems.length}</p>
              <p className="text-gray-600">Saved Items</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                ₹{Math.round(calculateAveragePrice()).toLocaleString()}
              </p>
              <p className="text-gray-600">Average Price</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                ₹{calculateTotal().toLocaleString()}
              </p>
              <p className="text-gray-600">Total Value</p>
            </div>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <ShoppingBag className="w-5 h-5" />
            Continue Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}