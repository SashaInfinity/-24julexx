'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuthStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ShoppingBag, 
  User, 
  Search, 
  Menu, 
  X, 
  Heart,
  ShoppingCart,
  Store
} from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">24J</span>
            </div>
            <span className="font-display text-xl font-bold text-deep-900">24julex</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-yellow-600 font-medium transition-colors">
              All Products
            </Link>
            <Link href="/collections" className="text-gray-700 hover:text-yellow-600 font-medium transition-colors">
              Collections
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-yellow-600 font-medium transition-colors">
              About
            </Link>
            {isAuthenticated && user?.role === 'reseller' && (
              <Link href="/reseller" className="text-purple-600 hover:text-purple-700 font-medium transition-colors flex items-center space-x-1">
                <Store className="w-4 h-4" />
                <span>Reseller Portal</span>
              </Link>
            )}
            {isAuthenticated && (
              <Link href="/profile" className="text-gray-700 hover:text-yellow-600 font-medium transition-colors flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Link>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-700 hover:text-yellow-600">
              <Search className="w-5 h-5" />
            </Button>
            
            <Button variant="ghost" size="sm" className="text-gray-700 hover:text-yellow-600">
              <Heart className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="sm" className="text-gray-700 hover:text-yellow-600 relative">
              <ShoppingCart className="w-5 h-5" />
              <Badge className="absolute -top-2 -right-2 bg-neon-pink text-white text-xs w-5 h-5 flex items-center justify-center p-0">
                2
              </Badge>
            </Button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Welcome, {user?.name}</span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white">
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link href="/products" className="text-gray-700 hover:text-yellow-600 font-medium">
                All Products
              </Link>
              <Link href="/collections" className="text-gray-700 hover:text-yellow-600 font-medium">
                Collections
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-yellow-600 font-medium">
                About
              </Link>
              {isAuthenticated && user?.role === 'reseller' && (
                <Link href="/reseller" className="text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-1">
                  <Store className="w-4 h-4" />
                  <span>Reseller Portal</span>
                </Link>
              )}
              {isAuthenticated && (
                <Link href="/profile" className="text-gray-700 hover:text-yellow-600 font-medium flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
              )}
              
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
                <Button variant="ghost" size="sm" className="text-gray-700 hover:text-yellow-600">
                  <Search className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-700 hover:text-yellow-600">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-700 hover:text-yellow-600">
                  <ShoppingCart className="w-5 h-5" />
                </Button>
              </div>

              {!isAuthenticated ? (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white">
                    Sign Up
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-700">Welcome, {user?.name}</span>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}