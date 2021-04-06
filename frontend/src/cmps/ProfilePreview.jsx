import React from 'react'
import blue from '../assets/img/blue.png'
import red from '../assets/img/red.png'
import yellow from '../assets/img/yellow.png'
import green from '../assets/img/green.png'

export function ProfilePreview({ profile, onSetProfile, userLogin, edit }) {
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

    return (
        <div className="user" >
            <img src={setAvatarPicture(profile.color)}
                onClick={() => onSetProfile(profile)}
                alt="img user" />

            {edit && <button className="btn-edit">✎</button>}
            <p>{profile.name}</p>
        </div>
    )
}
