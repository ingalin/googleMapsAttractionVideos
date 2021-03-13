const initState = {
    videoList: [{}]
}

const rootReducer = (state = initState, action) => {
    // console.log(action)
    if(action.type === 'UPDATE_LOCATION'){
        return {
            ...state,
            videoList: action.videoList
        }
     
    }
    // console.log(state)
    return state;
}

// console.log(this.state.videoList)

export default rootReducer;