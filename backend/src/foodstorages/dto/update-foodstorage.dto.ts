import { PartialType } from '@nestjs/mapped-types';
import { CreateStorageDto } from './create-foodstorage.dto';

export class UpdateStorageDto extends PartialType(CreateStorageDto) 
{
    
}
