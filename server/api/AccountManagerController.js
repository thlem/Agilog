var Api = require('./ApiConstant.js'),
	AccountManageService = require("../services/AccountManageService.js"),
	ErrorMessageConstant = require("../technical/constants/ErrorMessageConstant.js"),
	SuccessMessageConstant = require("../technical/constants/SuccessMessageConstant.js"),
	ResponseCodeConstant = require("../technical/constants/ResponseCodeConstant.js");

module.exports = function(agilogServer) {

	//
	//
	// Call when Account Manager login info form is submited
	//
	//
	agilogServer.post(Api.ACCOUNT_MANAGE_UPDATE_LOGIN_INFO, function(httpRequest, httpResponse) {

		AccountManageService.updateLoginInfo(httpRequest, function(updatedUser, sucessMessage, errorMessage) {

			if (updatedUser) {

				httpResponse.status(ResponseCodeConstant.SUCCESS).json({
					message: sucessMessage,
					user: updatedUser
				});

			} else {

				if (errorMessage) {

					httpResponse.status(ResponseCodeConstant.BAD_REQUEST).json({
						message: errorMessage,
						user: null
					});

				} else {
					httpResponse.status(ResponseCodeConstant.INTERNAL_ERROR).json({
						message: ErrorMessageConstant.INTERNAL_ERROR,
						user: null
					});
				}

			}
		});

	});

	//
	//
	// Call when Account Manager personal info form is submited
	//
	//
	agilogServer.post(Api.ACCOUNT_MANAGE_UPDATE_PERSONAL_INFO, function(request, response) {

		AccountManageService.updatePersonalInfo(request, function(message, user) {

			if (user) {

				response.status(ResponseCodeConstant.SUCCESS).json({
					message: message,
					user: user
				});

			} else {

				response.status(ResponseCodeConstant.SUCCESS).json({
					message: message,
					user: null
				});

			}
		});
	});

	//
	//
	// Call when Account Manager delete button is clicked
	//
	//
	agilogServer.get(Api.ACCOUNT_MANAGE_DELETE, function(request, response) {

		AccountManageService.deleteAccount(request, function(successMessage, errorMessage) {

			if (successMessage) {

				response.status(ResponseCodeConstant.SUCCESS).json({
					message: successMessage,
					success: true
				});

			} else {

				if(errorMessage){

					response.status(ResponseCodeConstant.INTERNAL_ERROR).json({
						message: errorMessage
					});

				} else{
					response.status(ResponseCodeConstant.INTERNAL_ERROR).json({
						message: ErrorMessageConstant.INTERNAL_ERROR
					});
				}

			}
		});
	});

}