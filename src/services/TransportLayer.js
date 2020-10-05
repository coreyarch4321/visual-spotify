import axios from "axios";

export const searchCharities = (query) =>
    axios.post("monoserver/charities", {
        body: query,
    });
