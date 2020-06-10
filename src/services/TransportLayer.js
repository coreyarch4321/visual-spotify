import axios from "axios"

const loginString = `https://accounts.spotify.com/authorize?client_id=9096ba7eb7994e908c31dae5d5d91a3c&redirect_uri=http://localhost:3000&scope=user-read-private%20user-read-email%20user-top-read&response_type=token&state=123&show_dialog=true`
const baseURL = "https://api.spotify.com/v1";

const accessToken = localStorage.getItem("access_token");

export const login = () => axios.get(loginString);

// export const getTracksByArtist = (artist) => axios.get(`${baseURL}/search?q=${artist}&type=track`, {
//   headers: {
//     Authorization: "Bearer " + accessToken //the token is a variable which holds the token
//   }
// });

export const getTopTracks = () => axios.get(`${baseURL}/me/top/tracks?time_range=medium_term&limit=10&offset=5`, {
  headers: {
    Authorization: "Bearer " + accessToken.split("&")[0],
  }
});
