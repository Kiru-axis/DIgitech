import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';

import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { Roles } from 'src/common/decorators/role';
import { PublicRoute } from '../../common';

@ApiTags('product-tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @PublicRoute()
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagsService.remove(id);
  }
}
