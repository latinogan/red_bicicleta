var mongoose = require ('mongoose');
var Bicicleta = require ('../../models/bicicleta');
var Usuario = require ('../../models/usuario');
var Reserva = require ('../../models/reserva');

describe ('Testing Usuarios', function(){
	beforeEach ( function (done) {
		var mongoDB = 'mongodb://localhost/testdb';
		mongoose.connect(mongoDB, {userNewUrlParser: true});

		const db = mongoose.connection;
		db.on('error', console.error.bind (console, 'conection error'));
		db.once ('open', function () {
			console.log('We are conected to test data base');

			done();
		});
	});

	afterEach ( function (done) {
		Reserva.deleteMany ( {}, function ( err,success){
			if ( err) console.log(err);
			Usuario.deleteMany({}, function (err,success) {
				if (err) console.log (err);
				Bicicleta.deleteMany({}, function (err, success){
					if (err) console.log (err);
					done();
				});

			});
		});
	});
});














