import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
@Injectable()
export class MailerService {
  constructor(private mailerServce: NestMailerService) {}

  async sendEmail(email: string, subject: string, code: number) {
    await this.mailerServce.sendMail({
      to: email,
      subject,
      template: 'index',
      context: {
        code,
      },
    });
  }
}
