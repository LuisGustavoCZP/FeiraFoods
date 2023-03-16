import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StorageItemsService } from './storageitems.service';
import { CreateStorageItemDto } from './dto/create-foodstorageitem.dto';
import { UpdateStorageItemDto } from './dto/update-foodstorageitem.dto';

@Controller('storages/:sid/items')
export class StorageItemsController {
  constructor(private readonly foodstorageitemsService: StorageItemsService) {}

  @Post()
  create(@Body() createFoodstorageitemDto: CreateStorageItemDto) {
    return this.foodstorageitemsService.create(createFoodstorageitemDto);
  }

  @Get()
  findAll(@Param('sid') sid: string) {
    return this.foodstorageitemsService.findAll(+sid);
  }

  @Get(':id')
  findOne(@Param('id') sid: string, @Param('id') id: string) {
    return this.foodstorageitemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodstorageitemDto: UpdateStorageItemDto) {
    return this.foodstorageitemsService.update(+id, updateFoodstorageitemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodstorageitemsService.remove(+id);
  }
}
