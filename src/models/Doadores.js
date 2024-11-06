const knex = require('../data/connection');

class Doadores{

    async create(nome, cpf){
        try {
            await knex.insert({
                nome: nome,
                cpf_cnpj: cpf
            }).table('doadores');

            return {status: true }
        } catch (err) {
            return {status: false, err: err}  
        }
    }

    async findAll(){
        try {
            let doadores = await knex.select(['nome','cpf_cnpj']).table('doadores');
            return {status: true, values: doadores}
        } catch (err) {
            console.log(err)
            return { status: false, err: err }
        }
    }

    async findById(id){
        try {
            let doador = await knex.select(['nome','cpf_cnpj']).where({id: id}).table('doadores');
            return doador.length > 0 ? {status: true, values: doador } : {status: undefined, message: 'Usuário Não existe!'}
        } catch (err) {
            return {status: false, err: err}
        }
    }

    async delete(id){
        let doador = await this.findById(id)

        if (doador.status){
            try {
                await knex.delete().where({id:id}).table('doadores')
                return {status: true, message:'Usuário Excluido com Sucesso'}
            } catch (err) {
                return {status: false, err: err}
            }
        }else{
            return {status: false, err: 'Usuário não existe, portanto não pode ser deletado.'}
        }
    }

    async update(id, nome, cpf){
        let doador = await this.findById(id)
        if(doador.status){
            
            let editUser = {}

            nome != undefined ? editUser.nome = nome : null
            cpf != undefined ? editUser.cpf_cnpj = cpf : null
            try {
                await knex.update(editUser).where({id:id}).table('doadores')
                return ({status: true, message:'Usuário editado com sucesso!'})
            } catch (err) {
                return ({status: false, err: err})
            }
        }else{
            return {status: false, err: 'Usuário não existe, portanto não pode ser deletado.'}
        }    
    }



}

module.exports = new Doadores();