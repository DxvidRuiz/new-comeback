import { Injectable } from "@nestjs/common";
import * as sharp from 'sharp';

@Injectable()
export class ImageResizeService {
  async resizeAndCompress(buffer: Buffer, options: { width: number; height: number }): Promise<Buffer> {
    const resizedAndCompressedBuffer = await sharp(buffer)
      .resize(options.width, options.height)
      .jpeg({ quality: 80 })  // Puedes ajustar la calidad según tus necesidades
      .toBuffer();

    return resizedAndCompressedBuffer;
  }
}
