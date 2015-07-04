var UserDAS                 = require("./dataAccessServices/UserDAS.js"),
    RequestService          = require("./RequestService.js"),
    AuthenticationService	= require("./AuthenticationService.js"),
    errorMessageConstant    = require("../technical/constants/ErrorMessageConstant.js"),
    successMessageConstant  = require("../technical/constants/SuccessMessageConstant.js");

var updateLoginInfo = function(request, User, callback){
  console.log("[START][AccountManageService][updateLoginInfo]");
  RequestService.getTokenFromRequest(request, function(token){
      if(token){
        console.log("[WORKING][AccountManageService][updateLoginInfo] token trouvé, mise à jour BDD du user");
        var param = {"token":token};
        UserDAS.getUserBy(User, param, function(error, user){
          if(user){
            console.log("[WORKING][AccountManageService][updateLoginInfo] user by token trouvé");
            var arrayOfUserDataFromRequest = request.body;
            var arrayOfUserDataToUpdate = {};

            if(arrayOfUserDataFromRequest.usrLogin !== undefined && arrayOfUserDataFromRequest.usrLogin !== ""){
            	arrayOfUserDataToUpdate.usrLogin = arrayOfUserDataFromRequest.usrLogin;
            }
            if(arrayOfUserDataFromRequest.usrPassword !== undefined && arrayOfUserDataFromRequest.usrPassword !== ""){
            	arrayOfUserDataToUpdate.usrPassword = AuthenticationService.hashPassword(arrayOfUserDataFromRequest.usrPassword);
            }

            UserDAS.updateUser(user, arrayOfUserDataToUpdate, function(error, user){
              if(user){
                console.log("[WORKING][AccountManageService][updateLoginInfo] Mise à jour de l'utilisateur effectuée");
                callback("this is good", user);
              }
              else{
              	callback("this is not good update dont", null);
              }
              
            });
          }else{
            console.log("[END][AccountManageService][updateLoginInfo] user by token non trouvé, déconnexion auto");
            callback("this is not good user non trouvé", null);
          }
        });
      }
      else{
        console.log("[END][AccountManageService][updateLoginInfo] token non trouvé, déconnexion auto");
        callback("this is not good token non trouvé", null);
      }
    });
};

module.exports = {
  updateLoginInfo: updateLoginInfo
}