import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class UpdateMedicationDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsDateString()
  @IsOptional()
  horario?: string;

  @IsString()
  @IsOptional()
  imagem?: string;

  @IsString()
  @IsOptional()
  daysOfWeek?: string;

  @IsString()
  @IsOptional()
  dependentUserId?: string;
}
