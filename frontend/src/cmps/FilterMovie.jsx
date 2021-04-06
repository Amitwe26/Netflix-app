import React, { useEffect, useReducer, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { setFilter } from '../store/actions/MovieAction'

// import moviesReducer from '../store/reducers/MoviesReducer'
// import { initialstateMovies } from '../store/reducers/MoviesReducer'
const initialstateMovies = {
    Name: ''
}
export default function filterReducer(state = initialstateMovies, action) {
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                Name: action.Name
            }
        default: return state

    }
}
export function FilterMovie({ onSetFilter }) {
    const inputRef = useRef(null)
    // const dispatch = useDispatch()

    const [state, dispatch] = useReducer(filterReducer, initialstateMovies)

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    useEffect(() => {
        onSetFilter({ ...state })
    }, [state])

    const { Name } = state
    return (
        <div>
            <input ref={inputRef}
                className="filterMovies"
                type="text" value={Name}
                onChange={(ev) => dispatch({ type: 'SET_NAME', Name: ev.target.value })
                }
                placeholder="search" />

        </div>
    )
}
