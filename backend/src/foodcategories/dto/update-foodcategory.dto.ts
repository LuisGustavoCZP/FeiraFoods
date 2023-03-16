import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodCategoryDto } from './create-foodcategory.dto';

export class UpdateFoodCategoryDto extends PartialType(CreateFoodCategoryDto) {}
