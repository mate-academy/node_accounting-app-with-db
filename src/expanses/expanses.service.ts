import { Injectable } from '@nestjs/common';
import { Expanse, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExpansesService {
  constructor(private prisma: PrismaService) {}

  async getAllExpanses(): Promise<Expanse[]> {
    return this.prisma.expanse.findMany();
  }

  async getExpanse(
    uniqueWhereExpanseInput: Prisma.ExpanseWhereUniqueInput,
  ): Promise<Expanse> {
    return this.prisma.expanse.findUnique({
      where: {
        id: Number(uniqueWhereExpanseInput),
      },
    });
  }

  async createExpanse(data: Prisma.ExpanseCreateInput): Promise<Expanse> {
    return this.prisma.expanse.create({
      data,
    });
  }

  async updateExpanse(props: {
    where: Prisma.ExpanseWhereUniqueInput;
    data: Prisma.ExpanseUpdateInput;
  }): Promise<Expanse> {
    const { where, data } = props;
    return this.prisma.expanse.update({
      data,
      where,
    });
  }

  async deleteExpanse(
    uniqueWhereExpanseInput: Prisma.ExpanseWhereUniqueInput,
  ): Promise<Expanse> {
    return this.prisma.expanse.delete({
      where: {
        id: Number(uniqueWhereExpanseInput),
      },
    });
  }
}
