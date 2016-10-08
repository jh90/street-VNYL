INSERT INTO playlists (title, creator_id, location) VALUES ($1, $2, $3) RETURNING *;
