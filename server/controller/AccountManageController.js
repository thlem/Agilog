var AccountManageService  = require("../business/AccountManageService.js"),
    ErrorMessageConstant   = require("../technical/constants/ErrorMessageConstant.js"),
    SuccessMessageConstant = require("../technical/constants/SuccessMessageConstant.js"),
    ResponseCodeConstant   = require("../technical/constants/ResponseCodeConstant.js");

module.exports = function(agilogServer){

  var User = agilogServer.get("models").User;

  /**
   * Route appelée lors de la soumissions du formulaire de mise à jour
   * des données de connexion de l'utilisateur
   * @param  {HttpRequest} request      La HttpRequest   
   * @param  {HttpResponse response     La HttpResponse
   * @return {HttpResponse}             Retourne le code ainsi que le message retournée et/ou le User
   */
  agilogServer.post("/account/update/logininfo", function(request, response){

  	AccountManageService.updateLoginInfo(request, User, function(message, user){
  		if(user){
  			response.status(200).json({message:message, user:user});
  		}
  		else{
  			response.status(200).json({message:message, user:null});
  		}
  	});

  });

  /**
   * Route appelée lors de la soumissions du formulaire de mise à jour
   * des données personnelles de l'utilisateur
   * @param  {HttpRequest} request      La HttpRequest   
   * @param  {HttpResponse response     La HttpResponse
   * @return {HttpResponse}             Retourne le code ainsi que le message retournée et/ou le User
   */
  agilogServer.post("/account/update/personalinfo", function(request, response){

    AccountManageService.updatePersonalInfo(request, User, function(message, user){
      if(user){
        response.status(200).json({message:message, user:user});
      }
      else{
        response.status(200).json({message:message, user:null});
      }
    });
  });

  agilogServer.get('/account/delete', function(request, response){
    AccountManageService.deleteAccount(request, User, function(message, success){
      if(success){
        response.status(200).json({message:message, success:success});
      }
      else{
        response.status(200).json({message:message});
      }
    });
  });

}