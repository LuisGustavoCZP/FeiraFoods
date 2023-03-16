import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StoragesService } from './storages.service';
import { CreateStorageDto } from './dto/create-foodstorage.dto';
import { UpdateStorageDto } from './dto/update-foodstorage.dto';

@Controller('storages')
export class StoragesController {
  constructor(private readonly foodstoragesService: StoragesService) {}

  @Post()
  create(@Body() createFoodstorageDto: CreateStorageDto) {
    return this.foodstoragesService.create(createFoodstorageDto);
  }

  @Get('/categories/:id')
  findAll(@Param('id') id: string) {
    return this.foodstoragesService.findFromCategory(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodstoragesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodstorageDto: UpdateStorageDto) {
    return this.foodstoragesService.update(+id, updateFoodstorageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodstoragesService.remove(+id);
  }
}
