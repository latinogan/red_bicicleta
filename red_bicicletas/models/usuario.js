var mongoose= require ('mongoose');
const uniqueValidator = require ('mongoose-unique-validator');
var Reserva =require ('./reserva');
const bcrypt= require ('bcrypt');
const crypto = require ('crypto')
const saltRounds=10;

const token = require ('../models/token');
const mailer= require('../mailer/mailers');

var Schema = mongoose.Schema;


const validateEmail = function (email) {
 const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
;

	return re.test(email);
};

var usuarioSchema = new Schema ({
	nombre: {
		type: String,
		trim: true ,
		required:[ true , 'el nombre es obligatorio']
	},

    email: {
		type: String,
		trim: true ,
		required:[ true , 'el email es obligatorio'],
		lowerCase : true,
		unique:true,
		validate:[ validateEmail,'ingrese un email valido'],
		match:[/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                   ]

	},

	password: {
		type: String,
		required:[ true , 'el password es obligatorio']
	},	

	passwordResetToken : String,
	 passwordResetTokenExpires: Date,
	 verificado:{
		type: Boolean,
		default:false,
	},

});
usuarioSchema.plugin(uniqueValidator,{message:'el {PATH} ya existe con otro ususario'});

usuarioSchema.pre('save' , function (next) {
	if (this.isModified ('password')) {
		this.password = bcrypt.hashSync(this.password, saltRounds);
	}
	next();

});

usuarioSchema.methods.validPassword= function ( password){
	return bcrypt.compareSync(password, this.password);
};

usuarioSchema.methods.reservar = function (biciId,desde,hasta,cb) {
	var reserva = new Reserva ({usuario: this.id, bicicleta: biciId, desde: desde, hasta:hasta});
		console.log(reserva);
		reserva.save(cb);

}

usuarioSchema.methods.enviar_email_bienvenida = function (cb) {
	const token = new Token({_userId: this.id, token: crypto.randomBytes(16).toString('hex')});
	const email_destination =this.email;
	token.save(function (err){
		if(err){return console.log(err.message); }

		console.log('se ha enviado un email de bienvenida a' +email_destination +'.');


		const mailoptions ={
			from : 'no-reply@redbicicleta.com',
			to: email_destination,
			subject: 'verificacion de cuenta',
			text: 'HOLA,\n\npor favor, para verificar su cuenta haga click en este link:\n'+'http://localhost:3000' + '\/ token/confirmation\/'+tokken.token+'.\n'
		};

		mailer.sendMail(mailOptions, function (err) {
			if(err){ return console.log(err.message); }

			console.log ('verification email has been send to' + email_destination + '.')
		});
	});
}



module.exports = mongoose.model('Usuario', usuarioSchema);