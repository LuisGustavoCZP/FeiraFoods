import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStorageDto } from './dto/create-foodstorage.dto';
import { UpdateStorageDto } from './dto/update-foodstorage.dto';

@Injectable()
export class StoragesService 
{
  constructor(private prisma: PrismaService) {}

  async create(createFoodstorageDto: CreateStorageDto) {
    return await this.prisma.foodStorage.create(
    {
      data:createFoodstorageDto
    });
  }

  async findAll()
  {
    return await this.prisma.foodStorage.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.foodStorage.findUnique(
    {
      where:{
        id:id
      }
    });
  }

  async update(id: number, updateFoodstorageDto: UpdateStorageDto) {
    return await this.prisma.foodStorage.update(
    {
      where:{
        id:id
      },
      data:updateFoodstorageDto
    });
  }

  async remove(id: number) {
    return await this.prisma.foodStorage.delete(
      {
        where:{
          id:id
        }
      });
  }

  async findFromCategory(categoryId : number) 
  {
    return await this.prisma.foodStorage.findMany(
    {
      include:
      {
        items:
        {
          where: 
          {
            foodItem: 
            {
              categoryId: categoryId
            }
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
        }
      }
    });
  }
}
