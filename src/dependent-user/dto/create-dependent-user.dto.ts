import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class DiseaseIdDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class CreateDependentUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsDateString()
  @IsNotEmpty()
  birthDate: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DiseaseIdDto)
  diseases?: DiseaseIdDto[];
}
