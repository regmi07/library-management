import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { SettingEntity } from './entities/setting.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SettingEntity)
    private readonly settingRepository: Repository<SettingEntity>,
  ) {}

  async create() {
    const { avatar, ...rest } = await this.settingRepository.save({});
    return {
      ...rest,
      avatar: avatar && `data:image/jpeg;base64, ${avatar}`,
    };
  }

  async findOne() {
    const setting = await this.settingRepository.find({
      cache: {
        milliseconds: 10 * 1000 * 60,
        id: 'SETTING_DEFAULT',
      },
    });
    let _setting = setting?.[0];
    if (!_setting) _setting = await this.create();
    if (_setting) {
      return {
        ..._setting,
        avatar: _setting.avatar && `data:image/jpeg;base64, ${_setting.avatar}`,
      };
    }
  }

  async update(id: number, updateSettingDto: UpdateSettingDto) {
    const updated = await this.settingRepository.update(
      {
        id,
      },
      updateSettingDto,
    );
    if (updated.affected) {
      return {
        updated: true,
        data: updateSettingDto,
      };
    } else {
      return {
        updated: false,
        data: null,
      };
    }
  }

  async uploadProfile(profile: Express.Multer.File) {
    const settings = await this.findOne();
    settings.avatar = profile.buffer.toString('base64');
    const saved = await this.settingRepository.save(settings);
    return {
      ...saved,
      avatar: saved.avatar && `data:image/jpeg;base64, ${saved.avatar}`,
    };
  }
}
