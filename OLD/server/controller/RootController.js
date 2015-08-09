module.exports = function(agilogServer){

  agilogServer.get("*", function(request, response){
  	response.render("layout.jade");
  });

}
