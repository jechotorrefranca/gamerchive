// IGDB.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const IGDB_BASE_URL = '/v4';

console.log('CLIENT_ID:', process.env.REACT_APP_IGDB_CLIENT_ID);
console.log('ACCESS_TOKEN:', process.env.REACT_APP_IGDB_ACCESS_TOKEN);


export function IGDB() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios({
                    url: `${IGDB_BASE_URL}/games`,
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Client-ID': process.env.REACT_APP_IGDB_CLIENT_ID,
                        'Authorization': `Bearer ${process.env.REACT_APP_IGDB_ACCESS_TOKEN}`,
                    },
                    data: `fields id, name, summary, cover.url, cover.image_id, artworks.url, release_dates, rating, rating_count, genres, videos.video_id; limit 15;`
                });
                setGames(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const getCoverImageUrl = (imageId, size = 'cover_big') => imageId 
        ? `https://images.igdb.com/igdb/image/upload/t_${size}/${imageId}.jpg` : '';

    return { 
        games: games.map(game => ({
            ...game,
            cover: {
                ...game.cover,
                url: getCoverImageUrl(game.cover?.image_id, 'cover_big')
            }
        })), 
        loading, 
        error 
    };
}
