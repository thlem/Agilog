var getProjectListByUserId = function(user, param, callback) {
    user.getProjects().then(function(projectList) {
    	console.log("project liste ==========================");
    	console.log(projectList);
        if (projectList) {
            callback(null, projectList);
        } else {
            callback(errorMessageConstant.USER_NOT_FOUND, null);
        }
    });
};

module.exports = {
    getProjectListByUserId: getProjectListByUserId,
}