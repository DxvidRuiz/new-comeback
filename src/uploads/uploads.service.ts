import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { ImageResizeService } from './services/imageResize.service';
import { ImageSavingService } from './services/imageSaving.service';

@Injectable()
export class UploadsService {

  constructor(
    private readonly resizeIMG: ImageResizeService,
    private readonly saveIMG: ImageSavingService
  ) {

  }
  async uploadProfilePhoto(file: Express.Multer.File, createUploadDto: CreateUploadDto) {

    const imageResized = await this.resizeIMG.resizeAndCompress(file.buffer, {
      width: 200, height: 200
    })
    const userId = "123"
    const imgSaved = await this.saveIMG.saveProfilePhoto(imageResized, userId)


    return imgSaved
      ;
  }

  findAll() {
    return `This action returns all uploads`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  update(id: number, updateUploadDto: UpdateUploadDto) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
