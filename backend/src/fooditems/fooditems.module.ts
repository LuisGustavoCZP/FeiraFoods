import { Module } from '@nestjs/common';
import { FoodItemsService } from './fooditems.service';
import { FoodItemsController } from './fooditems.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [FoodItemsController],
  providers: [FoodItemsService, PrismaService]
})
export class FoodItemsModule {}
