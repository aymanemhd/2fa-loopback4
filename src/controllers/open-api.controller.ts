import {repository} from '@loopback/repository';
import {api, operation, requestBody} from '@loopback/rest';
import {Userdb} from '../models/userdb.model';
import {UserRepository} from '../repositories/user.repository';

/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by <no-tag>.
 *
 */
@api({
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
          },
          name: {
            type: 'string',
          },
          email: {
            type: 'string',
            format: 'email',
          },
          password: {
            type: 'string',
            format: 'password',
          },
        },
      },
    },
  },
  paths: {},
})
export class OpenApiController {
  constructor(
    @repository(UserRepository) private userRepository: UserRepository,
  ) {}

  /**
   *
   *
   * @param _requestBody The user's account details
   * @returns Successfully signed in
   */
  @operation('post', '/signup', {
    summary: 'Create a new account',
    operationId: 'signup',
    requestBody: {
      description: "The user's account details",
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              email: {
                type: 'string',
                format: 'email',
              },
              password: {
                type: 'string',
                format: 'password',
              },
            },
          },
        },
        'application/xml': {
          schema: {
            type: 'object',
            properties: {},
          },
        },
        'multipart/form-data': {
          schema: {
            type: 'object',
            properties: {},
          },
          examples: {
            'Example 1': {
              value: {
                name: 'aymane',
                email: 'aymane@gmail.com',
                password: '2022',
              },
            },
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Successfully signed in',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User',
            },
          },
        },
      },
      '400': {
        description: 'Invalid input data',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Invalid input data',
                },
              },
            },
          },
        },
      },
    },
    'x-extension-1': null,
  })
  async signup(
    @requestBody({
      description: "The user's account details",
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              email: {
                type: 'string',
                format: 'email',
              },
              password: {
                type: 'string',
                format: 'password',
              },
            },
          },
        },
        'application/xml': {
          schema: {
            type: 'object',
            properties: {},
          },
        },
        'multipart/form-data': {
          schema: {
            type: 'object',
            properties: {},
          },
          examples: {
            'Example 1': {
              value: {
                name: 'aymane',
                email: 'aymane@gmail.com',
                password: '2022',
              },
            },
          },
        },
      },
    })
    userres: // _requestBody: {
    //   name?: string;
    //   email?: string;
    //   password?: string;
    // },
    {
      name?: Userdb['name'];
      email?: Userdb['email'];
      password?: Userdb['password'];
    },
  ): Promise<Userdb> {
    // throw new Error('Not implemented');

    const res = await this.userRepository.create(userres);
    return res;
  }

  /**
   *
   *
   * @param _requestBody The user's login credentials
   * @returns Successfully signed in
   */
  @operation('post', '/signin', {
    summary: 'Sign in to an existing account',
    operationId: 'signin',
    requestBody: {
      description: "The user's login credentials",
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                format: 'email',
              },
              password: {
                type: 'string',
                format: 'password',
              },
            },
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Successfully signed in',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Successfully signed in',
                },
              },
            },
          },
        },
      },
      '401': {
        description: 'Invalid credentials',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Invalid credentials',
                },
              },
            },
          },
        },
      },
    },
  })
  async signin(
    @requestBody({
      description: "The user's login credentials",
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                format: 'email',
              },
              password: {
                type: 'string',
                format: 'password',
              },
            },
          },
        },
      },
    })
    userver: {
      email?: Userdb['email'];
      password?: Userdb['password'];
    },
  ): Promise<{message?: string}> {
    throw new Error('Not implemented');
  }
}
