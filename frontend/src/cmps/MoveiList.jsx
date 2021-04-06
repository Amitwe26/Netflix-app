import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { moveiService } from '../services/movieService'
// import { setMovies } from '../store/actions/MovieAction'

const BASE_URL_IMG = 'https://image.tmdb.org/t/p/original'


export function MoveiList({ request, toggleModal, idx }) {

    // const { movies } = useSelector(state => state.moviesModule)
    const { filterBy } = useSelector(state => state.userModule)
    // const dispatch = useDispatch()

    const [movies, setMovies] = useState([])
    const [highRow, sethigtRow] = useState(false)

    useEffect(() => {
        getMovies()
        if (movies) {
            (idx === 0 || idx === 3) ? sethigtRow(true) : sethigtRow(false)
        }
    }, [])

    async function getMovies() {
        const { title, url } = request
        // dispatch(setMovies(title, url))
        let movies = await moveiService.getMovies(title, url)
        setMovies(movies)
    }


    return (
        <div >
            <p>{request.title}</p>
            <div className="row-movie">
                {movies?.map(movie => {
                    return <img
                        key={movie.id}
                        onClick={() => toggleModal(movie)}
                        className={`${highRow ? 'highRow' : 'lowerRow'}`}
                        src={`${BASE_URL_IMG}${highRow ? movie.poster_path : movie.backdrop_path}`} alt="" />
                })}
            </div>
        </div>
    )
}
