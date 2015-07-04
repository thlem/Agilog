var AccountManageService  = require("../business/AccountManageService.js"),
    ErrorMessageConstant   = require("../technical/constants/ErrorMessageConstant.js"),
    SuccessMessageConstant = require("../technical/constants/SuccessMessageConstant.js"),
    ResponseCodeConstant   = require("../technical/constants/ResponseCodeConstant.js");

module.exports = function(agilogServer){

  var User = agilogServer.get("models").User;

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

}