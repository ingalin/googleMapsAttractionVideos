import axios from 'axios';

// AXIOS to YouTube
export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: 'AIzaSyCevlhcBr0CbO2pQE_HOkoyqHYRm75pLfU'
    }
})