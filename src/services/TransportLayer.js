import axios from "axios";

const loginString = `https://accounts.spotify.com/authorize?client_id=9096ba7eb7994e908c31dae5d5d91a3c&redirect_uri=http://localhost:3000&scope=user-read-private%20user-read-email&response_type=token&state=123&show_dialog=true`

export const login = () => axios.get(loginString);
