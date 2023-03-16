import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoodCategoriesService } from './foodcategories.service';
import { CreateFoodCategoryDto } from './dto/create-foodcategory.dto';
import { UpdateFoodCategoryDto } from './dto/update-foodcategory.dto';

@Controller('foodcategories')
export class FoodCategoriesController {
  constructor(private readonly foodcategoriesService: FoodCategoriesService) {}

  @Post()
  create(@Body() createFoodcategoryDto: CreateFoodCategoryDto) {
    return this.foodcategoriesService.create(createFoodcategoryDto);
  }

  @Get()
  findAll() {
    return this.foodcategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodcategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodcategoryDto: UpdateFoodCategoryDto) {
    return this.foodcategoriesService.update(+id, updateFoodcategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodcategoriesService.remove(+id);
  }
}
