import axios from 'axios';
const KEY = 'AIzaSyB8OSUV46t52aOO7fdgnXjvjhMZ8FCiQKQ';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY
    }
})