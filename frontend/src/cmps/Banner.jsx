import React, { useEffect, useState } from 'react'
import { moveiService } from '../services/movieService'

export function Banner() {
    const [movie, setmovie] = useState('')
    console.log('movie banner is:', movie);
    useEffect(() => {
        getBannerImg()
    }, [])

    async function getBannerImg() {
        const resulte = await moveiService.queryMoviesToBanner()
        const num = Math.floor(Math.random() * (49 - 0) + 0)
        const movieToBanner = resulte.items[num]
        setmovie(movieToBanner)
    }

    return (
        // <section className="header">
        <header
            className="banner"
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` }}
        >
            <div className="banner-info">
                <span>{movie.title}</span>
                <p>{movie.overview}
                </p>
                <button className="play-movie">Play</button>
                <button className="details-movie">Details</button>
            </div>

        </header >

        // </section>
    )
}
