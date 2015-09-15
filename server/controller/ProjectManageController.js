var UserDAS = require("../business/dataAccessServices/UserDAS.js"),
    ErrorMessageConstant = require("../technical/constants/ErrorMessageConstant.js"),
    SuccessMessageConstant = require("../technical/constants/SuccessMessageConstant.js"),
    ResponseCodeConstant = require("../technical/constants/ResponseCodeConstant.js");

module.exports = function(agilogServer) {

    var Project = agilogServer.get("models").Project;
    var User = agilogServer.get("models").User;

    /**
     * Route appelée lors de la soumissions du formulaire de mise à jour
     * des données de connexion de l'utilisateur
     * @param  {HttpRequest} request      La HttpRequest   
     * @param  {HttpResponse response     La HttpResponse
     * @return {HttpResponse}             Retourne le code ainsi que le message retournée et/ou le User
     */
    agilogServer.get("/project/getlist/:usrLogin", function(request, response) {

       /* ProjectManageService.getUserProjectList(request.params.userId, function(message, projectList) {
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
        });*/

        console.log("START : "+request.params.userLogin);

        var param = {
            "usrLogin": request.params.usrLogin
        };
        UserDAS.getUserBy(User, param, function(error, user) {
            var projectData = {
                prjName:'projectNameYouhou'
            }

            Project.create(projectData)
            .then(function(project) {
                if (project) {
                    console.log("projectNameYouhou OKKK");
                    project.addUser(user);
                    console.log("END");
                } else {
                    console.log("projectNameYouhou KOO");
                    console.log("END");
                }
            });
        });

    });
}