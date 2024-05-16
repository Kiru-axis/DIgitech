import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { prismaProductResponse } from './utils';

export interface IProductFilters {
  color: string;
  cat: string;
  tag: string;
  brand: string;
  sort: 'asc' | 'desc';
  available: boolean;
  limit: number;
  page: number;
  latest: Date;
  bestSelling: number;
  price: {
    lte?: number;
    gte?: number;
  };
}

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filters: IProductFilters) {
    const limit = 10;
    const products = await this.prisma.product.findMany({
      where: {
        available: filters.available,
        price: filters.price,
        reviewersCount: {
          gte: filters.bestSelling,
        },
        createdAt: filters.latest,
        Brand: { name: { contains: filters.brand, mode: 'insensitive' } },
        Category: { name: { contains: filters.cat, mode: 'insensitive' } },
        Colors: {
          some: { name: { contains: filters.color, mode: 'insensitive' } },
        },
        Tags: {
          some: { name: { contains: filters.tag, mode: 'insensitive' } },
        },
      },
      take: filters.limit || limit,
      skip: ((filters.page || 1) - 1) * (filters.limit || limit),
      orderBy: {
        title: filters.sort,
      },

      select: { ...prismaProductResponse },
      // select: { id: true, Tags: { select: { name: true } } },
    });

    return products;
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: { ...prismaProductResponse },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(dto: CreateProductDto, images: string[]) {
    await this._findBrandById(dto.brandId);
    await this._findCategoryById(dto.categoryId);

    return await this.prisma.product.create({
      data: {
        desc: dto.desc,
        price: dto.price,
        quantity: dto.quantity,
        title: dto.title,
        brandId: dto.brandId,
        categoryId: dto.categoryId,
        images,
        Colors: { connect: [...dto.colors] },
        Tags: { connect: [...dto.tags] },
      },
      select: { ...prismaProductResponse },
    });
  }

  async update(id: string, dto: UpdateProductDto) {
    await this._validateProductUpdateDto(dto);
    return this.prisma.product.update({
      where: { id },
      data: { ...dto },
    });
  }

  async remove(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  // Helpers

  async _findBrandById(id: string) {
    const brand = await this.prisma.brand.findUnique({ where: { id } });
    if (!brand) throw new BadRequestException('Please provide valid brand');
    return brand;
  }

  async _findCategoryById(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category)
      throw new BadRequestException('Please provide valid category');
    return category;
  }

  async _validateProductUpdateDto(dto: UpdateProductDto) {
    try {
      if (dto.brandId) await this._findBrandById(dto.brandId);

      if (dto.categoryId) await this._findCategoryById(dto.categoryId);
    } catch (error) {
      return error.response;
    }
  }
}
