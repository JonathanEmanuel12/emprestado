import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.resource('/user/item', 'ItemsController')
    Route.get('user/item/index/:id', 'ItemsController.indexByUser')
})
    .prefix('v1')
    .namespace('App/Controllers/Http/User/Item')
