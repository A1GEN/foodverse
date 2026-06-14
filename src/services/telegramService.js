const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID

export const sendOrderToTelegram = async (orderData) => {
  try {
    const { name, phone, address, comment, items, total } = orderData

    // Format the message
    let message = `🆕 *НОВЫЙ ЗАКАЗ*\n\n`
    message += `👤 *Имя:* ${name}\n`
    message += `📱 *Телефон:* ${phone}\n`
    message += `📍 *Адрес:* ${address}\n`
    
    if (comment) {
      message += `💬 *Комментарий:* ${comment}\n`
    }
    
    message += `\n📦 *Товары в заказе:*\n\n`
    
    items.forEach((item, index) => {
      const itemName = item.strMeal || item.name || 'Товар'
      const quantity = item.quantity || 1
      message += `${index + 1}. ${itemName} x${quantity}\n`
    })
    
    message += `\n📊 *Всего товаров:* ${total}`
    message += `\n📝 *Позиций:* ${items.length}`

    // Send to Telegram
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.description || 'Failed to send message to Telegram')
    }

    return data
  } catch (error) {
    console.error('Error sending to Telegram:', error)
    throw error
  }
}
