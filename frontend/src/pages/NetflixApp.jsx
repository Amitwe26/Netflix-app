import React from 'react'
import { Home } from './Home'
import { Profiles } from './Profiles'
import { Register } from './Register'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";


export default function NetflixApp() {

    return (
        <Router>
            <div className="netflix-app">
                {/* {netflixId && */}
                <Switch>
                    <Route path="/profile/:id" component={Home} />
                    <Route path="/user" component={Profiles} />
                    <Route path="/" component={Register} />
                </Switch>
                {/* } */}

            </div>
        </Router>

    )
}
