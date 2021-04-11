import React from 'react'
import { NavBar } from '../cmps/NavBar.jsx'
import { useDispatch } from 'react-redux'
import { setProfile } from '../store/actions/UserAction.js'
import { Route, Switch } from 'react-router'
import { TvShow } from './TvShow';
import { Movies } from './Movies';
import { AllList } from './AllList.jsx'
import { Favorites } from './Favorites.jsx'

export function Home() {
    const dispatch = useDispatch()

    function onChangeProfile(profile) {
        dispatch(setProfile(profile))
    }

    return (
        <div className="home-page">
            <NavBar onChangeProfile={onChangeProfile} />
            <Switch>
                <Route path="/profile/:id/tv-show" component={TvShow} />
                <Route path="/profile/:id/movies" component={Movies} />
                <Route path="/profile/:id/my-list" component={Favorites} />
                <Route path="/profile/:id" component={AllList} />
            </Switch>

        </div>
    )
}
