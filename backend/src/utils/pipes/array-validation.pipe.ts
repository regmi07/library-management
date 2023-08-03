import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ArrayValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!Array.isArray(value))
      throw new BadRequestException('Invalid input. An array is required.');
    const dtoClass = metadata.metatype;
    // if (!dtoClass || !this.allElementsInstanceOf(value, dtoClass))
    //   throw new BadRequestException(
    //     'Invalid input. All the elements in the array must be valid.',
    //   );

    const validDatas = [];

    for (const user of value) {
      const outputDto = plainToInstance(dtoClass, user, {
        excludeExtraneousValues: true,
      });
      const errors = await validate(outputDto);
      if (errors.length == 0) validDatas.push(outputDto);
      else console.log('Validation error occured: ', errors);
    }

    return validDatas;
  }

  // private allElementsInstanceOf(datas: any[], dtoClass): boolean {
  //   return datas.every((element) => element instanceof dtoClass);
  // }
}
