var mongoose = requiere ('mongoose');
var Bicicleta = require("../../models/bicicleta");


describe('Testing Bicicleta', function () {
	beforEach(function(done) {
		var mondoDB ='mongodb://localhost/testdb';

		const db = mongoose.connection;
		db.on('error',console.error.bind{console. 'connecion error'});
		bd.once('open', function(){
			console.log('we are connected to test database'):
			done();
		})
	})
     
     afterEach (function (done) {
     	Bicicleta.deleteMany((), function (err,succes){
     		done();
     	});
     });




describe ('Bicicleta.createInstance', () => {
	it ('crea una instancia de Bicicleta' ,() => {
		var bici = Bicicleta.createInstance(1,"verde","urbano",[-34.5.,-54.1]);

		expect(bici.code).toBe(1);
		expect(bici.color).toBe("verde");
		expect(bici.modelo).toBe("urbano");
		expect(bici.ubicacion).toEqual("-34.5");
		expect(bici.ubicacion).toEqual("-54.1");
	});

});



 describe ('bicicleta.allBicis', () => {
 	it('comienza vacia' ,(done) => {
 		Bicicleta.allBicis.length(function (err,bicis) {
 			expect(bicis.length).toBe(0);
 			done();
 		});
 	});

 });

  describe ('bicicleta.add', () => {
 	it('agrega solo una bici' ,(done) => {
 		var aBici = new Bicicleta({code: 1, color:"verde",moddelo: "urbana"});
 		Bicicleta.add(aBici, function (err, newBici){
 			if (err) console.log(err);
 			Bicicleta.allBicis(function (err,bicis){
 				expect(bicis.length).toEqual(1);
 				expect(bicis[0].code).toEqual(aBici.code);

 				done ();
 			});
 		});
 			
 		
 	});

 });

});







/*describe('Bicicleta.allBicis',() => {
	it('comienza vacia' , () => {
		expect(Bicicleta.allBicis.length).toBe(0);

	});
});

describe('Bicicleta.add', () => {
	it('agregamos una', () => {
		expect(Bicicleta.allBicis.length).toBe(0);

		var a = new Bicicleta (1, 'rojo', 'urbana', [-32.6012424,-58.3861497]);
		Bicicleta.add(a);

		expect(Bicicleta.allBicis.length).toBe(1);
		expect(Bicicleta.allBicis[0]).toBe(a);




	});
});

describe('Bicicleta.findById' , () => {
	it('debe devolver la bici con id 1' , () => {
		expect(Bicicleta.allBicis.length).toBe(0);
		var aBici = new Bicicleta(1, "verde", "urbana");
		var aBici2 = new Bicicleta(2,"rojo","montaña");
		Bicicleta.add(aBici);
		Bicicleta.add(aBici2);
		
		var targetBici= Bicicleta.findById(1);
		expect(targetBici.id).toBe(1);
		expect(targetBici.color).toBe(aBici.color);
		expect(targetBici.modelo).toBe(aBici.modelo);

	});
});*/

	