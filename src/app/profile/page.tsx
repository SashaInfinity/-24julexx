'use client'

import { useState } from 'react'
import { User, Mail, Phone, MapPin, ShoppingBag, Heart, Star, Award, Settings, Shield, Truck, LogOut, Edit, Camera, Eye, ArrowRight, Trash2 } from 'lucide-react'
import Link from 'next/link'

// Dummy user data
const dummyUserData = {
  name: 'Priya Sharma',
  email: 'priya.sharma@example.com',
  phone: '+91 98765 43210',
  role: 'reseller',
  isVerified: true,
  memberSince: '2023-01-15',
  avatar: 'https://picsum.photos/seed/priya/200/200',
  business: {
    name: '24julex Fashion',
    type: 'Retail Store',
    gstNumber: '33AABCP1234C1ZV',
    creditLimit: 50000,
    businessAddress: '123 Jewelry Street, Salem, Tamil Nadu 636001'
  },
  stats: {
    totalOrders: 45,
    totalSpent: 125000,
    averageOrderValue: 2778,
    wishlistItems: 12,
    savedItems: 8
  },
  recentOrders: [
    {
      id: 'ORD20240115001',
      orderNumber: 'ORD20240115001',
      orderType: 'B2B',
      total: 8996,
      status: 'delivered',
      createdAt: '2024-01-15',
      items: [
        {
          name: 'Golden Aura Necklace',
          quantity: 2,
          image: 'https://picsum.photos/seed/goldnecklace1/80/80'
        }
      ]
    },
    {
      id: 'ORD20240110002',
      orderNumber: 'ORD20240110002',
      orderType: 'B2C',
      total: 1899,
      status: 'shipped',
      createdAt: '2024-01-10',
      items: [
        {
          name: 'Silver Moon Earrings',
          quantity: 1,
          image: 'https://picsum.photos/seed/silverearrings2/80/80'
        }
      ]
    },
    {
      id: 'ORD20240105003',
      orderNumber: 'ORD20240105003',
      orderType: 'B2B',
      total: 15990,
      status: 'processing',
      createdAt: '2024-01-05',
      items: [
        {
          name: 'Rose Gold Dream Bracelet',
          quantity: 4,
          image: 'https://picsum.photos/seed/rosebracelet3/80/80'
        }
      ]
    }
  ],
  addresses: [
    {
      id: 1,
      type: 'shipping',
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      email: 'priya.sharma@example.com',
      addressLine1: '123 Jewelry Street',
      addressLine2: 'Apartment 4B',
      city: 'Salem',
      state: 'Tamil Nadu',
      pincode: '636001',
      isDefault: true
    },
    {
      id: 2,
      type: 'billing',
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      email: 'priya.sharma@example.com',
      addressLine1: '456 Office Complex',
      addressLine2: '',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600001',
      isDefault: false
    }
  ]
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [editingProfile, setEditingProfile] = useState(false)
  const [profileData, setProfileData] = useState({
    name: dummyUserData.name,
    email: dummyUserData.email,
    phone: dummyUserData.phone
  })

  const handleSaveProfile = () => {
    // Simulate API call to save profile
    setTimeout(() => {
      setEditingProfile(false)
      alert('Profile updated successfully!')
    }, 1000)
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      processing: { color: 'bg-yellow-100 text-yellow-800', label: 'Processing' },
      shipped: { color: 'bg-blue-100 text-blue-800', label: 'Shipped' },
      delivered: { color: 'bg-green-100 text-green-800', label: 'Delivered' },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' }
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.processing
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="font-display text-2xl font-bold text-gray-900 flex items-center gap-2">
                <User className="w-6 h-6" />
                My Profile
              </h1>
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  dummyUserData.role === 'reseller' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {dummyUserData.role === 'reseller' ? 'Reseller' : 'Customer'}
                </div>
                {dummyUserData.isVerified && (
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    Verified
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="text-gray-700 hover:text-yellow-600 font-medium transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-4 sticky top-24">
              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: User },
                  { id: 'orders', label: 'Orders', icon: ShoppingBag },
                  { id: 'wishlist', label: 'Wishlist', icon: Heart },
                  { id: 'addresses', label: 'Addresses', icon: MapPin },
                  { id: 'settings', label: 'Settings', icon: Settings }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                      activeTab === tab.id 
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-md' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    {/* Avatar */}
                    <div className="relative">
                      <img
                        src={dummyUserData.avatar}
                        alt={dummyUserData.name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <button className="absolute bottom-0 right-0 bg-yellow-400 text-black p-2 rounded-full">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* User Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <h2 className="font-display text-2xl font-bold text-gray-900">
                          {dummyUserData.name}
                        </h2>
                        <button
                          onClick={() => setEditingProfile(!editingProfile)}
                          className="text-gray-700 hover:text-yellow-600 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>{dummyUserData.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>{dummyUserData.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          <span>Member since {new Date(dummyUserData.memberSince).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-2">{dummyUserData.stats.totalOrders}</div>
                    <div className="text-gray-600">Total Orders</div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-2">{dummyUserData.stats.wishlistItems}</div>
                    <div className="text-gray-600">Wishlist Items</div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-2">₹{dummyUserData.stats.totalSpent.toLocaleString()}</div>
                    <div className="text-gray-600">Total Spent</div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-2">₹{dummyUserData.stats.averageOrderValue.toLocaleString()}</div>
                    <div className="text-gray-600">Avg Order Value</div>
                  </div>
                </div>

                {/* Business Info (for resellers) */}
                {dummyUserData.role === 'reseller' && (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                    <h3 className="font-display text-xl font-bold text-purple-900 mb-4">Business Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Business Name:</span>
                        <p className="font-medium text-purple-900">{dummyUserData.business.name}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Business Type:</span>
                        <p className="font-medium text-purple-900">{dummyUserData.business.type}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">GST Number:</span>
                        <p className="font-medium text-purple-900">{dummyUserData.business.gstNumber}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Credit Limit:</span>
                        <p className="font-medium text-purple-900">₹{dummyUserData.business.creditLimit.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Edit Profile Form */}
                {editingProfile && (
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="font-display text-xl font-bold text-gray-900 mb-6">Edit Profile</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={handleSaveProfile}
                        className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold py-3 rounded-xl transition-all"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setEditingProfile(false)}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Order History</h2>
                {dummyUserData.recentOrders.map((order) => (
                  <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="font-semibold text-gray-900">{order.orderNumber}</h3>
                          {getStatusBadge(order.status)}
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.orderType === 'B2B' 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {order.orderType}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-3">
                          <div className="text-sm text-gray-600">
                            <p>Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p>{order.items.length} items</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-gray-900">₹{order.total.toLocaleString()}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center gap-2 bg-gray-50 rounded-xl p-2">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div>
                                <p className="font-medium text-sm text-gray-900">{item.name}</p>
                                <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="text-gray-700 hover:text-yellow-600 font-medium transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-700 hover:text-yellow-600 font-medium transition-colors">
                          Reorder
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="text-center py-12">
                <div className="text-6xl mb-6">💝</div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">
                  {dummyUserData.stats.wishlistItems} items in wishlist
                </h3>
                <p className="text-gray-600 mb-8">
                  View your full wishlist with detailed product information and quick actions.
                </p>
                <Link
                  href="/wishlist"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Heart className="w-5 h-5" />
                  View Full Wishlist
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-2xl font-bold text-gray-900">Saved Addresses</h2>
                  <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold px-4 py-2 rounded-xl transition-all">
                    Add New Address
                  </button>
                </div>
                
                {dummyUserData.addresses.map((address) => (
                  <div key={address.id} className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 capitalize">{address.type} Address</h3>
                        {address.isDefault && (
                          <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            Default
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button className="text-gray-700 hover:text-yellow-600 font-medium transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <p className="font-medium text-gray-900">{address.name}</p>
                      <p>{address.phone}</p>
                      <p>{address.email}</p>
                      <p>{address.addressLine1}</p>
                      {address.addressLine2 && <p>{address.addressLine2}</p>}
                      <p>{address.city}, {address.state} {address.pincode}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-600" />
                      Security
                    </h3>
                    <div className="space-y-3">
                      <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-900">Change Password</span>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </button>
                      <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-900">Two-Factor Authentication</span>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-blue-600" />
                      Notifications
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-gray-900">Email Notifications</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-yellow-600 rounded" />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-gray-900">SMS Notifications</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-yellow-600 rounded" />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-gray-900">Order Updates</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-yellow-600 rounded" />
                      </label>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-purple-600" />
                      Preferences
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-gray-900">Default View</span>
                        <select className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400">
                          <option>Grid View</option>
                          <option>List View</option>
                        </select>
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-gray-900">Currency</span>
                        <select className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400">
                          <option>INR (₹)</option>
                          <option>USD ($)</option>
                        </select>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}