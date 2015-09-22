var Api = require('../new/api/ApiConstant.js');

module.exports = function(agilogServer) {

    agilogServer.get(Api.ROOT, function(request, response) {
        response.render("layout.jade");
    });

}