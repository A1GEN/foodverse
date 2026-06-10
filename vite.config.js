import { defineConfig }
  from "vite"

import react
  from "@vitejs/plugin-react"

import { VitePWA }
  from "vite-plugin-pwa"

export default defineConfig({

  plugins:[

    react(),

    VitePWA({
      proxy:{
        "/api":{

          target:"http://www.themealdb.com",

          changeOrigin:true,

          rewrite:(path) =>
            path.replace(/^\/api/, "")

        },
      },
      
      registerType:"autoUpdate",

      manifest:{

        name:"FoodVerse",

        short_name:"FoodVerse",

        description:
          "Modern Recipe App 🍔",

        theme_color:"#0f172a",

        background_color:"#0f172a",

        display:"standalone",

        start_url:"/",

        icons:[

          {
            src:"/icon-192.png",
            sizes:"192x192",
            type:"image/png"
          },

          {
            src:"/icon-512.png",
            sizes:"512x512",
            type:"image/png"
          }

        ]

      }

    })

  ],

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.match(/node_modules\\react(-dom)?\\/)) return 'react-vendor'
          if (id.includes('lucide-react')) return 'icons'
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('firebase')) return 'firebase'
          if (id.includes('axios')) return 'axios'
          return 'vendor'
        }
      }
    }
  }

})

// manual chunks are configured above in the main export