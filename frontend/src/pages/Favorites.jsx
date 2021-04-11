import React, { useEffect } from 'react'
import { Banner } from '../cmps/Banner'
import { storageService } from '../services/storageService'

export function Favorites() {
    useEffect(() => {
        const myListFavorites = storageService.loadFromStorage('profile')
        console.log('myListFavorites is:', myListFavorites.movies);
    }, [])
    return (
        <div>
            <Banner type={'movie'} />
            <h1>hey im the favo</h1>
        </div>
    )
}
