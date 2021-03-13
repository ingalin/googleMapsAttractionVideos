import { Component } from 'react';



class EachVideo extends Component {
    // Each video
    render() {
        const { videoTitle, videoDescription, videoId } = this.props;
        return (
            <div>
                <h2>{videoTitle}</h2>
                <iframe src={`https://www.youtube.com/embed/${videoId}`} allowFullScreen title={`Video ${videoDescription}`} />
            </div>
        )
    }
}

export default EachVideo;