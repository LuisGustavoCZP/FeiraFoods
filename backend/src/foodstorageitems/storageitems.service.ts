import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStorageItemDto } from './dto/create-foodstorageitem.dto';
import { UpdateStorageItemDto } from './dto/update-foodstorageitem.dto';

@Injectable()
export class StorageItemsService 
{
  constructor(private prisma: PrismaService) {}
  
  async create(createFoodstorageitemDto: CreateStorageItemDto) 
  {
    return await this.prisma.foodStorageItem.create(
    {
      data:createFoodstorageitemDto
    });
  }

  async findAll(sid : number) {
    return await this.prisma.foodStorageItem.findMany({
      where:
      {
        storageId: sid
      },
      select:
      {
        id: true,
        total: true,
        foodItem: {
          select: {
            id: true,
            name: true,
            price: true,
            image: true,
            description: true,
            categoryId: true
          }
        }
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} foodstorageitem`;
  }

  update(id: number, updateFoodstorageitemDto: UpdateStorageItemDto) {
    return `This action updates a #${id} foodstorageitem`;
  }

  remove(id: number) {
    return `This action removes a #${id} foodstorageitem`;
  }
}
