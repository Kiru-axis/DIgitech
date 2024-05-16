/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as dayjs from 'dayjs';
import { createHash } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role, User } from '@prisma/client';
import { IJwtPayload, Tokens } from './types';

import {
  ForgotPasswordDto,
  ResetPasswordDto,
  SigninDto,
  SignupDto,
} from './dto/index.dto';
import { IMailerOpts, bCryptDecode, bCryptHash } from 'src/common';
import { createResetToken } from './passwords';
import { MailerService } from 'src/mailer/mailer.service';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async signup(dto: SignupDto) {
    const password = await bCryptHash(dto.password);
    const newUser = await this.prisma.user.create({
      data: { ...dto, password: password },
    });

    return {
      success: true,
      messsage: `Account for ${newUser.firstname} created.`,
    };
  }

  async signin(dto: SigninDto) {
    const user = await this.findUserByEmail(dto.email);

    const pMatches = await bCryptDecode(dto.password, user.password);

    if (!pMatches) throw new UnauthorizedException('Invalid Credentials');

    if (user.blocked)
      throw new UnauthorizedException('These account has been suspended');

    const tokens = await this.generateTokens({
      email: user.email,
      role: user.role,
      sub: user.id,
    });

    await this.hashRefreshUpdateUser(user.id, tokens.refreshToken);

    // exclude some fields
    const {
      password,
      passwordChangedAt,
      passwordResetToken,
      passwordResetTokenExiresAt,
      updatedAt,
      createdAt,
      blocked,
      refreshToken,
      ...data
    } = user;

    return { tokens, data };
  }

  async signinAdmin(dto: SigninDto) {
    const user = await this.findUserByEmail(dto.email);

    const pMatches = await bCryptDecode(dto.password, user.password);

    if (!pMatches) throw new UnauthorizedException('Invalid Credentials');

    if (user.blocked)
      throw new UnauthorizedException('These account has been suspended');

    if (user.role !== Role.ADMIN)
      throw new UnauthorizedException('Invalid Credentials');

    const tokens = await this.generateTokens({
      email: user.email,
      role: user.role,
      sub: user.id,
    });

    await this.hashRefreshUpdateUser(user.id, tokens.refreshToken);

    // exclude some fields
    const {
      password,
      passwordChangedAt,
      passwordResetToken,
      passwordResetTokenExiresAt,
      updatedAt,
      createdAt,
      blocked,
      refreshToken,
      ...data
    } = user;

    return { tokens, data };
  }

  async signout(user: User) {
    await this.prisma.user.update({
      where: { id: user.id, AND: { refreshToken: { not: null } } },
      data: { refreshToken: null },
    });
  }

  async refresh(userId: string, refreshToken: string) {
    const foundUser = await this.findUserById(userId);

    const refreshMatch = await bCryptDecode(
      refreshToken,
      foundUser.refreshToken,
    );

    if (!refreshMatch) throw new ForbiddenException('Access Denied');

    const tokens = await this.generateTokens({
      email: foundUser.email,
      role: foundUser.role,
      sub: foundUser.id,
    });

    await this.hashRefreshUpdateUser(foundUser.id, tokens.refreshToken);

    return tokens;
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const foundUser = await this.findUserByEmail(dto.email);
    const resetToken = await createResetToken(foundUser.id);

    try {
      const mailInfo: IMailerOpts = {
        subject: 'Reset Password',
        text: 'Make it alphanumeric with special characters',
        to: foundUser.email,
        html: `
          <div>Hello, Please follow the link to reset your password.
            The link is only valid for 10 minutes from now.
            <a href="http://localhost:3000/reset-password/${resetToken}">Reset</a>
          </div>`,
      };

      await this.mailerService.sendEmail(mailInfo);
      // return resetToken;
    } catch (error) {
      // incase of error, delete the token
      await this.prisma.user.update({
        where: { email: dto.email },
        data: {
          passwordResetToken: null,
          passwordChangedAt: null,
          passwordResetTokenExiresAt: null,
        },
      });

      throw new InternalServerErrorException(
        'There was a problem sending the reset token. Please try again later',
      );
    }
  }

  async resetPassword(dto: ResetPasswordDto, resetToken: string) {
    // snce the token is a hex, hash it to match the one in db
    const hashedResetToken = createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // passwordResetToken is a unique field, fnd the user by it
    const user = await this.prisma.user.findUnique({
      where: {
        passwordResetToken: hashedResetToken,
        AND: {
          passwordResetTokenExiresAt: { gte: new Date() },
        },
      },
    });

    // raise an exception if the user isnt found.
    if (!user) throw new BadRequestException('invalid token');

    //hash the password and update the user
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: await bCryptHash(dto.password),
        passwordChangedAt: null,
        passwordResetToken: null,
        passwordResetTokenExiresAt: null,
      },
    });
    return { statusCode: 200, message: `Password updated` };
  }

  //   helpers
  async findUserById(id: string) {
    const foundUser = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!foundUser) throw new NotFoundException('Account not found');
    return foundUser;
  }
  async findUserByEmail(email: string) {
    const fUser = await this.prisma.user.findUnique({
      where: { email },
      include: { Address: true },
    });
    if (!fUser) throw new NotFoundException('Account not found');

    return fUser;
  }

  // hash the refresh token and update the user
  async hashRefreshUpdateUser(userId: string, refreshToken: string) {
    const hashedRefresh = await bCryptHash(refreshToken);

    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hashedRefresh },
    });
  }

  // generate refesh and access tokens
  async generateTokens(payload: IJwtPayload): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.config.getOrThrow('ACCESS_TOKEN_SECRET'),
        expiresIn: this.config.getOrThrow('ACCESS_TOKEN_EXPIRY'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.config.getOrThrow('REFRESH_TOKEN_SECRET'),
        expiresIn: this.config.getOrThrow('REFRESH_TOKEN_EXPIRY'),
      }),
    ]);

    return { accessToken: at, refreshToken: rt };
  }
}
