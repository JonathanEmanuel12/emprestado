import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'

import { v4 as uuid } from 'uuid'

export default class UserBase extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static assignUuid(base: UserBase): void {
    base.id = uuid()
  }
}
