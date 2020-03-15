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
    console.log(this.leftTrack.popularity)
    let winningTrack = null;

    // set the winning track depending on which track had higher popularity
    if (this.leftTrack.popularity > this.rightTrack.popularity) {
      winningTrack = LEFT_TRACK;
    } else if (this.leftTrack.popularity < this.rightTrack.popularity) {
      winningTrack = RIGHT_TRACK
    } else {
      winningTrack = TIE;
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
      console.log("this.roundOutcome: ",this.roundOutcome)
      return (
        <Container>
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
            {this.roundOutcome === WON && <ResultText>WON</ResultText>}
            {this.roundOutcome === LOST && <ResultText>LOST</ResultText>}
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
  margin-top: 40px;
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

export default TrackComparison;
