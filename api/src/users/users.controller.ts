import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ForbiddenException,
  Query,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role, User } from '@prisma/client';

import { IUserFilters, UsersService } from './users.service';
import { CreateAddressDto, UpdateAddressDto, UpdateUserDto } from './dto';
import { CurrentUser } from 'src/common';
import { Roles } from 'src/common/decorators/role';
import { CloudinaryService } from 'src/common/modules/cloudinary/cloudinary.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('address')
  @HttpCode(HttpStatus.OK)
  async createAddress(
    @Body() dto: CreateAddressDto,
    @CurrentUser() user: User,
  ) {
    return this.usersService.createAddress(user.id, dto);
  }

  @Put('address/update')
  @HttpCode(HttpStatus.OK)
  async updateAddress(
    @Body() dto: UpdateAddressDto,
    @CurrentUser() user: User,
  ) {
    return this.usersService.updateAddress(user.id, dto);
  }

  @Put('user/update')
  @UseInterceptors(FileInterceptor('image'))
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Body() dto: UpdateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }), //2mb
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
    @CurrentUser() user: User,
  ) {
    if (file) {
      const userImage = (await this.cloudinaryService.uploadFile(file)).url;
      return this.usersService.updateUser(user.id, dto, userImage);
    }
    return this.usersService.updateUser(user.id, dto);
  }

  // ALL ADMIN TASKS
  @Get()
  @Roles(Role.ADMIN)
  @ApiQuery({ name: 'fname', required: false, type: String })
  @ApiQuery({ name: 'lname', required: false, type: String })
  @ApiQuery({ name: 'mobile', required: false, type: String })
  @ApiQuery({ name: 'email', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, type: String })
  async findAll(
    @Query('fname') fname: string,
    @Query('lname') lname: string,
    @Query('mobile') mobile: string,
    @Query('email') email: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const filters: IUserFilters = {
      ...(fname && { fname: String(fname) }),
      ...(lname && { lname: String(lname) }),
      ...(mobile && { mobile: String(mobile) }),
      ...(email && { email: String(email) }),
      ...(page && { page: Number(page) }),
      ...(limit && { limit: Number(limit) }),
    };

    return this.usersService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Get('admin/:id')
  async findOneAdmin(@Param('id') id: string) {
    return this.usersService.findOneAdmin(id);
  }

  @Roles(Role.ADMIN)
  @Post('block/:userId')
  async block(@Param('userId') userId: string) {
    return this.usersService.block(userId);
  }

  @Roles(Role.ADMIN)
  @Post('unblock/:userId')
  async unblock(@Param('userId') userId: string) {
    return this.usersService.unblock(userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
    const foundUser = await this.usersService.findOne(id);

    if (foundUser.id !== user.id && user.role.includes(Role.USER)) {
      throw new ForbiddenException();
    }
    return this.usersService.remove(id);
  }
}
