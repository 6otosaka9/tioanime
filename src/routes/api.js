const express = require('express');
const request = require('request');
//onstt fetch = (...args) => import('node-fetch');
const path = require('path');
const router = express.Router();

const apiKeys = "6otosaka9"
/*
router.get('/', (req, res) => {
  res.sendFile(__path + '/views/api.html', { title: "Api-page"});
});
*/
router.get('/creator', (req, res, next) => {
  var apikeyInput = req.query.apikey;
  if(apiKeys.includes(apikeyInput)) {
    const jsonme = {
      name: "otosaka",
      number: "+51 993 966 345",
      title: "my creator",
      youtube: "6otosaka9"
    };
    res.json(jsonme);
  }
  if(!apikeyInput) {
    var jsonN = {
      error: "no hay apikey"
    };
    res.json(jsonN);
  }
  if (apikeyInput !== apiKeys) {
    fail = { 
      error: "apikey incorrecta" 
      
    };
    res.json(fail);
  }
  //res.render('settings.html', {title: "Pagina de Ajustes"})
});

router.get('/meme', (req, res, next) => {
  var apikeyInput = req.query.apikey;
  if (!apikeyInput) {
    jsonError = {
      error: "porfabor introduzca la apikey"
    };
    res.json(jsonError);
  }
  
  if (apiKeys.includes(apikeyInput)) {
    memes = ['meme1', 'meme2', 'meme3', 'meme4', 'meme5', 'meme6', 'meme7', 'meme8', 'meme9', 'meme10'];
    
    ranM = memes[Math.floor(Math.random() * memes.length)];
    
    memeL = {
      meme: ranM
    };
    res.json(memeL);
  }
  
  if (apikeyInput !== apiKeys) {
    jsonError = {
      error: "apikey erronea"
    };
    res.json(jsonError);
  }
  
  
  
});

router.get('/tioanime', (req, res, next) => {
  name = req.query.name;
  
  //inicia animeSearch()
  const animeSearch = async (name) => {
  datos = [];
  search1 = name.split(" ").join("+");
  search = search1.normalize("NFD").replace(/[\u0300-\u036f]/gi, "");
  const url = `https://tioanime.com/directorio?q=${search}`;
  const host = 'https://tioanime.com'
  
  //request
  try {
   request(url, async (err, req, body) => {
    if (!body.includes(`<li class="col-6 col-sm-4 col-md-3 col-xl-2">`)) {
      res.json({
        developer: "6otosaka9",
        error: "Resultado no encontrado",
        code: "404"
      });
    } else {
    var regExp = `<h3 class="title">`;
    var regExpThumb = /<div class="thumb"><figure class="fa-play-circle"><img src=\".+?\"/g;
    var regExp2 = /<a href=\"\/.+?\">/g
    var regExp3 = /class="title"\>.+?\</g;
    var regThumb = body.match(regExpThumb)
    var reg = body.match(regExp2)
    var reg2 = body.match(regExp3)
      
    //funciones para los datos obtenidos
    const thumb = (orden) => {
      var ordi1 = parseInt(orden)
      var reg32 = regThumb[ordi1].slice(60)
      var portada = reg32.substring(0, reg32.length - 1)
      return portada
    }
      
    const urlAnime = (orden) => {
      var ordi = parseInt(orden)
      var reg31 = reg[ordi].slice(9)
      var link = reg31.substring(0, reg31.length - 2)
      return link
    }
      
    const namer = (orden) => {
      var ord = parseInt(orden)
      var reg3 = reg2[ord].slice(14)
      var animeName = reg3.substring(0, reg3.length - 1)
      return animeName
    }
    
    //Para obtener la descripción e información extra
    request(`${host + urlAnime("0")}`, (errp, req, index) => {
      if (errp) {
        res.json({
        developer: "6otosaka9",
        error: "Resultado no encontrado",
        code: "404"
      });
      
      } else {
        
        //confirmación
        var regDescrip = /<meta property="og:description" content=\".+?\"/g;
        var desc_anime = index.match(regDescrip)
        var regp1 = desc_anime[0].slice(41)
        var description = regp1.substring(0, regp1.length -2)
        var regType = /anime-type-peli"\>.+?\<./g;
        var prevType = index.match(regType)
        var typePrev = prevType[0].substring(0, prevType[0].length -2)
        var type = typePrev.slice(17)
        var regStatus = /btn-block status...i class=.fa-play-circle....i\>.+?\</g;
        var prevStatus = index.match(regStatus)
        var statusPrev = prevStatus[0].slice(48)
        var status = statusPrev.substring(0, statusPrev.length -1)
        try {
         var regYear = /class="year"\>.+?\</g;
         var dataYear = index.match(regYear)
         var prevYear = dataYear[0].slice(13)
         var year = prevYear.substring(0, prevYear.length -1)
        } catch (e) {
         var year = "--/--"
        }
        
        try {
         var regCaps = /episodes = \[.+?\,/g;
         var dataCap = index.match(regCaps)
         var prevCap = dataCap[0].slice(12)
        } catch (jotito) {
         console.log(jotito)
         var regCaps = /episodes = \[.+?\]/g;
         var dataCap = index.match(regCaps)
         var prevCap = dataCap[0].slice(12)
        }
        
        var episodes = prevCap.substring(0, prevCap.length -1)
        
        var resUlt = datos.push({
          title: namer("0"),
          image: host + thumb("0"),
          description: description,
          type: type,
          status : status,
          year: year,
          episodes: `${episodes}`,
          url: host + urlAnime("0")
        })
      }
    
      res.json({
        developer: "6otosaka9",
        result: datos
      });
    });
    }
    
  });
  } catch (error1) {
   res.json( {
    error: "error interno desconocido"
   })
   console.log(error1)
  }
  
  };
  animeSearch(name)
  //termina animeSearch()
 
   
  
});

module.exports = router;
