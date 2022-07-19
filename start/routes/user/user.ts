import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.resource('/user', 'UsersController')
})
    .prefix('v1')
    .namespace('App/Controllers/Http/User')
