import { moveiService, movieService } from '../../services/movieService';

const _setMovies = (movies) => ({ type: 'SET_MOVIES', movies })
const _setFilter = (filterBy) => ({ type: 'FILTER_BY', filterBy })

export function setFilter(filterBy) {
    return async (dispatch) => dispatch(_setFilter(filterBy))
}

export function setMovies(title, url) {
    return async (dispatch) => {
        try {
            let movies = await moveiService.getMovies(title, url)
            dispatch(_setMovies(movies))
        }
        catch {
            console.log('cant to set movies');
        }
    }
}