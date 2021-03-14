import axios from 'axios';

// AXIOS to YouTube
export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: 'AIzaSyDyneUlJD4fQc3lz4lpSpuERF8L0SkRzI4'
    }
})