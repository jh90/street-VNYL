import React from 'react';

const propTypes = {
  trackData: React.PropTypes.object,
};

export default class TrackListElement extends React.Component {
  render () {
    return (
      <ul>
        <li>{this.props.trackData.title}</li>
        <li>{this.props.trackData.artist}</li>
        <li>{this.props.trackData.previewURL}</li>
      </ul>
    );
  }
}

TrackListElement.propTypes = propTypes;
