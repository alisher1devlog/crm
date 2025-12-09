import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailerService } from './mailer.service';

@Global()
@Module({
  imports: [
    NestMailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: 'alisheryondoshaliyev77@gmail.com',
          pass: 'olsj wetd odkr njux',
        },
      },
      defaults: {
        from: 'CRM tizimidan!<Alisherdan>',
      },
      template: {
        dir: join(process.cwd(), 'src', 'template'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
