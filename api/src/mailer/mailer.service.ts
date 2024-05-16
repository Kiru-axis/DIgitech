import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { IMailerOptions } from 'src/common';

@Injectable()
export class MailerService {
  constructor(private config: ConfigService) {}

  async sendEmail(data: IMailerOptions) {
    const transporter = nodemailer.createTransport({
      host: this.config.getOrThrow('EMAIL_HOST'),
      port: this.config.getOrThrow('EMAIL_PORT'),
      auth: {
        pass: this.config.getOrThrow('EMAIL_PASSWORD'),
        user: this.config.getOrThrow('EMAIL_USERNAME'),
      },
    });

    const info = await transporter.sendMail({
      from: 'Digitech Support <digsupport.gmail.com>',
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html,
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview Url: %s', nodemailer.getTestMessageUrl(info));
  }
}
