import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class MedicationService {
  constructor(private prisma: PrismaService) {}

  async create(createMedicationDto: CreateMedicationDto, userId: string) {
    try {
      return await this.prisma.medication.create({
        data: {
          nome: createMedicationDto.nome,
          descricao: createMedicationDto.descricao,
          horario: new Date(createMedicationDto.horario),
          imagem: createMedicationDto.imagem,
          userId: userId,
        },
      });
    } catch (error) {
      throw new BadRequestException('Erro ao criar medicamento');
    }
  }

  async findAll(userId: string) {
    try {
      return await this.prisma.medication.findMany({
        where: {
          userId: userId,
        },
      });
    } catch (error) {
      throw new BadRequestException('Erro ao buscar medicamentos');
    }
  }

  async findOne(id: string, userId: string) {
    try {
      const medication = await this.prisma.medication.findFirst({
        where: {
          id: id,
          userId: userId,
        },
      });

      if (!medication) {
        throw new NotFoundException(`Medicamento com ID ${id} não encontrado`);
      }

      return medication;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erro ao buscar medicamento');
    }
  }

  async update(
    id: string,
    updateMedicationDto: UpdateMedicationDto,
    userId: string,
  ) {
    try {
      // Verify if medication exists and belongs to the user
      await this.findOne(id, userId);

      return await this.prisma.medication.update({
        where: {
          id: id,
        },
        data: {
          ...(updateMedicationDto.nome && { nome: updateMedicationDto.nome }),
          ...(updateMedicationDto.descricao && {
            descricao: updateMedicationDto.descricao,
          }),
          ...(updateMedicationDto.horario && {
            horario: new Date(updateMedicationDto.horario),
          }),
          ...(updateMedicationDto.imagem && {
            imagem: updateMedicationDto.imagem,
          }),
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erro ao atualizar medicamento');
    }
  }

  async remove(id: string, userId: string) {
    try {
      // Verify if medication exists and belongs to the user
      await this.findOne(id, userId);

      return await this.prisma.medication.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erro ao excluir medicamento');
    }
  }

  // Cron job to check medications every minute
  @Cron('0 * * * * *')
  async handleMedicationReminders() {
    const now = new Date();
    // Find all medications scheduled for this minute
    const medications = await this.prisma.medication.findMany({
      where: {
        horario: {
          // Check if the medication time is within the current minute
          gte: new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            now.getHours(),
            now.getMinutes(),
            0,
          ),
          lt: new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            now.getHours(),
            now.getMinutes() + 1,
            0,
          ),
        },
      },
      include: {
        user: true,
      },
    });

    // Process each medication
    for (const medication of medications) {
      // Here you would trigger your notification event
      console.log(
        `Sending reminder for medication: ${medication.nome} to user: ${medication.user.name}`,
      );
      // You could implement a notification service that sends push notifications, emails, etc.
      // For example:
      // this.notificationService.sendMedicationReminder(medication, medication.user);
    }
  }
}
