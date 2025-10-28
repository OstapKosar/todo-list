import * as nodemailer from 'nodemailer';
import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { MailBodyDto } from 'src/mail/dto/mail.body-dto';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

  emailTransport() {
    const host = this.configService.get<string>('EMAIL_HOST');
    const port = this.configService.get<number>('EMAIL_PORT');
    const user = this.configService.get<string>('EMAIL_USER');
    const pass = this.configService.get<string>('EMAIL_PASSWORD');

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: false,
      auth: {
        user,
        pass,
      },
    });

    return transporter;
  }

  async sendEmail(dto: MailBodyDto) {
    const { recipients, subject, html, attachments } = dto;

    const transport = this.emailTransport();

    const options: nodemailer.SendMailOptions = {
      from: this.configService.get<string>('EMAIL_USER'),
      to: recipients,
      subject: subject,
      html: html,
      attachments: attachments || [],
    };

    try {
      await transport.sendMail(options);
    } catch (error) {
      console.error('Mail sending error:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(
        `Error sending mail: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }
}
