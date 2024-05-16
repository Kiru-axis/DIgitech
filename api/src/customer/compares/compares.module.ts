import { Module } from '@nestjs/common';
import { ComparesService } from './compares.service';
import { ComparesController } from './compares.controller';

@Module({
  controllers: [ComparesController],
  providers: [ComparesService],
})
export class ComparesModule {}
