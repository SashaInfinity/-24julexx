import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const isAntiTarnish = searchParams.get('isAntiTarnish')
    const isWaterproof = searchParams.get('isWaterproof')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const search = searchParams.get('search')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {
      isActive: true
    }

    if (category) {
      where.category = {
        slug: category
      }
    }

    if (isAntiTarnish !== null) {
      where.isAntiTarnish = isAntiTarnish === 'true'
    }

    if (isWaterproof !== null) {
      where.isWaterproof = isWaterproof === 'true'
    }

    if (minPrice || maxPrice) {
      where.priceB2c = {}
      if (minPrice) where.priceB2c.gte = parseFloat(minPrice)
      if (maxPrice) where.priceB2c.lte = parseFloat(maxPrice)
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { material: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Get products
    const products = await db.product.findMany({
      where,
      include: {
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit
    })

    // Get total count
    const total = await db.product.count({ where })

    // Parse images JSON
    const formattedProducts = products.map(product => ({
      ...product,
      images: product.images ? JSON.parse(product.images) : []
    }))

    return NextResponse.json({
      products: formattedProducts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Products fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      description,
      material,
      weight,
      priceB2c,
      priceB2b,
      stockQuantity,
      isAntiTarnish,
      isWaterproof,
      images,
      categoryId
    } = await request.json()

    // Generate slug
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    const product = await db.product.create({
      data: {
        name,
        slug,
        description,
        material,
        weight,
        priceB2c,
        priceB2b,
        stockQuantity,
        isAntiTarnish,
        isWaterproof,
        images: images ? JSON.stringify(images) : null,
        categoryId
      },
      include: {
        category: true
      }
    })

    const formattedProduct = {
      ...product,
      images: product.images ? JSON.parse(product.images) : []
    }

    return NextResponse.json(formattedProduct)

  } catch (error) {
    console.error('Product creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}