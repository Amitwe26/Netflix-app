import React, { useEffect, useState } from 'react'
import { Banner } from '../cmps/Banner.jsx'
import { MoveiList } from '../cmps/MoveiList.jsx'
import { NavBar } from '../cmps/NavBar.jsx'
import { ModalMovie } from '../cmps/ModalMovie'
import { moveiService } from '../services/movieService'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { storageService } from '../services/storageService.js'
import { setProfile } from '../store/actions/UserAction.js'

export function Home() {

    const { user, filterBy } = useSelector(state => state.userModule)

    const [movieModal, setMovieModal] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const [requests, setRequests] = useState([])
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!user) {
            var userFromStorge = storageService.loadFromStorage('User')
            return userFromStorge
            // history.push('/')
            // return console.log('user is:', user);
        }
        getRequests()

    }, [history, user])

    useEffect(() => {
        setFilterOnMovies({ ...filterBy });
    }, [filterBy])

    function getRequests() {
        const requests = moveiService.getRequests()
        setRequests(requests)
    }



    async function setFilterOnMovies(title, url, filterBy) {
        // const movies = await moveiService.getMovies(title, url, filterBy)
    }
    function onChangeProfile(profile) {
        dispatch(setProfile(profile))

    }

    function toggleModal(movie) {
        setMovieModal(movie)
        setOpenModal(!openModal)
    }

    return (
        <div className="home-page">
            <NavBar onChangeProfile={onChangeProfile} />
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

            </div>

            {openModal &&
                <ModalMovie movie={movieModal} setOpenModal={setOpenModal} />
            }
            {openModal && <div onClick={() => toggleModal(false)} className="screen"></div>}

        </div>
    )
}
