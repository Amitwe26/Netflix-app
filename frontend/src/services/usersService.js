
import { httpService } from './httpService'
import { storageService } from './storageService'

const BASE_URL = 'api'


async function login(userNetflix) {
    const user = await httpService.post(`${BASE_URL}/auth/login`, userNetflix)
    if (user) {
        console.log('user is succses is:', user);
        _saveLocalUser(user)
        return user
    }
    // return httpService.get(`${BASE_URL}/user`)
}

async function signup(userCred) {
    const user = await httpService.post(`${BASE_URL}/auth/signup`, userCred.newUser)
    return _saveLocalUser(user)
}

async function addProfile(newProfile, userLogin) {
    // const loggedinUser = JSON.parse(userLogin)
    newProfile.id = _makeId()
    newProfile.movies = []
    userLogin.profiles.push(newProfile)
    console.log('userLogin after  is:', userLogin);
    const user = await httpService.put(`${BASE_URL}/user/${userLogin._id}`, userLogin)
    return _saveLocalUser(user)
}

async function getUser(email, password) {
    const info = {}
    info.email = email
    info.password = password
    const user = await httpService.get(`${BASE_URL}/user`, info)
    return Promise.resolve(user)
}

function getProfiles(user) {
    if (Object.keys(user).length === 0) {
        const profilesFromStorge = storageService.loadFromStorage('profiles')
        return Promise.resolve(profilesFromStorge)
    } else {
        const profilesToUser = user.profiles
        storageService.saveToStorage('profiles', profilesToUser)
        return Promise.resolve(profilesToUser)
    }

}

// async function getProfile(info) {
//     const { profileId, nicknameUser } = info
//     const idx = users.findIndex(user => user.nickname === nicknameUser)
//     const profile = users[idx].profiles.find(profile => profile._id === profileId)

//     console.log(' profileis:', profile);
//     return profile
// }

function _saveLocalUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}

function _makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
export const userService = {
    login,
    signup,
    getProfiles,
    addProfile,
    _makeId,
    getUser
}