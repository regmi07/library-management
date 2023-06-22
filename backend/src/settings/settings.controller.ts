import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';

import { SettingsService } from './settings.service';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Patch('profile')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (_, file, callback) => {
        if (!file)
          callback(new BadRequestException('File is not valid image.'), false);
        const validMimeTypes = ['image/jpeg', 'image/png'];
        if (validMimeTypes.find((mimetype) => mimetype === file.mimetype))
          callback(null, true);
        else
          callback(
            new BadRequestException('File is not valid image type'),
            false,
          );
      },
    }),
  )
  updateProfile(@UploadedFile() profile: Express.Multer.File) {
    return this.settingsService.uploadProfile(profile);
  }

  @Get()
  findOne() {
    return this.settingsService.findOne();
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateSettingDto: UpdateSettingDto) {
    return this.settingsService.update(id, updateSettingDto);
  }
}
