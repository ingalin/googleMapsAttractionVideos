const initState = {
    videoList: []
}

const rootReducer = (state = initState, action) => {
    // Add video list to the store
    if (action.type === 'UPDATE_VIDEOS') {
        return {
            ...state,
            videoList: action.videoList
        }
    }
    return state;
}



export default rootReducer;