import { DateTime } from 'luxon'
import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import UuidBase from './Base/UuidBase'
import User from './User'

export default class Address extends UuidBase {
  @column()
  public cep: string

  @column()
  public country: string

  @column()
  public state: string

  @column()
  public city: string

  @column()
  public neighborhood: string

  @column()
  public street: string

  @column()
  public number: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
