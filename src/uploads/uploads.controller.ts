import { Body, Controller, Delete, Get, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { ImageFileValidator } from './helpers/FileTypeValidationPipe';
import { UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {

  }
  // profile photo upload 
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
    @Body() body: CreateUploadDto,
  ) {
    const photoUpdated = await this.uploadsService.uploadProfilePhoto(file, body)

    console.log(photoUpdated);


    // this.uploadsService.uploadProfilePhoto(file, body); // Asegúrate de pasar el objeto body si es necesario
    return  // Puedes ajustar el mensaje de retorno según tus necesidades.
  }


  @Get()
  findAll() {
    return this.uploadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadsService.update(+id, updateUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadsService.remove(+id);
  }
}
