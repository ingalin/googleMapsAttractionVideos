import './App.css';
import { Component } from 'react';
import MapContainer from './components/GoogleMap';
import EachVideo from './components/EachVideo';
import { connect } from 'react-redux';



class App extends Component {

  render() {
    return (
      <main>
        {/* Google menu and map */}
        <MapContainer />
        {/* YouTube Videos */}
        <section>
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
          </ul>
        </section>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    videoList: state.videoList
  }
}

export default connect(mapStateToProps)(App);





