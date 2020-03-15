import React from "react";
import { observable, action, runInAction, computed } from "mobx";
import { observer } from "mobx-react";
import styled from "styled-components";
import { getTracksByArtist, getTopTracks } from "../../services/TransportLayer";
import CircularProgress from '@material-ui/core/CircularProgress';

@observer
class TracksList extends React.Component {
  @observable tracks = [];
  @observable tracksToCompare = {};

  @observable isLoading = false;

  async componentDidMount() {
    await this.storeTracks()
  }

  @action
  storeTracks = async () => {
    try {
      this.isLoading = true;

      const response = await getTopTracks();
      const tracks = response.data.items;

      runInAction(() => this.tracks = Array.from(tracks));
    } catch (err) {
      console.error(`Could not set tracks: ${err}`);
    } finally {
      runInAction(() => this.isLoading = false);
    }
  }

  @action
  setTracksToCompare = () => {
    this.tracksToCompare = {};

    const leftTrack = this.randomTrack();
    const rightTrack = this.randomTrack();

    console.log({ ...leftTrack });
    console.log({ ...rightTrack })
  }

  // gets random tracks to compare
  randomTrack = () => {
    return this.tracks[Math.floor(Math.random() * this.tracks.length)]
  }

  @computed get trackNames() {
    return this.tracks.map((track) => track.name);
  }

  render() {
    if (this.isLoading) {
      return <CircularProgress color="secondary" />
    } else {
      return (
        <Container>
          {this.trackNames.map((song) => {
            return <SongContainer key={song}>{song}</SongContainer>
          })}
          <button onClick={this.setTracksToCompare}>Get 2</button>
        </Container>
      )
    }
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const SongContainer = styled.div`
  font-size: 16px;
`;

export default TracksList;
