const knex = require('../data/connection');

class SolicitaDoacao{

    async create(nome,cpf,endereco,bairro,numero,telefone,descricao,data){
        try {
            await knex.insert({
                nome: nome,
                cpf: cpf,
                endereco: endereco,
                bairro: bairro,
                numero: numero,
                telefone: telefone,
                descricao: descricao,
                data: data
            }).table('solicita_doacao');

            return {status: true }
        } catch (err) {
            return {status: false, err: err}  
        }
    }

    async findAll(){
        try {
            let solicitacao = await knex.select(['nome','cpf','endereco','bairro','numero','telefone','descricao','data']).table('solicita_doacao');
            return {status: true, values: solicitacao}
        } catch (err) {
            console.log(err)
            return { status: false, err: err }
        }
    }

    async findById(id){
        try {
            let produtos = await knex.select(['nome','cpf','endereco','bairro','numero','telefone','descricao','data']).where({id: id}).table('solicita_doacao');
            return produtos.length > 0 ? {status: true, values: produtos } : {status: undefined, message: 'Produtos Não existe!'}
        } catch (err) {
            return {status: false, err: err}
        }
    }

    async delete(id){
        let produtos = await this.findById(id)

        if (produtos.status){
            try {
                await knex.delete().where({id:id}).table('solicita_doacao')
                return {status: true, message:'Solicitação Excluido com Sucesso'}
            } catch (err) {
                return {status: false, err: err}
            }
        }else{
            return {status: false, err: 'Solicitação não existe, portanto não pode ser deletado.'}
        }
    }

    async update(id,nome,cpf,endereco,bairro,numero,telefone,descricao,data){
        let produtos = await this.findById(id)
        if(produtos.status){
            
            let editUser = {}

            nome != undefined ? editUser.nome = nome : null
            cpf != undefined ? editUser.cpf = cpf : null
            endereco != undefined ? editUser.endereco = endereco : null
            bairro != undefined ? editUser.bairro = bairro : null
            numero != undefined ? editUser.numero = numero : null
            telefone != undefined ? editUser.telefone = telefone : null
            descricao != undefined ? editUser.descricao = descricao : null
            data != undefined ? editUser.data = data : null

            try {
                await knex.update(editUser).where({id:id}).table('solicita_doacao')
                return ({status: true, message:'Solicitação editado com sucesso!'})
            } catch (err) {
                return ({status: false, err: err})
            }
        }else{
            return {status: false, err: 'Solicitação não existe, portanto não pode ser Editada.'}
        }    
    }

}

module.exports = new SolicitaDoacao();