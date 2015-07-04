/**
 * Cette méthode permet de récupérer depuis la Request
 * passée en paramètre le token permettant d'identifier
 * l'utilisateur
 * @param request
 * @param : callback : La fonction à exécuter en sortie
 */
var getTokenFromRequest = function(request, callback){
    // Si la request est bien passé
    if(request){
        var bearerToken;
        // Récupération du token dans la 'variable' authorization du header
        var bearerHeader = request.headers["authorization"];
        // Si le token existe
        if (typeof bearerHeader !== 'undefined') {
            // On scinde le token en 2 car il est de la forme 'bearer xxxxxxx'
            var bearer = bearerHeader.split(" ");
            // On récupère la partie token utilisateur du token header
            bearerToken = bearer[1];
            // On appel le callback en sortie
            callback(bearerToken);
        }
        else{
            callback(null);
        }
    }
    // Sinon on retourne un token null
    else{
        callback(null);
    }
};

/**
 * Cet export met à disposition toutes les métohdes de ce service
 */
module.exports = {
    getTokenFromRequest: getTokenFromRequest
}