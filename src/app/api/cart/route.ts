import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization required' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    const cartItems = await db.cartItem.findMany({
      where: {
        userId: decoded.userId
      },
      include: {
        product: {
          include: {
            category: true
          }
        }
      }
    })

    // Parse images and calculate totals
    const formattedCartItems = cartItems.map(item => ({
      ...item,
      product: {
        ...item.product,
        images: item.product.images ? JSON.parse(item.product.images) : []
      }
    }))

    const subtotal = formattedCartItems.reduce(
      (total, item) => total + (item.product.priceB2c * item.quantity),
      0
    )

    return NextResponse.json({
      items: formattedCartItems,
      subtotal
    })

  } catch (error) {
    console.error('Cart fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization required' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    const { productId, quantity = 1 } = await request.json()

    // Check if product exists
    const product = await db.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Check if product is in stock
    if (product.stockQuantity < quantity) {
      return NextResponse.json(
        { error: 'Insufficient stock' },
        { status: 400 }
      )
    }

    // Add to cart (or update if exists)
    const cartItem = await db.cartItem.upsert({
      where: {
        userId_productId: {
          userId: decoded.userId,
          productId
        }
      },
      update: {
        quantity
      },
      create: {
        userId: decoded.userId,
        productId,
        quantity
      },
      include: {
        product: true
      }
    })

    return NextResponse.json(cartItem)

  } catch (error) {
    console.error('Cart add error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}