import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Expanse, Prisma } from '@prisma/client';
import { NotFoundInterceptor } from 'src/NotFoundInterceptor';
import { ExpansesService } from './expanses.service';

@Controller('/expanses')
export class ExpansesController {
  constructor(private readonly expansesService: ExpansesService) {}

  @Get()
  async getAllExpanses(): Promise<Expanse[]> {
    return this.expansesService.getAllExpanses();
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getExpanseById(
    @Param('id') id: Prisma.ExpanseWhereUniqueInput,
  ): Promise<Expanse> {
    return this.expansesService.getExpanse(id);
  }

  @Post()
  async createExpanse(
    @Body() expanse: Prisma.ExpanseCreateInput,
  ): Promise<Expanse> {
    return this.expansesService.createExpanse(expanse);
  }

  @Patch(':id')
  @UseInterceptors(NotFoundInterceptor)
  async updateExpanse(
    @Param('id') id: Prisma.ExpanseWhereUniqueInput,
    @Body() expanse: Prisma.ExpanseUpdateInput,
  ): Promise<Expanse> {
    return this.expansesService.updateExpanse({
      where: {
        id: Number(id),
      },
      data: expanse,
    });
  }

  @Delete(':id')
  @UseInterceptors(NotFoundInterceptor)
  async deleteExpanse(
    @Param('id') id: Prisma.ExpanseWhereUniqueInput,
  ): Promise<Expanse> {
    return this.deleteExpanse(id);
  }
}
