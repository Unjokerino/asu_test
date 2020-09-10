import React from 'react'
import {
    Switch,
    Route,
} from "react-router-dom";

import Home from '../views/Home'
import About from '../views/About'

export default function Routes() {
    return (
        <Switch>
            <Route path="/about">
                <About />
            </Route>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
    )
}