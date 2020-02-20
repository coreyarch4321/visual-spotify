import React from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

@observer
class TracksList extends React.Component {
  @observable tracks = [];

  componentDidMount() {
    const accessToken = localStorage.getItem("access_token");
  }

  @action
  setTracks = () => {
  // make API call
  }

  render() {
    return (
      <div><p>Hello</p></div>
    )
  }
}

export default TracksList;
