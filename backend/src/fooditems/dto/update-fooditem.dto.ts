import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodItemDto } from './create-fooditem.dto';

export class UpdateFoodItemDto extends PartialType(CreateFoodItemDto) {}
