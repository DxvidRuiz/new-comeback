/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import { Module, Global } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import * as admin from 'firebase-admin';
// import { ServiceAccount } from 'firebase-admin';

// @Global()
// @Module({
//   imports: [ConfigModule],
//   providers: [
//     {
//       provide: 'FIREBASE',
//       useFactory: (configService: ConfigService) => {
//         const adminConfig: ServiceAccount = {
//           projectId: 'iimmabe-test',
//           privateKey: configService
//             .get<string>('AIzaSyBNCvJVbdFMrHJTavPHMKD_lDKo5MQggek')
//             .replace(/\\\\n/g, '\\n'),
//           clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
//         };

//         return admin.initializeApp({
//           credential: admin.credential.cert(adminConfig),
//           databaseURL: 'https://iimmabe-test.firebaseio.com',
//         });
//       },
//       inject: [ConfigService],
//     },
//   ],
//   exports: ['FIREBASE'],
// })
// export class FirebaseModule {}
