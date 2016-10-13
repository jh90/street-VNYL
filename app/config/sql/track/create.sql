INSERT INTO tracks (playlist_id, title, artist, preview_url) VALUES ($1, $2, $3, $4) RETURNING *;
