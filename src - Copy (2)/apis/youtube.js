import axios from 'axios';
const KEY = 'AIzaSyDvbQkrSGqMuXPnUQVEu75kjj8NlOPj2J4';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY
    }
})