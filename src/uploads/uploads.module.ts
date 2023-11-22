import { Module } from '@nestjs/common';
import { ImageResizeService } from './services/imageResize.service';
import { ImageSavingService } from './services/imageSaving.service';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';

@Module({
  controllers: [UploadsController],
  providers: [UploadsService, ImageResizeService, ImageSavingService],
})
export class UploadsModule { }
