import { DateTime } from 'luxon'
import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import UuidBase from './Base/UuidBase'
import User from './User'

export default class Item extends UuidBase {
  @column()
  public title: string

  @column()
  public description: string

  @column()
  public price: number

  @column()
  public userId: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
