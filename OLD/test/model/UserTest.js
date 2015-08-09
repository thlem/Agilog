var sequelizeConnection = require("../../server/technical/database/DbPool.js").sequelizeConnection,
    User                = require("../../server/model/Models.js").User,
    should              = require('should');

/**
 * @Test : UserTest
 * @File : server/model/User.js
 * @Description : Ce TestSuite permet de vérifier la bonne
 * communication avec la Base de données
 */
describe("UserTest", function(){

  /**
   * @Before
   * @Description : Au démarrage de la suite de test on va d'abord
   * vider la table des données de test qui seraient présentes
   */
  before(function(done){
    User.find({where:["usrLogin LIKE ?", "TEST%"]})
    .then(function(user){
      if(user){
        user.destroy().then(function() {
          done();
        });
      }
      else{
        done();
      }
    });
  });

  /**
   * @Test
   * @Description : Crée un nouvel enregistrement dans la table users
   */
  it("UserTest Create New User", function(done){

    User.build({
      usrLogin: "TEST-login",
      usrPassword: "TEST-password",
      usrFirstName: "TEST-firstName",
      usrLastName: "TEST-lastName",
      usrMail: "TESt-mail@mail.mail"})
      .save(["usrLogin", "usrPassword", "usrFirstName", "usrLastName", "usrMail"])
      .then(function(user){
        user.should.not.equal(null);
        user.usrLogin.should.equal("TEST-login");
        done();
      });
  });

  /**
   * @Test
   * @Description : Lecture de l'enregistrement précédemment créé
   */
  it("UserTest Read User", function(done){
    User.find({where:["usrLogin LIKE ?", "TEST%"]})
    .then(function(user){
      user.should.not.equal(null);
      user.usrLogin.should.equal("TEST-login");
      done();
    });
  });

  /**
   * @Test
   * @Description : Mise à jour de l'enregistrement précédemment créé
   */
  it("UserTest Update User", function(done){
    User.find({where:["usrLogin LIKE ?", "TEST%"]})
    .then(function(user){
      user.should.not.equal(null);
      user.usrFirstName.should.equal("TEST-firstName");
      user.updateAttributes({
        usrFirstName: "TEST2-firstName"
      })
      .then(function(user){
        user.should.not.equal(null);
        user.usrFirstName.should.equal("TEST2-firstName");
        done();
      });
    });
  });

  /**
   * @Test
   * @Description : Suppression de l'enregistrement précédemment créé
   */
  it("UserTest Delete User", function(done){
    User.find({where:["usrLogin LIKE ?", "TEST%"]})
    .then(function(user){
      user.should.not.equal(null);
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
