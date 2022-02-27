const express = require('express');
const request = require('request');
const fetch = require('node-fetch');
const path = require('path');
const router = express.Router();
const { fetchJson } = require('../fetcher')
const { animeSearch } = require("../tioanime");

const apiKeys = "6otosaka9"

router.get('/tioanime', (req, res, next) => {
  name = req.query.name;
  animeSearch(name, res)
});
router.get('/meme', async (req, res, next) => {
  memesPrev = await fetchJson("https://raw.githubusercontent.com/6otosaka9/DATABASE/main/memes.json")
  randomMeme = memesPrev[Math.floor(Math.random() * memesPrev.length)]
  res.json({
    memeRandom: randomMeme
  });
});

module.exports = router;
