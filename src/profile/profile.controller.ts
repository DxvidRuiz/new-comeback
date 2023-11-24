import { Body, Controller, Delete, Get, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'auth/passport/jwt-auth.guard';
import { User } from 'users/entities/user.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ImageFileValidator } from './helpers/FileTypeValidationPipe';
import { ProfileService } from './profile.service';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }



  @Post("profile-photo")
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePhoto(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2000000 }),
          new ImageFileValidator(),
        ],
      }),
    ) file: Express.Multer.File,
    @Body() body: CreateProfileDto,
    @Request() req: any,
  ) {

    const user: User = req.user; // Aquí obtienes el usuario autenticado

    const result = await this.profileService.uploadProfilePhoto(file, body, user)

    console.log(result);


    // this.uploadsService.uploadProfilePhoto(file, body); // Asegúrate de pasar el objeto body si es necesario
    return result // Puedes ajustar el mensaje de retorno según tus necesidades.
  }











  // @Post()
  // create(@Body() createProfileDto: CreateProfileDto) {
  //   return this.profileService.create(createProfileDto);
  // }

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
