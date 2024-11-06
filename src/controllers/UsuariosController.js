const Usuarios = require('../models/Usuarios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UsuariosController{

    async login(req,res){
        let {email, senha} = req.body
        let user = await Usuarios.findByUser(email)
        if (!user.status){
            user.err === undefined
            ? res.status(406).json({sucess: user.status, message: 'E-mail não encontrado'})
            : res.status(404).json({sucess: user.status, message: user.err})
        }else{

            let isPassword = bcrypt.compareSync(senha, user.values.senha)

            if (isPassword){

                let token = jwt.sign({email: user.values.user, role: user.values.senha},process.env.SECRET,{expiresIn: 600})
                res.status(200).json({sucess: isPassword, token: token})

            }else{
                res.status(406).json({sucess: isPassword, message: 'Senha Inválida'})
            }
        }
    }

    async create(req,res){
        let {nome, user, senha, cpf} = req.body;
        let salt = bcrypt.genSaltSync(10);

        let result = await Usuarios.create(nome, user, bcrypt.hashSync(senha,salt), cpf);

        result.status
        ? res.status(200).json({sucess: true, message:"Usuário Cadastrado com Sucesso"})
        : res.status(404).json({sucess: false, message: result.err})
    }

    async findAll(req,res){
        let dadosUsuario = await Usuarios.findAll();

        dadosUsuario.status
        ? res.status(200).json({sucess: true, values: dadosUsuario.values})
        : res.status(404).json({sucess: false, message: dadosUsuario.err})
    }

    async findById(req,res){
        if(isNaN(req.params.id) || !req.params.id){
            return res.status(404).json({
                message: 'Parametro ID obrigatório!'
            });
        }

        let dadosUsuario = await Usuarios.findById(req.params.id);

        if (dadosUsuario.status == undefined){
            res.status(406).json({sucess: false, message:"Usuário não encontrado"});
        }else if (!dadosUsuario.status){
            res.status(404).json({sucess: false, message: dadosUsuario.err})
        }else{
            res.status(200).json({sucess: true, message:dadosUsuario.values})
        }
        
    }

    async remove(req, res){
        if(isNaN(req.params.id)){
            return res.status(404).json({sucess: false, message:'Parametro Inválido'})
        }

        let result = await Usuarios.delete(req.params.id)
        result.status 
        ? res.status(200).json({sucess: result.status, message: result.message})
        : res.status(406).json({sucess: result.status, message: result.err})
    }

    async editUser(req, res){
        let id = req.params.id
        
        if(!id){
            return res.status(404).json({sucess: false, message:'Parametro Inválido'})
        }

        let {nome,user,senha} = req.body

        if(senha){
            senha = bcrypt.hashSync(senha,bcrypt.genSaltSync(10))
        }

        if(!id){
            return res.status(404).json({sucess: false, message:'Parametro Inválido'})
        }
            
        let result = await Usuarios.update(id, nome, user,senha)
        result.status 
        ? res.status(200).json({sucess: result.status, message: result.message})
        : res.status(406).json({sucess: result.status, message: result.err})
        
    }

}

module.exports = new UsuariosController();