INSERT INTO tracks (title, artist, preview) VALUES ($1, $2, $3) RETURNING *;
