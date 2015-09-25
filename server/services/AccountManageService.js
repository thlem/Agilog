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
                                    callback(null, user, successMessageConstant.ACCOUNT_MANAGE_LOGIN_UPDATED);

                                } else {

                                    callback(errorMessageConstant.ACCOUNT_MANAGE_LOGIN_UPDATE_ERROR + ' : '+error, null, null);

                                }
                            });
                        } else {

                            callback(errorMessageConstant.ACCOUNT_MANAGE_NOTHING_TO_UPDATE, null, null);

                        }
                    }, function(message) {

                        callback(errorMessageConstant.ACCOUNT_MANAGE_LOGIN_UPDATE_ERROR + ' '+message, null, null);

                    });
                } else {

                    callback(errorMessageConstant.USER_NOT_FOUND, null, null);

                }
            });
        } else {

            callback(errorMessageConstant.TOKEN_NOT_FOUND, null, null);

        }
    });
};

var updatePersonalInfo = function(request, callback) {

    RequestService.getTokenFromRequest(request, function(token) {

        // Si le token a bien été récupéré
        if (token) {

            var param = {
                "userToken": token
            };
            UserDAS.getUserBy(param, function(error, userToUpdate) {

                if (userToUpdate) {

                    var arrayOfUserDataFromRequest = request.body;

                    var arrayOfUserDataToUpdate = {};
                    arrayOfUserDataToUpdate.userFirstName = arrayOfUserDataFromRequest.userFirstName;
                    arrayOfUserDataToUpdate.userLastName = arrayOfUserDataFromRequest.userLastName;
                    arrayOfUserDataToUpdate.userMail = arrayOfUserDataFromRequest.userMail;

                    UserDAS.updateUser(userToUpdate, arrayOfUserDataToUpdate, function(error, userUpdated) {

                        if (userUpdated) {

                            userUpdated = AuthenticationService.hidePasswordForResponse(userUpdated);
                            callback(successMessageConstant.ACCOUNT_MANAGE_PERSONAL_UPDATED, userUpdated);

                        } else {

                            callback(errorMessageConstant.ACCOUNT_MANAGE_PERSONAL_UPDATE_ERROR +' '+ error, null);

                        }

                    });
                }
            });
        }
    });
};

var deleteAccount = function(request, callback) {
    RequestService.getTokenFromRequest(request, function(token) {
        if (token) {
            var param = {
                "userToken": token
            };
            UserDAS.getUserBy(param, function(error, user) {
                if (user) {
                    UserDAS.deleteUser(user, function() {
                        callback(successMessageConstant.ACCOUNT_MANAGE_DELETED, null);
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