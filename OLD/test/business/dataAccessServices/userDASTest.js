var sequelizeConnection = require("../../../server/technical/database/DbPool.js").sequelizeConnection;
var UserDAS             = require("../../../server/business/dataAccessServices/UserDAS.js");
var should              = require('should');
var User                = require("../../../server/model/Models.js").User;

/**
 * @Test : UserDASTest
 * @File : server/technical/dataAccessService/UserDAS.js
 * @Description : Ce TestSuite permet de tester le service d'accès
 * aux données de la table users
 */
describe("UserDASTest", function(){

  it("UserDASTest createUser with optional null", function(done){
    var arrayOfUserData = {};
    arrayOfUserData.usrLogin = "TEST-login";
    arrayOfUserData.usrPassword = "TEST-password";

    UserDAS.createUser(User, arrayOfUserData, function(error, user){
      should.not.exists(error);
      should.exists(user);
      user.usrLogin.should.equal("TEST-login");
      done();
    });
  });

  it("UserDASTest updateUser", function(done){
    User.find({where: ["usrLogin LIKE ?", "TEST%"]})
    .then(function(user){
      should.exists(user);
      should.not.exists(user.usrFirstName)

      var arrayOfUserDataToUpdate = {};
      arrayOfUserDataToUpdate.usrFirstName = "TEST-firstName";

      UserDAS.updateUser(user, arrayOfUserDataToUpdate, function(error, user){
        should.not.exists(error);
        should.exists(user);
        user.usrFirstName.should.equal("TEST-firstName");
        done();
      });
    });
  });

  it("UserDASTest getUserBy login", function(done){
    UserDAS.getUserBy(User, {"usrLogin": "TEST-login"}, function(error, user){
      should.not.exists(error);
      should.exists(user);
      user.usrLogin.should.equal("TEST-login");
      done();
    });
  });

  it("UserDASTest getUserBy firstName", function(done){
    UserDAS.getUserBy(User, {"usrFirstName": "TEST-firstName"}, function(error, user){
      should.not.exists(error);
      should.exists(user);
      user.usrFirstName.should.equal("TEST-firstName");
      done();
    });
  });

it("UserDASTest deleteUser", function(done){
    User.find({where:["usrLogin LIKE ?", "TEST%"]})
    .then(function(user){
      should.exists(user);
      user.destroy().then(function() {
         User.find({where:["usrLogin LIKE ?", "TEST%"]})
        .then(function(user){
          should.not.exists(user);
          done();
        });
        });
    });
  });
});
