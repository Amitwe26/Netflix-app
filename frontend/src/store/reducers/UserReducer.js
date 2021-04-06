const initialstate = {
    userLogin: {},
    user: {},
    profile: {},
    profiles: [],
    filterBy: null

}
if (localStorage.Profiles) initialstate.profiles = JSON.parse(localStorage.Profiles)

export default function UserReducer(state = initialstate, action) {
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                profiles: action.users
            }
        case 'GET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'SET_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'SET_NETFLIX_USER':
            return {
                ...state,
                userLogin: action.userLogin
            }
        case 'FILTER_BY':
            return {
                ...state,
                filterBy: action.filterBy
            }


        default: return state
    }
}