var errorMessageConstant = require("../../technical/constants/errorMessageConstant.js"),
    models = require('../../new/model/Models.js'),
    bcrypt = require('bcrypt-nodejs'); // Middleware de chiffrage des mots de passe

var getUserBy = function(param, callback) {
    models.User.find({
        where: param
    }).then(function(user) {
        if (user) {
            callback(null, user);
        } else {
            callback(errorMessageConstant.USER_NOT_FOUND, null);
        }
    });
};

var createUser = function(arrayOfUserData, callback) {
    console.log("[START][UserDAS][createUser]");
    models.User.create(arrayOfUserData)
        .then(function(user) {
            if (user) {
                console.log("[WORKING][UserDAS][createUser] Utilisateur créé");
                console.log("[END][UserDAS][createUser]");
                callback(null, user);
            } else {
                console.log("[WORKING][UserDAS][createUser] Utilisateur non créé");
                console.log("[END][UserDAS][createUser]");
                callback(errorMessageConstant.USER_INSERT_ERROR, null);
            }
        });
};

var updateUser = function(userToUpdate, arrayOfUserDataToUpdate, callback) {
    userToUpdate.updateAttributes(arrayOfUserDataToUpdate)
        .then(function(user) {
            if (user) {
                callback(null, user);
            } else {
                callback(errorMessageConstant.USER_UPDATE_ERROR, null);
            }
        });
};

var deleteUser = function(userToDelete, callback) {
    userToDelete.destroy().then(function() {
        callback();
    });
}

module.exports = {
    getUserBy: getUserBy,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}