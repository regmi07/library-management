import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// multer configuration
// export const multerConfig = {
//   dest: './uploads',
// };

// // multer upload configuration
// export const multerOptions = {
//   //enable file size limits
//   //   limits: {
//   //     fileSize: 1024,
//   //   },
//   // check mime type to allow the upload

//   fileFilter: (_, file, callback) => {
//     if (!file)
//       callback(new BadRequestException('File is not a valid csv file'), false);
//     const validMimeTypes = ['text/csv', 'image/png', 'image/jpg'];
//     if (validMimeTypes.find((mimeType) => mimeType === file.mimetype))
//       callback(null, true);
//     else
//       callback(new BadRequestException('File is not a valid csv file'), false);
//   },

//   // storage properties
//   storage: diskStorage({
//     // destination storage path details
//     destination: (req: any, file: any, cb: any) => {
//       console.log('multer storage options called');
//       const uploadPath = multerConfig.dest;
//       // create folder if it doesn't exist
//       if (!existsSync(uploadPath)) mkdirSync(uploadPath);
//       cb(null, uploadPath);
//     },
//     // file modification details
//     filename: (req: any, file: any, cb: any) => {
//       // Calling the callback passing the random name generated with the original extension name
//       cb(null, `${new Date().toString()}${extname(file.originalname)}`);
//     },
//   }),
// };

export const studentImageOptions = {
  fileFilter: (_, file, cb) => {
    console.log(file);
    if (!file) cb(new BadRequestException('File is not a valid file'), false);
    const allowedFiles = ['image/jpeg', 'image/png'];
    if (allowedFiles.includes(file.mimetype)) cb(null, true);
    else
      cb(
        new BadRequestException(
          `Image ${file.originalname} is not of a valid type`,
        ),
        false,
      );
  },
  storage: diskStorage({
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = './uploads/student_images';
      if (!existsSync(uploadPath)) mkdirSync(uploadPath);
      cb(null, uploadPath);
    },
    filename: (req: any, file: any, cb: any) => {
      cb(null, `${file.originalname}`);
    },
  }),
};
