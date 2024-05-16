import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  UseInterceptors,
  UploadedFile,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role, User } from '@prisma/client';

import { BlogsService, IBlogFilters } from './blogs.service';
import { CreateBlogDto, BlogQueryDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CurrentUser, PublicRoute } from 'src/common';
import { Roles } from 'src/common/decorators/role';
import { CloudinaryService } from 'src/common/modules/cloudinary/cloudinary.service';

@ApiTags('blogs')
@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // @ApiQuery({ type: BlogQueryDto, required: false })
  @PublicRoute()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'cat', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, type: String })
  async findAll(
    @Query('cat') cat: string,
    @Query('page', new DefaultValuePipe('1')) page: string,
    @Query('limit', new DefaultValuePipe('15')) limit: string,
  ) {
    const filters: IBlogFilters = {
      ...(cat && { cat: String(cat) }),
      ...(page && { page: Number(page) }),
      ...(limit && { limit: Number(limit) }),
    };

    return this.blogsService.findAll(filters);
  }

  @PublicRoute()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return this.blogsService.findOne(id);
  }

  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createBlogDto: CreateBlogDto,
    @CurrentUser() user: User,
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
  ) {
    if (file) {
      const blogImage = (await this.cloudinaryService.uploadFile(file)).url;
      return this.blogsService.create(createBlogDto, user.id, blogImage);
    }

    return this.blogsService.create(createBlogDto, user.id);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(id, updateBlogDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    return this.blogsService.remove(id);
  }
}
