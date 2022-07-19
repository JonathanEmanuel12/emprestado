import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUser from 'App/Validators/CreateUserValidator'
import CreateAddress from 'App/Validators/CreateAddressValidator'
import Address from 'App/Models/Address'

export default class AuthController {
  public async signup({ request, response }: HttpContextContract) {

    try {
      console.log(1)
      const payloadUser = await request.validate(CreateUser)
      console.log(2)
      const { haveAddress } = request.body()
      console.log(3)

      const user = await User.create(payloadUser)

      if(haveAddress) {
        console.log('if')
        const payloadAddress = await request.validate(CreateAddress)
        await Address.create({ id: user.id, ...payloadAddress })
      }
      
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

      return response.ok({user, token})
    } catch (error) {
      return response.internalServerError(error)
    }
  }
}
