import { Module } from '@nestjs/common';
import { StorageItemsService } from './storageitems.service';
import { StorageItemsController } from './storageitems.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [StorageItemsController],
  providers: [StorageItemsService, PrismaService]
})
export class StorageItemsModule {}
