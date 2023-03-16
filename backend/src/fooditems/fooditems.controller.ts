import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoodItemsService } from './fooditems.service';
import { CreateFoodItemDto } from './dto/create-fooditem.dto';
import { UpdateFoodItemDto } from './dto/update-fooditem.dto';

@Controller('fooditems')
export class FoodItemsController {
  constructor(private readonly fooditemsService: FoodItemsService) {}

  @Post()
  create(@Body() createFooditemDto: CreateFoodItemDto) {
    return this.fooditemsService.create(createFooditemDto);
  }

  @Get()
  findAll() {
    return this.fooditemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fooditemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFooditemDto: UpdateFoodItemDto) {
    return this.fooditemsService.update(+id, updateFooditemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fooditemsService.remove(+id);
  }
}
