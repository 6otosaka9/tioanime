const request = require("request");
const express = require("express")
const router = express.Router()

const animeSearch = async (name) => {
  datos = [];
  search1 = name.split(" ").join("+");
  search = search1.normalize("NFD").replace(/[\u0300-\u036f]/gi, "");
  console.log(search);
  
  const url = `https://tioanime.com/directorio?q=${search}`;
  request(url, (err, req, body) => {
    if (err) return console.log(err);
    var regExp = `<h3 class="title">`
    
     // console.log(body)
    regExpThumb = /<div class="thumb"><figure class="fa-play-circle"><img src=\".+?\"/g;
    //regExpName = /<h3 class="title"\>.+?\>/h3>/g;
    regExpUrl = /<a href=\".+?\"> /g;
    data = body.match(regExpThumb)
    thimb = data[0].slice(`<div class="thumb"><figure class="fa-play-circle"><img src=`)
      
    var regExp2 = /\"\/.+?\"/g
    var regExp3 = /class="title"\>.+?\</g;
      for (let index of datos) {
        var reg = index.match(regExp2)
        var reg2 = index.match(regExp3)
        var reg3 = reg2[0].split(`/class="title"`).join('').split('<').join('');
        console.log(reg2)
      }
      
      //console.log(data[0].slice(59))
   
  });
  
};

module.exports = { animeSearch };