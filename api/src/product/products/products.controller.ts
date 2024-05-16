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
  UploadedFiles,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import * as dayjs from 'dayjs';
import { Role } from '@prisma/client';
import { FilesInterceptor } from '@nestjs/platform-express';

import { IProductFilters, ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PublicRoute } from 'src/common';
import { Roles } from 'src/common/decorators/role';
import { CloudinaryService } from 'src/common/modules/cloudinary/cloudinary.service';
import { ProductsInterceptor } from '../interceptors/products.interceptor';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @PublicRoute()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'color', required: false, type: String })
  @ApiQuery({ name: 'cat', required: false, type: String })
  @ApiQuery({ name: 'brand', required: false, type: String })
  @ApiQuery({ name: 'available', required: false, type: String })
  @ApiQuery({ name: 'tag', required: false, type: String })
  @ApiQuery({ name: 'bestSelling', required: false, type: String })
  @ApiQuery({ name: 'min', required: false, type: String })
  @ApiQuery({ name: 'max', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: String })
  @ApiQuery({ name: 'sort', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, type: String })
  @ApiQuery({ name: 'latest', required: false, type: String })
  async findAll(
    @Query('color') color: string,
    @Query('cat') cat: string,
    @Query('brand') brand: string,
    @Query('available') available: string,
    @Query('tag') tag: string,
    @Query('bestSelling') bestSelling: string,
    @Query('min') min: string,
    @Query('max') max: string,
    @Query('page') page: string,
    @Query('sort') sort: string,
    @Query('limit') limit: string,
    @Query('latest') latest: string,
  ) {
    const filters: IProductFilters = {
      // latest and best selling are special because their values are set on the server and not the client.
      ...(latest && { latest: dayjs().startOf('month').toDate() }),
      ...(bestSelling && { bestSelling: 4 }), // if rating is gte 4, then its a best seller

      ...(color && { color: String(color) }),
      ...(cat && { cat: String(cat) }),
      ...(brand && { brand: String(brand) }),
      ...(tag && { tag: String(tag) }),
      ...(page && { page: Number(page) }),
      ...(limit && { limit: Number(limit) }),
      ...(available && { available: available == 'true' ? true : false }),
      ...(sort && { sort: sort == 'desc' ? 'desc' : 'asc' }),
      ...((min || max) && {
        price: {
          ...(min && { gte: Number(min) }),
          ...(max && { lte: Number(max) }),
        },
      }),
    };

    // console.log(filters);

    return await this.productsService.findAll(filters);
  }

  @PublicRoute()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Post()
  @UseInterceptors(new ProductsInterceptor())
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FilesInterceptor('images', 4))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const images: string[] = [];
    if (files) {
      for (let f of files) {
        const urls = await this.cloudinaryService.uploadFile(f);
        images.push(urls.url);
      }
    }

    return this.productsService.create(createProductDto, images);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    await this.productsService.findOne(id);
    return this.productsService.update(id, updateProductDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.productsService.findOne(id);
    return this.productsService.remove(id);
  }
}
