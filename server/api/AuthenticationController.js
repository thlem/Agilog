var Api = require('./ApiConstant.js'),
    AuthenticationService = require("../services/AuthenticationService.js"),
    ErrorMessageConstant = require("../technical/constants/ErrorMessageConstant.js"),
    SuccessMessageConstant = require("../technical/constants/SuccessMessageConstant.js"),
    ResponseCodeConstant = require("../technical/constants/ResponseCodeConstant.js");

module.exports = function(agilogServer, passportService) {

    //
    //
    // Call when Register Form is submited
    //
    //
    agilogServer.post(Api.AUTHENTICATION_REGISTER, function(httpRequest, httpResponse, next) {

        passportService.authenticate('register-strategy', function(errorMessage, registeredUser, successMessage) {

            if (registeredUser) {

                httpRequest.login(registeredUser, function(httpRequestLoginError) {

                    if (httpRequestLoginError) {

                        httpResponse.status(ResponseCodeConstant.INTERNAL_ERROR).json({

                            message: ErrorMessageConstant.INTERNAL_ERROR + ' : ' + httpRequestLoginError

                        });

                    } else {

                        httpResponse.status(ResponseCodeConstant.SUCCESS).json({

                            message: successMessage,
                            user: registeredUser

                        });

                    }

                });

            } else {

                if (errorMessage) {

                    httpResponse.status(ResponseCodeConstant.BAD_REQUEST).json({

                        message: errorMessage

                    });

                } else {

                    httpResponse.status(ResponseCodeConstant.INTERNAL_ERROR).json({

                        message: ErrorMessageConstant.INTERNAL_ERROR

                    });

                }
            }

        })(httpRequest, httpResponse, next);

    });

    //
    //
    // Call when Login Form is submited
    //
    //
    agilogServer.post(Api.AUTHENTICATION_LOGIN, function(httpRequest, httpResponse, next) {

        passportService.authenticate('login-strategy', function(errorMessage, loggedUser, successMessage) {

            if (loggedUser) {

                httpRequest.login(loggedUser, function(httpRequestErrorMessage) {

                    if (httpRequestErrorMessage) {

                        httpResponse.status(ResponseCodeConstant.INTERNAL_ERROR).json({

                            message: ErrorMessageConstant.INTERNAL_ERROR + ' : ' + httpRequestErrorMessage

                        });

                    } else {
                        httpResponse.status(ResponseCodeConstant.SUCCESS).json({

                            message: successMessage,
                            user: loggedUser

                        });

                    }
                });
            } else {

                if (errorMessage) {

                    httpResponse.status(ResponseCodeConstant.BAD_REQUEST).json({

                        message: errorMessage

                    });

                } else {

                    httpResponse.status(ResponseCodeConstant.INTERNAL_ERROR).json({

                        message: ErrorMessageConstant.INTERNAL_ERROR

                    });

                }
            }
        })(httpRequest, httpResponse, next);
    });

    //
    //
    // Call when Logout is asked
    //
    //
    agilogServer.get(Api.AUTHENTICATION_LOGOUT, function(request, response) {

        AuthenticationService.logout(request, function() {

            response.status(ResponseCodeConstant.SUCCESS).json({

                message: SuccessMessageConstant.SUCCESS_LOGOUT

            });

        });
    });

}