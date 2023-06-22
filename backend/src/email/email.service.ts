import { Injectable } from '@nestjs/common';
import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';

@Injectable()
export class EmailService {
  private nodemailerTransport: Mail;

  constructor(private readonly configService: ConfigService) {
    this.nodemailerTransport = createTransport({
      service: configService.get('EMAIL_SERVICE'),
      auth: {
        user: configService.get('EMAIL_USER'),
        pass: configService.get('EMAIL_PASSWORD'),
      },
    });
  }

  sendMail(options: Mail.Options) {
    return this.nodemailerTransport.sendMail(options);
  }

  sendWarningMail(email: string, message: string) {
    const mailOptions: Mail.Options = {
      from: this.configService.get('EMAIL_USER'),
      to: email,
      subject: 'Library Book Expiry Remainder - IIC',
      text: message,
    };

    this.sendMail(mailOptions);
  }

  sendExpiryMail(email: string, message: string) {
    const mailOptions: Mail.Options = {
      from: this.configService.get('EMAIL_USER'),
      to: email,
      subject: 'Library Book Expired - IIC',
      text: message,
    };

    this.sendMail(mailOptions);
  }
}
