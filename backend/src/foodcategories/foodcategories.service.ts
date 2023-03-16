import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFoodCategoryDto } from './dto/create-foodcategory.dto';
import { UpdateFoodCategoryDto } from './dto/update-foodcategory.dto';

@Injectable()
export class FoodCategoriesService 
{
  constructor(private prisma: PrismaService) {}
  
  create(createFoodcategoryDto: CreateFoodCategoryDto) {
    return 'This action adds a new foodcategory';
  }

  async findAll() 
  {
    return await this.prisma.foodCategory.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} foodcategory`;
  }

  update(id: number, updateFoodcategoryDto: UpdateFoodCategoryDto) {
    return `This action updates a #${id} foodcategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} foodcategory`;
  }
}
