var UserDAS = require("./dataAccess/UserDAS.js"),
    RequestService = require("./RequestService.js"),
    AuthenticationService = require("./AuthenticationService.js"),
    errorMessageConstant = require("../technical/constants/ErrorMessageConstant.js"),
    successMessageConstant = require("../technical/constants/SuccessMessageConstant.js");

var updateLoginInfo = function(request, callback) {

    RequestService.getTokenFromRequest(request, function(requestToken) {

        if (requestToken) {

            var param = {

                "userToken": requestToken

            };

            UserDAS.getUserBy(param, function(error, user) {

                if (user) {

                    var arrayOfUserDataFromRequest = request.body;
                    var arrayOfUserDataToUpdate = {};

                    if (arrayOfUserDataFromRequest.userPassword !== undefined
                        && arrayOfUserDataFromRequest.userPassword !== "") {

                        arrayOfUserDataToUpdate.userPassword =
                            AuthenticationService.hashPassword(arrayOfUserDataFromRequest.userPassword);

                    }

                    var updatePromise = new Promise(function(resolve, reject) {

                        if (arrayOfUserDataFromRequest.userLogin !== undefined
                            && arrayOfUserDataFromRequest.userLogin !== ""
                            && arrayOfUserDataFromRequest.userLogin !== user.userLogin) {

                            var param = {

                                "userLogin": arrayOfUserDataFromRequest.userLogin

                            };

                            UserDAS.getUserBy(param, function(error, user) {

                                if (user) {

                                    reject(errorMessageConstant.UPDATE_ERROR_USERNAME_ALREADY_IN_USE);

                                } else {

                                    arrayOfUserDataToUpdate.userLogin = arrayOfUserDataFromRequest.userLogin;
                                    resolve();

                                }
                            });
                        } else {

                            resolve();

                        }
                    });

                    updatePromise.then(function() {

                        if (Object.keys(arrayOfUserDataToUpdate).length !== 0) {

                            UserDAS.updateUser(user, arrayOfUserDataToUpdate, function(error, user) {

                                if (user) {

                                    user = AuthenticationService.hidePasswordForResponse(user);
                                    callback(successMessageConstant.ACCOUNT_MANAGE_LOGIN_UPDATED, user);

                                } else {

                                    callback(errorMessageConstant.ACCOUNT_MANAGE_LOGIN_UPDATE_ERROR + ' : '+error, null);

                                }
                            });
                        } else {

                            callback(null, null);

                        }
                    }, function(message) {

                        callback(errorMessageConstant.ACCOUNT_MANAGE_LOGIN_UPDATE_ERROR + ' '+message, null);

                    });
                } else {

                    callback("this is not good user non trouvé", null);

                }
            });
        } else {

            callback("this is not good token non trouvé", null);

        }
    });
};

var updatePersonalInfo = function(request, User, callback) {
    console.log("[START][AccountManageService][updateLoginInfo]");

    // Récupération du token depuis la request
    RequestService.getTokenFromRequest(request, function(token) {

        // Si le token a bien été récupéré
        if (token) {
            console.log("[WORKING][AccountManageService][updateLoginInfo] token trouvé, mise à jour BDD du user");

            // Récupération du user par son token
            var param = {
                "token": token
            };
            UserDAS.getUserBy(param, function(error, user) {
                // Si le user a bien été trouvé
                if (user) {
                    console.log("[WORKING][AccountManageService][updateLoginInfo] user by token trouvé");

                    // Récupération des données du formulaire
                    var arrayOfUserDataFromRequest = request.body;

                    var arrayOfUserDataToUpdate = {};
                    arrayOfUserDataToUpdate.usrFirstName = arrayOfUserDataFromRequest.usrFirstName;
                    arrayOfUserDataToUpdate.usrLastName = arrayOfUserDataFromRequest.usrLastName;
                    arrayOfUserDataToUpdate.usrMail = arrayOfUserDataFromRequest.usrMail;

                    UserDAS.updateUser(user, arrayOfUserDataToUpdate, function(error, user) {
                        if (user) {
                            user.usrPassword = '';
                            console.log("[WORKING][AccountManageService][updateLoginInfo] Mise à jour de l'utilisateur effectuée");
                            callback("Mise à jour du prénom effectuée", user);
                        } else {
                            callback("Mise à jour du prénom non effectuée " + error, null);
                        }
                    });
                }
            });
        }
    });
};

var deleteAccount = function(request, User, callback) {
    RequestService.getTokenFromRequest(request, function(token) {
        if (token) {
            var param = {
                "token": token
            };
            UserDAS.getUserBy(param, function(error, user) {
                if (user) {
                    UserDAS.deleteUser(user, function() {
                        callback("Account deleted", true);
                    });
                }
            });
        }
    });
};

module.exports = {
    updateLoginInfo: updateLoginInfo,
    updatePersonalInfo: updatePersonalInfo,
    deleteAccount: deleteAccount
}