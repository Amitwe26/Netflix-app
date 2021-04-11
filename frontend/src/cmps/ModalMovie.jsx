import React, { useEffect } from 'react'

const BASE_URL_IMG = 'https://image.tmdb.org/t/p/original'

export function ModalMovie({ movie, setOpenModal }) {
    console.log('movie is:', movie);
    useEffect(() => {
        window.addEventListener('scroll', closeModal)
        return () => window.removeEventListener('scroll', closeModal)
    }, [])

    const closeModal = () => {
        if (window.scrollY) {
            const close = setInterval(() => {
                setOpenModal(false)
                clearInterval(close)
            }, 500)
        }
        else setOpenModal(true)
    }

    return (
        <div className="modal-movie">
            <img className="img-modal" src={`${BASE_URL_IMG}${movie.backdrop_path}`} alt="" />
            <div className="info">
                <div className="top flex">
                    <div className="left-btn">
                        <button title="Options">▼</button>
                    </div>
                    <div>
                        <button title="Unlike">✘</button>
                        <button title="Like">✓</button>
                        <button title="Add">+</button>
                        <button title="Play">➤</button>
                    </div>
                </div>
                <div className="bottom">
                    <h2>{movie.title || movie.name}</h2>
                    <p className="over-view">{movie.overview}</p>
                    <p>{movie.release_date || movie.first_air_date}</p>
                    <p>{movie.media_type}</p>
                </div>
            </div>
        </div>
    )
}
