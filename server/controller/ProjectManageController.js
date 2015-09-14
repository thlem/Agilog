var AccountManageService = require("../business/AccountManageService.js"),
    ErrorMessageConstant = require("../technical/constants/ErrorMessageConstant.js"),
    SuccessMessageConstant = require("../technical/constants/SuccessMessageConstant.js"),
    ResponseCodeConstant = require("../technical/constants/ResponseCodeConstant.js");

module.exports = function(agilogServer) {

    var User = agilogServer.get("models").User;

    /**
     * Route appelée lors de la soumissions du formulaire de mise à jour
     * des données de connexion de l'utilisateur
     * @param  {HttpRequest} request      La HttpRequest   
     * @param  {HttpResponse response     La HttpResponse
     * @return {HttpResponse}             Retourne le code ainsi que le message retournée et/ou le User
     */
    agilogServer.get("/project/getlist/:userId", function(request, response) {

        ProjectManageService.getUserProjectList(request.params.userId, function(message, projectList) {
            if (projectList) {
                response.status(200).json({
                    message: message,
                    projectList: projectList
                });
            } else {
                response.status(200).json({
                    message: message,
                    user: null
                });
            }
        });
    });
}