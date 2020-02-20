import React from "react";
import Button from '@material-ui/core/Button';
import { login } from "../../services/TransportLayer";

class LoginFlow extends React.Component {
  componentDidMount() {
    console.log("login flow mount")
  }

  redirectToLogin = () => {
    const loginURL = `https://accounts.spotify.com/authorize?client_id=9096ba7eb7994e908c31dae5d5d91a3c&redirect_uri=http://localhost:3000&scope=user-read-private%20user-read-email&response_type=token&state=123&show_dialog=true`;
    window.open(loginURL, "LoginView");
  }

  render() {
    return (
      <Button
        onClick={this.redirectToLogin}
        variant="contained"
        color="primary"
      >
        Login
      </Button>
    )
  }
}

export default LoginFlow;
