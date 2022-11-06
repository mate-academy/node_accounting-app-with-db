import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ExpansesController } from './expanses.controller';
import { ExpansesService } from './expanses.service';

@Module({
  controllers: [ExpansesController],
  providers: [ExpansesService],
  imports: [PrismaModule],
})
export class ExpansesModule {}
