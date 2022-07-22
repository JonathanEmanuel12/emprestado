import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UpdateUser from 'App/Validators/User/UpdateUserValidator'
import UpdateAddress from 'App/Validators/User/Address/UpdateAddressValidator'
import User from 'App/Models/User'

export default class UsersController {
    public async index({ params, response }: HttpContextContract) {
        try {
            const { name = '' } = params
            const users = await User.query()
            .whereILike('name', `%${name}%`)
            .preload('address')

            return response.ok(users)
        } catch (error) {
            console.log(error)
            return response.internalServerError(error.message)
        }
    }

    public async show({ params, response }: HttpContextContract) {
        const { id } = params
        try {
            const user = await User.findOrFail(id)
            await user.load('address')

            return response.ok({ user })
        } catch (error) {
            console.log(error)
            return response.internalServerError(error.message)
        }
    }

    public async update({ params, request, auth, response }: HttpContextContract) {
        const { id } = params
        const loggedUser = await auth.authenticate()
        try {
            const payloadUser = await request.validate(UpdateUser)
            const payloadAddress = await request.validate(UpdateAddress)

            if(id !== loggedUser.id) {
                return response.forbidden('Alteração não permitida')
            }

            console.log(payloadUser)

            const user = await User.findOrFail(id)
            user.merge(payloadUser)
            await user.save()

            const address = await user.related('address').query().firstOrFail()
            address.merge(payloadAddress)
            await address.save()

            return response.ok({ user })
        } catch (error) {
            console.log(error)
            return response.internalServerError(error.message)  
        }
    }

    public async destroy({ params, auth, response }: HttpContextContract) {
        const { id } = params
        const loggedUser = await auth.authenticate()
        try {
            if(id !== loggedUser.id) {
                return response.forbidden('Alteração não permitida')
            }

            const user = await User.findOrFail(id)
            await user.delete()

            return response.noContent()
        } catch (error) {
            console.log(error)
            return response.internalServerError(error.message)
        }
    }
}
