const initState = {
    searchResult: [{}]
}

const rootReducer = (state = initState, action) => {
    // console.log(action)
    if(action.type === 'UPDATE_LOCATION'){
        // console.log(action.searchResult)
        // return state.searchResult = action.searchResult
        // state.searchResult = action.searchResult
        // console.log(action.searchResult)
        // console.log(state.searchResult)
        // return state.searchResult
        // {
            // ...state,
            // searchResult: [{1:1},{2:2}]
            // Object.assign({}, action.searchResult)
        // }
        return {
            ...state,
            searchResult: action.searchResult
        }
     
    }
    // console.log(state)
    return state;
}

// console.log(this.state.searchResult)

export default rootReducer;