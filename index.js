__path = process.cwd()
const express = require('express');
const cors = require('cors');
const secure = require('ssl-express-www');
const app = express();
const path = require('path');
const routes = require('./src/routes/api');

//Settings
app.set('views', path.join(__dirname, 'views'))
const puerto = process.env.PORT || 8080 || 5000 || 3000
app.enable('trust proxy');
app.set("json spaces", 2);
app.use(express.static("public"));
app.set("rootP", path.join(__dirname))
//app.use(secure);

//middlewares


//rutas
app.enable('trust proxy');
app.use(cors());
app.use(secure);
app.use('/api', require('./src/routes/api'));
app.use('/', require('./src/routes/routes'));
//app.use('/', 'routes/routes');


//static files


//Escuchando servidor en el puerto 3000
app.listen(puerto, () => {
  console.log(`Servidor en puerto ${puerto}`);
});

module.exports = app
