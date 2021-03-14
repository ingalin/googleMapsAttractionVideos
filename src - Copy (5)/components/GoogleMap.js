import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { connect } from 'react-redux';
import youtube from '../apis/youtube';
import { addVideos } from '../actions/postActions';

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            mapCenter: {
                lat: 0,
                lng: 0
            },
            containerStyle: {
                position: 'relative',
                width: '500px',
                height: '300px'
            },
            errorMessage: false,
            showww: false
        }
    }

    // Load first location
    componentDidMount() {
        this.handleSearch("Toronto, ON, Canada")
    }

    // Handle place change
    handleChange = address => {
        this.setState({
            address,
            errorMessage: false
        });
    };

    // Handle place submit
    handleSearch = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                // Update address, map center lat and lng
                this.setState({
                    address,
                    mapCenter: latLng
                })
                // Search for videos based on the selection
                this.searchVideos(address);
            })
            // Error if entered data not valid
            .catch(error =>
                // console.error('Error', error)
                this.setState({
                    errorMessage: true
                })
            );
    };

    // Run axios call to search for videos
    searchVideos = async () => {
        const response = await youtube.get('/search', {
            params: {
                q: `attractions ${this.state.address}`
            }
        })
        this.props.updateVideoList(response.data.items);
    };


    showww = () =>{
        this.setState({
            showww: true
        })
    }

    render() {
        return (
            <section>
                {/* Autocomplete menu */}
                <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSearch}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <input
                                {...getInputProps({
                                    // placeholder: 'Search Places ...',
                                    className: 'location-search-input',
                                })}
                            />
                            <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map((suggestion, count) => {
                                    // add count to avoid same key error
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
                {/* Error message if no new data show up */}
                {this.state.errorMessage ? <h2>No search results, please try again!</h2> : null}
                {this.state.showww ? <h2>{this.state.address}</h2> : null}

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
                    <Marker onClick={this.showww}
                        position={{
                            lat: this.state.mapCenter.lat,
                            lng: this.state.mapCenter.lng
                        }}
                    />
                </Map>
            </section>
        )
    }
}

// Connect to Redux to add videos to the store
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
    apiKey: ('AIzaSyDonPGBeJvsatbr40B53xslH3kPUqa1eL4')
})(connect(null, mapDispatchToProps)(MapContainer));
