const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(__path + '/views/index.html', {title: "test"});
});

module.exports = router;
