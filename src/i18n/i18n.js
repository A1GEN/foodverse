import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
  en: {
    translation: {
      home: "Home",
      favorites: "Favorites",
      login: "Login",
      create: "Create",
      profile: "Profile",
      logout: "Logout",
      admin: "Admin",
      welcomeBack: "Welcome Back",
      emailPlaceholder: "Email",
      passwordPlaceholder: "Password",
      show: "Show",
      hide: "Hide",
      rememberMe: "Remember me",
      forgot: "Forgot?",
      loginButton: "Login",
      demoText: "Demo:",
      useDemo: "Use demo",
      noAccount: "No account?",
      register: "Register",
      heroCTA: "Explore Recipes",
      comingSoon: "Feature coming soon",
      chips: {
        favorites: "Add to favorites",
        recipes: "Recipes",
        articles: "Articles",
        ourKitchen: "Our Kitchen",
        superSearch: "Super Search",
        newsletters: "Newsletters",
        addRecipe: "Add recipe"
      },
      classicTitle: "Recipes by dish types",
      classicDescription:
        "Our culinary site is a big cookbook: thousands of recipes with photos, step-by-step instructions and helpful tips.",
      discover: {
        chefTitle: "Chef's recommendation: Warm seafood pasta",
        chefText:
          "Tender seafood, tomato sauce and crispy herbs — a quick and impressive dinner.",
        cta: "View recipes"
      },
      recipeOfDay: {
        label: "Recipe Of The Day",
        title: "Grilled Chicken Salad",
        text: "Healthy, tasty and easy to cook in 20 minutes.",
        view: "View Recipe"
      },
      trending: {
        title: "Trending Recipes 🔥",
        subtitle: "Most popular food today 😎",
        hot: "HOT 🔥",
        view: "View"
      },
      popularCategories: "Popular categories",
      viewRecipe: "View Recipe",
      save: "Save",
      saved: "Saved",
      minutesShort: "m",
      topChefs: {
        title: "Top Chefs 👨‍🍳",
        recipesLabel: "recipes",
        followersLabel: "followers",
        modalInfo: "Top chef with {{count}} curated recipes and {{followers}} followers.",
        modalExplore: "Explore signature dishes and cooking tips from {{name}}."
      },
      search: {
        placeholder: "Search recipes...",
        title: "Title",
        category: "Category",
        ingredient: "Ingredient",
        searchButton: "Search",
        voice: "Voice search"
      },
      all: "All",
      more: "More",
      showLess: "Show Less",
      categories: {
        pizza: "🍕 Pizza",
        desserts: "🍰 Desserts",
        salads: "🥗 Salads",
        iceCream: "🍦 Ice Cream",
        soups: "🍜 Soups",
        fastFood: "🍔 Fast Food",
        meat: "🥩 Meat",
        seafood: "🐟 Seafood",
        streetFood: "🌮 Street Food",
        bakery: "🥐 Bakery"
      },
      heroTitle: "Discover Amazing Recipes",
      heroText: "Find delicious food from around the world"
      ,
      app: {
        name: "FoodVerse"
      },
      loading: {
        tag: "Discover & Share Recipes"
      },
      aiDetector: {
        title: "AI Food Detector 🤖",
        subtitle: "Upload food image and let AI detect it 😎",
        uploadLabel: "Upload Food Image 📸",
        previewAlt: "Food",
        detecting: "Detecting...",
        detect: "Detect Food 🤖",
        ingredients: "Ingredients:"
      },
      aiChat: {
        title: "AI Chef 🤖",
        placeholder: "Ask recipe ideas, substitutes or cooking tips...",
        thinking: "Thinking...",
        ask: "Ask AI",
        suggestion1: "Easy weeknight chicken recipe",
        suggestion2: "Vegetarian dinner for 2",
        suggestionLabel1: "Chicken idea",
        suggestionLabel2: "Veg dinner",
        hint: "Ask me for recipe ideas, substitutes, or cooking tips.",
        history: "History"
      },
      grocery: {
        title: "Grocery Store 🛒",
        subtitle: "Create your shopping list 😎",
        placeholder: "Add ingredient...",
        add: "Add",
        total: "Total Items:"
      },
      shopping: {
        title: "Shopping List 🛒"
      }
    }
  },
  ru: {
    translation: {
      home: "Главная",
      favorites: "Избранное",
      login: "Войти",
      create: "Создать",
      profile: "Профиль",
      logout: "Выйти",
      admin: "Админ",
      welcomeBack: "С возвращением",
      emailPlaceholder: "Email",
      passwordPlaceholder: "Пароль",
      show: "Показать",
      hide: "Скрыть",
      rememberMe: "Запомнить меня",
      forgot: "Забыли?",
      loginButton: "Войти",
      demoText: "Демо:",
      useDemo: "Использовать демо",
      noAccount: "Нет аккаунта?",
      register: "Зарегистрироваться",
      heroCTA: "Изучить рецепты",
      heroTitle: "Открой Вкусные Рецепты",
      heroText: "Находи блюда со всего мира"
      ,
      app: {
        name: "FoodVerse"
      },
      loading: {
        tag: "Открывайте и делитесь рецептами"
      },
      aiDetector: {
        title: "AI Детектор еды 🤖",
        subtitle: "Загрузите фото еды, и ИИ определит его 😎",
        uploadLabel: "Загрузить фото еды 📸",
        previewAlt: "Еда",
        detecting: "Определение...",
        detect: "Определить 🤖",
        ingredients: "Ингредиенты:"
      },
      aiChat: {
        title: "AI Шеф-повар 🤖",
        placeholder: "Спросите идеи рецептов, заменители или советы по готовке...",
        thinking: "Думаю...",
        ask: "Спросить ИИ",
        suggestion1: "Простой куриный рецепт на будни",
        suggestion2: "Вегетарианский ужин на 2",
        suggestionLabel1: "Идея с курицей",
        suggestionLabel2: "Вег ужин",
        hint: "Спросите меня о идеях рецептов, заменителях или советах по готовке.",
        history: "История"
      },
      grocery: {
        title: "Продуктовый магазин 🛒",
        subtitle: "Составьте список покупок 😎",
        placeholder: "Добавить ингредиент...",
        add: "Добавить",
        total: "Всего элементов:"
      },
      shopping: {
        title: "Список покупок 🛒"
      }
    }
  },
  kg: {
    translation: {
      home: "Башкы бет",
      favorites: "Тандалмалар",
      login: "Кирүү",
      create: "Жаратуу",
      profile: "Профиль",
      logout: "Чыгуу",
      admin: "Админ",
      welcomeBack: "Кайтарып келгенден бери",
      emailPlaceholder: "Email",
      passwordPlaceholder: "Пароль",
      show: "Көрсөт",
      hide: "Баштоо",
      rememberMe: "Мени эстеп кал",
      forgot: "Унуттуңбу?",
      loginButton: "Кирүү",
      demoText: "Демо:",
      useDemo: "Демону колдон",
      noAccount: "Аккаунт жокпу?",
      register: "Катталуу",
      heroCTA: "Рецепттерди карап чыгуу",
      heroTitle: "Даамдуу Тамактарды Тап",
      heroText: "Дүйнөдөгү тамактарды изде"
      ,
      app: { name: "FoodVerse" },
      loading: { tag: "Discover & Share Recipes" },
      aiDetector: {
        title: "AI Food Detector 🤖",
        subtitle: "Upload food image and let AI detect it 😎",
        uploadLabel: "Upload Food Image 📸",
        previewAlt: "Food",
        detecting: "Detecting...",
        detect: "Detect Food 🤖",
        ingredients: "Ingredients:"
      },
      aiChat: {
        title: "AI Chef 🤖",
        placeholder: "Ask recipe ideas, substitutes or cooking tips...",
        thinking: "Thinking...",
        ask: "Ask AI",
        suggestion1: "Easy weeknight chicken recipe",
        suggestion2: "Vegetarian dinner for 2",
        suggestionLabel1: "Chicken idea",
        suggestionLabel2: "Veg dinner",
        hint: "Ask me for recipe ideas, substitutes, or cooking tips.",
        history: "History"
      },
      grocery: {
        title: "Grocery Store 🛒",
        subtitle: "Create your shopping list 😎",
        placeholder: "Add ingredient...",
        add: "Add",
        total: "Total Items:"
      },
      shopping: { title: "Shopping List 🛒" }
    }
  },
  es: {
    translation: {
      home: "Inicio",
      favorites: "Favoritos",
      login: "Iniciar sesión",
      heroTitle: "Descubre recetas increíbles",
      heroText: "Encuentra comida deliciosa de todo el mundo",
      heroCTA: "Explorar recetas"
      ,
      app: { name: "FoodVerse" },
      loading: { tag: "Discover & Share Recipes" },
      aiDetector: {
        title: "AI Food Detector 🤖",
        subtitle: "Upload food image and let AI detect it 😎",
        uploadLabel: "Upload Food Image 📸",
        previewAlt: "Food",
        detecting: "Detecting...",
        detect: "Detect Food 🤖",
        ingredients: "Ingredients:"
      },
      aiChat: {
        title: "AI Chef 🤖",
        placeholder: "Ask recipe ideas, substitutes or cooking tips...",
        thinking: "Thinking...",
        ask: "Ask AI",
        suggestion1: "Easy weeknight chicken recipe",
        suggestion2: "Vegetarian dinner for 2",
        suggestionLabel1: "Chicken idea",
        suggestionLabel2: "Veg dinner",
        hint: "Ask me for recipe ideas, substitutes, or cooking tips.",
        history: "History"
      },
      grocery: {
        title: "Grocery Store 🛒",
        subtitle: "Create your shopping list 😎",
        placeholder: "Add ingredient...",
        add: "Add",
        total: "Total Items:"
      },
      shopping: { title: "Shopping List 🛒" }
    }
  },
  fr: {
    translation: {
      home: "Accueil",
      favorites: "Favoris",
      login: "Connexion",
      heroTitle: "Découvrez des recettes étonnantes",
      heroText: "Trouvez de délicieux plats du monde entier",
      heroCTA: "Explorer les recettes"
      ,
      app: { name: "FoodVerse" },
      loading: { tag: "Discover & Share Recipes" },
      aiDetector: {
        title: "AI Food Detector 🤖",
        subtitle: "Upload food image and let AI detect it 😎",
        uploadLabel: "Upload Food Image 📸",
        previewAlt: "Food",
        detecting: "Detecting...",
        detect: "Detect Food 🤖",
        ingredients: "Ingredients:"
      },
      aiChat: {
        title: "AI Chef 🤖",
        placeholder: "Ask recipe ideas, substitutes or cooking tips...",
        thinking: "Thinking...",
        ask: "Ask AI",
        suggestion1: "Easy weeknight chicken recipe",
        suggestion2: "Vegetarian dinner for 2",
        suggestionLabel1: "Chicken idea",
        suggestionLabel2: "Veg dinner",
        hint: "Ask me for recipe ideas, substitutes, or cooking tips.",
        history: "History"
      },
      grocery: {
        title: "Grocery Store 🛒",
        subtitle: "Create your shopping list 😎",
        placeholder: "Add ingredient...",
        add: "Add",
        total: "Total Items:"
      },
      shopping: { title: "Shopping List 🛒" }
    }
  },
  de: {
    translation: {
      home: "Startseite",
      favorites: "Favoriten",
      login: "Anmelden",
      heroTitle: "Entdecke fantastische Rezepte",
      heroText: "Finde leckeres Essen aus aller Welt",
      heroCTA: "Rezepte entdecken"
      ,
      app: { name: "FoodVerse" },
      loading: { tag: "Discover & Share Recipes" },
      aiDetector: {
        title: "AI Food Detector 🤖",
        subtitle: "Upload food image and let AI detect it 😎",
        uploadLabel: "Upload Food Image 📸",
        previewAlt: "Food",
        detecting: "Detecting...",
        detect: "Detect Food 🤖",
        ingredients: "Ingredients:"
      },
      aiChat: {
        title: "AI Chef 🤖",
        placeholder: "Ask recipe ideas, substitutes or cooking tips...",
        thinking: "Thinking...",
        ask: "Ask AI",
        suggestion1: "Easy weeknight chicken recipe",
        suggestion2: "Vegetarian dinner for 2",
        suggestionLabel1: "Chicken idea",
        suggestionLabel2: "Veg dinner",
        hint: "Ask me for recipe ideas, substitutes, or cooking tips.",
        history: "History"
      },
      grocery: {
        title: "Grocery Store 🛒",
        subtitle: "Create your shopping list 😎",
        placeholder: "Add ingredient...",
        add: "Add",
        total: "Total Items:"
      },
      shopping: { title: "Shopping List 🛒" }
    }
  },
  it: {
    translation: {
      home: "Home",
      favorites: "Preferiti",
      login: "Accedi",
      heroTitle: "Scopri ricette straordinarie",
      heroText: "Trova cibo delizioso da tutto il mondo",
      heroCTA: "Esplora ricette"
      ,
      app: { name: "FoodVerse" },
      loading: { tag: "Discover & Share Recipes" },
      aiDetector: {
        title: "AI Food Detector 🤖",
        subtitle: "Upload food image and let AI detect it 😎",
        uploadLabel: "Upload Food Image 📸",
        previewAlt: "Food",
        detecting: "Detecting...",
        detect: "Detect Food 🤖",
        ingredients: "Ingredients:"
      },
      aiChat: {
        title: "AI Chef 🤖",
        placeholder: "Ask recipe ideas, substitutes or cooking tips...",
        thinking: "Thinking...",
        ask: "Ask AI",
        suggestion1: "Easy weeknight chicken recipe",
        suggestion2: "Vegetarian dinner for 2",
        suggestionLabel1: "Chicken idea",
        suggestionLabel2: "Veg dinner",
        hint: "Ask me for recipe ideas, substitutes, or cooking tips.",
        history: "History"
      },
      grocery: {
        title: "Grocery Store 🛒",
        subtitle: "Create your shopping list 😎",
        placeholder: "Add ingredient...",
        add: "Add",
        total: "Total Items:"
      },
      shopping: { title: "Shopping List 🛒" }
    }
  },
  pt: {
    translation: {
      home: "Início",
      favorites: "Favoritos",
      login: "Entrar",
      heroTitle: "Descubra receitas incríveis",
      heroText: "Encontre comidas deliciosas de todo o mundo",
      heroCTA: "Explorar receitas"
      ,
      app: { name: "FoodVerse" },
      loading: { tag: "Discover & Share Recipes" },
      aiDetector: {
        title: "AI Food Detector 🤖",
        subtitle: "Upload food image and let AI detect it 😎",
        uploadLabel: "Upload Food Image 📸",
        previewAlt: "Food",
        detecting: "Detecting...",
        detect: "Detect Food 🤖",
        ingredients: "Ingredients:"
      },
      aiChat: {
        title: "AI Chef 🤖",
        placeholder: "Ask recipe ideas, substitutes or cooking tips...",
        thinking: "Thinking...",
        ask: "Ask AI",
        suggestion1: "Easy weeknight chicken recipe",
        suggestion2: "Vegetarian dinner for 2",
        suggestionLabel1: "Chicken idea",
        suggestionLabel2: "Veg dinner",
        hint: "Ask me for recipe ideas, substitutes, or cooking tips.",
        history: "History"
      },
      grocery: {
        title: "Grocery Store 🛒",
        subtitle: "Create your shopping list 😎",
        placeholder: "Add ingredient...",
        add: "Add",
        total: "Total Items:"
      },
      shopping: { title: "Shopping List 🛒" }
    }
  },
  zh: {
    translation: {
      home: "首页",
      favorites: "收藏",
      login: "登录",
      heroTitle: "发现惊人的食谱",
      heroText: "找到来自世界各地的美味食物",
      heroCTA: "探索食谱"
      ,
      app: { name: "FoodVerse" },
      loading: { tag: "Discover & Share Recipes" },
      aiDetector: {
        title: "AI Food Detector 🤖",
        subtitle: "Upload food image and let AI detect it 😎",
        uploadLabel: "Upload Food Image 📸",
        previewAlt: "Food",
        detecting: "Detecting...",
        detect: "Detect Food 🤖",
        ingredients: "Ingredients:"
      },
      aiChat: {
        title: "AI Chef 🤖",
        placeholder: "Ask recipe ideas, substitutes or cooking tips...",
        thinking: "Thinking...",
        ask: "Ask AI",
        suggestion1: "Easy weeknight chicken recipe",
        suggestion2: "Vegetarian dinner for 2",
        suggestionLabel1: "Chicken idea",
        suggestionLabel2: "Veg dinner",
        hint: "Ask me for recipe ideas, substitutes, or cooking tips.",
        history: "History"
      },
      grocery: {
        title: "Grocery Store 🛒",
        subtitle: "Create your shopping list 😎",
        placeholder: "Add ingredient...",
        add: "Add",
        total: "Total Items:"
      },
      shopping: { title: "Shopping List 🛒" }
    }
  },
  ja: {
    translation: {
      home: "ホーム",
      favorites: "お気に入り",
      login: "ログイン",
      heroTitle: "素晴らしいレシピを見つけよう",
      heroText: "世界中のおいしい料理を見つける",
      heroCTA: "レシピを見る"
      ,
      app: { name: "FoodVerse" },
      loading: { tag: "Discover & Share Recipes" },
      aiDetector: {
        title: "AI Food Detector 🤖",
        subtitle: "Upload food image and let AI detect it 😎",
        uploadLabel: "Upload Food Image 📸",
        previewAlt: "Food",
        detecting: "Detecting...",
        detect: "Detect Food 🤖",
        ingredients: "Ingredients:"
      },
      aiChat: {
        title: "AI Chef 🤖",
        placeholder: "Ask recipe ideas, substitutes or cooking tips...",
        thinking: "Thinking...",
        ask: "Ask AI",
        suggestion1: "Easy weeknight chicken recipe",
        suggestion2: "Vegetarian dinner for 2",
        suggestionLabel1: "Chicken idea",
        suggestionLabel2: "Veg dinner",
        hint: "Ask me for recipe ideas, substitutes, or cooking tips.",
        history: "History"
      },
      grocery: {
        title: "Grocery Store 🛒",
        subtitle: "Create your shopping list 😎",
        placeholder: "Add ingredient...",
        add: "Add",
        total: "Total Items:"
      },
      shopping: { title: "Shopping List 🛒" }
    }
  },
  hi: {
    translation: {
      home: "मुख्यपृष्ठ",
      favorites: "पसंदीदा",
      login: "लॉगिन",
      heroTitle: "अद्भुत व्यंजन खोजें",
      heroText: "दुनिया भर के स्वादिष्ट व्यंजन खोजें",
      heroCTA: "रेसिपी देखें"
      ,
      app: { name: "FoodVerse" },
      loading: { tag: "Discover & Share Recipes" },
      aiDetector: {
        title: "AI Food Detector 🤖",
        subtitle: "Upload food image and let AI detect it 😎",
        uploadLabel: "Upload Food Image 📸",
        previewAlt: "Food",
        detecting: "Detecting...",
        detect: "Detect Food 🤖",
        ingredients: "Ingredients:"
      },
      aiChat: {
        title: "AI Chef 🤖",
        placeholder: "Ask recipe ideas, substitutes or cooking tips...",
        thinking: "Thinking...",
        ask: "Ask AI",
        suggestion1: "Easy weeknight chicken recipe",
        suggestion2: "Vegetarian dinner for 2",
        suggestionLabel1: "Chicken idea",
        suggestionLabel2: "Veg dinner",
        hint: "Ask me for recipe ideas, substitutes, or cooking tips.",
        history: "History"
      },
      grocery: {
        title: "Grocery Store 🛒",
        subtitle: "Create your shopping list 😎",
        placeholder: "Add ingredient...",
        add: "Add",
        total: "Total Items:"
      },
      shopping: { title: "Shopping List 🛒" }
    }
  },
  ar: {
    translation: {
      home: "الصفحة الرئيسية",
      favorites: "المفضلات",
      login: "تسجيل الدخول",
      heroTitle: "اكتشف وصفات رائعة",
      heroText: "اعثر على أطعمة لذيذة من جميع أنحاء العالم",
      heroCTA: "استكشاف الوصفات"
      ,
      app: { name: "FoodVerse" },
      loading: { tag: "Discover & Share Recipes" },
      aiDetector: {
        title: "AI Food Detector 🤖",
        subtitle: "Upload food image and let AI detect it 😎",
        uploadLabel: "Upload Food Image 📸",
        previewAlt: "Food",
        detecting: "Detecting...",
        detect: "Detect Food 🤖",
        ingredients: "Ingredients:"
      },
      aiChat: {
        title: "AI Chef 🤖",
        placeholder: "Ask recipe ideas, substitutes or cooking tips...",
        thinking: "Thinking...",
        ask: "Ask AI",
        suggestion1: "Easy weeknight chicken recipe",
        suggestion2: "Vegetarian dinner for 2",
        suggestionLabel1: "Chicken idea",
        suggestionLabel2: "Veg dinner",
        hint: "Ask me for recipe ideas, substitutes, or cooking tips.",
        history: "History"
      },
      grocery: {
        title: "Grocery Store 🛒",
        subtitle: "Create your shopping list 😎",
        placeholder: "Add ingredient...",
        add: "Add",
        total: "Total Items:"
      },
      shopping: { title: "Shopping List 🛒" }
    }
  },
  tr: {
    translation: {
      home: "Ana Sayfa",
      favorites: "Favoriler",
      login: "Giriş",
      heroTitle: "Harika Tarifler Keşfedin",
      heroText: "Dünyanın dört bir yanından lezzetli yemekler bulun",
      heroCTA: "Tarifleri Keşfet"
      ,
      app: { name: "FoodVerse" },
      loading: { tag: "Discover & Share Recipes" },
      aiDetector: {
        title: "AI Food Detector 🤖",
        subtitle: "Upload food image and let AI detect it 😎",
        uploadLabel: "Upload Food Image 📸",
        previewAlt: "Food",
        detecting: "Detecting...",
        detect: "Detect Food 🤖",
        ingredients: "Ingredients:"
      },
      aiChat: {
        title: "AI Chef 🤖",
        placeholder: "Ask recipe ideas, substitutes or cooking tips...",
        thinking: "Thinking...",
        ask: "Ask AI",
        suggestion1: "Easy weeknight chicken recipe",
        suggestion2: "Vegetarian dinner for 2",
        suggestionLabel1: "Chicken idea",
        suggestionLabel2: "Veg dinner",
        hint: "Ask me for recipe ideas, substitutes, or cooking tips.",
        history: "History"
      },
      grocery: {
        title: "Grocery Store 🛒",
        subtitle: "Create your shopping list 😎",
        placeholder: "Add ingredient...",
        add: "Add",
        total: "Total Items:"
      },
      shopping: { title: "Shopping List 🛒" }
    }
  }
}


// NOTE: default language temporarily set to 'ru' for verification.
i18n.use(initReactI18next).init({
  resources,
  lng: "ru",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
})

export default i18n