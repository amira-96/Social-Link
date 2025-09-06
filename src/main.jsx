import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css'
import AuthContextProveder from './Context/authcontex.jsx'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { AppBlurProvider } from './Context/AppBlurContext.jsx'

const queryclient= new QueryClient()



createRoot(document.getElementById('root')).render(

 <QueryClientProvider client={queryclient}>   
     <StrictMode>
    <HeroUIProvider>

    <AuthContextProveder>
      <AppBlurProvider>
      <ToastProvider placement='top-right'/>
      <App/>
      </AppBlurProvider>

    </AuthContextProveder>
    </HeroUIProvider>

  </StrictMode>, </QueryClientProvider>

)
