import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const oneKb = 2097152;

        console.log("heyyy", value.size);

        if (value.size > oneKb) {
            throw new BadRequestException('Max size 2048 KB.');
        }
        return value;
    }
}
