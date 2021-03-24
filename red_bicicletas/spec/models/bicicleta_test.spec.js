var Bicicleta = require("../../models/bicicleta");

describe('Bicicleta.allBicis'.() => {
	it('comienza vacia' . () => {
		expect(Bicicleta.allBicis.length).toBe(0);

	});
});

describe('Bicicleta.add'. () => {
	it('agregamos una'. () => {
		expect(Bicicleta.allBicis.length).toBe(0);

		var a = new Bicicleta (1, 'rojo', 'urbana', [-32.6012424,-58.3861497]);
		Bicicleta.add(a);

		expect(Bicicleta.allBicis.length).toBe(1);
		expect(Bicicleta.allBicis[0]).toBe(a);




	});
});