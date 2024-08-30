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
                    data: 'fields name, genres, summary, cover.url; limit 15;'
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

    return { games, loading, error };
}
