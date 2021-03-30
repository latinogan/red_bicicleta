var map= l.map ('main_map').setView([-3460122424,-58.3861497],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{ 
	attribution: '&copy: <a href="https://www.opemstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

$.ajax({
	dataType: "json",
	url: "api/bicicletas",
	success: function (result){
		console.log(result);
		result.bicicletas.forEach(function(bici){
			L.marker(bici.ubicacion, {title: bici.id}).addTo(map);

		});
	}
})
