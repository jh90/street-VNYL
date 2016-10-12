INSERT INTO playlists (title, uid, lat, lng) VALUES ($1, $2, $3, $4) RETURNING *;
