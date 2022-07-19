import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('/auth/signup', 'AuthController.signup')
    Route.post('/auth/signin', 'AuthController.signin')
})
    .prefix('v1')
    .namespace('App/Controllers/Http/Auth')
