# street-VNYL
There's no I in VNYL

ENDPOINT PRIORITIES
1. get all playlists
2. get playlist by location
3. get tracks by playlist ID
4. save track
....
delete playlist, delete track

getTracks () {
    const searchInput = this.state.keyword;
    const trackList = this.state.tracks;
    request.get('/api/trac').then((response) => {
      const returnedTracks = response.body.tracks.items;
      returnedTracks.forEach((track) => {
        const cleanTrack = this.cleanTrackData(track);
        trackList.push(cleanTrack);
        this.setState({
          tracks: trackList,
        });
      });
    });
  }
