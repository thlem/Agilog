var Api = require('./ApiConstant.js');

module.exports = function(agilogServer) {

	//
	//
	// Call for each page load / reload
	//
	//
    agilogServer.get(Api.ROOT, function(request, response) {
        response.render('layout.jade');
    });

}