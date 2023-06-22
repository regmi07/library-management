import { Injectable } from '@nestjs/common';
import {
  promises as fsPromises,
  createReadStream,
  existsSync,
  mkdirSync,
} from 'fs';
import { Repository } from 'typeorm';
import * as csv from 'csv-parser';

@Injectable()
export class CsvService {
  async importDataFromCsv<T>(
    file: Express.Multer.File,
    repository: Repository<T>,
    createEntityFn: (data: Record<string, any>) => T,
  ) {
    const results = [];
    const failedToSaveDatas = [];

    const { originalname } = file;

    const readableStream = createReadStream(file.path);

    readableStream
      .pipe(csv())
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', async () => {
        console.log('async function called');
        const promises = results.map(async (result, index) => {
          // console.log(result);
          try {
            const entity = createEntityFn(result);
            console.log('ISBN in csv: ', entity);
            await repository.save(entity);
          } catch (error) {
            console.log(error.message);
            failedToSaveDatas.push({
              row: index + 1,
              error: error.message,
            });
          }
        });
        await Promise.all(promises);

        if (failedToSaveDatas.length > 0) {
          if (!existsSync('logs')) mkdirSync('logs');
          const logFilePath = `logs/${originalname}.log`;

          await fsPromises.writeFile(
            logFilePath,
            JSON.stringify(failedToSaveDatas, null, 2),
          );
          console.log(
            `All the row that cannot be saved is logged in ${logFilePath}`,
          );
        }

        await readableStream.close();
      });
  }

  // async saveDataFromCsv<T>(
  //   file: Express.Multer.File,
  //   repository: Repository<T>,
  //   createEntityFn: (data: Record<string, any>) => T,
  // ) {
  //   const failedToSaveDatas = [];
  // }
}
