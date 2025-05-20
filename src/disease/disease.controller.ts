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
import { DiseaseService } from './disease.service';
import { CreateDiseaseDto } from './dto/create-disease.dto';
import { UpdateDiseaseDto } from './dto/update-disease.dto';
import { AuthGuard, RequestAuthGuard } from '../auth/guards/auth.guard';

@Controller('disease')
@UseGuards(AuthGuard)
export class DiseaseController {
  constructor(private readonly diseaseService: DiseaseService) {}

  @Post()
  create(
    @Body() createDiseaseDto: CreateDiseaseDto,
    @Req() req: RequestAuthGuard,
  ) {
    return this.diseaseService.create(createDiseaseDto, req.user.id);
  }

  @Get()
  findAll(@Req() req: RequestAuthGuard) {
    return this.diseaseService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: RequestAuthGuard) {
    return this.diseaseService.findOne(id, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDiseaseDto: UpdateDiseaseDto,
    @Req() req: RequestAuthGuard,
  ) {
    return this.diseaseService.update(id, updateDiseaseDto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestAuthGuard) {
    return this.diseaseService.remove(id, req.user.id);
  }
}
