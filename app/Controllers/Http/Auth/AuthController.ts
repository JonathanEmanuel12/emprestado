import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUser from 'App/Validators/User/CreateUserValidator'
import CreateAddress from 'App/Validators/User/Address/CreateAddressValidator'

export default class AuthController {
  public async signup({ request, response }: HttpContextContract) {

    try {
      const payloadUser = await request.validate(CreateUser)
      const payloadAddress = await request.validate(CreateAddress)

      const user = await User.create(payloadUser)
      await user.related('address').create(payloadAddress)
      await user.load('address')

      return response.created(user)
    } catch (error) {
      return response.internalServerError(error)
    }
  }

  public async signin({ request, auth, response }: HttpContextContract) {

    try {
      const { email, password } = request.body()
      const user = await User.findByOrFail('email', email)
      const token = await auth.attempt(email, password, {
        expiresIn: '7days'
      })

      return response.ok({ user, token })
    } catch (error) {
      return response.internalServerError(error)
    }
  }
}
