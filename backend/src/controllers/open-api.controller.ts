import {repository} from '@loopback/repository';
import {HttpErrors, api, operation, param, requestBody} from '@loopback/rest';
import speakeasy from 'speakeasy';
import {Userdb} from '../models/userdb.model';
import {UserRepository} from '../repositories/user.repository';
import {promisify} from 'util';
import nodemailer from 'nodemailer';
import QRCode from 'qrcode';
import dotenv from 'dotenv';


dotenv.config();

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
  private mailTransporter: nodemailer.Transporter;

  constructor(
    @repository(UserRepository) private userRepository: UserRepository,
  ) {
    // this.mailTransporter = nodemailer.createTransport({
    //   host: 'smtp.gmail.com',
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     user: 'exoblock.test@gmail.com',
    //     pass: 'hnawvnbxlxiwzkst',
    //   },
    // });

    this.mailTransporter = nodemailer.createTransport({
      host: 'smtp.email.eu-frankfurt-1.oci.oraclecloud.com',
      port: 587,
      secure: false,
      auth: {
        user: 'ocid1.user.oc1..aaaaaaaaxwf6hpfschlu557kyhq4zr2dolwyh56nhmemjaspi4jit6b2xqkq@ocid1.tenancy.oc1..aaaaaaaahhvyscop32k6ekysw3aww3q2kc3hiepkghqnd46v5kaq3zknfdja.4i.com',
        pass: '9hC6(Vz>Y}GM0qVhV}0E',
      },
    });



    // this.mailTransporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST || "",
    //   port: process.env.SMTP_PORT || "",
    //   secure: process.env.TLS_ON === 'true',
    //   auth: {
    //     user: process.env.SMTP_USER || "",
    //     pass: process.env.SMTP_PASS || "",
    //   },
    // });



  //   const transporterConfig: SMTPTransport.Options = {
  //     host: process.env.SMTP_HOST || "",
  //     port: parseInt(process.env.SMTP_PORT || ""),
  //     secure: process.env.TLS_ON === 'true',
  //     auth: {
  //       user: process.env.SMTP_USER || "",
  //       pass: process.env.SMTP_PASS || "",
  //     },
  //   };
    
  //   this.mailTransporter= nodemailer.createTransport(transporterConfig);
   }

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
              firstname: {
                type: 'string',
              },
              lastname: {
                type: 'string',
              },
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

      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              firstname: {
                type: 'string',
              },
              lastname: {
                type: 'string',
              },
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
    userres: {
      firstname?: Userdb['firstname'];
      lastname?: Userdb['lastname'];
      username?: Userdb['username'];
      email?: Userdb['email'];
      phoneNumber?: Userdb['phoneNumber'];
      organization?: Userdb['organization'];
    },
  ): Promise<Userdb> {
    const {email} = userres;
    const {username} = userres;
    const {phoneNumber} = userres;

    

    const {ascii, hex, base32, otpauth_url} = speakeasy.generateSecret({
      issuer: '',
      name: email,
      length: 15,
    });
    const oneTimeCode = speakeasy.totp({
      secret: base32,
      encoding: 'base32',
    });
    const verificationCode = oneTimeCode.toString();
    const sendMail = promisify(
      this.mailTransporter.sendMail.bind(this.mailTransporter),
    );
    const qrCodeData = await QRCode.toDataURL(oneTimeCode);
    // const qrCodeImage = qrCodeData.split(';base64,').pop()
    const mailData = {
      from: "noreply@exocert.io",
      to: email || '',
      subject: 'Account Registration',
      html: `
        <p>Your verification code is: ${verificationCode}</p>
        
      `,
      attachments: [
        {
          filename: 'qrcode.png',
          content: qrCodeData.split(';base64,').pop(),
          encoding: 'base64',
          cid: 'qrcode', 
        },
      ]
      
    };
    // const qr = qrcode(0, 'M');
    // qr.addData(oneTimeCode);
    // qr.make();
    // const qrg = qr.createASCII();
    
    // mailData.text += `\n\nQR Code:\n${qr}`;


    // const info: SentMessageInfo = await sendMail(mailData);
    await sendMail(mailData);

    const usernameverifcation = await this.userRepository.findOne({ where: { username } });
    if (usernameverifcation) {
      throw new Error('username already exists');
    }
    const phoneverifcation = await this.userRepository.findOne({ where: { phoneNumber } });
    if (phoneverifcation) {
      throw new Error('phone number already exists');
    }

    const emailverification = await this.userRepository.findOne({ where: { email } });
    if (emailverification) {
      throw new Error('Email already exists');
    }
    let res;
  if (!emailverification && !phoneverifcation && !usernameverifcation) {
    res = await this.userRepository.create({
      ...userres,
      verificationCode,
      otp_ascii: ascii,
      otp_auth_url: otpauth_url,
      otp_base32: base32,
      otp_hex: hex,
    });
  } else {
    throw new Error('Email already exists');
  }

  return res;

  
  }

  //verify confirmation code

  @operation('post', '/verify', {
    summary: 'Verify the verification code',
    operationId: 'verifyCode',
    requestBody: {
      description: "The user's verification code",
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              verificationCode: {
                type: 'string',
              },
            },
            required: ['verificationCode', 'email'],
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Verification successful',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Verification successful',
                },
              },
            },
          },
        },
      },
      '400': {
        description: 'Invalid verification code',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Invalid verification code',
                },
              },
            },
          },
        },
      },
    },
    'x-extension-1': null,
  })
  async verifyCode(
    @requestBody({
      description: "The user's verification code",
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              verificationCode: {
                type: 'string',
              },
            },
            required: ['verificationCode', 'email'],
          },
        },
      },
    })
    verification: {
      verificationCode?: Userdb['verificationCode'];
      email: Userdb['email'];
    },
  ): Promise<{message: string}> {
    const {verificationCode, email} = verification;
    const user = await this.userRepository.findOne({where: {email}});

    if (!user) {
      throw new Error('User not found');
    }

    const userVerificationCode = user.verificationCode;

    if (verificationCode !== userVerificationCode) {
      return {message: 'Invalid verification code'};
    } else {
      return {message: 'Verification successful'};
    }
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
  async getvalidateOTP(
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

  @operation('get', '/otp/validateotp', {
    summary: 'Validate OTP',
    operationId: 'validateOTP',
    parameters: [
      {
        name: 'id',
        in: 'query',
        required: true,
        schema: {
          type: 'string',
        },
        description: 'The user ID',
      },
      {
        name: 'token',
        in: 'query',
        required: true,
        schema: {
          type: 'string',
        },
        description: 'The OTP token',
      },
    ],
    responses: {
      '200': {
        description: 'OTP validation successful',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                valid: {
                  type: 'boolean',
                },
              },
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
  })
  async validateOTP(
    @param.query.string('id') id: string,
    @param.query.string('token') token: string,
  ): Promise<{valid: boolean}> {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new HttpErrors.NotFound('User not found');
      }

      if (!user.otp_base32) {
        throw new HttpErrors.InternalServerError(
          'OTP base32 secret not found for user',
        );
      }

      const isValid = speakeasy.totp.verify({
        secret: user.otp_base32!,
        encoding: 'base32',
        token: token,
      });

      return {valid: isValid};
    } catch (error) {
      console.error(error);
      throw new HttpErrors.BadRequest(error.message);
    }
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
