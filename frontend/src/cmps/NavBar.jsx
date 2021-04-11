/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { storageService } from '../services/storageService'
import { setFilter } from '../store/actions/MovieAction'
// import { setFilter } from '../store/actions/MovieAction'
import { FilterMovie } from './FilterMovie'
import { UsersModal } from './UsersModal'
import blue from '../assets/img/blue.png'
import red from '../assets/img/red.png'
import yellow from '../assets/img/yellow.png'
import green from '../assets/img/green.png'

export function NavBar({ onChangeProfile }) {
    const { user, profile, profiles } = useSelector(state => state.userModule)
    const [profilesWithFilter, setProfilesWithFilter] = useState([])
    const [profileFromStorge, setProfileFromStorge] = useState({})
    const [profilesFromStorge, setProfilesFromStorge] = useState([])
    const dispatch = useDispatch()

    const [scroll, setscroll] = useState(false)
    const [profilesModal, setProfilesModal] = useState(false)
    const history = useHistory()

    useEffect(() => {
        window.addEventListener('scroll', showNav)
        return () => window.removeEventListener('scroll', showNav)
    }, [])

    useEffect(() => {
        const profileFromStorge = storageService.loadFromStorage('profile')
        const profilesFromStorge = storageService.loadFromStorage('profiles')
        setProfileFromStorge(profileFromStorge)
        setProfilesFromStorge(profilesFromStorge)
    }, [profiles, user])

    useEffect(() => {
    }, [profile])

    const filterProfiles = (profileId) => {
        // if (!profileId) {
        //     const newProfiles = profilesFromStorge.filter(profile => profile.id !== profileFromStorge)
        //     return newProfiles
        // } else {
        const newProfiles = profilesFromStorge.filter(profile => profile.id !== profileId)
        return newProfiles
        // }
    }

    const showNav = () => {
        if (window.scrollY > 30) setscroll(true)
        else setscroll(false)
    }

    const openModal = (profileId) => {
        // console.log('profileId is:', profileId);
        if (!profileId) {
            console.log('profilesFromStorge is:', profileFromStorge);
            const usersWithFilter = filterProfiles(profileFromStorge.id)
            setProfilesWithFilter(usersWithFilter)
        } else {
            const usersWithFilter = filterProfiles(profileId)
            setProfilesWithFilter(usersWithFilter)
        }
        setProfilesModal(!profilesModal)
    }

    function setAvatarPicture(color) {
        if (color === 'Blue') {
            return blue
        }
        if (color === 'Yellow') {
            return yellow
        }
        if (color === 'Red') {
            return red
        }
        if (color === 'Green') {
            return green
        }
    }
    function changeProfile(profile) {
        onChangeProfile(profile)
        setProfilesModal(false)

    }
    const onSetFilter = filterBy => dispatch(setFilter(filterBy))
    // const onSetFilter = (filterBy) => {
    //     dispatch(setFilter(filterBy))
    // setFilterOnMovies(filterBy)
    // }
    //
    // function toggleHoverMouse() {
    //     console.log('amit is:');
    // }
    return (
        <div className={`nav-bar ${(scroll) ? 'nav-black' : ''}`}>
            <div className="nav-content">
                <div className="left-nav">
                    <img
                        onClick={() => history.push('/user')}
                        className="nav-logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                        alt=""
                    />
                    <Link to={`/profile/${profile?.id || profileFromStorge?.id}`}> Home page</Link>
                    <Link to={`/profile/${profile?.id || profileFromStorge?.id}/tv-show`}> TV shows </Link>
                    <Link to={`/profile/${profile?.id || profileFromStorge?.id}/movies`}> Movies</Link>
                    <a > News & Popular</a>
                    <Link to={`/profile/${profile?.id || profileFromStorge?.id}/my-list`}> My list</Link>
                </div>
                <div className=" right-nav" >
                    {/* <FilterMovie onSetFilter={onSetFilter} /> */}
                    <div className="flex align-center" onClick={() => openModal(profile.id)}>

                        <img

                            // onMouseEnter={() => setUsersModal(!usersModal)}
                            // onMouseOut={() => toggleHoverMouse(false)}
                            className="user-avatar"
                            src={setAvatarPicture(profile?.color || profileFromStorge?.color)}
                            alt=""
                        />
                        <span onClick={() => setProfilesModal(!profilesModal)}>▼</span>
                    </div>

                </div>
                {profilesModal && <UsersModal profiles={profilesWithFilter} setAvatarPicture={setAvatarPicture} changeProfile={changeProfile} />}
                {profilesModal && <div onClick={() => setProfilesModal(false)} className="screen"></div>}
            </div>

        </div>
    )
}
