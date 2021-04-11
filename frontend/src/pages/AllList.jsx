import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Banner } from '../cmps/Banner'
import { ModalMovie } from '../cmps/ModalMovie'
import { MoveiList } from '../cmps/MoveiList'
import { moveiService } from '../services/movieService'
import { storageService } from '../services/storageService'

export function AllList() {
    const { user, profile } = useSelector(state => state.userModule)
    const history = useHistory()
    const [movieModal, setMovieModal] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const [requests, setRequests] = useState([])


    useEffect(() => {
        if (!user) {
            var userFromStorge = storageService.loadFromStorage('User')
            return userFromStorge
            // history.push('/')
            // return console.log('user is:', user);
        }
        getRequests()

    }, [history, user, profile])
    function getRequests() {
        const requests = moveiService.getRequests()
        setRequests(requests)
    }

    function toggleModal(movie) {
        setMovieModal(movie)
        setOpenModal(!openModal)
    }
    return (
        <div >
            <Banner />
            <div className="bgc-black">
            </div>
            <div className="row-container">
                {requests.map((req, idx) => {
                    return <MoveiList
                        key={idx}
                        idx={idx}
                        toggleModal={toggleModal}
                        request={req}
                    />
                })}
            </div>
            {openModal &&
                <ModalMovie movie={movieModal} setOpenModal={setOpenModal} />
            }
            {openModal && <div onClick={() => toggleModal(false)} className="screen"></div>}

        </div>
    )
}
