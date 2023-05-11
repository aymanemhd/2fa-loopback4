import {repository} from '@loopback/repository';
import {HttpErrors, api, operation, requestBody} from '@loopback/rest';
import speakeasy from 'speakeasy';
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

          username: {
            type: 'string',
          },
          email: {
            type: 'string',
            format: 'email',
          },
          phoneNumber: {
            type: 'string',
          },
          organization: {
            type: 'string',
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
  @operation('post', '/register', {
    summary: 'Create a new account',
    operationId: 'register',
    requestBody: {
      description: "The user's account details",
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              username: {
                type: 'string',
              },
              email: {
                type: 'string',
                format: 'email',
              },
              phoneNumber: {
                type: 'string',
              },
              organization: {
                type: 'string',
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
  async register(
    @requestBody({
      description: "The user's account details",
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              username: {
                type: 'string',
              },
              email: {
                type: 'string',
                format: 'email',
              },
              phoneNumber: {
                type: 'string',
              },
              organization: {
                type: 'string',
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
      username?: Userdb['username'];
      email?: Userdb['email'];
      phoneNumber?: Userdb['phoneNumber'];
      organization?: Userdb['organization'];
    },
  ): Promise<Userdb> {
    const {email} = userres;
    const {ascii, hex, base32, otpauth_url} = speakeasy.generateSecret({
      issuer: '',
      name: email,
      length: 15,
    });
    const res = await this.userRepository.create({
      ...userres,
      otp_ascii: ascii,
      otp_auth_url: otpauth_url,
      otp_base32: base32,
      otp_hex: hex,
    });
    return res;
  }

  //verify 2fa function

  @operation('post', '/otp/verifyotp', {
    summary: 'verify 2fa account',
    operationId: 'verifyotp',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
              },
            },
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Successfully verify',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Successfully verify',
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
  async verifyOTP(
    @requestBody({
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
              },
              token: {
                type: 'string',
              },
            },
          },
        },
      },
    })
    data: {
      id: Userdb['id'];
      token: string;
    },
  ): Promise<{verified: boolean}> {
    try {
      const user = await this.userRepository.findById(data.id);
      if (!user) {
        throw new HttpErrors.Unauthorized('User not found');
      }

      if (!user.otp_base32) {
        throw new HttpErrors.InternalServerError(
          'OTP base32 secret not found for user',
        );
      }

      const verified = speakeasy.totp.verify({
        secret: user.otp_base32!,
        encoding: 'base32',
        token: data.token,
      });

      if (!verified) {
        throw new HttpErrors.Unauthorized('Invalid OTP token');
      }

      await this.userRepository.updateById(data.id, {
        otp_enabled: true,
        otp_verified: true,
      });

      return {verified: true};
    } catch (error) {
      console.error(error);
      throw new HttpErrors.Unauthorized(error.message);
    }
  }
  //validate function
  @operation('post', '/otp/validateotp', {
    summary: 'validate 2fa account',
    operationId: 'verifyotp',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
              },
            },
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Successfully generate',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Successfully generate',
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
  async validateOTP(
    @requestBody({
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
              },
              token: {
                type: 'string',
              },
            },
            required: ['id', 'token'],
          },
        },
      },
    })
    data: {
      id: Userdb['id'];
      token: string;
    },
  ): Promise<{validate: boolean}> {
    const user = await this.userRepository.findById(data.id);
    const message = "Token is invalid or user doesn't exist";
    if (!user) {
      throw new HttpErrors.Unauthorized(message);
    }
    const validToken = speakeasy.totp.verify({
      secret: user.otp_base32!,
      encoding: 'base32',
      token: data.token,
    });

    if (!validToken) {
      throw new HttpErrors.Unauthorized(message);
    }

    return {validate: true};
  }

  //disable function
  @operation('post', '/otp/disableotp', {
    summary: 'disable 2fa account',
    operationId: 'verifyotp',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
              },
            },
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Successfully generate',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Successfully disable',
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
  async disableOTP(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: {type: 'string'},
            },
          },
        },
      },
    })
    data: {
      id: Userdb['id'];
    },
  ): Promise<object> {
    const user = await this.userRepository.findById(data.id);
    if (!user) {
      throw new HttpErrors.Unauthorized('User does not exist');
    }

    user.otp_enabled = false;
    const updatedUser = await this.userRepository.update(user);

    return {
      otp_disabled: true,
      user: updatedUser,
    };
  }
}
