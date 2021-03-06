var express = require("express"), // Framework minimalist offrant des utilitaires HTTP
    expressSession = require('express-session'), // Middleware de gestion de session pour Express
    bodyParser = require("body-parser"), // Middleware permettant de parser le body de la HttpRequest
    passport = require('passport'), // Middleware offrant des services d'authentifcation
    localStrategy = require('passport-local').Strategy, // Strategy Passport pour authentifier un utilisateur via son identifiant/password
    jwt = require('jsonwebtoken'), // JSON Web Token implementation
    models = require("./model/Models.js");

// Options de session
var sessionOpts = {
    saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store
    resave: false, // Forces the session to be saved back to the session store
    secret: 'secretStringForSessionOpts', // This is the String used to sign the session ID cookie
    cookie: {
        httpOnly: true,
        maxAge: 60
    } // TO_COMMENT
}

var agilogServer = express();

agilogServer.use(express.static(__dirname + '/../public'));
agilogServer.set('views', __dirname + '/views');
agilogServer.set('view engine', 'jade');
agilogServer.use(expressSession(sessionOpts)); // On affecte au middleware express-session les options créées plus tôt
agilogServer.use(passport.initialize()); // Initialisation du module passport
agilogServer.use(passport.session()); // Initialisation de la partie gestion de session par passport
agilogServer.use(bodyParser.urlencoded({
    'extended': 'true'
})); // Middleware that parses urlencoded bodies
agilogServer.use(bodyParser.json()); // Idem                     
// Configuration du header de la response
// Access-Control-Allow-Origin : signifie que la ressource peut être accédée de n'importe quel domaine de manière croisée
// Access-Control-Allow-Methods : indique que les  méthodes POST, GET sont des méthodes acceptables pour aller quérir la ressource en question
// Access-Control-Allow-Headers : Which HTTP headers can be used when making the actual request
agilogServer.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});


// Chargement des strategy relatives à l'authentification
require('./services/AuthenticationService.js').passportRules(agilogServer, passport, localStrategy);

require("./api/AuthenticationController.js")(agilogServer, passport);
require("./api/AccountManagerController.js")(agilogServer);
require("./api/ProjectManagerController.js")(agilogServer);
require("./api/RootController.js")(agilogServer);

models.sequelize.sync().then(function () {
  var server = agilogServer.listen(3131, function() {
    console.log('Express server listening on port ' + server.address().port);
  });
});