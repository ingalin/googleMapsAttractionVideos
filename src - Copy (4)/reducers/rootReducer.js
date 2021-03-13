const initState = {
    videoList: []
}

const rootReducer = (state = initState, action) => {

    if(action.type === 'UPDATE_VIDEOS'){
        return {
            ...state,
            videoList: action.videoList
        }
     
    }
    return state;
}



export default rootReducer;