import { BadRequestException } from '@nestjs/common';

export class ValidationException extends BadRequestException {
  constructor(public readonly message: string, public readonly errors: any[]) {
    super(message);
  }
}
