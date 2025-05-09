import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MedicationService } from './medication.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { AuthGuard, RequestAuthGuard } from '../auth/guards/auth.guard';

@Controller('medication')
@UseGuards(AuthGuard)
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}

  @Post()
  create(
    @Body() createMedicationDto: CreateMedicationDto,
    @Req() req: RequestAuthGuard,
  ) {
    return this.medicationService.create(createMedicationDto, req.user.id);
  }

  @Get()
  findAll(@Req() req: RequestAuthGuard) {
    return this.medicationService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: RequestAuthGuard) {
    return this.medicationService.findOne(id, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMedicationDto: UpdateMedicationDto,
    @Req() req: RequestAuthGuard,
  ) {
    return this.medicationService.update(id, updateMedicationDto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestAuthGuard) {
    return this.medicationService.remove(id, req.user.id);
  }
}
