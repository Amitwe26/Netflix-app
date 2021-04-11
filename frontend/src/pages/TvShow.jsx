import React, { useEffect, useState } from 'react'
import { Banner } from '../cmps/Banner'
import { ModalMovie } from '../cmps/ModalMovie'
import { MoveiList } from '../cmps/MoveiList'
import { moveiService } from '../services/movieService'

export function TvShow() {
    const [tvList, setTvList] = useState([])
    const [movieModal, setMovieModal] = useState({})
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        filterRequests()
    }, [])

    async function filterRequests() {
        const requests = await moveiService.getRequests()
        console.log('requests is:', requests);
        const tvList = requests.filter(req => {
            return req.url.includes('/tv')

        })
        console.log('tvList is:', tvList);
        setTvList(tvList)
    }

    function toggleModal(movie) {
        setMovieModal(movie)
        setOpenModal(!openModal)
    }
    return (
        <div className="tv-show-page">
            <Banner type={'tv-show'} />
            <div className="row-container">
                {tvList.map((tvMovie, idx) => {
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
