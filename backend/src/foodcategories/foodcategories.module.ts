import { Module } from '@nestjs/common';
import { FoodCategoriesService } from './foodcategories.service';
import { FoodCategoriesController } from './foodcategories.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [FoodCategoriesController],
  providers: [FoodCategoriesService, PrismaService]
})
export class FoodCategoriesModule {}
