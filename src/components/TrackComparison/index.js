import React from "react";
import { observable, action, runInAction, computed } from "mobx";
import { observer } from "mobx-react";
import styled from "styled-components";
import { getTopTracks } from "../../services/TransportLayer";
import CircularProgress from '@material-ui/core/CircularProgress';
import TrackCard from "../TrackCard";

// comparison answer values
const LEFT_TRACK = "left_track";
const RIGHT_TRACK = "right_track";

// round outcome values
const TIE = "tie";
const WON = "won";
const LOST = "lost";

@observer
class TrackComparison extends React.Component {
  @observable tracks = [];
  @observable leftTrack = {}
  @observable rightTrack = {};
  @observable roundOutcome = null;

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
        // set user's top tracks
        this.tracks = Array.from(tracks);

        // set left and right tracks to compare
        this.leftTrack = this.randomTrack();
        this.rightTrack = this.randomTrack();
      });

    } catch (err) {
      console.error(`Failed to initialize: ${err}`);
    } finally {
      runInAction(() => this.isLoading = false);
    }
  }

  // compare tracks and reset tracks
  @action
  handleCompareTracks = (key) => {
    let winningTrack = null;
    let trackToRemoveByName = null;

    // set the winning track depending on which track had higher popularity
    if (this.leftTrack.popularity > this.rightTrack.popularity) {
      winningTrack = LEFT_TRACK;
      trackToRemoveByName = this.rightTrack.name;
    } else if (this.leftTrack.popularity < this.rightTrack.popularity) {
      winningTrack = RIGHT_TRACK;
      trackToRemoveByName = this.leftTrack.name;
    } else {
      winningTrack = TIE;
      trackToRemoveByName = this.leftTrack.name;
    }

    // check to see if user won, lost or tied by comparing key value to winning track
    if (winningTrack === TIE) {
      this.roundOutcome = TIE;
    } else {
      if (key === winningTrack) {
        this.roundOutcome = WON;
      } else {
        this.roundOutcome = LOST;
      }
    }

    // remove losing track by name
    const updatedTracks = this.tracks.filter((track) => track.name !== trackToRemoveByName);
    this.tracks = updatedTracks;

    setTimeout(this.setNewRound, 2000)
  }

  @action
  setNewRound = () => {
    this.leftTrack = this.randomTrack();
    this.rightTrack = this.randomTrack();

    this.roundOutcome = null;
  }

  randomTrack = () => {
    return this.tracks[Math.floor(Math.random() * this.tracks.length)]
  }

  render() {
    if (this.isLoading) {
      return <CircularProgress color="secondary" />
    } else {
      return (
        <Container>
          <GameTitle>Spotify Feud</GameTitle>
          <GameInstruction>Which is more popular?</GameInstruction>
          <GameContent>
            <LeftTrack>
              {this.leftTrack && (
                <TrackCard
                  title={this.leftTrack && this.leftTrack.name}
                  url={this.leftTrack && this.leftTrack.album && this.leftTrack.album.images && this.leftTrack.album.images[0] && this.leftTrack.album.images[0].url}
                  onClick={() => this.handleCompareTracks(LEFT_TRACK)}
                />
              )}
            </LeftTrack>
            <ResultContainer>
              {this.roundOutcome === null && <ResultText>OR</ResultText>}
              {this.roundOutcome === WON && <WonText>WON</WonText>}
              {this.roundOutcome === LOST && <LostText>LOST</LostText>}
              {this.roundOutcome === TIE && <ResultText>TIE</ResultText>}
            </ResultContainer>
            <RightTrack>
              {this.rightTrack && (
                <TrackCard
                  title={this.rightTrack.name}
                  url={this.rightTrack.album && this.rightTrack.album.images && this.rightTrack.album.images[0] && this.rightTrack.album.images[0].url}
                  onClick={() => this.handleCompareTracks(RIGHT_TRACK)}
                />
              )}
            </RightTrack>
          </GameContent>
        </Container>
      )
    }
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
`;

const GameContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

const GameTitle = styled.div`
  font-size: 60px;
  font-weight: bold;
  color: coral;
  text-transform: uppercase;
`;

const GameInstruction = styled.div`
  font-size: 32px;
  color: black;
  margin-top: 20px;
`;

const LeftTrack = styled.div`
  padding: 16px;
`;

const RightTrack = styled.div`
  padding: 16px;
`;

const ResultContainer = styled.div`
  text-align: center;
  background: #333;
  border-radius: 100%;
`;

const ResultText = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto;
  padding: 0;
  display: inline-block;
  line-height: 100px;
  text-align: center;
  font-size: 32px;
  color: white;
`;

const WonText = styled.div`
  width: 150px;
  height: 150px;
  margin: 0 auto;
  padding: 0;
  display: inline-block;
  line-height: 150px;
  text-align: center;
  font-size: 40px;
  color: yellow;
`;

const LostText = styled.div`
  width: 150px;
  height: 150px;
  margin: 0 auto;
  padding: 0;
  display: inline-block;
  line-height: 150px;
  text-align: center;
  font-size: 40px;
  color: red;
`;

export default TrackComparison;
