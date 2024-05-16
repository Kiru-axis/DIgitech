import { PartialType } from '@nestjs/swagger';
import { CreateCompareDto } from './create-compare.dto';

export class UpdateCompareDto extends PartialType(CreateCompareDto) {}
