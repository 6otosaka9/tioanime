const fetch = require('node-fetch');

const fetchJson = async (url) => {
 return fetch(url).then(response => response.json()).catch((err) => {
  throw new Error(err);
 });
};

module.exports = { fetchJson }
