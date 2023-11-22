import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'auth/passport/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch()
  @UseGuards(JwtAuthGuard,
    // RoleGuard
  )
  update(@Body() updateUserDto: UpdateUserDto, @Request() req: any) {

    const id = req.user.id
    return this.usersService.update(id, updateUserDto);
  }


  @Delete()
  @UseGuards(JwtAuthGuard,
    // RoleGuard
  )
  async softDelete(@Request() req: any) {
    const id = req.user.id
    await this.usersService.softDeleteUser(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
