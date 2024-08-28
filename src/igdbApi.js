import axios from "axios";

const CLIENT_ID = process.env.REACT_APP_IGDB_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_IGDB_CLIENT_SECRET;

console.log("Client ID:", CLIENT_ID);
console.log("Client Secret:", CLIENT_SECRET);

async function getAccessToken() {
  try {
    const response = await axios.post(
      `https://id.twitch.tv/oauth2/token`,
      new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'client_credentials'
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting access token:", error);
    return null;
  }
}

export async function fetchGames() {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    console.error("Failed to fetch access token.");
    return [];
  }

  try {
    const response = await axios({
      url: "https://api.igdb.com/v4/games",
      method: "POST",
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      data: "fields name, cover.url, summary, genres.name, rating; limit 10;"
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error.response ? error.response.data : error.message);
    return [];
  }
}
