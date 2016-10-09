const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

function sql(file) {
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath, { minify: true });
}

const sqlProvider = {
  users: {
    all: sql('./user/all.sql'),
    find: sql('./user/find.sql'),
    create: sql('./user/create.sql'),
    delete: sql('./user/delete.sql'),
  },
  playlists: {
    all: sql('./playlist/all.sql'),
    find: sql('./playlist/find.sql'),
    create: sql('./playlist/create.sql'),
    delete: sql('./playlist/delete.sql'),
  },
  //tracks?
};

module.exports = sqlProvider;
