import React from 'react';
import { IGDB } from '../components/IGDB/IGDB';

export default function App() {
    const { games, loading, error } = IGDB();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching games: {error.message}</p>;

    return (
        <div className='container'>
            {games.map(game => (
                <div key={game.id}>
                    <h2>{game.name}</h2>
                    <p>{game.summary}</p>
                    {game.cover && <img src={game.cover.url} alt={game.name} />}
                </div>
              
            ))}
        </div>
    );
}
