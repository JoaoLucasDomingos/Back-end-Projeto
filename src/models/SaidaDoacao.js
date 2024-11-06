const knex = require('../data/connection');

class SolicitaDoacao{

    async create(qtd,produtos_id,solicitacao_id){
        try {
            await knex.insert({
                qtd: qtd,
                produtos_id: produtos_id,
                solicitacao_id: solicitacao_id
            }).table('solicitacao_saida');

            return {status: true }
        } catch (err) {
            return {status: false, err: err}  
        }
    }

    async findAll(){
        try {
            let solicitacao = await knex.select(['qtd','produtos_id','solicitacao_id']).table('solicitacao_saida');
            return {status: true, values: solicitacao}
        } catch (err) {
            console.log(err)
            return { status: false, err: err }
        }
    }

    async findById(id){
        try {
            let produtos = await knex.select(['qtd','produtos_id','solicitacao_id']).where({id: id}).table('solicitacao_saida');
            return produtos.length > 0 ? {status: true, values: produtos } : {status: undefined, message: 'Produtos Não existe!'}
        } catch (err) {
            return {status: false, err: err}
        }
    }

    async delete(id){
        let produtos = await this.findById(id)

        if (produtos.status){
            try {
                await knex.delete().where({id:id}).table('solicitacao_saida')
                return {status: true, message:'Solicitação Excluido com Sucesso'}
            } catch (err) {
                return {status: false, err: err}
            }
        }else{
            return {status: false, err: 'Solicitação não existe, portanto não pode ser deletado.'}
        }
    }

}

module.exports = new SolicitaDoacao();