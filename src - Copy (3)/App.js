import './App.css';
import { Component } from 'react';
import MapContainer from './components/GoogleMap';
import youtube from './apis/youtube';
import EachVideo from './components/EachVideo';
import { connect } from 'react-redux';



class App extends Component {
  constructor() {
    super();
    this.state = {
      // videos: [],
      // added to Redux
      // searchResult: "attractions Eiffel Tower, Paris, France"
    }
  }

  // componentDidMount() {
  //   // this.searchVideos();
  //   console.log(this.props.videoList)
  // }


  // searchVideos = async () => {
  //   const response = await youtube.get('/search', {
  //     params: {
  //       q: this.props.searchResult
  //     }
  //   })
  //   this.setState({
  //     videos: response.data.items
  //   });
  // };


  render() {
    return (
      <div>
        <MapContainer />
        <div>
          {/* izdzeest sso if /////////////////////////////////////////////// */}
          {this.props.videoList.length > 1 ?
          <ul>
            {
              this.props.videoList.map((eachVideo) => {
                return (
                  <li key={eachVideo.id.videoId}>
                    <EachVideo
                      videoTitle={eachVideo.snippet.title}
                      videoDescription={eachVideo.snippet.description}
                      videoId={eachVideo.id.videoId}
                    />
                  </li>
                );
              })
            }
          </ul> : null}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    videoList: state.videoList
  }
}

export default connect(mapStateToProps)(App);




