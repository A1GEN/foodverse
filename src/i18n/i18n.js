import i18n from "i18next"

import {
  initReactI18next
} from "react-i18next"

i18n.use(initReactI18next).init({

  resources: {

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
        classicDescription: "Our culinary site is a big cookbook: thousands of recipes with photos, step-by-step instructions and helpful tips. Convenient search by types and topics helps to quickly find the desired dish.",
        discover: {
          chefTitle: "Chef's recommendation: Warm seafood pasta",
          chefText: "Tender seafood, tomato sauce and crispy herbs — a quick and impressive dinner.",
          cta: "View recipes"
        },
        popularCategories: "Popular categories",
        viewRecipe: "View Recipe",
        save: "Save",
        saved: "Saved",
        minutesShort: "m"
          popularCategories: "Популярные категории",
          viewRecipe: "Посмотреть рецепт",
          save: "Сохранить",
          saved: "Сохранено",
          minutesShort: "м"
          popularCategories: "Популярдуу категориялар",
          viewRecipe: "Рецептти көрүү",
          save: "Сактоо",
          saved: "Сакталды",
          minutesShort: "м"
        topChefs: {
          title: "Top Chefs 👨‍🍳",
          recipesLabel: "recipes",
          followersLabel: "followers",
          modalInfo: "Top chef with {{count}} curated recipes and {{followers}} followers.",
          modalExplore: "Explore signature dishes and cooking tips from {{name}}."
        },
                topChefs: {
                  title: "Top Chefs 👨‍🍳",
                  recipesLabel: "рецепты",
                  followersLabel: "подписчики",
                  modalInfo: "Шеф с {{count}} отобранными рецептами и {{followers}} подписчиками.",
                  modalExplore: "Изучите фирменные блюда и кулинарные советы от {{name}}."
                },
                topChefs: {
                  title: "Top Chefs 👨‍🍳",
                  recipesLabel: "рецепттер",
                  followersLabel: "изилдөөчүлөр",
                  modalInfo: "Шеф {{count}} асыл рецепттер жана {{followers}} көз салуучулар менен.",
                  modalExplore: "{{name}} тарабынан тандалган даамдар жана бышыруу кеңештерин караңыз."
                },
        search: {
          placeholder: "Search recipes...",
          title: "Title",
          category: "Category",
          ingredient: "Ingredient",
          searchButton: "Search",
          voice: "Voice search"
        },
                        search: {
                          placeholder: "Искать рецепты...",
                          title: "Название",
                          category: "Категория",
                          ingredient: "Ингредиент",
                          searchButton: "Поиск",
                          voice: "Голосовой поиск"
                        },
                        search: {
                          placeholder: "Рецепттерди издөө...",
                          title: "Аталышы",
                          category: "Категория",
                          ingredient: "Ингредиент",
                          searchButton: "Издөө",
                          voice: "Дыбыс издөө"
                        },
                chips: {
                  favorites: "Добавить в избранное",
                  recipes: "Рецепты",
                  articles: "Статьи",
                  ourKitchen: "Наша Кухня",
                  superSearch: "Супер Поиск",
                  newsletters: "Рассылки",
                  addRecipe: "Добавить рецепт"
                },
                classicTitle: "Рецепты по типам блюд",
                classicDescription: "Наш кулинарный сайт — большая книга рецептов: тысячи рецептов с фото, пошаговыми инструкциями и полезными советами. Удобный поиск по типам и темам поможет быстро найти нужное блюдо.",
                discover: {
                  chefTitle: "Рекомендация шефа: Тёплая паста с морепродуктами",
                  chefText: "Нежные морепродукты, томатный соус и хрустящие травы — быстрый и эффектный ужин.",
                  cta: "Посмотреть рецепты"
                },
                chips: {
                  favorites: "Избранное",
                  recipes: "Рецепттер",
                  articles: "Макалалар",
                  ourKitchen: "Биздин ашкана",
                  superSearch: "Супер Издөө",
                  newsletters: "Жарыялар",
                  addRecipe: "Рецепт кошуу"
                },
                classicTitle: "Табылгалар боюнча рецепттер",
                classicDescription: "Биздин кулинардык сайт — чоң рецепттер китеби: миңдеген рецепттер сүрөттөрү, кадам-кадам көрсөтмөлөрү жана пайдалуу кеңештери менен. Тема жана түр боюнча ыңгайлуу издөө керектүү табылды тез табууга жардам берет.",
                discover: {
                  chefTitle: "Шефтин сунушу: Жылуу деңиз азыктары менен паста",
                  chefText: "Жумшак деңиз азыктары, помидор соусу жана хрустящий чөптөр — ылдам жана таасирдүү кечки тамак.",
                  cta: "Рецепттерди көрүү"
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
        }
        all: "Все",
        more: "Ещё",
        showLess: "Свернуть",
        categories: {
          pizza: "🍕 Пицца",
          desserts: "🍰 Десерты",
          salads: "🥗 Салаты",
          iceCream: "🍦 Мороженое",
          soups: "🍜 Супы",
          fastFood: "🍔 Фастфуд",
          meat: "🥩 Мясо",
          seafood: "🐟 Морепродукты",
          streetFood: "🌮 Уличная еда",
          bakery: "🥐 Выпечка"
        }
        all: "Бардыгы",
        more: "Көбүрөөк",
        showLess: "Азайтуу",
        categories: {
          pizza: "🍕 Пицца",
          desserts: "🍰 Десерттер",
          salads: "🥗 Салаттар",
          iceCream: "🍦 Мороженое",
          soups: "🍜 Шорпалар",
          fastFood: "🍔 Фастфуд",
          meat: "🥩 Эт",
          seafood: "🐟 Деңиз азыктары",
          streetFood: "🌮 Уличная тамак",
          bakery: "🥐 Пишири"
        }

        heroTitle:
          "Discover Amazing Recipes",

        heroText:
          "Find delicious food from around the world"

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

        heroTitle:
          "Открой Вкусные Рецепты",

        heroText:
          "Находи блюда со всего мира"

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

        heroTitle:
          "Даамдуу Тамактарды Тап",

        heroText:
          "Дүйнөдөгү тамактарды изде"

      }
    }

    ,es: {
      translation: {
        home: "Inicio",
        favorites: "Favoritos",
        login: "Iniciar sesión",
        heroTitle: "Descubre recetas increíbles",
        heroText: "Encuentra comida deliciosa de todo el mundo",
        heroCTA: "Explorar recetas"
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
      }
    }

  },

  lng:"en",

  fallbackLng:"en",

  interpolation:{
    escapeValue:false
  }

})

export default i18n