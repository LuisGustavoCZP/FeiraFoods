import { PartialType } from '@nestjs/mapped-types';
import { CreateStorageItemDto } from './create-foodstorageitem.dto';

export class UpdateStorageItemDto extends PartialType(CreateStorageItemDto) {}
