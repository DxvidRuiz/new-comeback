// local-storage.provider.ts
import * as crypto from 'crypto';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const localStorage = diskStorage({
  destination: './uploads', // Directorio local para almacenar archivos
  filename: (req, file, cb) => {
    crypto.randomBytes(16, (err, hash) => {
      if (err) cb(err, '');
      const fileName = hash.toString('hex') + extname(file.originalname);
      cb(null, fileName);
    });
  },
});
