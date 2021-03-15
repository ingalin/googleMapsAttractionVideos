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
            address: "",
            mapCenter: {
                lat: 0,
                lng: 0
            },
            containerStyle: {
                position: 'relative',
                width: '78%',
                minHeight: '350px',
                height: '55vh',
                marginTop: '20px',
                borderRadius: "16px",
                border: "2px #AAA1C8 solid",
                overflow: "hidden",
            },
            errorMessage: false,
            errorMessageVideos: false,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
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
            errorMessage: false,
            errorMessageVideos: false
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
                    mapCenter: latLng,
                    errorMessageVideos: false
                })
                // Search for videos based on the selection
                this.searchVideos(address);
            })
            // Error if entered data not valid
            .catch(error =>
                // console.error('Error', error)
                this.setState({
                    errorMessage: true,
                })
            );
    };

    // Run axios call to search for videos
    searchVideos = async () => {
        const response = await youtube.get('/search', {
            params: {
                q: `attractions ${this.state.address}`
            }
        }
        ).catch(() =>
            // Error message if videos can't be displayed
            this.setState({
                errorMessageVideos: true
            })
        );
        // If videos are exported, add to Redux
        if (!this.state.errorMessageVideos) {
            this.props.updateVideoList(response.data.items);
        }
    };


    // Show city on marker click
    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });


    render() {
        return (
            <section className="maps">
                <h1>Choose location & explore nearby attractions!</h1>
                {/* Autocomplete menu */}
                <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSearch}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                        <div className="inputField">
                            <input
                                {...getInputProps({
                                    className: 'location-search-input',
                                })}
                            />
                            <div className="autocomplete-dropdown-container">
                                {suggestions.map((suggestion, count) => {
                                    // add count to avoid same key error
                                    count++;
                                    const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                    // inline style
                                    const style = suggestion.active
                                        ? { backgroundColor: '#192A51', color: 'white', cursor: 'pointer' }
                                        : { backgroundColor: '#fff9eb', cursor: 'pointer' };
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
                <div className="errorMessages">
                    {this.state.errorMessage ? <p>No search results, please try again!</p> : null}
                    {this.state.errorMessageVideos ? <p>Videos can't be displayed, please try again!</p> : null}
                </div>
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
                    {/* Show marker and info about the location */}
                    <Marker
                        onClick={this.onMarkerClick}
                        name={this.state.address}
                        position={{
                            lat: this.state.mapCenter.lat,
                            lng: this.state.mapCenter.lng
                        }}
                    />
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <h3>{this.state.selectedPlace.name}</h3>
                        </div>
                    </InfoWindow>
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
    apiKey: ('AIzaSyBbb_SnBrhOsjn--3XIcamLw9ybv-Rhr7c')
})(connect(null, mapDispatchToProps)(MapContainer));
