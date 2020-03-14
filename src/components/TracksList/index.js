import React from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import { getSongsByArtist } from "../../services/TransportLayer";

@observer
class TracksList extends React.Component {
  @observable tracks = [];

  async componentDidMount() {
    const accessToken = localStorage.getItem("access_token");

    this.setTracks();
  }

  @action
  setTracks = async () => {
  // make API call
  const res = await getSongsByArtist("tania%20bowra");
  console.log(res.data)
  }

  render() {
    return (
      <div><p>Hello</p></div>
    )
  }
}

export default TracksList;
