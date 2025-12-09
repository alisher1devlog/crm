import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StaffModule } from './modules/staff/staff.module';
import { StudentGroupModule } from './modules/student-group/student-group.module';
import { TeacherGroupModule } from './modules/teacher-group/teacher-group.module';
import { StudentModule } from './modules/student/student.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { GroupModule } from './modules/group/group.module';
import { CourseModule } from './modules/course/course.module';
import { RoomModule } from './modules/room/room.module';
import { BranchModule } from './modules/branch/branch.module';
import { MailerModule } from './common/mailer/mailer.module';
import { MailerService } from './common/mailer/mailer.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    BranchModule,
    RoomModule,
    CourseModule,
    GroupModule,
    TeacherModule,
    StudentModule,
    TeacherGroupModule,
    StudentGroupModule,
    StaffModule,
    MailerModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailerService],
})
export class AppModule {}
