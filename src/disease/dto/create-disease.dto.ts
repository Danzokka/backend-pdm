import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDiseaseDto {
  @IsString({ message: 'O nome da doença deve ser um texto válido' })
  @IsNotEmpty({ message: 'O nome da doença não pode ser vazio' })
  name: string;
}
