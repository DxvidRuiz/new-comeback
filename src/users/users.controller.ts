import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'auth/passport/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserQueryService } from './users-query-service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly UserQueryService: UserQueryService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.UserQueryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.UserQueryService.findOne(id);
  }

  @Patch()
  @UseGuards(
    JwtAuthGuard, // RoleGuard
  )
  async update(@Body() updateUserDto: UpdateUserDto, @Request() req: any) {
    const id = req.user.id;
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete()
  @UseGuards(
    JwtAuthGuard,
    // RoleGuard
  )
  async softDelete(@Request() req: any) {
    const id = req.user.id;
    await this.usersService.softDeleteUser(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
