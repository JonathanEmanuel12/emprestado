import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
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

            return response.ok({ user })
        } catch (error) {
            console.log(error)
            return response.internalServerError(error.message)
        }
    }

    // public async update({ request, auth, response }: HttpContextContract) {

    //     try {
    //         const { email, password } = request.body()
    //         const user = await User.findByOrFail('email', email)
    //         const token = await auth.attempt(email, password, {
    //             expiresIn: '7days'
    //         })

    //         return response.ok({ user, token })
    //     } catch (error) {
    //         return response.internalServerError(error)
    //     }
    // }

    public async destroy({ params, response }: HttpContextContract) {
        const { id } = params
        try {
            const user = await User.findOrFail(id)
            await user.delete()

            return response.noContent()
        } catch (error) {
            console.log(error)
            return response.internalServerError(error.message)
        }
    }
}
