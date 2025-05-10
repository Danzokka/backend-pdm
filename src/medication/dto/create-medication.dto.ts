import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

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

}
