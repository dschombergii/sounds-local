import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { StylesProvider } from "@material-ui/core/styles";
import './App.css'

import { SongProvider } from './context/SongContext'
import firebase, { FirebaseContext } from './firebase'

import { Router } from './Router'
import { Navigation } from './components/app/Navigation'
import { useAuth } from './components/auth/useAuth'

function App() {
  const user = useAuth()

  return (
    <FirebaseContext.Provider value={{ user, firebase }}>
      <SongProvider>
        <StylesProvider injectFirst>
          <BrowserRouter>
            <Navigation />
            <div className="App">
              <Router />
            </div>
          </BrowserRouter >
        </StylesProvider>
      </SongProvider>
    </FirebaseContext.Provider>
  )
}

export default App;