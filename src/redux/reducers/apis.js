import { ADD_API, DEL_API, EDIT_API, SEARCH_API } from '../actions'

const api = (state, action) => {
    switch (action.type) {
        case ADD_API:
            return {
                id: action.id,
                testDate: action.testDate
            }
        default:
            return state
    }
}

const apis = (state, action) => {
    switch (action.type) {
        case ADD_API:
            return [
                ...state,
                api(undefined,action)
            ]
        default:
            return state
    }
}

export default apis