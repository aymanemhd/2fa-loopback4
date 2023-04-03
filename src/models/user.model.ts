import {Entity, model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - User
 * User
 */

@model({name: 'User'})
export class User extends Entity {
  constructor(data?: Partial<User>) {
    // if (data != null && typeof data === 'object') {
    //   Object.assign(this, data);
    // }
    super(data);
  }
  /**
   *
   */
  @property({
    jsonSchema: {
      type: 'number',
      id: true,
      generated: true,
    },
  })
  id?: number;

  /**
   *
   */
  @property({
    jsonSchema: {
      type: 'string',
    },
  })
  name?: string;

  /**
   *
   */
  @property({
    jsonSchema: {
      type: 'string',
      format: 'email',
    },
  })
  email?: string;

  /**
   *
   */
  @property({
    jsonSchema: {
      type: 'string',
      format: 'password',
    },
  })
  password?: string;
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
