import React from 'react'
import { Link } from 'react-router-dom'

export function UsersModal({ profiles, changeProfile, setAvatarPicture }) {


    return (
        <div className="user-modal">
            <div className="flex col users-list-modal">
                {profiles?.map(profile => {
                    return <div
                        key={profile.id}
                        onClick={() => changeProfile(profile)}
                        className="user flex align-center" >
                        <img className="img-users" src={setAvatarPicture(profile.color)} alt="user-img" />
                        <Link to={`/profile/${profile.id}`}
                            className="user-name" >
                            {profile?.name}
                        </Link>
                    </div>
                })}
            </div>
            <div className="bottom flex col">
                <Link to="/user">Account</Link>
                <Link to="">Help</Link>
                <Link to="/" onClick={() => sessionStorage.clear()}>Logout from Netflix</Link>
            </div>
        </div>
    )
}
