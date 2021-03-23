import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Home } from './components/app/Home'
import { Listen } from './components/app/Listen'

function Router() {
    return (
        <Switch>
            {/* App */}
            <Route exact path="/" component={Home} />
            <Route path="/listen/:city" component={Listen} />
        </Switch>
    )
}

export default Router