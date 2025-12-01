import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BranchesModule } from './models/branches/branches.module';
import { RoomsModule } from './models/rooms/rooms.module';
import { CoursesService } from './models/courses/courses.service';
import { CoursesModule } from './models/courses/courses.module';
import { GroupsController } from './models/groups/groups.controller';
import { GroupsModule } from './models/groups/groups.module';

@Module({
  imports: [BranchesModule, RoomsModule, CoursesModule, GroupsModule],
  controllers: [AppController, GroupsController],
  providers: [AppService, CoursesService],
})
export class AppModule {}
