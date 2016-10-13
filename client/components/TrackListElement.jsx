import React from 'react';

const propTypes = {
  trackData: React.PropTypes.object,
};

export default class TrackListElement extends React.Component {
  render () {
    return (
      <div id="track-element">
        <ul id="artist-title-list">
          <li id="song-title">"{this.props.trackData.title}"</li>
          <li id="artist-name">{this.props.trackData.artist}</li>
        </ul>
        <audio controls>
          <source src={this.props.trackData.previewURL} type="audio/mpeg" />
        </audio>
      </div>
    );
  }
}

TrackListElement.propTypes = propTypes;


// <li>{this.props.trackData.previewURL}</li>

// <a href="http://www.w3schools.com">
// <img border="0" alt="W3Schools" src="logo_w3s.gif" width="100" height="100">
// </a>

// <a href="#">Locations</a>

// <a href="#" id="hamburger"><img src="../images/hamburger.png" /></a>
// <a href={this.props.trackData.previewURL}><img src="../images/playButton.png"/> </a>
