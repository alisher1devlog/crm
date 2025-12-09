import { Injectable } from '@nestjs/common';
import { MailerService } from './common/mailer/mailer.service';

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}
  getHello(): string {
    return 'Hello World!';
  }
}
