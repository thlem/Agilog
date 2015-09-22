var UserDAS = require("./dataAccess/UserDAS.js"),
    RequestService = require("./RequestService.js"),
    errorMessageConstant = require("../technical/constants/ErrorMessageConstant.js"),
    successMessageConstant = require("../technical/constants/SuccessMessageConstant.js"),
    bcrypt = require('bcrypt-nodejs'),
    jwt = require('jsonwebtoken');


var passportRules = function(agilogServer, passport, LocalStrategy) {

    passport.serializeUser(function(user, callback) {
        return callback(null, user.userId);
    });

    passport.deserializeUser(function(id, callback) {
        var param = {
            "userId": id
        };
        UserDAS.getUserBy(param, function(error, user) {
            return callback(error, user);
        });
    });

    passport.use('register-strategy', new LocalStrategy({

            usernameField: 'userLogin',
            passwordField: 'userPassword',
            passReqToCallback: true

        },
        function(request, userLogin, userPassword, callback) {

            var param = {

                "userLogin": userLogin

            };

            UserDAS.getUserBy(param, function(error, user) {

                if (user) {

                    return callback(errorMessageConstant.REGISTER_ERROR_USERNAME_ALREADY_IN_USE, null, null);

                } else {

                    var arrayOfUserData = request.body;

                    arrayOfUserData.userPassword = hashPassword(arrayOfUserData.userPassword);

                    UserDAS.createUser(arrayOfUserData, function(error, user) {

                        if (user) {

                            refreshToken(user, function(user) {

                                user.userPassword = "";

                                return callback(null, user, successMessageConstant.REGISTER_SUCCESS);

                            });
                        } else {

                            return callback(error, null, null);

                        }
                    });
                }
            });
        }));

    passport.use('login-strategy', new LocalStrategy({

            usernameField: 'userLogin',
            passwordField: 'userPassword',
            passReqToCallback: true

        },

        function(request, userLogin, userPassword, callback) {


            var param = {

                "userLogin": userLogin

            };

            UserDAS.getUserBy(param, function(error, user) {

                if (user) {

                    if (validPassword(user, userPassword)) {

                        refreshToken(user, function(user) {

                            user.userPassword = "";

                            return callback(null, user, successMessageConstant.LOGIN_SUCCESS);

                        });

                    } else {

                        return callback(errorMessageConstant.LOGIN_ERROR, user, null);

                    }

                } else {


                    return callback(errorMessageConstant.LOGIN_ERROR, user, null);

                }
            });
        }));

};

var hashPassword = function(password) {

    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

};

var validPassword = function(user, password) {

    return bcrypt.compareSync(password, user.userPassword);

};

var refreshToken = function(user, callback) {

    var tokenData = {

        userLogin: user.userLogin,
        userFirstName: user.userFirstName,
        userLastName: user.userLastName

    }

    user.userToken = jwt.sign(tokenData, 'secretjwttoken', {

        expiresInMinutes: 60

    });

    UserDAS.updateUser(user, {

        userToken: user.userToken

    }, function(error, user) {

        callback(user);

    });
};

var hidePasswordForResponse = function(user) {

    user.userPassword = '';
    return user;

};

var logout = function(request, callback) {

    RequestService.getTokenFromRequest(request, function(token) {

        if (token) {

            var param = {

                "userToken": token

            };

            UserDAS.getUserBy(param, function(error, user) {

                if (user) {

                    var arrayOfUserDataToUpdate = {};
                    arrayOfUserDataToUpdate.userToken = "";

                    UserDAS.updateUser(user, arrayOfUserDataToUpdate, function(error, user) {

                        callback();

                    });

                } else {

                    callback();

                }

            });

        } else {

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