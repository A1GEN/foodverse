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

        heroTitle:
          "Даамдуу Тамактарды Тап",

        heroText:
          "Дүйнөдөгү тамактарды изде"

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