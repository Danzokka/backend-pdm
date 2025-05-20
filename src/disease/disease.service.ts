import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateDiseaseDto } from './dto/create-disease.dto';
import { UpdateDiseaseDto } from './dto/update-disease.dto';

@Injectable()
export class DiseaseService {
  constructor(private prisma: PrismaService) {}

  async create(createDiseaseDto: CreateDiseaseDto, userId: string) {
    try {
      const disease = await this.prisma.disease.create({
        data: {
          name: createDiseaseDto.name,
          users: {
            connect: {
              id: userId,
            },
          },
        },
      });
      return disease;
    } catch (error) {
      throw new BadRequestException('Error creating disease');
    }
  }

  async findAll(userId: string) {
    try {
      // Get diseases for the user or any of their dependents
      const allDiseases = await this.prisma.disease.findMany({
        where: {
          OR: [
            {
              users: {
                some: {
                  id: userId,
                },
              },
            },
            {
              dependentUsers: {
                some: {
                  userId: userId,
                },
              },
            },
          ],
        },
        include: {
          users: {
            select: {
              id: true,
              name: true,
            },
          },
          dependentUsers: {
            select: {
              id: true,
              name: true,
              userId: true,
            },
          },
        },
      });
      return allDiseases;
    } catch (error) {
      throw new BadRequestException('Error finding diseases');
    }
  }

  async findOne(id: string, userId: string) {
    try {
      const disease = await this.prisma.disease.findFirst({
        where: {
          id,
          OR: [
            {
              users: {
                some: {
                  id: userId,
                },
              },
            },
            {
              dependentUsers: {
                some: {
                  userId: userId,
                },
              },
            },
          ],
        },
        include: {
          users: {
            select: {
              id: true,
              name: true,
            },
          },
          dependentUsers: {
            select: {
              id: true,
              name: true,
              userId: true,
            },
          },
        },
      });

      if (!disease) {
        throw new NotFoundException('Disease not found');
      }

      return disease;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error finding disease');
    }
  }

  async update(id: string, updateDiseaseDto: UpdateDiseaseDto, userId: string) {
    try {
      // Check if disease exists and belongs to user
      await this.findOne(id, userId);

      return await this.prisma.disease.update({
        where: { id },
        data: updateDiseaseDto,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error updating disease');
    }
  }

  async remove(id: string, userId: string) {
    try {
      // Check if disease exists and belongs to user
      await this.findOne(id, userId);

      return await this.prisma.disease.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error deleting disease');
    }
  }
}
