var Api = require('./ApiConstant.js'),
	ProjectManageService = require("../services/ProjectManageService.js"),
	ErrorMessageConstant = require("../technical/constants/ErrorMessageConstant.js"),
	SuccessMessageConstant = require("../technical/constants/SuccessMessageConstant.js"),
	ResponseCodeConstant = require("../technical/constants/ResponseCodeConstant.js");

module.exports = function(agilogServer) {

	//
	//
	// Call for get project list of a user id
	//
	//
	agilogServer.get(Api.PROJECT_MANAGE_GET_LIST, function(request, response) {


		var projects = [
			{
				'projectId':'1',
				'projectName':'Test Project'
			},
			{
				'projectId':'2',
				'projectName':'Test Project2'
			},
			{
				'projectId':'3',
				'projectName':'Test Project3'
			},
			{
				'projectId':'4',
				'projectName':'Test Project4'
			},
			{
				'projectId':'1',
				'projectName':'Test Project'
			},
			{
				'projectId':'2',
				'projectName':'Test Project2'
			},
			{
				'projectId':'3',
				'projectName':'Test Project3'
			},
			{
				'projectId':'4',
				'projectName':'Test Project4'
			},
			{
				'projectId':'1',
				'projectName':'Test Project'
			},
			{
				'projectId':'2',
				'projectName':'Test Project2'
			},
			{
				'projectId':'3',
				'projectName':'Test Project3'
			},
			{
				'projectId':'4',
				'projectName':'Test Project4'
			}
		];

		response.status(200).json({
            projects: projects
        });

       /*ProjectManageService.getProjectsByUserId(request.params.usrLogin, function(projects, errorMessage) {

            if (projects) {

                response.status(200).json({
                    projects: projects
                });

            } else {

            	if(errorMessage){

            		response.status(ResponseCodeConstant.INTERNAL_ERROR).json({
	                    message: errorMessage,
	                    projects: null
                	});

            	} else{

					response.status(ResponseCodeConstant.INTERNAL_ERROR).json({
	                    message: ErrorMessageConstant.INTERNAL_ERROR,
	                    projects: null
                	});

            	}

            }

        });*/

    });

}