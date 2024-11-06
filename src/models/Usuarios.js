const knex = require('../data/connection');

class Usuarios{

    async create(nome, user, senha, cpf){
        try {
            await knex.insert({
                nome: nome,
                user: user,
                senha: senha,
                cpf: cpf
            }).table('usuarios');

            return {status: true }
        } catch (err) {
            return {status: false, err: err}  
        }
    }

    async findAll(){
        try {
            let users = await knex.select(['nome','user','senha','cpf']).table('usuarios');
            return {status: true, values: users}
        } catch (err) {
            console.log(err)
            return { status: false, err: err }
        }
    }

    async findById(id){
        try {
            let user = await knex.select(['nome','user','senha','cpf']).where({id: id}).table('usuarios');
            return user.length > 0 ? {status: true, values: user } : {status: undefined, message: 'Usuário Não existe!'}
        } catch (err) {
            return {status: false, err: err}
        }
    }

    async delete(id){
        let user = await this.findById(id)

        if (user.status){
            try {
                await knex.delete().where({id:id}).table('usuarios')
                return {status: true, message:'Usuário Excluido com Sucesso'}
            } catch (err) {
                return {status: false, err: err}
            }
        }else{
            return {status: false, err: 'Usuário não existe, portanto não pode ser deletado.'}
        }
    }

    async update(id, name, user, senha){
        let usuario = await this.findById(id)

        if(usuario.status){
            
            let editUser = {}

            name != undefined ? editUser.nome = name : null
            user != undefined ? editUser.user = user : null
            senha != undefined ? editUser.senha = senha : null

            try {
                await knex.update(editUser).where({id:id}).table('usuarios')
                return ({status: true, message:'Usuário editado com sucesso!'})
            } catch (err) {
                return ({status: false, err: err})
            }
        }else{
            return {status: false, err: 'Usuário não existe, portanto não pode ser editado.'}
        }    
    }

    async findByUser(usuario){
        try {
            let user = await knex.select(['nome','user','senha','cpf']).where({user:usuario}).table('usuarios')
            return user.length > 0 ? {status: true, values: user[0]} : {status: false, err: undefined} 
            
        } catch (err) {
            return {status: false, err: err}
        }
    }

}

module.exports = new Usuarios();