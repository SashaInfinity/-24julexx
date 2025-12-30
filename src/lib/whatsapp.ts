export const WHATSAPP_NUMBER = '+919677886632'

export const createWhatsAppOrder = (productName: string, price: number, quantity: number = 1) => {
  const message = `Hi 24julex! I'd like to order:\n\n📦 Product: ${productName}\n💰 Price: ₹${price}\n🔢 Quantity: ${quantity}\n💳 Total: ₹${price * quantity}\n\nPlease confirm availability and payment details.`
  return `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(message)}`
}

export const createWhatsAppInquiry = (productName?: string) => {
  const message = productName 
    ? `Hi 24julex! I'm interested in ${productName}. Can you provide more details?`
    : `Hi 24julex! I'd like to inquire about your products and collections.`
  return `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(message)}`
}

export const createWhatsAppB2BInquiry = () => {
  const message = `Hi 24julex! I'm interested in your B2B reseller program. Please provide details about:\n• Wholesale pricing\n• Bulk ordering\n• Reseller benefits\n• Registration process`
  return `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(message)}`
}

export const createWhatsAppSupport = () => {
  const message = `Hi 24julex! I need assistance with my order/account.`
  return `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(message)}`
}