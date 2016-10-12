import React from 'react';
import ReactMusicPlayer from 'react-music-player';

export default class SongView extends React.Component {
  render () {
    return (
      <div className="player">
        <ReactMusicPlayer songs={songs} autoplay />
      </div>
    );
  }
}
