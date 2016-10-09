DROP DATABASE IF EXISTS streetvnyl;
CREATE DATABASE streetvnyl;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL
);

CREATE TABLE playlists (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users (id),
  title VARCHAR NOT NULL,
  lat FLOAT NOT NULL,
  long FLOAT NOT NULL
);

CREATE TABLE tracks (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  artist VARCHAR NOT NULL,
  preview_url VARCHAR NOT NULL
);

CREATE TABLE playlists_tracks (
  playlist_id INTEGER REFERENCES playlists (id),
  track_id INTEGER REFERENCES tracks (id)
);
