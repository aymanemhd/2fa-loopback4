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
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @property({
    type: 'string',
  })
  organisation: string;

  @property({
    type: 'boolean',
    required: true,
    default: false,
  })
  otp_enabled?: boolean;

  @property({
    type: 'boolean',
    required: true,
    default: false,
  })
  otp_verified?: boolean;

  @property({
    type: 'string',
  })
  otp_ascii?: string;

  @property({
    type: 'string',
  })
  otp_hex?: string;

  @property({
    type: 'string',
  })
  otp_base32?: string;

  @property({
    type: 'string',
  })
  otp_auth_url?: string;

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
