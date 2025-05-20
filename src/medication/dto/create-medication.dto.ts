import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateMedicationDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsDateString()
  @IsNotEmpty()
  horario: string;

  @IsString()
  @IsOptional()
  imagem?: string;

  @IsString()
  @IsNotEmpty()
  daysOfWeek: string;

  @IsString()
  @IsOptional()
  dependentUserId?: string;
}
