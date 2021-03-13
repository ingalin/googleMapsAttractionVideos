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
  //   console.log(this.props.searchResult)
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
          {this.props.searchResult.length > 1 ?
          <ul>
            {
              this.props.searchResult.map((eachVideo) => {
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
    searchResult: state.searchResult
  }
}

export default connect(mapStateToProps)(App);





