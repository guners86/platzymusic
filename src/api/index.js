import config from "./config";

const {apiKey} = config;
const URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=:country&api_key=${apiKey}&format=json`;

export default function getArtists(country) {
    const NEWURL = URL.replace(':country',country);

    return fetch(NEWURL)
        .then(res => res.json())
        .then(data => data.topartists.artist);
}