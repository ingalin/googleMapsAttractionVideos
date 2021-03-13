const initState = {
    searchResult: "Balvi"
}

const rootReducer = (state = initState, action) => {
    console.log(action)
    if(action.type === 'UPDATE_LOCATION'){
        console.log(action.searchResult)
        return {
            ...state,
            searchResult: action.searchResult
        }
      
    }
    return state;
}

export default rootReducer;