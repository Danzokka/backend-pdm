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
import { DependentUserService } from './dependent-user.service';
import { CreateDependentUserDto } from './dto/create-dependent-user.dto';
import { AuthGuard, RequestAuthGuard } from '../auth/guards/auth.guard';

@Controller('dependent-user')
@UseGuards(AuthGuard)
export class DependentUserController {
  constructor(private readonly dependentUserService: DependentUserService) {}

  @Post()
  create(
    @Body() createDependentUserDto: CreateDependentUserDto,
    @Req() req: RequestAuthGuard,
  ) {
    return this.dependentUserService.create(
      createDependentUserDto,
      req.user.id,
    );
  }

  @Get()
  findAll(@Req() req: RequestAuthGuard) {
    return this.dependentUserService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: RequestAuthGuard) {
    return this.dependentUserService.findOne(id, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestAuthGuard) {
    return this.dependentUserService.remove(id, req.user.id);
  }
}
