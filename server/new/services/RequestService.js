var getTokenFromRequest = function(httpRequest, callback) {

    if (httpRequest) {

        var bearerToken;

        var bearerHeader = httpRequest.headers["authorization"];

        if (typeof bearerHeader !== 'undefined' && bearerHeader !== null) {

            var bearer = bearerHeader.split(" ");

            bearerToken = bearer[1];

            callback(bearerToken);

        } else {

            callback(null);

        }
    } else {
        callback(null);
    }

};

module.exports = {
    getTokenFromRequest: getTokenFromRequest
}