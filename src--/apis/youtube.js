import axios from 'axios';

// AXIOS to YouTube
export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 2,
        key: 'AIzaSyDonPGBeJvsatbr40B53xslH3kPUqa1eL4'
    }
})