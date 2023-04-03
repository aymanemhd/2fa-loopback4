import {api, operation, param, requestBody} from '@loopback/rest';
import {User} from '../models/user.model';

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
  constructor() {}

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
  async signup(@requestBody({
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
}) _requestBody: {
  name?: string;
  email?: string;
  password?: string;
}): Promise<User> {
    throw new Error('Not implemented');
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
  async signin(@requestBody({
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
}) _requestBody: {
  email?: string;
  password?: string;
}): Promise<{
  message?: string;
}> {
    throw new Error('Not implemented');
  }

}

