const Doadores = require('../models/Doadores');

class DoadoresController{

    async create(req,res){
        let {nome,cpf} = req.body;

        if(!nome || !cpf){
            return res.status(404).json({
                message: 'Parametro obrigatório!'
            });
        }

        let result = await Doadores.create(nome,cpf);

        result.status
        ? res.status(200).json({sucess: true, message:"Usuário Cadastrado com Sucesso"})
        : res.status(404).json({sucess: false, message: result.err})
    }

    async findAll(req,res){
        let dadosUsuario = await Doadores.findAll();

        dadosUsuario.status
        ? res.status(200).json({sucess: true, values: dadosUsuario.values})
        : res.status(404).json({sucess: false, message: dadosUsuario.err})
    }

    async findById(req,res){
        if(isNaN(req.params.id)){
            return res.status(404).json({
                message: 'Parametro ID obrigatório!'
            });
        }

        let dadosDoador = await Doadores.findById(req.params.id);

        if (dadosDoador.status == undefined){
            res.status(406).json({sucess: false, message:"Usuário não encontrado"});
        }else if (!dadosDoador.status){
            res.status(404).json({sucess: false, message: dadosDoador.err})
        }else{
            res.status(200).json({sucess: true, message:dadosDoador.values})
        }
        
    }

    async remove(req, res){
        if(isNaN(req.params.id)){
            return res.status(404).json({sucess: false, message:'Parametro Inválido'})
        }

        let result = await Doadores.delete(req.params.id)
        result.status 
        ? res.status(200).json({sucess: result.status, message: result.message})
        : res.status(406).json({sucess: result.status, message: result.err})
    }

    async editDoadores(req, res){
        
        if(isNaN(req.params.id)){
            return res.status(404).json({sucess: false, message:'Parametro Inválido'})
        }

        let {nome,cpf} = req.body
        
        let result = await Doadores.update(req.params.id,nome, cpf)
        result.status 
        ? res.status(200).json({sucess: result.status, message: result.message})
        : res.status(406).json({sucess: result.status, message: result.err})
    }

}

module.exports = new DoadoresController();