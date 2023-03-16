import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { FoodCategoriesModule } from './foodcategories/foodcategories.module';
import { FoodItemsModule } from './fooditems/fooditems.module';
import { StoragesModule } from './foodstorages/storages.module';
import { StorageItemsModule } from './foodstorageitems/storageitems.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, FoodCategoriesModule, FoodItemsModule, StoragesModule, StorageItemsModule],
  controllers: [AppController],
  providers: [
    AppService, 
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
  ],
})
export class AppModule {}
