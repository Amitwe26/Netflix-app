import axios from "axios"
import { storageService } from "./storageService"


const BASE_URL = 'https://api.themoviedb.org/'
const KEY_WORD = 'bannerImg'


const API_KEY = '966d25f68b2beabae673d956bfe0476d'


const requests = [

    { title: 'Trending', url: `/trending/all/week?api_key=${API_KEY}&language=en-US` },
    { title: 'Top Rated', url: `/movie/top_rated?api_key=${API_KEY}&language=en-US` },
    { title: 'Action Movies', url: `/discover/movie?api_key=${API_KEY}&with_genres=28` },
    { title: 'Netflix Originals', url: `/discover/tv?api_key=${API_KEY}&with_networks=213` },
    { title: 'Most popular ', url: `/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc` },
    { title: 'Comedy Movies', url: `/discover/movie?api_key=${API_KEY}&with_genres=35` },
    { title: 'Documentaries', url: `/discover/movie?api_key=${API_KEY}&with_genres=99` },
    { title: 'Horror Movies', url: `/discover/movie?api_key=${API_KEY}&with_genres=27` },
    { title: 'Drama Movies', url: `/discover/movie?api_key=${API_KEY}&with_genres=18` },
    { title: 'Tom Cruise', url: `/discover/movie?api_key=${API_KEY}&with_genres=878` },
]


async function query() {
    const moviesToBanner = storageService.loadFromStorage(KEY_WORD)
    if (!moviesToBanner) {
        try {
            const res = await axios.get(`${BASE_URL}3/list/1?api_key=${API_KEY}`)
            const movies = res.data
            storageService.saveToStorage(KEY_WORD, movies)
            return movies
        }
        catch {
            console.log('err to get movies list to Banner');
        }
    }
    return moviesToBanner
}

function getRequests() {
    // return Promise.resolve(requests)
    return requests
}

async function getMovies(title, fetch, filterBy) { //filterBY is undifind !!!!!!!!
    const moviesLists = storageService.loadFromStorage(title)
    if (filterBy) {
        const moviesFilter = moviesLists.filter(movie => {
            if (movie.name) return movie.name.toLowerCase().includes(filterBy.toLowerCase())
            else return movie.title.toLowerCase().includes(filterBy.toLowerCase())
        })
        // console.log('movies after filter is:', moviesFilter);
        // return moviesFilter
        // return Promise.resolve(moviesFilter)
    }
    else if (moviesLists) return moviesLists
    else {
        const req = await axios.get(`${BASE_URL}3${fetch}`)
        const movies = req.data.results
        storageService.saveToStorage(title, movies)

        return movies
    }
}
function _loadMovies() {
    const movies = storageService.loadFromStorage(KEY_WORD)
    console.log('movies is:', movies);
}

export const moveiService = {
    query,
    getMovies,
    getRequests
}