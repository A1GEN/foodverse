const BOT_TOKEN =
  import.meta.env.VITE_TELEGRAM_BOT_TOKEN

const CHAT_ID =
  import.meta.env.VITE_TELEGRAM_CHAT_ID

export async function sendTelegram(
  message
) {

  try {

    await fetch(

      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,

      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({

          chat_id: CHAT_ID,

          text: message

        })

      }

    )

  }

  catch(error) {

    console.log(error)

  }

}