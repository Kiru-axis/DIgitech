import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAddressDto, UpdateAddressDto, UpdateUserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  checkZipCodeLength,
  prismaAdminUserResponse,
  prismaUserResponse,
} from './utils';
import { Role } from '@prisma/client';

export interface IUserFilters {
  fname: string;
  lname: string;
  email: string;
  mobile: string;
  page: number;
  limit: number;
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createAddress(userId: string, dto: CreateAddressDto) {
    checkZipCodeLength(dto.zipCode);
    try {
      return this.prisma.user.update({
        where: { id: userId },
        data: {
          Address: {
            create: {
              ...dto,
            },
          },
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
          image: true,
          role: true,
          mobile: true,
          Address: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
              address1: true,
              city: true,
              state: true,
              zipCode: true,
              address2: true,
              other: true,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);

      throw new BadRequestException(error);
    }
  }

  async updateAddress(userId: string, dto: UpdateAddressDto) {
    checkZipCodeLength(dto.zipCode);

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        Address: {
          update: { ...dto },
        },
      },
      select: { ...prismaUserResponse },
    });
  }

  async updateUser(userId: string, dto: UpdateUserDto, image?: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        ...dto,
        image,
      },
      select: { ...prismaUserResponse },
    });
  }

  // ALL ADMIN TASKS
  async findAll(filters: IUserFilters) {
    const limit = 15;

    return this.prisma.user.findMany({
      where: {
        role: Role.USER,
        firstname: { contains: filters.fname, mode: 'insensitive' },
        lastname: { contains: filters.lname, mode: 'insensitive' },
        mobile: { contains: filters.mobile, mode: 'insensitive' },
        email: { contains: filters.email, mode: 'insensitive' },
      },
      take: filters.limit || limit,
      skip: ((filters.page || 1) - 1) * (filters.limit || limit),
      select: { ...prismaUserResponse },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { ...prismaUserResponse },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // ADMIN

  async findOneAdmin(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { ...prismaAdminUserResponse },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  async block(userId: string) {
    await this.findOne(userId);
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        blocked: true,
      },
    });
  }

  async unblock(userId: string) {
    await this.findOne(userId);
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        blocked: false,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  // helpers
}
