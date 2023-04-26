import React from 'react'
import {BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import {useRoutes} from './routes'
import { AuthContext } from './AuthContext'
import { useAuth } from './auth.hook'

function App() {
  
  const {login, logout, token, userId, isReady} = useAuth()
  const isLogin = !!token
  const routes = useRoutes(isLogin)
 

  return (
    <AuthContext.Provider value={{login, logout, token, userId, isReady,isLogin}}>
      <BrowserRouter> 
      <Navbar/>
       {routes}
      </BrowserRouter> 
    </AuthContext.Provider>
  )
}

export default App



