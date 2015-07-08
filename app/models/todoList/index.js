// grab the mongoose module
var mongoose = require('mongoose');

var scope = {};
// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports.initDb = function(){

	mongoose.connect('mongodb://localhost:27017/testApk', function(err) {
	  if (err) { throw err; }
	});
	 
	// Création du schéma pour les commentaires
	scope.Todos = new mongoose.Schema({
	  text : { type : String}
	});
	 
	// Création du Model pour les commentaires
	scope.todoModel = mongoose.model('todoModel', scope.Todos);
	 
	// On crée une instance du Model
	scope.newTodo = new scope.todoModel({ text : 'tests' });
	 
	// On le sauvegarde dans MongoDB !
	scope.newTodo.save(function (err) {
	  if (err) { throw err; }
	  console.log('Commentaire ajouté avec succès !');
	  // On se déconnecte de MongoDB maintenant
	  mongoose.connection.close();
	});
};

module.exports.findDb = function(callback){
	scope.todoModel.find(null, callback);
};
