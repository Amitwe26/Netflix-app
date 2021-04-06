import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setProfile, loadProfiles } from '../store/actions/UserAction'
import { ProfilePreview } from '../cmps/ProfilePreview'
import { userService } from '../services/usersService'


export function Profiles() {

    const { profiles, userLogin } = useSelector(state => state.userModule)
    const history = useHistory()
    const dispatch = useDispatch()

    const [edit, setEdit] = useState(false)
    const [addProfile, setAddProfile] = useState(false)


    useEffect(() => {
        dispatch(loadProfiles(userLogin));
    }, [userLogin, dispatch])


    async function onSetProfile(profile) {
        dispatch(setProfile(profile))
        history.push(`/profile/${profile.id}`)
    }

    function onLogout() {
        sessionStorage.clear()
        history.push('/')
    }

    async function setNewProfile(ev) {
        ev.preventDefault()
        console.log('newProfile,userlOGIN is:', ev.target.name.value, userLogin);
        const newProfile = {}
        newProfile.name = ev.target.name.value
        newProfile.color = ev.target.select.value
        userService.addProfile(newProfile, userLogin)
        dispatch(loadProfiles(userLogin))
        setAddProfile(false)
    }

    return (
        <div className="profile-page">
            <img className="nav-logo" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="" />
            <button className="btn-logout" onClick={() => onLogout()}>Logout</button>
            <div className="main-profile">
                <h1>How watch in Netflix?</h1>
                <button onClick={() => setAddProfile(!addProfile)}>Add profile</button>
                {addProfile && <div>
                    <form onSubmit={setNewProfile}>
                        <input type="text" name="name" placeholder="Profile Name" />
                        <select id="select" >
                            <option value="Red">Red</option>
                            <option value="Green">Green</option>
                            <option value="Blue">Blue</option>
                            <option value="Yellow">Yellow</option>
                        </select>
                        <button>Add</button>
                    </form>
                </div>}
                <div className="main-users">
                    {profiles?.map(profile => {
                        return (
                            <ProfilePreview
                                key={profile.name}
                                profile={profile}
                                onSetProfile={onSetProfile}
                                userLogin={userLogin}
                                edit={edit} />)
                    })}
                </div>
                <button
                    style={{
                        backgroundColor: edit ? '#ffff' : '',
                        color: edit ? 'black' : ''
                    }}
                    onClick={() => setEdit(!edit)}>
                    {edit ? 'Done' : 'Edit profile'}
                </button>
            </div>
        </div >
    )
}
