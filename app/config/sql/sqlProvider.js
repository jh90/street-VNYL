const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

function sql(file) {
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath, { minify: true });
}

const sqlProvider = {
  users: {
    all: sql('./sql/user/all.sql'),
    find: sql('./sql/user/find.sql'),
    create: sql('./sql/user/create.sql'),
    delete: sql('./sql/user/delete.sql'),
  },
  playlists: {
    all: sql('./sql/playlist/all.sql'),
    find: sql('./sql/playlist/find.sql'),
    create: sql('./sql/playlist/create.sql'),
    delete: sql('./sql/playlist/delete.sql'),
  },
  //tracks?
};

module.exports = sqlProvider;
