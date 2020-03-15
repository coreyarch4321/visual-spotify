import React from "react";
import { observable, action, runInAction, computed } from "mobx";
import { observer } from "mobx-react";
import styled from "styled-components";
import { getTopTracks } from "../../services/TransportLayer";
import CircularProgress from '@material-ui/core/CircularProgress';
import TrackCard from "../TrackCard";

@observer
class TrackComparison extends React.Component {
  @observable tracks = [];
  @observable leftTrack = {}
  @observable rightTrack = {};

  @observable isLoading = false;

  componentDidMount() {
    this.initialize();

  }

  @action
  initialize = async () => {
    try {
      this.isLoading = true;

      const response = await getTopTracks();
      const tracks = response.data.items;

      runInAction(() => {
        this.tracks = Array.from(tracks);
      });

      this.setTracksToCompare();
    } catch (err) {
      console.error(`Failed to initialize: ${err}`);
    } finally {
      runInAction(() => this.isLoading = false);
    }
  }

  @action
  setTracksToCompare = () => {
    this.leftTrack = this.randomTrack();
    this.rightTrack = this.randomTrack();
  }

  // gets random tracks to compare
  randomTrack = () => {
    return this.tracks[Math.floor(Math.random() * this.tracks.length)]
  }

  render() {
    if (this.isLoading) {
      return <CircularProgress color="secondary" />
    } else {
      console.log("this.leftTrack: ",this.leftTrack)
      return (
        <Container>
          <LeftTrack>
            {this.leftTrack && (
              <TrackCard
                title={this.leftTrack.name}
                url={this.leftTrack.album && this.leftTrack.album.images && this.leftTrack.album.images[0] && this.leftTrack.album.images[0].url}
              />
            )}
          </LeftTrack>
          <RightTrack>
            <SongContainer>{this.rightTrack && this.rightTrack.name}</SongContainer>
          </RightTrack>
        </Container>
      )
    }
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const LeftTrack = styled.div`

`;

const RightTrack = styled.div`

`;

const SongContainer = styled.div`
  font-size: 16px;
`;

export default TrackComparison;
