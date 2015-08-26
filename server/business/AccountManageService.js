var UserDAS                 = require("./dataAccessServices/UserDAS.js"),
    RequestService          = require("./RequestService.js"),
    AuthenticationService	= require("./AuthenticationService.js"),
    errorMessageConstant    = require("../technical/constants/ErrorMessageConstant.js"),
    successMessageConstant  = require("../technical/constants/SuccessMessageConstant.js");

var updateLoginInfo = function(request, User, callback){
  console.log("[START][AccountManageService][updateLoginInfo]");

  // Récupération du token depuis la request
  RequestService.getTokenFromRequest(request, function(token){

      // Si le token a bien été récupéré
      if(token){
        console.log("[WORKING][AccountManageService][updateLoginInfo] token trouvé, mise à jour BDD du user");

        // Récupération du user par son token
        var param = {"token":token};
        UserDAS.getUserBy(User, param, function(error, user){
          // Si le user a bien été trouvé
          if(user){
            console.log("[WORKING][AccountManageService][updateLoginInfo] user by token trouvé");
            // Récupération des données du formulaire
            var arrayOfUserDataFromRequest = request.body;
            var arrayOfUserDataToUpdate = {};

            if(arrayOfUserDataFromRequest.usrPassword !== undefined && arrayOfUserDataFromRequest.usrPassword !== ""){
              arrayOfUserDataToUpdate.usrPassword = AuthenticationService.hashPassword(arrayOfUserDataFromRequest.usrPassword);
            }

            console.log("[WORKING][AccountManageService][updateLoginInfo] Before Promise");

            var updatePromise = new Promise(function(resolve, reject){
              // Si le formulaire contient le login
              // Il faut vérifier que celui ci n'est pas 
              // déjà utilisé
              console.log(arrayOfUserDataFromRequest);
              if(arrayOfUserDataFromRequest.usrLogin !== undefined
                && arrayOfUserDataFromRequest.usrLogin !== ""
                && arrayOfUserDataFromRequest.usrLogin !== user.usrLogin){

                console.log("[WORKING][AccountManageService][updateLoginInfo] Promise : login détecté");

                var param = {"usrLogin":arrayOfUserDataFromRequest.usrLogin};
                UserDAS.getUserBy(User, param, function(error, user){
                  if(user){
                    console.log("[WORKING][AccountManageService][updateLoginInfo] Promise : Login déjà utilisé");
                    reject(errorMessageConstant.UPDATE_ERROR_USERNAME_ALREADY_IN_USE);
                  }
                  else{
                    console.log("[WORKING][AccountManageService][updateLoginInfo] Promise : Login non utilisé");
                    arrayOfUserDataToUpdate.usrLogin = arrayOfUserDataFromRequest.usrLogin;
                    resolve();
                  }
                });
              }
              else{
                console.log("[WORKING][AccountManageService][updateLoginInfo] Promise : Aucun login détecté");
                resolve();
              }             
            });

            updatePromise.then(function(){
              console.log("[WORKING][AccountManageService][updateLoginInfo] Promise fire");
              if(Object.keys(arrayOfUserDataToUpdate).length !== 0){
                UserDAS.updateUser(user, arrayOfUserDataToUpdate, function(error, user){
                  if(user){
                    console.log("[WORKING][AccountManageService][updateLoginInfo] Mise à jour de l'utilisateur effectuée");
                    callback("Mise à jour du login effectuée", user);
                  }
                  else{
                    callback("Mise à jour du login non effectuée "+error, null);
                  }
                });
              }
              else{
                 callback(null, null);
              }
            }, function(message){
              callback("Promise error "+message, null);
            });
          }
          // Si aucun user associé au token
          else{
            console.log("[END][AccountManageService][updateLoginInfo] user by token non trouvé, déconnexion auto");
            callback("this is not good user non trouvé", null);
          }
        });
      }
      // Si le token n'a pas été récupéré
      else{
        console.log("[END][AccountManageService][updateLoginInfo] token non trouvé, déconnexion auto");
        callback("this is not good token non trouvé", null);
      }
    });
};

var updatePersonalInfo = function(request, User, callback){
  console.log("[START][AccountManageService][updateLoginInfo]");

  // Récupération du token depuis la request
  RequestService.getTokenFromRequest(request, function(token){

      // Si le token a bien été récupéré
      if(token){
        console.log("[WORKING][AccountManageService][updateLoginInfo] token trouvé, mise à jour BDD du user");

        // Récupération du user par son token
        var param = {"token":token};
        UserDAS.getUserBy(User, param, function(error, user){
          // Si le user a bien été trouvé
          if(user){
            console.log("[WORKING][AccountManageService][updateLoginInfo] user by token trouvé");

            // Récupération des données du formulaire
            var arrayOfUserDataFromRequest = request.body;

            console.log(arrayOfUserDataFromRequest.usrFirstName);

            var arrayOfUserDataToUpdate = {};
            arrayOfUserDataToUpdate.usrFirstName = arrayOfUserDataFromRequest.usrFirstName;
            arrayOfUserDataToUpdate.usrLastName = arrayOfUserDataFromRequest.usrLastName;
            arrayOfUserDataToUpdate.usrMail = arrayOfUserDataFromRequest.usrMail;

            UserDAS.updateUser(user, arrayOfUserDataToUpdate, function(error, user){
              if(user){
                console.log("[WORKING][AccountManageService][updateLoginInfo] Mise à jour de l'utilisateur effectuée");
                callback("Mise à jour du prénom effectuée", user);
              }
              else{
                callback("Mise à jour du prénom non effectuée "+error, null);
              }
            });
          }
        });
      }
    });     
};

module.exports = {
  updateLoginInfo: updateLoginInfo,
  updatePersonalInfo: updatePersonalInfo
}