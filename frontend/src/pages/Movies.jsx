import React, { useEffect, useState } from 'react'
import { Banner } from '../cmps/Banner'
import { ModalMovie } from '../cmps/ModalMovie'
import { MoveiList } from '../cmps/MoveiList'
import { moveiService } from '../services/movieService'

export function Movies() {
    const [moviesList, setMoviesList] = useState([])
    const [movieModal, setMovieModal] = useState({})
    const [openModal, setOpenModal] = useState(false)
    useEffect(() => {
        filterRequests()
    }, [])

    async function filterRequests() {
        const requests = await moveiService.getRequests()
        console.log('requests is:', requests);
        const moviesList = requests.filter(req => {
            return req.url.includes('/movie')

        })
        console.log('tvList is:', moviesList);
        setMoviesList(moviesList)
    }

    function toggleModal(movie) {
        setMovieModal(movie)
        setOpenModal(!openModal)
    }
    return (
        <div>
            <Banner type={'movie'} />
            <div className="row-container">
                {moviesList.map((tvMovie, idx) => {
                    return <MoveiList
                        key={idx}
                        idx={idx}
                        toggleModal={toggleModal}
                        request={tvMovie}
                    />
                })}
                {openModal &&
                    <ModalMovie movie={movieModal} setOpenModal={setOpenModal} />
                }
                {openModal && <div onClick={() => toggleModal(false)} className="screen"></div>}
            </div>
        </div>
    )
}
