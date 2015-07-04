var UserDAS                 = require("./dataAccessServices/UserDAS.js"),
    RequestService          = require("./RequestService.js"),
    errorMessageConstant    = require("../technical/constants/ErrorMessageConstant.js"),
    successMessageConstant  = require("../technical/constants/SuccessMessageConstant.js"),
    bcrypt                  = require('bcrypt-nodejs'),
    jwt                     = require('jsonwebtoken'),
    User;


var passportRules = function(agilogServer, passport, LocalStrategy) {

  User = agilogServer.get("models").User;

  passport.serializeUser(function(user, callback) {
        return callback(null, user.usrId);
    });

    passport.deserializeUser(function(id, callback) {
        var param = {"usrId" : id};
        UserDAS.getUserBy(User, param, function(error, user) {
            return callback(error, user);
        });
    });

    /**
     * Strategy Passport qui permet d'enregistrer un nouvel utilisateur.
     * Effectue une vérification sur le login, et effectue 
     * la connexion de l'utilisateur après enregistrement.
     */
    passport.use('register-strategy', new LocalStrategy({
        usernameField : 'usrLogin',
        passwordField : 'usrPassword',
        passReqToCallback : true
    },
    // Callback(error, user, success)
    function(request, usrLogin, usrPassword, callback) {

      console.log("[START][AuthenticationService][register-strategy]");

      var param = {"usrLogin" : usrLogin};

      console.log("[WORKING][AuthenticationService][register-strategy] Recherche d'utilisateur identique");

      // Vérification de la présence du login désiré en BDD
      UserDAS.getUserBy(User, param, function(error, user){
        // Si un user existe déjà sous ce login, on renvoie une erreur
        if(user){

          console.log("[END][AuthenticationService][register-strategy] utilisateur déjà présent en BDD");
          // Callback(error, user, success)
          return callback(errorMessageConstant.REGISTER_ERROR_USERNAME_ALREADY_IN_USE, null, null);
        }
        // Si aucun user lié au login n'a été trouvé
        else{

          console.log("[WORKING][AuthenticationService][register-strategy] Utilisateur non trouvé, on peut l'enregistrer");
          // Récupération des paramètres de la request POST
          var arrayOfUserData = request.body;

          console.log("[WORKING][AuthenticationService][register-strategy] hash du password");
          // Hash du password avant insertion en BDD
          arrayOfUserData.usrPassword = hashPassword(arrayOfUserData.usrPassword);

          console.log("[WORKING][AuthenticationService][register-strategy] Création de l'utilisateur");
          // Insertion du nouveau user en BDD
          UserDAS.createUser(User, arrayOfUserData, function(error, user){
            // Si l'utilisateur a correctement été effectué
            if(user){

              console.log("[WORKING][AuthenticationService][register-strategy] Utilisateur créé, refresh de son token");
              // On refresh son token qui indique qu'il est connecté
              refreshToken(user, function(user){

                console.log("[END][AuthenticationService][register-strategy] Token rafraichie");
                // On retire le password pour ne pas l'envoyer côté client
                user.usrPassword = "";
                // Callback(error, user, success)
                return callback(null, user, successMessageConstant.REGISTER_SUCCESS);
              });
            }
            // Si l'utilisateur n'a pas été créé
            else{

              console.log("[END][AuthenticationService][register-strategy] Token non rafraichie");
              // Callback(error, user, success)
              return callback(error, null, null);
            }
          });
        }
      });
    }));

  passport.use('login-strategy', new LocalStrategy({
      usernameField : 'usrLogin',
      passwordField : 'usrPassword',
      passReqToCallback : true
    },
    // Callback(error, user, success)
    function(request, usrLogin, usrPassword, callback) {

      console.log("[START][AuthenticationService][login-strategy]");

      var param = {"usrLogin" : usrLogin};

      console.log("[WORKING][AuthenticationService][login-strategy] Recherche du User by login");

      // Vérification de la présence du login désiré en BDD
      UserDAS.getUserBy(User, param, function(error, user){
      // Si un user existe déjà sous ce login, on renvoie une erreur
      if(user){
        console.log("[WORKING][AuthenticationService][login-strategy] User trouvé, comparaison password");
        if(validPassword(user, usrPassword)){
          console.log("[WORKING][AuthenticationService][login-strategy] Password ok, refresh du token");
          refreshToken(user, function(user){

            console.log("[END][AuthenticationService][login-strategy] Token rafraichie, retour au front");
            // On retire le password pour ne pas l'envoyer côté client
            user.usrPassword = "";
            // Callback(error, user, success)
            return callback(null, user, successMessageConstant.LOGIN_SUCCESS);
          });
        }
        else{
          console.log("[END][AuthenticationService][login-strategy] Password différents, retour au front");
          // Callback(error, user, success)
          return callback(errorMessageConstant.LOGIN_ERROR, user, null);
        }
      }
      // Si aucun user lié au login n'a été trouvé
      else{
        console.log("[END][AuthenticationService][login-strategy] User non trouvé");
        // Callback(error, user, success)
        return callback(errorMessageConstant.LOGIN_ERROR, user, null);
      }
    });
  }));

};

var hashPassword = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

var validPassword = function(user, password){
  return bcrypt.compareSync(password, user.usrPassword);
};

var refreshToken = function(user, callback){

    var tokenData = {
        login: user.login,
        firstName: user.firstName,
        lastName: user.lastName
    }

    user.token = jwt.sign(tokenData, 'secretjwttoken', { expiresInMinutes : 60 });

    UserDAS.updateUser(user,{token:user.token}, function(error,user){
        callback(user);
    });
};

var hidePasswordForResponse = function(user){
    user.password = '';
    return user;
};

var logout = function(request, callback){
  console.log("[START][AuthenticationService][logout]");
  RequestService.getTokenFromRequest(request, function(token){
      if(token){
        console.log("[WORKING][AuthenticationService][logout] token trouvé, mise à jour BDD du user");
        var param = {"token":token};
        UserDAS.getUserBy(User, param, function(error, user){
          if(user){
            console.log("[WORKING][AuthenticationService][logout] user by token trouvé");
            var arrayOfUserDataToUpdate = {};
            arrayOfUserDataToUpdate.token = "";
            UserDAS.updateUser(user, arrayOfUserDataToUpdate, function(error, user){
              if(error){
                console.log("[WORKING][AuthenticationService][logout] Erreur lors de la mise à jour : "+error);
              }
              console.log("[END][AuthenticationService][logout] Mise à jour du token effectuée");
              callback();
            });
          }else{
            console.log("[END][AuthenticationService][logout] user by token non trouvé, déconnexion auto");
            callback();
          }
        });
      }
      else{
        console.log("[END][AuthenticationService][logout] token non trouvé, déconnexion auto");
        callback();
      }
    });
};

module.exports = {
  passportRules: passportRules,
  hashPassword: hashPassword,
  validPassword: validPassword,
  refreshToken: refreshToken,
  hidePasswordForResponse: hidePasswordForResponse,
  logout: logout
}