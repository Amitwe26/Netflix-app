import { LoginService } from '../../services/LoginService';
import { storageService } from '../../services/storageService';
import { userService } from '../../services/usersService';


//creators
const _setProfiles = (users) => ({ type: 'SET_USERS', users })
const _getUser = (user) => ({ type: 'GET_USER', user })
const _setProfile = (profile) => ({ type: 'SET_PROFILE', profile })
const _setNetflixUser = (userLogin) => ({ type: 'SET_NETFLIX_USER', userLogin })
// Dispatchers
//THANK
export function loadProfiles(user) {
    return async (dispatch) => {
        try {
            const profiles = await userService.getProfiles(user)
            dispatch(_setProfiles(profiles))
        }
        catch (err) {
            console.log('catch to get profiles!', err);
        }
    }
}

export function getUser(userId) {
    return (dispatch) => {
        const user = userService.getUser(userId)
        dispatch(_getUser(user))
    }
}
// export function changeActiveProfile(profile, users) {
//     return (dispatch) => {
//         storageService.saveToStorage('profile', profile)
//         dispatch(_getUser(profile))
//     }
// }

export function setProfile(profile) {
    return async (dispatch) => {
        try {
            storageService.saveToStorage('profile', profile)
            dispatch(_setProfile(profile))
        }
        catch (err) {
            console.log('err to set profile is:', err);
        }
    }
}

export function setNetflixUser(user) {
    return async dispatch => {
        try {
            const userLogin = await userService.login(user)
            if (userLogin) {
                dispatch(_setNetflixUser(userLogin))
                return userLogin
            }
        }
        catch (err) {
            console.log('err to set user is:', err);
        }
    }
}

export function signup(userCreds) {
    return async dispatch => {
        try {
            const user = await userService.signup(userCreds)
            console.log('user in action is:', user);
            dispatch(_setNetflixUser(user))
            return user
        }
        catch {
            console.log('failed to signup ');
        }
    }
}
