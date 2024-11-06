const Doacao = require('../models/Doacao');

class DoacaoController{

    async create(req,res){
        let {qtd,id_doador,produto_id} = req.body;

        if(!qtd || !id_doador, !produto_id){
            return res.status(404).json({
                message: 'Parametro obrigatório!'
            });
        }

        let result = await Doacao.create(qtd,id_doador,produto_id);

        result.status
        ? res.status(200).json({sucess: true, message:"Usuário Cadastrado com Sucesso"})
        : res.status(404).json({sucess: false, message: result.err})
    }

    async findAll(req,res){
        let dadosDoacao = await Doacao.findAll();

        dadosDoacao.status
        ? res.status(200).json({sucess: true, values: dadosDoacao.values})
        : res.status(404).json({sucess: false, message: dadosDoacao.err})
    }

    async findById(req,res){
        if(isNaN(req.params.id)){
            return res.status(404).json({
                message: 'Parametro ID obrigatório!'
            });
        }

        let dadosDoacao = await Doacao.findById(req.params.id);

        if (dadosDoacao.status == undefined){
            res.status(406).json({sucess: false, message:"Doação não encontrado"});
        }else if (!dadosDoacao.status){
            res.status(404).json({sucess: false, message: dadosDoacao.err})
        }else{
            res.status(200).json({sucess: true, message:dadosDoacao.values})
        }
        
    }

    async remove(req, res){
        if(isNaN(req.params.id)){
            return res.status(404).json({sucess: false, message:'Parametro Inválido'})
        }

        let result = await Doacao.delete(req.params.id)

        result.status 
        ? res.status(200).json({sucess: result.status, message: result.message})
        : res.status(406).json({sucess: result.status, message: result.err})
    }

}

module.exports = new DoacaoController();