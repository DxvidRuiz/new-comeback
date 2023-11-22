import { FileValidator, Injectable } from '@nestjs/common';
import * as FileType from 'file-type';

@Injectable()
export class ImageFileValidator extends FileValidator {
    // Acepta opciones adicionales si es necesario, pero por ahora no se están utilizando
    constructor(validationOptions: Record<string, any> = {}) {
        super(validationOptions);
    }

    async isValid(file: any): Promise<boolean> {
        if (!file || !file.buffer) {
            return false;
        }

        const fileType = await FileType.fromBuffer(file.buffer);

        if (!fileType || !this.isValidImageType(fileType)) {
            return false;
        }

        return true;
    }

    buildErrorMessage(file: any): string {
        return 'Invalid image file. Only JPEG, PNG, and WebP images are allowed.';
    }

    private isValidImageType(fileType: FileType.FileTypeResult): boolean {
        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];

        // Considerar 'image/gif' como no válido
        if (fileType.mime === 'image/gif') {
            return false;
        }

        // Verificar si el tipo MIME está permitido
        return allowedImageTypes.includes(fileType.mime);
    }
}
