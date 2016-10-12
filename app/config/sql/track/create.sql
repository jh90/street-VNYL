INSERT INTO tracks (title, artist, preview, playlist-id) VALUES ($1, $2, $3, $4) RETURNING *;
