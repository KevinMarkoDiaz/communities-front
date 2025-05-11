import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AppRouter from './routes/AppRouter'

import { Provider } from 'react-redux'
import { store } from './store/store'

import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <AppRouter />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>,
)

