INSERT INTO playlists (uid, title, lat, lng) VALUES ($1, $2, $3, $4) RETURNING *;
