const express = require('express');
const router = express.Router();
const UsuariosController = require('../controllers/UsuariosController');
const DoadoresController = require('../controllers/DoadoresController');
const DoacaoController = require('../controllers/DoacaoController');
const ProdutosController = require('../controllers/ProdutosController');
const SolicitaDoacaoController = require('../controllers/SolicitaDoacaoController');
const SaidaDoacaoController = require('../controllers/SaidaDoacaoController');
const Auth = require('../middleware/AdminAuth');

// Usuarios
router.post('/create',Auth,UsuariosController.create);
router.get('/find-all',Auth,UsuariosController.findAll);
router.get('/find-usuarios/:id',Auth,UsuariosController.findById);
router.delete('/user/:id',Auth,UsuariosController.remove);
router.put('/user/:id',Auth, UsuariosController.editUser);
router.post('/login', UsuariosController.login);

// Doadores
router.post('/create-doador',Auth,DoadoresController.create);
router.get('/find-doadores',Auth,DoadoresController.findAll);
router.get('/find-by-doador/:id',Auth,DoadoresController.findById);
router.delete('/doadores/:id',Auth, DoadoresController.remove);
router.put('/doadores/:id',Auth, DoadoresController.editDoadores);

// Produtos
router.post('/create-produto',Auth, ProdutosController.create);
router.get('/find-produtos',Auth,ProdutosController.findAll);
router.get('/find-produto/:id',Auth,ProdutosController.findById);
router.delete('/produtos/:id',Auth, ProdutosController.remove);
router.put('/produtos/:id',Auth, ProdutosController.editProduto);

// Doacao
router.post('/create-doacao',Auth,DoacaoController.create);
router.get('/find-doacoes',Auth,DoacaoController.findAll);
router.get('/find-doacao/:id',Auth,DoacaoController.findById);
router.delete('/doacao/:id',Auth, DoacaoController.remove);

// Solicita doação
router.post('/create-solicitacao-doacao',Auth, SolicitaDoacaoController.create);
router.get('/find-solicitacao',Auth,SolicitaDoacaoController.findAll);
router.get('/find-solicitacao/:id',Auth,SolicitaDoacaoController.findById);
router.delete('/solicitacao/:id',Auth, SolicitaDoacaoController.remove);
router.put('/solicitacao/:id',Auth, SolicitaDoacaoController.editSolicitacao);

// Solicita saida
router.post('/create-saida-doacao',Auth, SaidaDoacaoController.create);
router.get('/find-saida',Auth,SaidaDoacaoController.findAll);
router.get('/find-saida/:id',Auth,SaidaDoacaoController.findById);
router.delete('/saida/:id',Auth, SaidaDoacaoController.remove);


module.exports = router;