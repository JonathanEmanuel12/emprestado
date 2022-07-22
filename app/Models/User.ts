import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, hasOne, HasOne, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import UuidBase from './Base/UuidBase'
import Address from './Address'
import Item from './Item'

export default class User extends UuidBase {
  @column()
  public name: string
  
  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public phone: string

  @hasOne(() => Address)    
  public address: HasOne<typeof Address>

  @hasMany(() => Item)    
  public items: HasMany<typeof Item>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
