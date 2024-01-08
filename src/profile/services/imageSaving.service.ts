/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';
import * as FileType from 'file-type';
import * as UUID from 'uuid';

const writeFileAsync = util.promisify(fs.writeFile);
const mkdirAsync = util.promisify(fs.mkdir);

@Injectable()
export class ImageSavingService {

  async saveProfilePhoto(buffer: Buffer, userId: string): Promise<string> {
    // Obtener la extensión del buffer de la imagen
    const imageType = await FileType.fromBuffer(buffer);
    const fileExtension = imageType ? `.${imageType.ext}` : '.jpg';

    // Construir el nombre de archivo único con la extensión
    const uniqueFileName = `${UUID.v4()}-${userId}-profile${fileExtension}`;
    const filePath = path.join(__dirname, '..', 'uploads', 'profile-photos', uniqueFileName);

    // Crear el directorio si no existe
    await this.createDirectory(path.dirname(filePath));

    try {
      // Guardar el archivo en disco
      await writeFileAsync(filePath, buffer);
      return filePath; // Retorna la ruta completa
    } catch (error) {
      // Manejar el error, podrías lanzar una excepción personalizada o devolver un código de error específico
      console.error('Error Saving image:', error);
      throw new Error('Error Saving image');
    }
  }

  private async createDirectory(directoryPath: string): Promise<void> {
    try {
      await mkdirAsync(directoryPath, { recursive: true });
    } catch (error) {
      console.error('Error while creating directory:', error);
      throw new Error('Error while creating directory');
    }
  }
}
