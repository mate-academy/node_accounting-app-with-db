import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Expanse, Prisma, User } from '@prisma/client';
import { ExcludeNullInterceptor } from 'src/NonNullInterceptor';
import { NotFoundInterceptor } from 'src/NotFoundInterceptor';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.getUser({ id: Number(id) });
  }

  @Post()
  @UseInterceptors(ExcludeNullInterceptor)
  async createUser(@Body() user: Prisma.UserCreateInput): Promise<User> {
    if (user === undefined) {
      throw new HttpException('No info provided', HttpStatus.BAD_REQUEST);
    }
    return this.usersService.createUser(user);
  }

  @Patch(':id')
  @UseInterceptors(NotFoundInterceptor)
  async updateUser(
    @Param('id') id: Prisma.UserWhereUniqueInput,
    @Body() user: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.usersService.updateUser({
      where: {
        id: Number(id),
      },
      data: user,
    });
  }

  @Delete(':id')
  @UseInterceptors(NotFoundInterceptor)
  async deleteUser(
    @Param('id') id: Prisma.UserWhereUniqueInput,
  ): Promise<User> {
    return this.usersService.deleteUser({ id: Number(id) });
  }

  @Get(':id/expanses')
  @UseInterceptors(NotFoundInterceptor)
  async getUserExpanses(
    @Param('id') id: Prisma.UserWhereUniqueInput,
  ): Promise<{ expanses: Expanse[] }> {
    return this.usersService.getUserExpanses({ id: Number(id) });
  }
}
