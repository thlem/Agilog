var ProjectDAS = require("./dataAccess/ProjectDAS.js"),
    UserDAS = require("./dataAccess/UserDAS.js"),
    RequestService = require("./RequestService.js"),
    errorMessageConstant = require("../technical/constants/ErrorMessageConstant.js"),
    successMessageConstant = require("../technical/constants/SuccessMessageConstant.js");


var getUserProjectList = function(Project, User, usrLogin, callback) {
    console.log("GETPROJECTLIST-work");
    // Si la request est bien passé
    if (usrLogin) {
        console.log("GETPROJECTLIST-find user");
        UserDAS.getUserBy(User, {"usrLogin":usrLogin}, function(message, user){
            if(user){
                console.log("GETPROJECTLIST-find projectlist");
                ProjectDAS.getProjectListByUserId(user, {"usrId":user.usrId}, function(message, projectList){
                    console.log("GETPROJECTLIST-projectlist ===== ");
                    console.log(projectList);
                    callback(message, null);
                });
            }
        });
    }
    else{
        callback("Pas de login", null);
    }
        
};

/**
 * Cet export met à disposition toutes les métohdes de ce service
 */
module.exports = {
    getUserProjectList: getUserProjectList
}