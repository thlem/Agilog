var AuthenticationService = require("../business/AuthenticationService.js"),
    ErrorMessageConstant = require("../technical/constants/ErrorMessageConstant.js"),
    SuccessMessageConstant = require("../technical/constants/SuccessMessageConstant.js"),
    ResponseCodeConstant = require("../technical/constants/ResponseCodeConstant.js");

module.exports = function(agilogServer, passport) {

    /**
     * Route appelée lors de la soumissions du formulaire d'enregistrement
     * Permet de vérifier si l'utilisateur désirant s'enregistrer n'existe
     * pas déjà en base de données et enregistre ce nouvel utilisateur si
     * aucune erreur n'est détectée
     * @param  {HttpRequest} request      La HttpRequest   
     * @param  {HttpResponse response     La HttpResponse
     * @return {HttpResponse}             Retourne le code ainsi que le message retournée et/ou le User
     */
    agilogServer.post("/auth/register", function(request, response, next) {
        console.log("[START][AuthenticationController][register]");
        // Appel du service d'authentification via passport
        passport.authenticate('register-strategy', function(error, user, success) {
            // Si l'utilisateur a bien été enregistré
            if (user) {
                console.log("[WORKING][AuthenticationController][register] User créé");
                // On l'authentifie auprès de la request
                request.login(user, function(error) {
                    // Si une erreur est relevée lors de l'authentification on la remonte
                    if (error) {
                        console.log("[WORKING][AuthenticationController][register] User créé, mais erreur lors du login : " + error);
                        console.log("[END][AuthenticationController][register]");
                        response.status(ResponseCodeConstant.INTERNAL_ERROR).json({
                            message: ErrorMessageConstant.INTERNAL_ERROR + ' : ' + error
                        });
                    }
                    // Sinon on retourne l'utilisateur au frontend
                    else {
                        console.log("[WORKING][AuthenticationController][register] User enregistré correctement, retour au Front");
                        console.log("[END][AuthenticationController][register]");
                        response.status(ResponseCodeConstant.SUCCESS).json({
                            message: success,
                            user: user
                        });
                    }
                });
            }
            // Si l'enregistrement ne s'est pas effectué
            else {
                console.log("[WORKING][AuthenticationController][register] User non créé");
                // Si une erreur a été relevé on la remonte au frontend
                if (error) {
                    console.log("[WORKING][AuthenticationController][register] " + error);
                    console.log("[END][AuthenticationController][register]");
                    response.status(ResponseCodeConstant.BAD_REQUEST).json({
                        message: error
                    });
                }
                // Sinon on remonte une erreur générique
                else {
                    console.log("[WORKING][AuthenticationController][register] " + ErrorMessageConstant.INTERNAL_ERROR);
                    console.log("[END][AuthenticationController][register]");
                    response.status(ResponseCodeConstant.INTERNAL_ERROR).json({
                        message: ErrorMessageConstant.INTERNAL_ERROR
                    });
                }
            }
        })(request, response, next);

    });

    /**
     * Route appelée lors de la soumissions du formulaire d'authentification
     * @param  {HttpRequest} request      La HttpRequest   
     * @param  {HttpResponse response     La HttpResponse
     * @return {HttpResponse}             Retourne le code ainsi que le message retournée et/ou le User
     */
    agilogServer.post("/auth/login/", function(request, response, next) {
        console.log("[START][AuthenticationController][login]");
        // Appel du service d'authentification via passport
        passport.authenticate('login-strategy', function(error, user, success) {
            // Si l'utilisateur a bien été enregistré
            if (user) {
                console.log("[WORKING][AuthenticationController][login] User trouvé en BDD");
                // On l'authentifie auprès de la request
                request.login(user, function(error) {
                    // Si une erreur est relevée lors de l'authentification on la remonte
                    if (error) {
                        console.log("[WORKING][AuthenticationController][login] User trouvé mais erreur lors du request login : " + error);
                        console.log("[END][AuthenticationController][login]");
                        response.status(ResponseCodeConstant.INTERNAL_ERROR).json({
                            message: ErrorMessageConstant.INTERNAL_ERROR + ' : ' + error
                        });
                    }
                    // Sinon on retourne l'utilisateur au frontend
                    else {
                        console.log("[WORKING][AuthenticationController][login] User enregistré correctement, retour au Front");
                        console.log("[END][AuthenticationController][login]");
                        response.status(ResponseCodeConstant.SUCCESS).json({
                            message: success,
                            user: user
                        });
                    }
                });
            }
            // Si l'enregistrement ne s'est pas effectué
            else {
                console.log("[WORKING][AuthenticationController][login] Erreur lors de la connexion");
                // Si une erreur a été relevé on la remonte au frontend
                if (error) {
                    console.log("[WORKING][AuthenticationController][login] " + error);
                    console.log("[END][AuthenticationController][login]");
                    response.status(ResponseCodeConstant.BAD_REQUEST).json({
                        message: error
                    });
                }
                // Sinon on remonte une erreur générique
                else {
                    console.log("[WORKING][AuthenticationController][login] " + ErrorMessageConstant.INTERNAL_ERROR);
                    console.log("[END][AuthenticationController][login]");
                    response.status(ResponseCodeConstant.INTERNAL_ERROR).json({
                        message: ErrorMessageConstant.INTERNAL_ERROR
                    });
                }
            }
        })(request, response, next);
    });

    /**
     * Route appelée lors de la déconnexion utilisateur
     * @param  {HttpRequest} request      La HttpRequest   
     * @param  {HttpResponse response     La HttpResponse
     * @return {HttpResponse}             Retourne le code ainsi que le message retournée
     */
    agilogServer.get("/auth/logout", function(request, response) {
        console.log("[START][AuthenticationController][logout]");
        AuthenticationService.logout(request, function() {
            console.log("[END][AuthenticationController][logout]");
            response.status(200).json({
                message: SuccessMessageConstant.SUCCESS_LOGOUT
            });
        });
    });
}