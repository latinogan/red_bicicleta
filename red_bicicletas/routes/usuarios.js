var express = require('express');
var router = express.Router();
const usuariosController =require('../controllers/usuarios');

router.get ('/',usuariosController.list);
router.get('/create', usuariosController.create_get);
router.post('/create', usuariosController.create);
router.post('/:id/update', usuariosController.update);
router.post('/:id/delete', usuariosController.delete);





/* GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

module.exports = router;
