const SaidaDoacao = require('../models/SaidaDoacao');

class SaidaDoacaoController{

    async create(req,res){
        let {qtd,produtos_id,solicitacao_id} = req.body;

        if(!qtd || !produtos_id || !solicitacao_id){
            return res.status(404).json({
                message: 'Parametro obrigatório!'
            });
        }

        let result = await SaidaDoacao.create(qtd,produtos_id,solicitacao_id);

        result.status
        ? res.status(200).json({sucess: true, message:"Solicitação Cadastrada com Sucesso"})
        : res.status(404).json({sucess: false, message: result.err})
    }

    async findAll(req,res){
        let dadosDoacao = await SaidaDoacao.findAll();

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

        let dadosProdutos = await SaidaDoacao.findById(req.params.id);

        if (dadosProdutos.status == undefined){
            res.status(406).json({sucess: false, message:"Produto não encontrado"});
        }else if (!dadosProdutos.status){
            res.status(404).json({sucess: false, message: dadosProdutos.err})
        }else{
            res.status(200).json({sucess: true, message:dadosProdutos.values})
        }
        
    }

    async remove(req, res){
        if(isNaN(req.params.id)){
            return res.status(404).json({sucess: false, message:'Parametro Inválido'})
        }

        let result = await SaidaDoacao.delete(req.params.id)

        result.status 
        ? res.status(200).json({sucess: result.status, message: result.message})
        : res.status(406).json({sucess: result.status, message: result.err})
    }
}

module.exports = new SaidaDoacaoController();