import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFoodItemDto } from './dto/create-fooditem.dto';
import { UpdateFoodItemDto } from './dto/update-fooditem.dto';

@Injectable()
export class FoodItemsService 
{
  constructor(private prisma: PrismaService) {}
  
  create(createFooditemDto: CreateFoodItemDto) {
    return 'This action adds a new fooditem';
  }

  async findAll() {
    return await this.prisma.foodItem.findMany({});
  }

  findOne(id: number) {
    return `This action returns a #${id} fooditem`;
  }

  update(id: number, updateFooditemDto: UpdateFoodItemDto) {
    return `This action updates a #${id} fooditem`;
  }

  remove(id: number) {
    return `This action removes a #${id} fooditem`;
  }
}
