// Add videos 
export const addVideos = (videos) => {
    return {
        type: 'UPDATE_VIDEOS',
        videoList: videos
    }
}