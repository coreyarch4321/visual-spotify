import React from "react";
import { observable, action } from "mobx"
import { observer } from "mobx-react";
import LoginFlow from "../LoginFlow";
import TrackComparison from "../PopularityTracksGame/TrackComparison";

@observer
class Entry extends React.Component {
  @observable isLoggedIn = false;

  componentDidMount() {
    const accessToken = localStorage.getItem("access_token");

    // user is logged in if we have an access token
    if (accessToken) {
      this.setIsLoggedIn();
    } else if (window.location.hash) {
      // if we are redirected, we parse the 'access_token' has and store in local storage
      const accessToken = window.location.hash.substring("#access_token=".length);

      localStorage.setItem("access_token", accessToken);
      this.setIsLoggedIn();
    }
  }

  @action
  setIsLoggedIn = () => {
    this.isLoggedIn = true;
  }

  render() {
    // // if we get an access token, then the user is logged in
    // const accessToken = localStorage.getItem("access_token");

    if (!this.isLoggedIn) {
      return <LoginFlow />
    } else {
      return <TrackComparison />
    }
  }
}

export default Entry;
