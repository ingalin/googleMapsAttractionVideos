import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { connect } from 'react-redux';


import youtube from '../apis/youtube';
import { addVideos } from '../actions/postActions';

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // address: '',
            mapCenter: {
                lat: 49.28,
                lng: -123.12
            },
            containerStyle: {
                position: 'relative',
                width: '500px',
                height: '500px'
            }
        }
    }



    handleChange = address => {
        this.setState({ address });


    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                this.setState({
                    address,
                    mapCenter: latLng
                })

                // this.props.updateVideoList(address)
                this.searchVideos(address);
            })
            .catch(error => console.error('Error', error));
    };


    searchVideos = async () => {
        const response = await youtube.get('/search', {
            params: {
                q: this.state.address
            }
        })
        // this.setState({
        //     videos: response.data.items
        // });
        const videos = response.data.items;
        this.props.updateVideoList(videos);
    };

    render() {
        return (
            <div>
                {/* teeeeeeeee {console.log(this.props.videoList)} */}
                <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <input
                                {...getInputProps({
                                    placeholder: 'Search Places ...',
                                    className: 'location-search-input',
                                })}
                            />
                            <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map((suggestion, count) => {
                                    count++;
                                    const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#f555ff', cursor: 'pointer' };
                                    return (
                                        <div key={count}
                                            {...getSuggestionItemProps(suggestion, {
                                                className,
                                                style,
                                            })

                                            }
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
                <Map
                    containerStyle={this.state.containerStyle}
                    google={this.props.google}
                    initialCenter={{
                        lat: this.state.mapCenter.lat,
                        lng: this.state.mapCenter.lng
                    }}
                    center={{
                        lat: this.state.mapCenter.lat,
                        lng: this.state.mapCenter.lng
                    }}
                >
                    <Marker
                        position={{
                            lat: this.state.mapCenter.lat,
                            lng: this.state.mapCenter.lng
                        }}
                    />
                </Map>
            </div>
        )
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateVideoList: (address) => {
//             dispatch({
//                 type: 'UPDATE_LOCATION',
//                 // id: id,
//                 searchResult: address
//             })
//         }
//     }
// }


const mapDispatchToProps = (dispatch) => {
    return {
        updateVideoList: (videos) => {
            dispatch(
                addVideos(videos)
            )
        }
    }
}


export default GoogleApiWrapper({
    apiKey: ('AIzaSyDvbQkrSGqMuXPnUQVEu75kjj8NlOPj2J4')
})(connect(null, mapDispatchToProps)(MapContainer));
