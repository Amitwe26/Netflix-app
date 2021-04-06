const initialstateMovies = {
    movies: [],
    filterByName: null
}

export default function moviesReducer(state = initialstateMovies, action) {
    switch (action.type) {
        case 'SET_MOVIES':
            return {
                ...state,
                movies: action.movies
            }
        case 'FILTER_BY':
            return {
                ...state,
                filterByName: action.filterByName
            }
        default: return state

    }
}

