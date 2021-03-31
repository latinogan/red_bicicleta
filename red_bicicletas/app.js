var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport= require('./config/passport');
const session = require ('express-session');

var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var tokenRouter= require('./routes/token');
var bicicletasRouter = require('./routes/bicicletas');
var bicicletasAPIRouter = require('./routes/api/bicicletas');
var usuariosAPIRouter= require ('./routes/api/usuarios');

const store = new session.MemoryStore;

var app = express();
app.use(session({
  cookie: { maxAge: 240*60*60*1000},
  store:store,
  saveUninitialized: true,
  resave:'true',
  secret: '...... '

}));

var mongoose = require('mongoose')

var mongoDB = 'mongodb://localhost/red_bicicletas';
mongoose.connect(mongoDB,{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.get ('/login', function (req,res) {
	res.render('session/login')
});

app.post('/login', function ( req, res,next) {
  passport.authenticate('local', function(err,usuario,info){
  	if(err) return next (err);
  	if(!usuario) return res.render('session/login', {info});
  	req.login(usuario, function (err) {
  		if (err) return next (err);
  		return res.redirect ('');
  	});
  })(req,res,next);
});

app.get('/logout', function (req,res) {
  req.logout();
  res.redirect('/')
});

app.get('/forgotPassword', function(req,res){
 res.render('session/forgotPassword');
});

app.post('/forgotPassword', function(req,res){
	usuarios.findOne({email:req.body.email} , function(err,usuario){
		if(!usuario) return res.render('session/forgot-password',{info: {message: 'No existe el email para un usuario existente'} });

		usuario.resetPassword(function(err) {
			if (err) return next (err);
			console.log('session/forgot-password-message');
		});
		res.render('session/forgot-password-message');
	});
});

app.get('/reset-password/:token' , function (req,res,next) {
	Token.findOne({token: req.params.token}, function (err,token){
		if(!token)return res.status(400).send({type:'not-verified',msg:'No existe un usuario asociado al token no haya expirado'});

		Usuario.findById(token._userId, function(err,usuario) {
			if(!usuario) return res.status(400).send({msg: 'No existe un usuario asociado al token'});

			res.render('session/reset-password', {errors:{} , usuario:usuario});
		});
	});
});

app.post('/reset-password', function (req,res ) {
	if(req.body.password != req.body.confirm_password){
		res.render('session/reset-password' ,{
			errors:{ confirm_password: {message: 'No coincide con el password ingresado'} },
			usuario: new Usuario ({email: req.body.email})
		});
		return;
	}
	Usuario.findOne({email:req.body.email}, function(err,usuario){
		usuario.password=req.body.password;
		usuario.save(function (err){
			if (err){ 
			  res.render('session/reset-password', {errors: err.errors, usuario: new Usuario ({email:req.body.email }) });
            }else {
            	res.redirect('/login');
            }
		});
	});
});





app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/token',tokenRouter);

app.use('/bicicletas', bicicletasRouter);
app.use('/api/bicicletas', bicicletasAPIRouter);//validarUsuario
app.use('/api/usuarios',usuariosAPIRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function loggedIn(req,res,next){
	if (req.user) {
		next()
	} else {
		console.log('user sin loguearse');
		res.redirect('/login')
	}
};
















module.exports = app;
