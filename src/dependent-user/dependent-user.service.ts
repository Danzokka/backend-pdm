import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateDependentUserDto } from './dto/create-dependent-user.dto';

@Injectable()
export class DependentUserService {
  constructor(private prisma: PrismaService) {}

  async create(createDependentUserDto: CreateDependentUserDto, userId: string) {
    try {
      // Create dependent user with diseases if provided
      return await this.prisma.dependentUser.create({
        data: {
          name: createDependentUserDto.name,
          description: createDependentUserDto.description,
          birthDate: new Date(createDependentUserDto.birthDate),
          image: `https://avatar.vercel.sh/${createDependentUserDto.name.toLowerCase().replace(/\s+/g, '-')}`,
          userId: userId,
          // Connect diseases if provided
          ...(createDependentUserDto.diseases && {
            diseases: {
              connect: createDependentUserDto.diseases.map((disease) => ({
                id: disease.id,
              })),
            },
          }),
        },
        include: {
          diseases: true,
          medications: true,
        },
      });
    } catch (error) {
      throw new BadRequestException('Erro ao criar usuário dependente');
    }
  }

  async findAll(userId: string) {
    try {
      return await this.prisma.dependentUser.findMany({
        where: {
          userId: userId,
        },
        include: {
          diseases: true,
          medications: true,
        },
      });
    } catch (error) {
      throw new BadRequestException('Erro ao buscar usuários dependentes');
    }
  }

  async findOne(id: string, userId: string) {
    try {
      const dependentUser = await this.prisma.dependentUser.findFirst({
        where: {
          id: id,
          userId: userId,
        },
        include: {
          diseases: true,
          medications: true,
        },
      });

      if (!dependentUser) {
        throw new NotFoundException(
          `Usuário dependente com ID ${id} não encontrado`,
        );
      }

      return dependentUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erro ao buscar usuário dependente');
    }
  }

  async remove(id: string, userId: string) {
    try {
      // Verify if dependent user exists and belongs to the user
      await this.findOne(id, userId);

      // Delete the dependent user
      await this.prisma.dependentUser.delete({
        where: {
          id: id,
        },
      });

      return { message: 'Usuário dependente removido com sucesso' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erro ao remover usuário dependente');
    }
  }
}
