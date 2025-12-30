import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
  role: 'customer' | 'reseller' | 'admin'
  reseller?: {
    id: string
    businessName: string
    isVerified: boolean
  }
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (user: User, token: string) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => {
        set({ user, token, isAuthenticated: true })
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
      },
      updateUser: (userData) => {
        const currentUser = get().user
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } })
        }
      }
    }),
    {
      name: 'auth-storage'
    }
  )
)

interface CartItem {
  id: string
  product: {
    id: string
    name: string
    priceB2c: number
    priceB2b?: number
    images: string[]
    stockQuantity: number
  }
  quantity: number
}

interface CartState {
  items: CartItem[]
  subtotal: number
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      subtotal: 0,
      addItem: (newItem) => {
        const items = get().items
        const existingItem = items.find(item => item.product.id === newItem.product.id)
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.product.id === newItem.product.id
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            )
          })
        } else {
          set({ items: [...items, newItem] })
        }
        
        // Recalculate subtotal
        const updatedItems = get().items
        const subtotal = updatedItems.reduce((total, item) => {
          const price = get().isB2B && item.product.priceB2b 
            ? item.product.priceB2b 
            : item.product.priceB2c
          return total + (price * item.quantity)
        }, 0)
        
        set({ subtotal })
      },
      removeItem: (productId) => {
        const items = get().items.filter(item => item.product.id !== productId)
        set({ items })
        
        const subtotal = items.reduce((total, item) => {
          const price = item.product.priceB2b || item.product.priceB2c
          return total + (price * item.quantity)
        }, 0)
        
        set({ subtotal })
      },
      updateQuantity: (productId, quantity) => {
        const items = get().items.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
        set({ items })
        
        const subtotal = items.reduce((total, item) => {
          const price = item.product.priceB2b || item.product.priceB2c
          return total + (price * item.quantity)
        }, 0)
        
        set({ subtotal })
      },
      clearCart: () => {
        set({ items: [], subtotal: 0 })
      }
    }),
    {
      name: 'cart-storage'
    }
  )
)