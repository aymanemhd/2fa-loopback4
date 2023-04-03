import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Userdb extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Userdb>) {
    super(data);
  }
}

export interface UserdbRelations {
  // describe navigational properties here
}

export type UserdbWithRelations = Userdb & UserdbRelations;
