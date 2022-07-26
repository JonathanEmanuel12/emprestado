import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateItem from 'App/Validators/User/Item/CreateItemValidator'
import UpdateItem from 'App/Validators/User/Item/UpdateItemValidator'
import Item from 'App/Models/Item'
import User from 'App/Models/User'

export default class ItemsController {
    public async indexByUser({ params, response }: HttpContextContract) {
        try {
            const { id, title = '' } = params
            const user = await User.findOrFail(id)

            const itens = await user.related('items').query()
                .whereILike('title', `%${title}%`)

            return response.ok(itens)
        } catch (error) {
            console.log(error)
            return response.internalServerError(error.message)
        }
    }

    public async show({ params, response }: HttpContextContract) {
        const { id } = params
        try {
            const item = await Item.findOrFail(id)
            await item.load('user')

            return response.ok({ item })
        } catch (error) {
            console.log(error)
            return response.internalServerError(error.message)
        }
    }

    public async store({ request, auth, response }: HttpContextContract) {
        const loggedUser = await auth.authenticate()
        try {
            const payloadItem = await request.validate(CreateItem)

            const item = await loggedUser.related('items').create(payloadItem)

            return response.ok({ item })
        } catch (error) {
            console.log(error)
            return response.internalServerError(error.message)
        }
    }

    public async update({ params, request, auth, response }: HttpContextContract) {
        const { id } = params
        const loggedUser = await auth.authenticate()
        try {
            const payloadItem = await request.validate(UpdateItem)
            const item = await Item.findOrFail(id)

            if(item.userId !== loggedUser.id) {
                return response.forbidden('Alteração não permitida')
            }

            item.merge(payloadItem)
            await item.save()

            return response.ok({ item })
        } catch (error) {
            console.log(error)
            return response.internalServerError(error.message)  
        }
    }

    public async destroy({ params, auth, response }: HttpContextContract) {
        const { id } = params
        const loggedUser = await auth.authenticate()
        try {
            const item = await Item.findOrFail(id)
            if (item.userId !== loggedUser.id) {
                return response.forbidden('Alteração não permitida')
            }
            await item.delete()

            return response.noContent()
        } catch (error) {
            console.log(error)
            return response.internalServerError(error.message)
        }
    }
}
