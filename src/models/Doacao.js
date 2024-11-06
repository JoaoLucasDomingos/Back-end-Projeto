const knex = require('../data/connection');

class Doacao{

    async create(qtd, doador_id, produto_id){

        try {
            await knex.insert({
                qtd: qtd,
                data_doacao: new Date(),
                doadores_id: doador_id,
                produtos_id: produto_id
            }).table('doacao');

            return {status: true }
        } catch (err) {
            return {status: false, err: err}  
        }
    }

    async findAll(){
        try {
            let doacoes = await knex.select(['qtd','data_doacao','doadores_id','produtos_id']).table('doacao');
            return {status: true, values: doacoes}
        } catch (err) {
            console.log(err)
            return { status: false, err: err }
        }
    }

    async findById(id){
        try {
            let doacao = await knex.select(['qtd','data_doacao','doadores_id','produtos_id']).where({id: id}).table('doacao');
            return doacao.length > 0 ? {status: true, values: doacao } : {status: undefined, message: 'Doação Não existe!'}
        } catch (err) {
            return {status: false, err: err}
        }
    }

    async delete(id){
        let doacao = await this.findById(id)

        if (doacao.status){
            try {
                await knex.delete().where({id:id}).table('doacao')
                return {status: true, message:'Doação Excluido com Sucesso'}
            } catch (err) {
                return {status: false, err: err}
            }
        }else{
            return {status: false, err: 'Doação não existe, portanto não pode ser deletado.'}
        }
    }



}

module.exports = new Doacao();