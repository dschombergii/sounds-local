import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { StylesProvider } from "@material-ui/core/styles";
import './App.css'

import { SongProvider } from './context/SongContext'

import Router from './Router'
import Navigation from './components/app/Navigation'

function App() {

  return (
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
  )
}

export default App;