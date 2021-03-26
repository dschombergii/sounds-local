import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Home } from './components/app/Home'

export const Router = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
        </Switch>
    )
}