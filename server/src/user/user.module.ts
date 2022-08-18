import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RegionModule } from 'src/region/region.module';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [RegionModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
