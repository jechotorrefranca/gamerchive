import React, { useEffect, useState } from "react";
import { fetchGames } from "../igdbApi";

function GameInfo() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function loadGames() {
      const gamesData = await fetchGames();
      setGames(gamesData);
    }

    loadGames();
  }, []);

  return (
    <div className="App">
      <h1>IGDB Games</h1>
      {games.length > 0 ? (
        <ul>
          {games.map((game) => (
            <li key={game.id}>
              <h2>{game.name}</h2>
              {game.cover && <img src={game.cover.url.replace("thumb", "cover_big")} alt={game.name} />}
              <p>{game.summary}</p>
              {game.genres && <p>Genres: {game.genres.map((genre) => genre.name).join(", ")}</p>}
              {game.rating && <p>Rating: {game.rating.toFixed(2)}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading games...</p>
      )}
    </div>
  );
}

export default GameInfo;
