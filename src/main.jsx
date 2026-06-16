import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ThemeProvider from './context/ThemeContext.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "./i18n/i18n"
import LikesProvider from './context/LikesContext/LikesContext'
import FavoritesProvider from './context/FavoritesContext/FavoritesContext.jsx'
import AuthProvider from './context/AuthContext/AuthContext.jsx'
  import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import store from './redux/store'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <FavoritesProvider>
              <LikesProvider>
                <App />
                <ToastContainer />
              </LikesProvider>
            </FavoritesProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)

//             </LikesProvider>
//         </FavoritesProvider>
//     </ThemeProvider>
//   </StrictMode>,
// )
