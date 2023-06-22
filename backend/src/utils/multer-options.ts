import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';

// multer configuration
export const multerConfig = {
  dest: './uploads',
};

// multer upload configuration
export const multerOptions = {
  //enable file size limits
  //   limits: {
  //     fileSize: 1024,
  //   },
  // check mime type to allow the upload
  fileFilter: (_, file, callback) => {
    if (!file)
      callback(new BadRequestException('File is not a valid csv file'), false);
    const validMimeTypes = ['text/csv'];
    if (validMimeTypes.find((mimeType) => mimeType === file.mimetype))
      callback(null, true);
    else
      callback(new BadRequestException('File is not a valid csv file'), false);
  },

  // storage properties
  storage: diskStorage({
    // destination storage path details
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = multerConfig.dest;
      // create folder if it doesn't exist
      if (!existsSync(uploadPath)) mkdirSync(uploadPath);
      cb(null, uploadPath);
    },
    // file modification details
    filename: (req: any, file: any, cb: any) => {
      // Calling the callback passing the random name generated with the original extension name
      cb(null, `${new Date().toString()}${extname(file.originalname)}`);
    },
  }),
};
