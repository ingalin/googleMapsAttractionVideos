import { Component } from 'react';



class EachVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            itemInWishList: false,
            itemAlreadyInList: false,
            idWishlist: '',
            titleWishlist: '',
            companyWishlist: '',
            jobUrlWishlist: '',
        }
    }





    render() {
        const { videoTitle, videoDescription, videoId } = this.props;
        return (
            <div>

                <h2>{videoTitle}</h2>
                <p>{videoDescription}</p>
                <iframe src={`https://www.youtube.com/embed/${videoId}`} allowFullScreen title='Video player' />
            </div>
        )
    }
}

export default EachVideo;