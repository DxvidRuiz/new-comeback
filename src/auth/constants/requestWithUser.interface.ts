// custom-request.interface.ts
import { Request } from 'express';

export interface requestWithUser extends Request {
    user: {
        email: string;
        role: string;
        // otras propiedades relacionadas con el usuario
    };
}
